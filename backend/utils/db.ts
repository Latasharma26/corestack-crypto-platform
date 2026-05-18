import { PrismaClient } from '@prisma/client';

// 🔥 FIXED SUPABASE POOLER USERNAME AUTH OVERRIDE
const databaseUrl = 'postgres://postgres.gviobmbmxpnpfvxwdlar:VanshuSharma%4002@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true';

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});