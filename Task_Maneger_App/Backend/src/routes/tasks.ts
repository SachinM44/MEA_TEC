const express = require('express');
const { authenticate } = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
import { Request, Response } from 'express';

const router = express.Router();
const prisma = new PrismaClient();

router.use(authenticate);

router.get('/', async (req: Request & { userId?: number }, res: Response) => {
  const tasks = await prisma.task.findMany({ where: { userId: req.userId! } });
  res.json(tasks);
});

router.post('/', async (req: Request & { userId?: number }, res: Response) => {
  const { title, description, status } = req.body;
  const task = await prisma.task.create({
    data: { title, description, status, userId: req.userId! },
  });
  res.status(201).json(task);
});

router.put('/:id', async (req: Request & { userId?: number }, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ error: 'Invalid id' });
  const taskId = parseInt(id);
  const { title, description, status } = req.body;
  const task = await prisma.task.update({
    where: { id: taskId, userId: req.userId! },
    data: { title, description, status },
  });
  res.json(task);
});

router.delete('/:id', async (req: Request & { userId?: number }, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ error: 'Invalid id' });
  const taskId = parseInt(id);
  await prisma.task.delete({ where: { id: taskId, userId: req.userId! } });
  res.status(204).send();
});

module.exports = router;