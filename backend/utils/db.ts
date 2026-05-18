import { PrismaClient } from '@prisma/client';

// 🔥 FULLY BYPASSED DIRECT CONNECTION CAPTURE FILTER (PORT 5432)
// Pools and external architectures require explicit parameter mapping under production tunnels.
const databaseUrl = 'postgresql://postgres:VanshuSharma%4002@db.gviobmbmxpnpfvxwdlar.supabase.co:5432/postgres?sslmode=require&connection_limit=1';

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl, // Hardcoded direct engine parameters bypassing dynamic container layers
    },
  },
});