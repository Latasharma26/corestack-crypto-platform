import { PrismaClient } from '@prisma/client';

// 🔥 FREE SHARED POOLER WITH TARGET TENANT USERNAME ROUTING
const databaseUrl = 'postgres://postgres.gviobmbmxpnpfvxwdlar:VanshuSharma%4002@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1';

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});