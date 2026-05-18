import { PrismaClient } from '@prisma/client';

// 🔥 DIRECT IPv4 ENGINE CONNECTION ROUTING PARAMETERS
const databaseUrl = 'postgresql://postgres:VanshuSharma%4002@db.gviobmbmxpnpfvxwdlar.supabase.co:5432/postgres?sslmode=require&connection_limit=1';

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});