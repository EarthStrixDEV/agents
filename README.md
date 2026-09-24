<div align="center">

# 🧩 agent-templates

**คลัง Agent เฉพาะทาง 77 ตัว พร้อมติดตั้งลง Claude Code, Codex และ Claude Cowork ด้วยคำสั่งเดียว**

![agents](https://img.shields.io/badge/agents-77-6366f1?style=flat-square)
![categories](https://img.shields.io/badge/categories-7-8b5cf6?style=flat-square)
![node](https://img.shields.io/badge/node-%E2%89%A518-339933?style=flat-square&logo=node.js&logoColor=white)
![dependencies](https://img.shields.io/badge/dependencies-0-22c55e?style=flat-square)

[มือใหม่เริ่มที่นี่](#-มือใหม่เริ่มที่นี่) · [ติดตั้งผ่าน terminal](#-ติดตั้ง) · [ถอนการติดตั้ง](#-ถอนการติดตั้ง) · [ตัวเลือกทั้งหมด](#%EF%B8%8F-ตัวเลือกทั้งหมด) · [รายชื่อ Agent](#agents-ปัจจุบัน)

</div>

คลังเก็บ Agent เฉพาะทางแบบ reusable — นิยาม persona, knowledge และ guardrail ของแต่ละ agent ไว้ที่เดียว แล้วนำไปใช้กับ platform ใดก็ได้ในภายหลัง

---

## 👋 มือใหม่เริ่มที่นี่

ไม่ต้องพิมพ์คำสั่งใดๆ ทำตาม 3 ขั้นนี้ได้เลย ใช้เวลาประมาณ 5 นาที

### ขั้นที่ 1 · ดาวน์โหลดไฟล์

1. ที่หน้านี้บน GitHub กดปุ่มสีเขียว **`<> Code`** แล้วเลือก **Download ZIP**
2. เปิดไฟล์ ZIP ที่ได้ แล้วกด **Extract All** (Windows) หรือดับเบิลคลิก (Mac) เพื่อแตกไฟล์เป็นโฟลเดอร์

### ขั้นที่ 2 · ติดตั้ง Node.js (ทำครั้งเดียว)

ตัวติดตั้งต้องใช้โปรแกรมชื่อ Node.js ถ้าเคยติดตั้งแล้วข้ามขั้นนี้ได้ ถ้าไม่แน่ใจก็ข้ามไปขั้นที่ 3 ได้เลย ตัวติดตั้งจะบอกเองถ้ายังไม่มี

1. เข้า [nodejs.org](https://nodejs.org) แล้วกดปุ่มดาวน์โหลดรุ่น **LTS**
2. เปิดไฟล์ที่ดาวน์โหลดมา แล้วกด **Next** / **Continue** ไปจนเสร็จ

### ขั้นที่ 3 · ดับเบิลคลิกตัวติดตั้ง

เปิดโฟลเดอร์ที่แตกไว้ในขั้นที่ 1 แล้วดับเบิลคลิก

| เครื่อง | ไฟล์ที่ต้องดับเบิลคลิก |
|---|---|
| 🪟 Windows | **`install.cmd`** |
| 🍎 Mac | **`install.command`** |

จะมีหน้าต่างสีดำขึ้นมาถามทีละข้อ ใช้แค่ 3 ปุ่มนี้

| ปุ่ม | ใช้ทำอะไร |
|---|---|
| `↑` `↓` | เลื่อนขึ้นลง |
| `Space` | ติ๊กเลือก / เอาติ๊กออก |
| `Enter` | ยืนยันแล้วไปข้อถัดไป |

> 💡 **ไม่แน่ใจข้อไหน ให้กด `Enter` ไปเลย** ค่าที่เลือกไว้ให้เป็นค่าที่แนะนำแล้ว
> ตอนถามว่าติดตั้งที่ไหน ให้เลือก **Everywhere (Recommended)**

พอเห็นกรอบสีเขียว **✔ Installed** แปลว่าเสร็จแล้ว ปิดหน้าต่างได้เลย

<details>
<summary><b>🍎 Mac ขึ้นว่าเปิดไฟล์ไม่ได้ / ไม่ได้รับอนุญาต</b></summary>

<br>

- **"cannot be opened because it is from an unidentified developer"** → คลิกขวาที่ `install.command` เลือก **Open** แล้วกด **Open** อีกครั้ง
- **"you do not have access privileges"** → เปิดแอป **Terminal** พิมพ์ `chmod +x ` (มีเว้นวรรคท้าย) แล้วลากไฟล์ `install.command` มาวางในหน้าต่าง กด `Enter` จากนั้นดับเบิลคลิกใหม่

</details>

### เริ่มใช้งาน

| Tool | วิธีใช้ |
|---|---|
| **Claude Code** | ปิดแล้วเปิด Claude Code ใหม่ จากนั้นพิมพ์ `/` ตามด้วยชื่อ agent เช่น `/copywriter` หรือเล่างานที่อยากให้ทำไปเลย Claude จะเลือก agent ที่เหมาะให้เอง |
| **Codex** | ปิดแล้วเปิด Codex ใหม่ แล้วเล่างานที่อยากให้ทำ |
| **Claude Cowork** | อัปโหลดไฟล์ `dist/agent-templates.plugin` ในแอป Cowork |

ดูรายชื่อ agent ทั้งหมดได้ที่ [Agents ปัจจุบัน](#agents-ปัจจุบัน)

**อยากถอนการติดตั้ง?** ดับเบิลคลิกไฟล์เดิมอีกครั้ง แล้วเลือก **Uninstall** ในข้อแรก

---

## 🚀 ติดตั้ง

สำหรับคนที่ใช้ terminal เป็น — ผลลัพธ์เหมือนการดับเบิลคลิกทุกอย่าง

> **สิ่งที่ต้องมี:** [Node.js](https://nodejs.org) 18 ขึ้นไป — ไม่ต้อง `npm install` อะไรเพิ่ม

เปิด terminal ที่โฟลเดอร์ `agent-templates` แล้วรัน

```bash
node install.mjs
```

ตัวติดตั้งจะพาไปทีละขั้น

| ขั้น | ถามอะไร | วิธีตอบ |
|:---:|---|---|
| 1 | Install หรือ Uninstall | `↑` `↓` เลือก แล้ว `Enter` |
| 2 | ติดตั้งลง tool ไหน | `Space` ติ๊ก · `a` เลือกทั้งหมด · `Enter` ยืนยัน |
| 3 | เอาหมวดไหนบ้าง | ติ๊กไว้ทุกหมวดเป็นค่าเริ่มต้น |
| 4 | ติดตั้งที่ไหน | **Everywhere** = ใช้ได้ทุกโฟลเดอร์ · **One project folder only** = เฉพาะโฟลเดอร์นั้น |
| 5 | สรุปและยืนยัน | `Y` ติดตั้ง · `N` ยกเลิก |

กด `Ctrl+C` เพื่อยกเลิกได้ทุกเมื่อ

### ติดตั้งแล้วไปอยู่ที่ไหน

| Tool | ตำแหน่ง | สิ่งที่ได้ |
|---|---|---|
| **Claude Code** | `~/.claude/skills/<name>/`<br>`~/.claude/agents/<name>.md` | Skill เรียกด้วย `/<name>` และ Subagent ที่ Claude เรียกใช้เองได้ |
| **Codex** | `~/.codex/skills/<name>/` | Skill |
| **Claude Cowork** | `dist/agent-templates.plugin` | ไฟล์ plugin สำหรับอัปโหลดเข้าแอป Cowork |

> 💡 เลือก **One project folder only** แล้ว `~` จะเปลี่ยนเป็น path ของโปรเจกต์นั้นแทน
> ติดตั้งเสร็จแล้ว **restart tool** หนึ่งครั้งเพื่อโหลด skill ใหม่

### ติดตั้งแบบคำสั่งเดียว (ไม่ต้องตอบคำถาม)

เหมาะกับ script หรือ CI — ใส่ `--tool` แล้วตัวติดตั้งจะข้ามทุกคำถาม

```bash
# ทุก agent ลงทุก tool
node install.mjs --tool all

# เฉพาะสาย dev ลง Claude Code ในโปรเจกต์
node install.mjs --tool claude-code --category software-engineering --project ./my-app

# สร้าง plugin สำหรับ Cowork เฉพาะหมวด research กับ productivity
node install.mjs --tool cowork --category research,productivity

# ดูก่อนว่าจะเขียนไฟล์อะไรบ้าง โดยไม่เขียนจริง
node install.mjs --tool all --dry-run
```

## 🧹 ถอนการติดตั้ง

```bash
node install.mjs --uninstall --tool all
```

หรือรัน `node install.mjs` แล้วเลือก **Uninstall** ในขั้นแรก

- ลบ **เฉพาะไฟล์ที่ตัวติดตั้งนี้สร้าง** — ถ้ามี skill ของคุณเองที่ชื่อโฟลเดอร์ซ้ำ จะถูกข้ามและแจ้งให้ทราบ
- ใช้ `--category` และ `--project` ได้เหมือนตอนติดตั้ง ต้องระบุ `--project` ให้ตรงกับตอนติดตั้ง
- **Cowork:** ลบได้แค่ไฟล์ `.plugin` ในเครื่อง ส่วน plugin ที่อัปโหลดเข้าแอปแล้วต้องลบในแอป Cowork เอง

## ⚙️ ตัวเลือกทั้งหมด

| Flag | ความหมาย | ค่าเริ่มต้น |
|---|---|---|
| `--tool <list>` | `claude-code`, `codex`, `cowork` หรือ `all` คั่นด้วย `,` | ถามแบบ interactive |
| `--category <list>` | หมวดที่ต้องการ คั่นด้วย `,` | ทุกหมวด |
| `--project <path>` | ติดตั้งลงโปรเจกต์แทน home directory | home directory |
| `--out <dir>` | โฟลเดอร์สำหรับไฟล์ Cowork `.plugin` | `./dist` |
| `--uninstall` | ถอนการติดตั้ง | — |
| `--dry-run` | แสดงผลอย่างเดียว ไม่เขียนหรือลบไฟล์ | — |
| `--list` | แสดงรายชื่อหมวดและ agent ทั้งหมด | — |
| `-h`, `--help` | แสดงวิธีใช้ | — |

<details>
<summary><b>🛠️ แก้ปัญหาที่พบบ่อย</b></summary>

<br>

| อาการ | วิธีแก้ |
|---|---|
| `--tool is required when not running in an interactive terminal` | รันใน terminal ปกติ หรือใส่ `--tool` เพื่อใช้แบบคำสั่งเดียว |
| ติดตั้งแล้วไม่เห็น skill | restart tool ที่ติดตั้ง และตรวจว่าเลือก Everywhere/Project ตรงกับที่เปิดใช้งาน |
| สีหรือกรอบแสดงผลเพี้ยน | ใช้ terminal ที่รองรับ Unicode (Windows Terminal, iTerm2) หรือตั้ง `NO_COLOR=1` เพื่อปิดสี |
| ถอนการติดตั้งแล้วขึ้น `Nothing to uninstall` | ตรวจว่า `--project` ตรงกับตอนติดตั้ง |

</details>

---

## หมวดหมู่

| หมวด | โฟลเดอร์ | บทบาท |
|------|----------|-------|
| Consultant | `agents/consultant/` | ให้คำปรึกษาเชิงปฏิบัติในโดเมนหรือระบบเฉพาะทาง ตอบว่า "ทำอย่างไรให้ถูกต้อง" ระดับ operation |
| Business | `agents/business/` | ให้คำปรึกษาระดับองค์กรและกลยุทธ์ ตอบว่า "ควรทำอะไร ทำไม และคุ้มไหม" ข้าม function |
| Software Engineering | `agents/software-engineering/` | ลงมือทำงานเขียนโค้ด แก้บั๊ก รีวิว และปรับปรุงระบบ |
| Creative | `agents/creative/` | ผลิตงานสร้างสรรค์: เขียน เล่าเรื่อง บท แบรนด์ ภาพ social และคุมทิศทางงาน |
| Research | `agents/research/` | ค้นคว้า ตรวจสอบข้อเท็จจริง สังเคราะห์ และเขียนผลการวิจัยอย่างมีหลักฐานและอ้างอิงได้ |
| Life-style | `agents/life-style/` | ให้คำแนะนำเรื่องชีวิตส่วนตัว: การเงิน สุขภาพ นิสัย เวลา การเรียนรู้ การเดินทาง บ้าน ความสัมพันธ์ |
| Productivity | `agents/productivity/` | ช่วยงานทั่วไป เช่น สรุปเอกสาร จัดการงาน ร่างข้อความ |

## โครงสร้าง

```
agent-templates/
├── README.md
├── install.cmd            ← ดับเบิลคลิกติดตั้ง (Windows)
├── install.command        ← ดับเบิลคลิกติดตั้ง (Mac)
├── install.mjs            ← ตัวติดตั้ง / ถอนการติดตั้ง
├── agents/
│   ├── consultant/
│   │   ├── erp-epicor-consultant/
│   │   │   ├── SKILL.md
│   │   │   └── core.md
│   │   ├── scm-consultant/
│   │   │   └── core.md
│   │   └── ... (7 agents)
│   ├── business/
│   │   ├── business-strategist/
│   │   │   └── core.md
│   │   ├── financial-analyst/
│   │   │   └── core.md
│   │   └── ... (11 agents)
│   ├── software-engineering/
│   │   ├── frontend-engineer/
│   │   │   └── core.md
│   │   ├── backend-engineer/
│   │   │   └── core.md
│   │   └── ... (19 agents)
│   ├── creative/
│   │   ├── copywriter/
│   │   │   └── core.md
│   │   ├── creative-director/
│   │   │   └── core.md
│   │   └── ... (10 agents)
│   ├── research/
│   │   ├── research-planner/
│   │   │   └── core.md
│   │   ├── fact-checker/
│   │   │   └── core.md
│   │   └── ... (10 agents)
│   ├── life-style/
│   │   ├── personal-finance-coach/
│   │   │   └── core.md
│   │   ├── habit-coach/
│   │   │   └── core.md
│   │   └── ... (10 agents)
│   └── productivity/
│       ├── meeting-summarizer/
│       │   └── core.md
│       ├── task-prioritizer/
│       │   └── core.md
│       └── ... (10 agents)
└── examples/
```

- แต่ละ agent อยู่ในโฟลเดอร์ของตัวเอง ใต้หมวดที่เกี่ยวข้อง
- `core.md` คือไฟล์หลักของ agent เก็บ persona, scope ความเชี่ยวชาญ, reasoning framework และ guardrail
- `core.md` เขียนแบบ platform-agnostic ยังไม่ผูกกับ Claude Code, OpenAI, n8n หรือ platform อื่น
- `SKILL.md` คือ wrapper สำหรับ Claude Code / Codex / Cowork มี `name` และ `description` ไว้ให้ tool ตัดสินใจว่าเมื่อไรควรเรียก แล้วชี้ไปอ่าน `core.md`
- `examples/` สำหรับตัวอย่างการนำ agent ไปใช้งานจริงในอนาคต

## Agents ปัจจุบัน

### ตารางรวม

ทั้งหมด 77 agents ใน 7 หมวด

| # | หมวด | Agent | บทบาท |
|---|---|---|---|
| 1 | Consultant | `erp-epicor-consultant` | ที่ปรึกษา Epicor Kinetic / ERP10 (BAQ, BPM, Configurator, Web Service) |
| 2 | Consultant | `scm-consultant` | ที่ปรึกษา Supply Chain Management (MRP, Demand Planning, Inventory, PO/SO workflow) |
| 3 | Consultant | `production-planner` | วางแผนการผลิต: MPS, capacity planning, scheduling, shop floor execution |
| 4 | Consultant | `material-resource-planner` | MRP เชิงลึก: BOM, lot sizing, planning parameter, supply planning, exception management |
| 5 | Consultant | `scm-planning` | S&OP / IBP: demand planning, supply planning, inventory strategy ระดับ network, one number |
| 6 | Consultant | `scm-customer-collaboration` | ทำงานร่วมกับลูกค้า downstream: forecast sharing, CPFR, VMI, OTIF, EDI, joint governance |
| 7 | Consultant | `erp-consultant` | ERP ไม่ผูกยี่ห้อ: system selection, implementation lifecycle, fit/gap, master data, migration, adoption, rescue |
| 8 | Business | `business-strategist` | where to play / how to win, business model, growth option, การตัดสินใจเชิงกลยุทธ์ |
| 9 | Business | `financial-analyst` | P&L, cash flow, unit economics, budgeting, investment appraisal, financial modeling |
| 10 | Business | `sales-strategist` | ICP, sales process, pipeline metric, quota/comp, sales enablement |
| 11 | Business | `marketing-consultant` | positioning, funnel B2B/B2C, channel, CAC/LTV, marketing operations |
| 12 | Business | `operations-excellence` | process improvement ข้าม function, KPI tree, management cadence, continuous improvement |
| 13 | Business | `hr-organization` | org design, workforce planning, performance & reward, capability, change |
| 14 | Business | `product-manager` | product strategy, discovery, prioritization, roadmap, outcome metric |
| 15 | Business | `business-transformation-consultant` | transformation ระดับองค์กร: case for change, business/operating model, program design, leadership & change |
| 16 | Business | `digital-transformation-consultant` | digital maturity, customer journey, process digitalization, technology & data foundation, roadmap |
| 17 | Business | `ai-transformation-consultant` | AI opportunity assessment, data readiness, governance, pilot-to-scale, capability building |
| 18 | Business | `sme-consultant` | ที่ปรึกษาธุรกิจ SME: cash flow, margin, growth ที่ไม่กินเงินสด, systemization, คนแรกๆ, เจ้าของทำงานบนธุรกิจ |
| 19 | Software Engineering | `system-analyst` | เก็บและเขียน requirement จากธุรกิจให้ตรวจได้ พร้อม business rule, NFR, traceability |
| 20 | Software Engineering | `planner` | แปลง requirement เป็นแผนงานที่มี dependency order และ acceptance criteria ไม่เขียนโค้ด |
| 21 | Software Engineering | `software-architect` | ออกแบบ boundary, module, trade-off และบันทึกเป็น ADR |
| 22 | Software Engineering | `risk-manager` | ระบุ ประเมิน และติดตาม risk ของโปรเจกต์ พร้อม response และ owner |
| 23 | Software Engineering | `frontend-engineer` | ลงมือเขียน UI: component, state, accessibility, performance, testing |
| 24 | Software Engineering | `backend-engineer` | ลงมือเขียน API/service: contract, business logic, transaction, observability |
| 25 | Software Engineering | `code-reviewer` | รีวิวโค้ดแบบ read-only หา bug, security, spec alignment รายงานเฉพาะที่ยืนยันได้ |
| 26 | Software Engineering | `code-improver` | refactor และปรับปรุงโค้ดโดยไม่เปลี่ยน behavior ภายนอก |
| 27 | Software Engineering | `code-cleaner` | ลบ dead code, unused dependency, stale artifact โดยพิสูจน์ก่อนลบ |
| 28 | Software Engineering | `qa-engineer` | ออกแบบ test strategy, test case, edge case และรายงาน bug ที่ reproduce ได้ |
| 29 | Software Engineering | `bug-reviewer` | คัดกรอง bug report: reproduce, จัด severity/priority, หา duplicate ไม่แก้โค้ด |
| 30 | Software Engineering | `debugging-specialist` | หา root cause ของ bug ด้วยวิธีเชิงสืบสวน ส่งมอบ failing test และ fix ที่แนะนำ |
| 31 | Software Engineering | `devops-engineer` | CI/CD pipeline, deployment strategy, environment, monitoring, rollback |
| 32 | Software Engineering | `docker-specialist` | Dockerfile, multi-stage build, compose, image size, container security |
| 33 | Software Engineering | `sql-database-engineer` | RDBMS: query optimization, index, transaction, migration |
| 34 | Software Engineering | `nosql-database-engineer` | NoSQL: access-pattern-first modeling, partition key, consistency |
| 35 | Software Engineering | `table-schema-designer` | ออกแบบ schema จากภาษาธุรกิจ: entity, naming, constraint, migration path |
| 36 | Software Engineering | `security-engineer` | ตรวจช่องโหว่แบบ OWASP, authn/authz, secret, dependency audit, threat modeling |
| 37 | Software Engineering | `git-platform-specialist` | Git, branching strategy, PR/MR workflow และ CI config บน GitLab / GitHub |
| 38 | Creative | `creative-director` | คุมทิศทางและคุณภาพงานสร้างสรรค์: brief, concept selection, feedback, consistency ไม่ผลิตเอง |
| 39 | Creative | `idea-generator` | ระดมไอเดียอย่างเป็นระบบ: reframe, SCAMPER/analogy/constraint, cluster, shortlist ไม่ตัดสินเอง |
| 40 | Creative | `copywriter` | copy เพื่อให้คนทำ: headline, landing page, ad, email, CTA, A/B variant |
| 41 | Creative | `storyteller` | เรื่องเล่าที่มีคนต้องการ สิ่งขวาง และการเปลี่ยนแปลง: brand/customer/founder story |
| 42 | Creative | `content-writer` | long-form: blog, article, newsletter จาก research → outline → draft → edit พร้อม SEO พื้นฐาน |
| 43 | Creative | `script-writer` | บทสำหรับพูดและเห็น: วิดีโอสั้น/ยาว, podcast, presentation, hook, timing, visual direction |
| 44 | Creative | `brand-identity-designer` | ระบบตัวตนแบรนด์: platform, naming, voice, visual direction brief, guideline |
| 45 | Creative | `visual-concept-designer` | concept ภาพ: composition, color, typography direction, image prompt, design critique |
| 46 | Creative | `ux-writer` | ข้อความใน product: microcopy, error, empty state, onboarding, glossary, accessibility, localization |
| 47 | Creative | `social-media-creator` | content ต่อ platform: hook, caption, pillar, calendar, repurpose, community, analytics |
| 48 | Research | `research-planner` | ตั้งคำถามและออกแบบการวิจัย: question, hypothesis, method, source plan, evidence standard, stopping rule |
| 49 | Research | `literature-reviewer` | ทบทวนวรรณกรรมอย่างเป็นระบบ: search, screening, quality grading, synthesis matrix, gap |
| 50 | Research | `fact-checker` | ตรวจ claim ถึงแหล่งต้นทาง: claim extraction, source tracing, verdict scale, evidence trail |
| 51 | Research | `data-researcher` | หาและประเมินสถิติ/dataset: definition, methodology, comparability, limitation, metadata |
| 52 | Research | `market-researcher` | วิจัยตลาด: นิยาม, TAM/SAM/SOM ทั้ง top-down/bottom-up, trend, competitor, segment |
| 53 | Research | `user-researcher` | วิจัยผู้ใช้: interview, survey, usability test, synthesis, persona/journey, ethics |
| 54 | Research | `technical-researcher` | ประเมินเทคโนโลยีจาก docs/spec/code/benchmark: comparison matrix, risk, spike design |
| 55 | Research | `academic-writer` | เขียนงานวิชาการ: IMRaD, argument, hedging, citation style, figure ไม่แต่งข้อมูล |
| 56 | Research | `research-synthesizer` | รวมหลักฐานหลายแหล่ง: appraisal, triangulation, confidence level, executive summary |
| 57 | Research | `citation-manager` | ตรวจและจัดการอ้างอิง: style, การมีอยู่, metadata, quote accuracy, audit report |
| 58 | Life-style | `personal-finance-coach` | การเงินส่วนบุคคล: budgeting, emergency fund, debt, saving goal, หลักการลงทุน (ไม่แนะนำสินทรัพย์รายตัว) |
| 59 | Life-style | `fitness-coach` | ออกกำลังกาย: assessment, program design, form, progression, recovery, adherence |
| 60 | Life-style | `nutrition-advisor` | โภชนาการทั่วไป: หลักการ, meal planning ในชีวิตจริง, label, eating behavior (ไม่ใช่ clinical) |
| 61 | Life-style | `sleep-wellness-advisor` | การนอนและความเครียด: circadian, sleep hygiene, ปัญหาทั่วไป, red flag ที่ต้องพบแพทย์ |
| 62 | Life-style | `habit-coach` | สร้าง/เลิกนิสัย: habit loop, cue/friction design, tracking, relapse plan |
| 63 | Life-style | `time-management-coach` | เวลาและพลังงานระดับบุคคล: priority, energy mapping, planning rhythm, focus, boundary |
| 64 | Life-style | `learning-coach` | เรียนทักษะใหม่: goal design, retrieval/spacing/deliberate practice, resource, plateau |
| 65 | Life-style | `travel-planner` | วางแผนเดินทาง: trip design, itinerary/pacing, budget, logistics, safety & document checklist |
| 66 | Life-style | `home-organizer` | จัดบ้าน: declutter, zoning, storage, maintenance routine, การอยู่ร่วมกัน |
| 67 | Life-style | `relationship-communication-coach` | สื่อสารในความสัมพันธ์: listening, I-statement, de-escalation, boundary (ไม่ใช่ therapy) |
| 68 | Productivity | `meeting-summarizer` | สรุปประชุมจาก transcript: decision, action item (owner/due), open question, follow-up draft |
| 69 | Productivity | `email-drafter` | ร่างอีเมลในเสียงของผู้ส่ง: single ask, tone ต่อผู้รับ, reply/follow-up/decline ไม่ส่งเอง |
| 70 | Productivity | `note-organizer` | จัดโน้ตดิบเป็นระบบเบาที่สุด: clarify, structure, tag/link, consolidate ไม่ลบต้นฉบับ |
| 71 | Productivity | `task-prioritizer` | จัดลำดับงานรายวัน/สัปดาห์: impact/urgency/effort/dependency, Today/Week/Later, กัน overcommit |
| 72 | Productivity | `document-summarizer` | สรุปเอกสารยาวหลายระดับ: key point พร้อม page ref, แยก fact/ความเห็น, ระบุสิ่งที่ตัดออก |
| 73 | Productivity | `presentation-builder` | message → storyline → slide outline: title เป็น takeaway, speaker note, timing, visual brief |
| 74 | Productivity | `spreadsheet-helper` | โครงตาราง, สูตรพร้อมคำอธิบาย, pivot, data cleaning/validation, debugging (Excel/Sheets) |
| 75 | Productivity | `calendar-planner` | จัดตาราง: block ตาม priority, buffer/travel, meeting hygiene, ตรวจชน ไม่จองเอง |
| 76 | Productivity | `translation-assistant` | แปลไทย↔อังกฤษ: ความหมาย/register/localize, glossary, back-check, translator's note |
| 77 | Productivity | `decision-helper` | จัดโครงการตัดสินใจ: ทางเลือก, เกณฑ์+น้ำหนัก, uncertainty, pre-mortem, bias check ไม่ตัดสินแทน |

### Consultant

- `consultant/erp-epicor-consultant` — ที่ปรึกษา Epicor Kinetic / ERP10 (BAQ, BPM, Configurator, Web Service)
- `consultant/scm-consultant` — ที่ปรึกษา Supply Chain Management (MRP, Demand Planning, Inventory, PO/SO workflow)
- `consultant/production-planner` — วางแผนการผลิต: MPS, capacity planning, scheduling, shop floor execution
- `consultant/material-resource-planner` — MRP เชิงลึก: BOM, lot sizing, planning parameter, supply planning, exception management
- `consultant/scm-planning` — S&OP / IBP: demand planning, supply planning, inventory strategy ระดับ network, one number
- `consultant/scm-customer-collaboration` — ทำงานร่วมกับลูกค้า downstream: forecast sharing, CPFR, VMI, OTIF, EDI, joint governance
- `consultant/erp-consultant` — ERP ไม่ผูกยี่ห้อ: system selection, implementation lifecycle, fit/gap, master data, migration, adoption, rescue

### Business

- `business/business-strategist` — where to play / how to win, business model, growth option, การตัดสินใจเชิงกลยุทธ์
- `business/financial-analyst` — P&L, cash flow, unit economics, budgeting, investment appraisal, financial modeling
- `business/sales-strategist` — ICP, sales process, pipeline metric, quota/comp, sales enablement
- `business/marketing-consultant` — positioning, funnel B2B/B2C, channel, CAC/LTV, marketing operations
- `business/operations-excellence` — process improvement ข้าม function, KPI tree, management cadence, continuous improvement
- `business/hr-organization` — org design, workforce planning, performance & reward, capability, change
- `business/product-manager` — product strategy, discovery, prioritization, roadmap, outcome metric
- `business/business-transformation-consultant` — transformation ระดับองค์กร: case for change, business/operating model, program design, leadership & change
- `business/digital-transformation-consultant` — digital maturity, customer journey, process digitalization, technology & data foundation, roadmap
- `business/ai-transformation-consultant` — AI opportunity assessment, data readiness, governance, pilot-to-scale, capability building
- `business/sme-consultant` — ที่ปรึกษาธุรกิจ SME: cash flow, margin, growth ที่ไม่กินเงินสด, systemization, คนแรกๆ, เจ้าของทำงานบนธุรกิจ

### Software Engineering

- `software-engineering/system-analyst` — เก็บและเขียน requirement จากธุรกิจให้ตรวจได้ พร้อม business rule, NFR, traceability
- `software-engineering/planner` — แปลง requirement เป็นแผนงานที่มี dependency order และ acceptance criteria ไม่เขียนโค้ด
- `software-engineering/software-architect` — ออกแบบ boundary, module, trade-off และบันทึกเป็น ADR
- `software-engineering/risk-manager` — ระบุ ประเมิน และติดตาม risk ของโปรเจกต์ พร้อม response และ owner
- `software-engineering/frontend-engineer` — ลงมือเขียน UI: component, state, accessibility, performance, testing
- `software-engineering/backend-engineer` — ลงมือเขียน API/service: contract, business logic, transaction, observability
- `software-engineering/code-reviewer` — รีวิวโค้ดแบบ read-only หา bug, security, spec alignment รายงานเฉพาะที่ยืนยันได้
- `software-engineering/code-improver` — refactor และปรับปรุงโค้ดโดยไม่เปลี่ยน behavior ภายนอก
- `software-engineering/code-cleaner` — ลบ dead code, unused dependency, stale artifact โดยพิสูจน์ก่อนลบ
- `software-engineering/qa-engineer` — ออกแบบ test strategy, test case, edge case และรายงาน bug ที่ reproduce ได้
- `software-engineering/bug-reviewer` — คัดกรอง bug report: reproduce, จัด severity/priority, หา duplicate ไม่แก้โค้ด
- `software-engineering/debugging-specialist` — หา root cause ของ bug ด้วยวิธีเชิงสืบสวน ส่งมอบ failing test และ fix ที่แนะนำ
- `software-engineering/devops-engineer` — CI/CD pipeline, deployment strategy, environment, monitoring, rollback
- `software-engineering/docker-specialist` — Dockerfile, multi-stage build, compose, image size, container security
- `software-engineering/sql-database-engineer` — RDBMS: query optimization, index, transaction, migration
- `software-engineering/nosql-database-engineer` — NoSQL: access-pattern-first modeling, partition key, consistency
- `software-engineering/table-schema-designer` — ออกแบบ schema จากภาษาธุรกิจ: entity, naming, constraint, migration path
- `software-engineering/security-engineer` — ตรวจช่องโหว่แบบ OWASP, authn/authz, secret, dependency audit, threat modeling
- `software-engineering/git-platform-specialist` — Git, branching strategy, PR/MR workflow และ CI config บน GitLab / GitHub

### Creative

- `creative/creative-director` — คุมทิศทางและคุณภาพงานสร้างสรรค์: brief, concept selection, feedback, consistency ไม่ผลิตเอง
- `creative/idea-generator` — ระดมไอเดียอย่างเป็นระบบ: reframe, SCAMPER/analogy/constraint, cluster, shortlist ไม่ตัดสินเอง
- `creative/copywriter` — copy เพื่อให้คนทำ: headline, landing page, ad, email, CTA, A/B variant
- `creative/storyteller` — เรื่องเล่าที่มีคนต้องการ สิ่งขวาง และการเปลี่ยนแปลง: brand/customer/founder story
- `creative/content-writer` — long-form: blog, article, newsletter จาก research → outline → draft → edit พร้อม SEO พื้นฐาน
- `creative/script-writer` — บทสำหรับพูดและเห็น: วิดีโอสั้น/ยาว, podcast, presentation, hook, timing, visual direction
- `creative/brand-identity-designer` — ระบบตัวตนแบรนด์: platform, naming, voice, visual direction brief, guideline
- `creative/visual-concept-designer` — concept ภาพ: composition, color, typography direction, image prompt, design critique
- `creative/ux-writer` — ข้อความใน product: microcopy, error, empty state, onboarding, glossary, accessibility, localization
- `creative/social-media-creator` — content ต่อ platform: hook, caption, pillar, calendar, repurpose, community, analytics

### Research

- `research/research-planner` — ตั้งคำถามและออกแบบการวิจัย: question, hypothesis, method, source plan, evidence standard, stopping rule
- `research/literature-reviewer` — ทบทวนวรรณกรรมอย่างเป็นระบบ: search, screening, quality grading, synthesis matrix, gap
- `research/fact-checker` — ตรวจ claim ถึงแหล่งต้นทาง: claim extraction, source tracing, verdict scale, evidence trail
- `research/data-researcher` — หาและประเมินสถิติ/dataset: definition, methodology, comparability, limitation, metadata
- `research/market-researcher` — วิจัยตลาด: นิยาม, TAM/SAM/SOM ทั้ง top-down/bottom-up, trend, competitor, segment
- `research/user-researcher` — วิจัยผู้ใช้: interview, survey, usability test, synthesis, persona/journey, ethics
- `research/technical-researcher` — ประเมินเทคโนโลยีจาก docs/spec/code/benchmark: comparison matrix, risk, spike design
- `research/academic-writer` — เขียนงานวิชาการ: IMRaD, argument, hedging, citation style, figure ไม่แต่งข้อมูล
- `research/research-synthesizer` — รวมหลักฐานหลายแหล่ง: appraisal, triangulation, confidence level, executive summary
- `research/citation-manager` — ตรวจและจัดการอ้างอิง: style, การมีอยู่, metadata, quote accuracy, audit report

### Life-style

- `life-style/personal-finance-coach` — การเงินส่วนบุคคล: budgeting, emergency fund, debt, saving goal, หลักการลงทุน (ไม่แนะนำสินทรัพย์รายตัว)
- `life-style/fitness-coach` — ออกกำลังกาย: assessment, program design, form, progression, recovery, adherence
- `life-style/nutrition-advisor` — โภชนาการทั่วไป: หลักการ, meal planning ในชีวิตจริง, label, eating behavior (ไม่ใช่ clinical)
- `life-style/sleep-wellness-advisor` — การนอนและความเครียด: circadian, sleep hygiene, ปัญหาทั่วไป, red flag ที่ต้องพบแพทย์
- `life-style/habit-coach` — สร้าง/เลิกนิสัย: habit loop, cue/friction design, tracking, relapse plan
- `life-style/time-management-coach` — เวลาและพลังงานระดับบุคคล: priority, energy mapping, planning rhythm, focus, boundary
- `life-style/learning-coach` — เรียนทักษะใหม่: goal design, retrieval/spacing/deliberate practice, resource, plateau
- `life-style/travel-planner` — วางแผนเดินทาง: trip design, itinerary/pacing, budget, logistics, safety & document checklist
- `life-style/home-organizer` — จัดบ้าน: declutter, zoning, storage, maintenance routine, การอยู่ร่วมกัน
- `life-style/relationship-communication-coach` — สื่อสารในความสัมพันธ์: listening, I-statement, de-escalation, boundary (ไม่ใช่ therapy)

### Productivity

- `productivity/meeting-summarizer` — สรุปประชุมจาก transcript: decision, action item (owner/due), open question, follow-up draft
- `productivity/email-drafter` — ร่างอีเมลในเสียงของผู้ส่ง: single ask, tone ต่อผู้รับ, reply/follow-up/decline ไม่ส่งเอง
- `productivity/note-organizer` — จัดโน้ตดิบเป็นระบบเบาที่สุด: clarify, structure, tag/link, consolidate ไม่ลบต้นฉบับ
- `productivity/task-prioritizer` — จัดลำดับงานรายวัน/สัปดาห์: impact/urgency/effort/dependency, Today/Week/Later, กัน overcommit
- `productivity/document-summarizer` — สรุปเอกสารยาวหลายระดับ: key point พร้อม page ref, แยก fact/ความเห็น, ระบุสิ่งที่ตัดออก
- `productivity/presentation-builder` — message → storyline → slide outline: title เป็น takeaway, speaker note, timing, visual brief
- `productivity/spreadsheet-helper` — โครงตาราง, สูตรพร้อมคำอธิบาย, pivot, data cleaning/validation, debugging (Excel/Sheets)
- `productivity/calendar-planner` — จัดตาราง: block ตาม priority, buffer/travel, meeting hygiene, ตรวจชน ไม่จองเอง
- `productivity/translation-assistant` — แปลไทย↔อังกฤษ: ความหมาย/register/localize, glossary, back-check, translator's note
- `productivity/decision-helper` — จัดโครงการตัดสินใจ: ทางเลือก, เกณฑ์+น้ำหนัก, uncertainty, pre-mortem, bias check ไม่ตัดสินแทน
