#!/usr/bin/env node
// Installs agent-templates into Claude Code, Codex, and Claude Cowork.
// Run without --tool for the interactive installer, or pass flags for scripted installs (see --help).

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const AGENTS_DIR = path.join(ROOT, 'agents');
const PLUGIN_NAME = 'agent-templates';
const VERSION = '1.0.0';

const TOOLS = [
  { value: 'claude-code', label: 'Claude Code', hint: 'Claude in the terminal or desktop Code tab' },
  { value: 'codex', label: 'Codex', hint: "OpenAI's coding agent" },
  { value: 'cowork', label: 'Claude Cowork', hint: 'creates a file you upload in the Cowork app' },
];
const TOOL_IDS = TOOLS.map((t) => t.value);

const HELP = `Install agent-templates skills/subagents.

Run with no --tool for the interactive installer.

  --tool <list>       Comma-separated: ${TOOL_IDS.join(', ')}, or "all"
  --category <list>   Comma-separated categories (default: all)
  --project <path>    Install into a project instead of the user home directory
                      (claude-code, codex only)
  --out <dir>         Output directory for the Cowork .plugin file (default: ./dist)
  --uninstall         Remove installed agents instead of installing
                      (only removes files this installer created)
  --dry-run           Print what would be written/removed without changing anything
  --list              List categories and agents, then exit
  -h, --help          Show this help

Targets:
  claude-code  <base>/.claude/skills/<name>/{SKILL.md,core.md}
               <base>/.claude/agents/<name>.md  (subagent)
  codex        <base>/.codex/skills/<name>/{SKILL.md,core.md}
  cowork       <out>/${PLUGIN_NAME}.plugin  (upload in Claude Cowork)
  <base> = home directory, or --project path`;

// ── Terminal styling ─────────────────────────────────────────────────────────

const isTTY = Boolean(process.stdin.isTTY && process.stdout.isTTY);
const useColor = Boolean(process.stdout.isTTY) && !process.env.NO_COLOR;
const paint = (code) => (s) => (useColor ? `\x1b[${code}m${s}\x1b[0m` : String(s));
const bold = paint('1');
const dim = paint('2');
const red = paint('31');
const green = paint('32');
const yellow = paint('33');
const cyan = paint('36');
const magenta = paint('35');
const stripAnsi = (s) => s.replace(/\x1b\[[0-9;]*[A-Za-z]/g, '');
const HIDE_CURSOR = '\x1b[?25l';
const SHOW_CURSOR = '\x1b[?25h';

const BANNER = [
  '▄▀█ █▀▀ █▀▀ █▄░█ ▀█▀   ▀█▀ █▀▀ █▀▄▀█ █▀█ █░░ ▄▀█ ▀█▀ █▀▀ █▀',
  '█▀█ █▄█ ██▄ █░▀█ ░█░   ░█░ ██▄ █░▀░█ █▀▀ █▄▄ █▀█ ░█░ ██▄ ▄█',
];

function box(lines, color = cyan) {
  const width = Math.max(...lines.map((l) => stripAnsi(l).length));
  const out = [color(`╭${'─'.repeat(width + 4)}╮`)];
  for (const l of lines) out.push(`${color('│')}  ${l}${' '.repeat(width - stripAnsi(l).length)}  ${color('│')}`);
  out.push(color(`╰${'─'.repeat(width + 4)}╯`));
  return out.join('\n');
}

function progressBar(label, done, total) {
  const width = 28;
  const filled = Math.round((done / total) * width);
  const bar = cyan('█'.repeat(filled)) + dim('░'.repeat(width - filled));
  return `  ${label.padEnd(14)} ${bar} ${String(done).padStart(3)}/${total}`;
}

// ── Interactive prompts (dependency-free, raw-mode keypress) ─────────────────

function interact(render, onKey) {
  return new Promise((resolve) => {
    let lines = 0;
    const draw = (text) => {
      if (lines) process.stdout.write(`\x1b[${lines}A\x1b[0J`);
      process.stdout.write(`${text}\n`);
      lines = text.split('\n').length;
    };
    const cleanup = () => {
      process.stdin.off('keypress', handler);
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stdout.write(SHOW_CURSOR);
    };
    const handler = (str, key = {}) => {
      if (key.ctrl && key.name === 'c') {
        cleanup();
        console.log(`\n${yellow('✖ Installation cancelled.')}`);
        process.exit(130);
      }
      const result = onKey(str, key);
      if (result) {
        draw(result.summary);
        cleanup();
        resolve(result.value);
      } else {
        draw(render());
      }
    };
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdout.write(HIDE_CURSOR);
    process.stdin.on('keypress', handler);
    draw(render());
  });
}

const question = (q) => `${cyan('?')} ${bold(q)}`;
const answered = (q, a) => `${green('✔')} ${bold(q)} ${dim('·')} ${cyan(a)}`;

function multiSelect(q, choices) {
  let cursor = 0;
  let error = '';
  const selected = new Set(choices.filter((c) => c.checked).map((c) => c.value));
  const render = () => {
    const rows = choices.map((c, i) => {
      const pointer = i === cursor ? cyan('❯') : ' ';
      const mark = selected.has(c.value) ? green('◉') : dim('◯');
      const label = i === cursor ? bold(c.label) : c.label;
      return `  ${pointer} ${mark} ${label}${c.hint ? `  ${dim(c.hint)}` : ''}`;
    });
    const help = dim('  ↑/↓ move · space select · a toggle all · enter confirm');
    return [question(q), ...rows, error ? `  ${red(error)}` : help].join('\n');
  };
  return interact(render, (str, key) => {
    error = '';
    if (key.name === 'up' || str === 'k') cursor = (cursor - 1 + choices.length) % choices.length;
    else if (key.name === 'down' || str === 'j') cursor = (cursor + 1) % choices.length;
    else if (key.name === 'space') {
      const v = choices[cursor].value;
      selected.has(v) ? selected.delete(v) : selected.add(v);
    } else if (str === 'a') {
      const all = selected.size === choices.length;
      choices.forEach((c) => (all ? selected.delete(c.value) : selected.add(c.value)));
    } else if (key.name === 'return') {
      if (selected.size === 0) {
        error = 'Select at least one option (space to select).';
        return null;
      }
      const picked = choices.filter((c) => selected.has(c.value));
      return { value: picked.map((c) => c.value), summary: answered(q, picked.map((c) => c.label).join(', ')) };
    }
    return null;
  });
}

function select(q, choices) {
  let cursor = 0;
  const render = () => {
    const rows = choices.map((c, i) => {
      const pointer = i === cursor ? cyan('❯') : ' ';
      const label = i === cursor ? cyan(bold(c.label)) : c.label;
      return `  ${pointer} ${label}${c.hint ? `  ${dim(c.hint)}` : ''}`;
    });
    return [question(q), ...rows, dim('  ↑/↓ move · enter confirm')].join('\n');
  };
  return interact(render, (str, key) => {
    if (key.name === 'up' || str === 'k') cursor = (cursor - 1 + choices.length) % choices.length;
    else if (key.name === 'down' || str === 'j') cursor = (cursor + 1) % choices.length;
    else if (key.name === 'return') return { value: choices[cursor].value, summary: answered(q, choices[cursor].label) };
    return null;
  });
}

function text(q, defaultValue) {
  let value = '';
  const render = () => `${question(q)} ${value || dim(defaultValue)}${cyan('▌')}`;
  return interact(render, (str, key) => {
    if (key.name === 'return') {
      const v = value.trim() || defaultValue;
      return { value: v, summary: answered(q, v) };
    }
    if (key.name === 'backspace') value = value.slice(0, -1);
    else if (str && !key.ctrl && !key.meta && str.length === 1 && str >= ' ') value += str;
    return null;
  });
}

function confirm(q, defaultYes = true) {
  const render = () => `${question(q)} ${dim(defaultYes ? '(Y/n)' : '(y/N)')}`;
  return interact(render, (str, key) => {
    let yes = null;
    if (key.name === 'return') yes = defaultYes;
    else if (str === 'y' || str === 'Y') yes = true;
    else if (str === 'n' || str === 'N') yes = false;
    return yes === null ? null : { value: yes, summary: answered(q, yes ? 'Yes' : 'No') };
  });
}

// ── Agent loading and install plans ──────────────────────────────────────────

function parseFrontmatter(content, file) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) throw new Error(`No frontmatter in ${file}`);
  const fields = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) fields[kv[1]] = kv[2].trim();
  }
  if (!fields.name || !fields.description) throw new Error(`Missing name/description in ${file}`);
  return fields;
}

function loadAgents() {
  const agents = [];
  for (const category of fs.readdirSync(AGENTS_DIR).sort()) {
    const catDir = path.join(AGENTS_DIR, category);
    if (!fs.statSync(catDir).isDirectory()) continue;
    for (const folder of fs.readdirSync(catDir).sort()) {
      const dir = path.join(catDir, folder);
      const skillPath = path.join(dir, 'SKILL.md');
      const corePath = path.join(dir, 'core.md');
      if (!fs.existsSync(skillPath) || !fs.existsSync(corePath)) {
        console.warn(yellow(`⚠ Skipping ${category}/${folder}: SKILL.md or core.md missing`));
        continue;
      }
      const skill = fs.readFileSync(skillPath, 'utf8');
      const { name, description } = parseFrontmatter(skill, skillPath);
      agents.push({ category, name, description, skill, core: fs.readFileSync(corePath, 'utf8') });
    }
  }
  const seen = new Map();
  for (const a of agents) {
    if (seen.has(a.name)) throw new Error(`Duplicate agent name "${a.name}" in ${seen.get(a.name)} and ${a.category}`);
    seen.set(a.name, a.category);
  }
  return agents;
}

// Subagents run in their own context and cannot follow a relative link, so core.md is inlined.
function subagentFile(agent) {
  return `---\nname: ${agent.name}\ndescription: ${JSON.stringify(agent.description)}\n---\n\n${agent.core}`;
}

function skillFiles(agent) {
  return { 'SKILL.md': agent.skill, 'core.md': agent.core };
}

function planClaudeCode(agents, base) {
  const writes = [];
  for (const a of agents) {
    for (const [file, content] of Object.entries(skillFiles(a))) {
      writes.push([path.join(base, '.claude', 'skills', a.name, file), content]);
    }
    writes.push([path.join(base, '.claude', 'agents', `${a.name}.md`), subagentFile(a)]);
  }
  return writes;
}

function planCodex(agents, base) {
  const writes = [];
  for (const a of agents) {
    for (const [file, content] of Object.entries(skillFiles(a))) {
      writes.push([path.join(base, '.codex', 'skills', a.name, file), content]);
    }
  }
  return writes;
}

function planCowork(agents, categories) {
  const manifest = {
    name: PLUGIN_NAME,
    version: VERSION,
    description: `Agent templates: ${categories.join(', ')} (${agents.length} agents)`,
  };
  const entries = [['.claude-plugin/plugin.json', JSON.stringify(manifest, null, 2) + '\n']];
  for (const a of agents) {
    for (const [file, content] of Object.entries(skillFiles(a))) entries.push([`skills/${a.name}/${file}`, content]);
    entries.push([`agents/${a.name}.md`, subagentFile(a)]);
  }
  return entries;
}

// ── Minimal ZIP writer (deflate) so the installer has no dependencies ────────

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function buildZip(entries) {
  const locals = [];
  const centrals = [];
  let offset = 0;
  for (const [name, content] of entries) {
    const nameBuf = Buffer.from(name, 'utf8');
    const data = Buffer.from(content, 'utf8');
    const compressed = zlib.deflateRawSync(data);
    const crc = crc32(data);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6); // UTF-8 names
    local.writeUInt16LE(8, 8); // deflate
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(compressed.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    locals.push(local, nameBuf, compressed);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(8, 10);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(compressed.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(nameBuf.length, 28);
    central.writeUInt32LE(offset, 42);
    centrals.push(central, nameBuf);

    offset += local.length + nameBuf.length + compressed.length;
  }
  const centralBuf = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralBuf.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, centralBuf, end]);
}

// ── Config: flags or interactive ─────────────────────────────────────────────

function fail(msg) {
  console.error(`${red('✖')} ${msg}\n${dim('Run with --help for usage.')}`);
  process.exit(1);
}

function parseArgs(argv) {
  const opts = { tools: [], categories: [], project: null, out: null, dryRun: false, list: false, uninstall: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const next = () => {
      const v = argv[++i];
      if (v === undefined || v.startsWith('--')) fail(`Missing value for ${arg}`);
      return v;
    };
    const csv = () => next().split(',').map((s) => s.trim()).filter(Boolean);
    switch (arg) {
      case '--tool': opts.tools.push(...csv()); break;
      case '--category': opts.categories.push(...csv()); break;
      case '--project': opts.project = path.resolve(next()); break;
      case '--out': opts.out = path.resolve(next()); break;
      case '--dry-run': opts.dryRun = true; break;
      case '--uninstall': opts.uninstall = true; break;
      case '--list': opts.list = true; break;
      case '-h': case '--help': console.log(HELP); process.exit(0);
      default: fail(`Unknown argument: ${arg}`);
    }
  }
  if (opts.tools.includes('all')) opts.tools = [...TOOL_IDS];
  opts.tools = [...new Set(opts.tools)];
  for (const t of opts.tools) if (!TOOL_IDS.includes(t)) fail(`Unknown tool "${t}". Valid: ${TOOL_IDS.join(', ')}, all`);
  return opts;
}

function validateCategories(categories, allCategories) {
  for (const c of categories) if (!allCategories.includes(c)) fail(`Unknown category "${c}". Valid: ${allCategories.join(', ')}`);
}

async function askConfig(opts, all, allCategories) {
  console.log();
  BANNER.forEach((line, i) => console.log(`  ${(i === 0 ? cyan : magenta)(line)}`));
  console.log(`  ${dim(`v${VERSION} · ${all.length} agents · ${allCategories.length} categories`)}\n`);

  const uninstall = opts.uninstall || (await select('What do you want to do?', [
    { value: false, label: 'Install', hint: 'add or update agents' },
    { value: true, label: 'Uninstall', hint: 'remove agents installed by this tool' },
  ]));

  const tools = await multiSelect(`Which tools do you want to ${uninstall ? 'uninstall from' : 'install into'}?`, TOOLS);

  let categories = opts.categories;
  if (!categories.length) {
    const choices = allCategories.map((c) => ({
      value: c,
      label: c,
      hint: `${all.filter((a) => a.category === c).length} agents`,
      checked: true,
    }));
    categories = await multiSelect('Which categories?', choices);
  }

  let project = opts.project;
  if (!project && (tools.includes('claude-code') || tools.includes('codex'))) {
    const scope = await select(uninstall ? 'Uninstall from where?' : 'Install where?', [
      { value: 'user', label: 'Everywhere (Recommended)', hint: 'works in every folder — pick this if unsure' },
      { value: 'project', label: 'One project folder only', hint: 'for developers who want per-project agents' },
    ]);
    if (scope === 'project') {
      while (true) {
        project = path.resolve(await text('Project path:', process.cwd()));
        if (fs.existsSync(project) && fs.statSync(project).isDirectory()) break;
        console.log(`  ${red(`✖ Not a directory: ${project}`)}`);
      }
    }
  }

  let out = opts.out;
  if (!out && tools.includes('cowork')) {
    const q = uninstall ? 'Folder containing the Cowork plugin:' : 'Save Cowork plugin to:';
    out = path.resolve(await text(q, path.join(ROOT, 'dist')));
  }

  return { tools, categories, project, out, dryRun: opts.dryRun, uninstall };
}

// ── Install ──────────────────────────────────────────────────────────────────

function countExisting(agents, base, tools) {
  let n = 0;
  for (const a of agents) {
    if (tools.includes('claude-code') && fs.existsSync(path.join(base, '.claude', 'skills', a.name))) n++;
    if (tools.includes('codex') && fs.existsSync(path.join(base, '.codex', 'skills', a.name))) n++;
  }
  return n;
}

function writeAll(label, writes, dryRun) {
  writes.forEach(([file, content], i) => {
    if (dryRun) {
      if (!isTTY) console.log(`  [dry-run] ${file}`);
    } else {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, content);
    }
    if (isTTY) process.stdout.write(`\r${progressBar(label, i + 1, writes.length)}`);
  });
  if (isTTY) process.stdout.write(`\r${progressBar(label, writes.length, writes.length)}  ${green('✔')}\n`);
}

function install(config, agents) {
  const { tools, categories, dryRun } = config;
  const base = config.project ?? os.homedir();
  const out = config.out ?? path.join(ROOT, 'dist');
  const pluginFile = path.join(out, `${PLUGIN_NAME}.plugin`);
  const nextSteps = [];

  console.log();
  if (tools.includes('claude-code')) {
    writeAll('Claude Code', planClaudeCode(agents, base), dryRun);
    nextSteps.push(
      `${bold('Claude Code')}  ${dim(path.join(base, '.claude'))}`,
      '  1. Close and reopen Claude Code',
      `  2. Type ${cyan(`/${agents[0].name}`)} to use an agent, or just describe your task`,
    );
  }
  if (tools.includes('codex')) {
    writeAll('Codex', planCodex(agents, base), dryRun);
    nextSteps.push(
      `${bold('Codex')}  ${dim(path.join(base, '.codex', 'skills'))}`,
      '  Close and reopen Codex, then describe your task',
    );
  }
  if (tools.includes('cowork')) {
    const entries = planCowork(agents, categories);
    if (!dryRun) {
      fs.mkdirSync(out, { recursive: true });
      fs.writeFileSync(pluginFile, buildZip(entries));
    }
    if (isTTY) console.log(`${progressBar('Claude Cowork', 1, 1)}  ${green('✔')}`);
    nextSteps.push(
      `${bold('Claude Cowork')}  ${dim(pluginFile)}`,
      '  Upload this .plugin file in the Cowork app',
    );
  }

  console.log();
  const title = dryRun
    ? yellow(bold('Dry run complete — nothing was written'))
    : green(bold(`✔ Installed ${agents.length} agents`));
  console.log(box([title, '', ...nextSteps], dryRun ? yellow : green));
}

// ── Uninstall ────────────────────────────────────────────────────────────────

// Only remove targets whose frontmatter name matches, so a user's own skill with the same folder name is left alone.
function hasOurName(file, name) {
  try {
    return parseFrontmatter(fs.readFileSync(file, 'utf8'), file).name === name;
  } catch {
    return false;
  }
}

function planRemovals(config, agents) {
  const base = config.project ?? os.homedir();
  const removals = { 'claude-code': [], codex: [], cowork: [] };
  const skipped = [];
  for (const a of agents) {
    const targets = [];
    if (config.tools.includes('claude-code')) {
      targets.push(['claude-code', path.join(base, '.claude', 'skills', a.name), path.join(base, '.claude', 'skills', a.name, 'SKILL.md')]);
      targets.push(['claude-code', path.join(base, '.claude', 'agents', `${a.name}.md`), path.join(base, '.claude', 'agents', `${a.name}.md`)]);
    }
    if (config.tools.includes('codex')) {
      targets.push(['codex', path.join(base, '.codex', 'skills', a.name), path.join(base, '.codex', 'skills', a.name, 'SKILL.md')]);
    }
    for (const [tool, target, marker] of targets) {
      if (!fs.existsSync(target)) continue;
      if (hasOurName(marker, a.name)) removals[tool].push(target);
      else skipped.push(target);
    }
  }
  if (config.tools.includes('cowork')) {
    const pluginFile = path.join(config.out ?? path.join(ROOT, 'dist'), `${PLUGIN_NAME}.plugin`);
    if (fs.existsSync(pluginFile)) removals.cowork.push(pluginFile);
  }
  return { removals, skipped };
}

function removeAll(label, targets, dryRun) {
  targets.forEach((target, i) => {
    if (dryRun) {
      if (!isTTY) console.log(`  [dry-run] remove ${target}`);
    } else {
      fs.rmSync(target, { recursive: true, force: true });
    }
    if (isTTY) process.stdout.write(`\r${progressBar(label, i + 1, targets.length)}`);
  });
  if (isTTY && targets.length) process.stdout.write(`\r${progressBar(label, targets.length, targets.length)}  ${green('✔')}\n`);
}

function uninstall(config, plan) {
  const { removals, skipped } = plan;
  const total = Object.values(removals).flat().length;
  console.log();
  for (const t of TOOLS) {
    if (!config.tools.includes(t.value)) continue;
    if (removals[t.value].length) removeAll(t.label, removals[t.value], config.dryRun);
    else console.log(`  ${t.label.padEnd(14)} ${dim('nothing installed')}`);
  }

  const lines = [
    config.dryRun
      ? yellow(bold(`Dry run complete — ${total} items would be removed`))
      : green(bold(`✔ Removed ${total} items`)),
  ];
  if (skipped.length) {
    lines.push('', yellow(`⚠ Skipped ${skipped.length} items not created by this installer:`));
    skipped.slice(0, 5).forEach((s) => lines.push(dim(`  ${s}`)));
    if (skipped.length > 5) lines.push(dim(`  …and ${skipped.length - 5} more`));
  }
  if (config.tools.includes('cowork')) {
    lines.push('', `${bold('Claude Cowork')}  Also remove the "${PLUGIN_NAME}" plugin inside the Cowork app`);
  }
  if (config.tools.includes('claude-code') || config.tools.includes('codex')) {
    lines.push('', 'Restart the tools to unload removed skills');
  }
  console.log();
  console.log(box(lines, config.dryRun ? yellow : green));
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const all = loadAgents();
  const allCategories = [...new Set(all.map((a) => a.category))];
  validateCategories(opts.categories, allCategories);

  if (opts.list) {
    for (const c of allCategories) {
      const names = all.filter((a) => a.category === c).map((a) => a.name);
      console.log(`${bold(c)} ${dim(`(${names.length})`)}: ${names.join(', ')}`);
    }
    return;
  }

  const interactive = opts.tools.length === 0;
  if (interactive && !isTTY) fail('--tool is required when not running in an interactive terminal');

  const config = interactive
    ? await askConfig(opts, all, allCategories)
    : {
        tools: opts.tools,
        categories: opts.categories.length ? opts.categories : allCategories,
        project: opts.project,
        out: opts.out,
        dryRun: opts.dryRun,
        uninstall: opts.uninstall,
      };

  if (config.project && config.tools.includes('cowork') && !interactive) {
    console.warn(yellow('⚠ --project does not apply to cowork; the .plugin file goes to --out.'));
  }

  const agents = all.filter((a) => config.categories.includes(a.category));
  const base = config.project ?? os.homedir();

  if (config.uninstall) {
    const plan = planRemovals(config, agents);
    const total = Object.values(plan.removals).flat().length;
    if (total === 0) {
      console.log(`\n${yellow('Nothing to uninstall')} ${dim(`— no matching agents found in ${config.project ?? `Everywhere (${os.homedir()})`}`)}`);
      return;
    }
    if (interactive) {
      console.log();
      console.log(box([
        bold('Uninstall summary'),
        '',
        ...TOOLS.filter((t) => config.tools.includes(t.value)).map((t) => `${dim(t.label.padEnd(14))} ${plan.removals[t.value].length} items`),
        `${dim('Location'.padEnd(14))} ${config.project ?? `Everywhere (${os.homedir()})`}`,
        ...(config.dryRun ? [yellow('Dry run: nothing will be removed')] : []),
      ], red));
      console.log();
      if (!(await confirm(`Remove ${total} items?`, false))) {
        console.log(yellow('✖ Uninstall cancelled.'));
        return;
      }
    }
    uninstall(config, plan);
    return;
  }

  if (interactive) {
    const existing = countExisting(agents, base, config.tools);
    console.log();
    console.log(box([
      bold('Summary'),
      '',
      `${dim('Tools      ')} ${config.tools.map((t) => TOOLS.find((x) => x.value === t).label).join(', ')}`,
      `${dim('Agents     ')} ${agents.length} from ${config.categories.length} categories`,
      `${dim('Location   ')} ${config.project ? config.project : `Everywhere (${os.homedir()})`}`,
      ...(existing ? [yellow(`⚠ ${existing} existing skill folders will be overwritten`)] : []),
      ...(config.dryRun ? [yellow('Dry run: nothing will be written')] : []),
    ]));
    console.log();
    if (!(await confirm('Proceed with installation?'))) {
      console.log(yellow('✖ Installation cancelled.'));
      return;
    }
  }

  install(config, agents);
}

main().catch((err) => {
  process.stdout.write(SHOW_CURSOR);
  console.error(`${red('✖')} ${err.message}`);
  process.exit(1);
});
