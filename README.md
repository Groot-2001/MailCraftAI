# MailCraftAI
AI-powered Email Generation API (NestJS + Perplexity)

MailCraftAI is a production-ready backend API that converts raw human input into professionally written emails using AI.
It is designed for engineering teams, customer support, corporate communication, and automation workflows.

This API is powered by **NestJS**, **PostgreSQL**, and **Perplexity’s sonar-pro model**, and is deployed on Railway.

---

## 🚀 Live API Endpoint

**Base URL:**
[https://mailcraftai-production.up.railway.app](https://mailcraftai-production.up.railway.app)


**Main Endpoint:**
POST /api/email/generate


---

## 🧠 What MailCraftAI Does

You send:

- A raw message (problem, context, note)
- Email type (follow-up, client communication, incident report, etc.)
- Tone (formal, polite, urgent, etc.)
- Target audience (Bank Tech Team, Corporate Clients, Manager, etc.)

MailCraftAI returns:

- A polished **subject line**
- A professionally formatted **email body**

Perfect for automation, integrations, and productivity tools.

---

## 📦 Example Request

```bash
curl --location 'https://mailcraftai-production.up.railway.app/api/email/generate' \
--header 'Content-Type: application/json' \
--data '{
  "raw_message": "we are facing delays due to server restart",
  "type": "client_communication",
  "tone": "polite",
  "target_audience": "Corporate Clients"
}'
```

### ✔ Example Response

```bash
{
  "subject": "Update: Temporary Delays Due to Server Restart",
  "body": "Dear Corporate Clients,\n\nWe would like to inform you that we are currently experiencing delays as a result of a scheduled server restart. Our team is actively monitoring the process to ensure that normal operations resume as quickly as possible.\n\nWe apologize for any inconvenience this may cause and appreciate your patience. Further updates will be shared if there are any significant changes.\n\nBest regards,\nMailCraftAI"
}
```
### 🧰 Tech Stack

- Node.js
- NestJS
- TypeORM
- PostgreSQL
- Perplexity AI (sonar-pro model)

### 🔐 Environment Variables
<p>To run locally, create a .env file:</p>

```bash
PORT=3000
PPLX_API_KEY=your_perplexity_key

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=yourpassword
DB_NAME=youdbname
```

### 🧪 Run Locally

```bash
git clone https://github.com/<your-username>/MailCraftAI
cd MailCraftAI
npm install
npm run start:dev
```

### Local API:

```bash

http://localhost:3000/api/email/generate
```

### 🤝 Contributing

Pull requests are welcome.
Follow clean coding standards and include detailed descriptions.

### 📄 License

MIT License.

### 🌟 Author

**Shiva Silmawala**
Software Engineer | Backend Development | NestJS | AI Integrations

Passionate about building scalable APIs, AI-driven automation tools, and production-grade backend systems.