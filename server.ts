import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/register", (req, res) => {
    const { name, email, program } = req.body;
    console.log(`New registration: ${name} (${email}) for ${program}`);
    // In a real app, save to DB
    res.json({ success: true, message: "Registration successful! We will contact you soon." });
  });

  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    console.log(`New contact message from ${name} (${email}): ${message}`);
    // In a real app, save to DB or send email
    res.json({ success: true, message: "Message sent! Our team will get back to you." });
  });

  app.post("/api/sponsor", (req, res) => {
    const { companyName, contactName, email, tier } = req.body;
    console.log(`Sponsorship inquiry from ${companyName} (${contactName}): ${tier} tier`);
    res.json({ success: true, message: "Thank you for your interest in sponsoring Flight School! We will be in touch soon." });
  });

  app.post("/api/volunteer", (req, res) => {
    const { name, email, role, message } = req.body;
    console.log(`Volunteer application from ${name} (${email}) for role: ${role}`);
    res.json({ success: true, message: "Thank you for volunteering! Our team will contact you shortly." });
  });

  app.post("/api/donate", (req, res) => {
    const { amount, name, email } = req.body;
    console.log(`Donation of $${amount} received from ${name} (${email})`);
    res.json({ success: true, message: `Thank you for your generous donation of $${amount}!` });
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
