import { PrismaClient } from '@prisma/client';

// 🔥 DIRECT CONNECTION POOLER OVERRIDE - BYPASSING DASHBOARD ERRORS
const databaseUrl = 'postgres://postgres:VanshuSharma%4002@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require';

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});