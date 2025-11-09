import { timeStamp } from "console";
import { Request, Response, NextFunction } from "express";
require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

///adding the middleware 
app.use(cors({
 origin:process.env.FRONTEND_URL ,/// 
 Credential:true /// lide is i really need those cookies and all 
}))
app.use(express.json({limit:'10mb'})) //i wont accept more than this payload
app.use(express.urlencoded({extended:true}))

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/health', (req:Request, res:Response)=>{
  res.status(200).json({
    status:'ok',
    timeStamp: Date.now().toString()
  })
})

/// and need the global handler
app.use((err: Error, req:Request, res:Response, next: NextFunction)=>{
  console.log('error',Error)
  res.status(500).json({
    error:err.message || 'internal server error'
  })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(10); // here i can add the dalay to reduce the overload ddeplay 
});

