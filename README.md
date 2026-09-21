# agent-templates

คลังเก็บ Agent เฉพาะทางแบบ reusable — นิยาม persona, knowledge และ guardrail ของแต่ละ agent ไว้ที่เดียว แล้วนำไปใช้กับ platform ใดก็ได้ในภายหลัง

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
├── agents/
│   ├── consultant/
│   │   ├── erp-epicor-consultant/
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
