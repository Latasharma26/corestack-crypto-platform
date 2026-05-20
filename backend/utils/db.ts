import { PrismaClient } from '@prisma/client';

// 🔥 FREE SHARED IPv4 POOLER WITH TARGET TENANT INJECTION FOR PRISMA v6
const databaseUrl = 'postgresql://postgres:VanshuSharma@02 @db.gviobmbmxpnpfvxwdlar.supabase.co:5432/postgres';

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});