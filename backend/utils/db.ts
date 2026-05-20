import { PrismaClient } from '@prisma/client';

// 🔥 FULLY ENCODED & CORRECTED MULTI-TENANT POOLER FOR PRISMA v6
const databaseUrl = 'postgres://postgres.gviobmbmxpnpfvxwdlar:VanshuSharma%4002@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1';

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});