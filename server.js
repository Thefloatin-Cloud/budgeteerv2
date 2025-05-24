const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configure your email transport (use your real credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yourgmail@gmail.com', // replace with your Gmail
    pass: 'your-app-password'    // replace with your Gmail App Password
  }
});

app.post('/api/feature-request', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });
  try {
    await transporter.sendMail({
      from: 'yourgmail@gmail.com', // replace with your Gmail
      to: 'apoorvmane001@gmail.com',
      subject: 'Feature Request for Budgeteer',
      text: message
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));