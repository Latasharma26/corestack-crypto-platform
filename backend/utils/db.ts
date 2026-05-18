import { PrismaClient } from '@prisma/client';

// 🔥 FULLY OPTIMIZED SUPABASE POOLER OVERRIDE WITH SUPAVISOR MOUNT ROUTING
const databaseUrl = 'postgres://postgres:VanshuSharma%4002@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require&supavisor=true';

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});