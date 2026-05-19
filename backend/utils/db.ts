import { PrismaClient } from '@prisma/client';

// 🔥 FIXED SUPABASE TENANT IDENTIFIER USERNAME INJECTION
const databaseUrl = 'postgres://postgres:VanshuSharma%4002@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require';
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});