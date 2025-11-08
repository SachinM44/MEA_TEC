require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

console.log('Frontend URL:', process.env.FRONTEND_URL);

app.use(cors({ origin: process.env.FRONTEND_URL })); 
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});