# agent-templates

คลังเก็บ Agent เฉพาะทางแบบ reusable — นิยาม persona, knowledge และ guardrail ของแต่ละ agent ไว้ที่เดียว แล้วนำไปใช้กับ platform ใดก็ได้ในภายหลัง

## หมวดหมู่

| หมวด | โฟลเดอร์ | บทบาท |
|------|----------|-------|
| Consultant | `agents/consultant/` | ให้คำปรึกษาเชิงความรู้ในโดเมนเฉพาะ ตอบคำถาม วิเคราะห์ แนะนำแนวทาง |
| Software Engineering | `agents/software-engineering/` | ลงมือทำงานเขียนโค้ด แก้บั๊ก รีวิว และปรับปรุงระบบ |
| Productivity | `agents/productivity/` | ช่วยงานทั่วไป เช่น สรุปเอกสาร จัดการงาน ร่างข้อความ |

## โครงสร้าง

```
agent-templates/
├── README.md
├── agents/
│   ├── consultant/
│   │   ├── erp-epicor-consultant/
│   │   │   └── core.md
│   │   └── scm-consultant/
│   │       └── core.md
│   ├── software-engineering/
│   └── productivity/
└── examples/
```

- แต่ละ agent อยู่ในโฟลเดอร์ของตัวเอง ใต้หมวดที่เกี่ยวข้อง
- `core.md` คือไฟล์หลักของ agent เก็บ persona, scope ความเชี่ยวชาญ, reasoning framework และ guardrail
- `core.md` เขียนแบบ platform-agnostic ยังไม่ผูกกับ Claude Code, OpenAI, n8n หรือ platform อื่น
- `examples/` สำหรับตัวอย่างการนำ agent ไปใช้งานจริงในอนาคต

## Agents ปัจจุบัน

- `consultant/erp-epicor-consultant` — ที่ปรึกษา Epicor Kinetic / ERP10 (BAQ, BPM, Configurator, Web Service)
- `consultant/scm-consultant` — ที่ปรึกษา Supply Chain Management (MRP, Demand Planning, Inventory, PO/SO workflow)
