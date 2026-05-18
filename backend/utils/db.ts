import { PrismaClient } from '@prisma/client';

// 🔥 Standard runtime configuration reading from Render panel variables directly
export const prisma = new PrismaClient();