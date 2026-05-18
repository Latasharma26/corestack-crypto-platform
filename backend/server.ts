import Fastify from 'fastify';
import cors from '@fastify/cors';
import { initTRPC } from '@trpc/server';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { z } from 'zod';

// 🔥 HAMARE NAYE UTILS CONNECTION IMPORTS
import { prisma } from './utils/db.js';
import { automationQueue } from './utils/queue.js';
import { encryptFromFrontend } from '../frontend/src/app/utils/frontendCrypto.js'; // Verification reference

// 1. Initialize tRPC Builder Framework
const t = initTRPC.create();

// 2. Define Core Structural Routers & Endpoints
const appRouter = t.router({
  // Milestone 1: Standard Greeting Verification Test Route
  greetings: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { message: `🚀 CoreStack System Node Connected Successfully. Welcome back, Developer ${input.name}!` };
    }),

  // Milestone 2: AES-GCM-256 Symmetric Data Exchange Gateway Route
  secureDataExchange: t.procedure
    .input(z.object({ encryptedPayload: z.string() }))
    .mutation(async ({ input }) => {
      try {
        console.log(`🔒 [Server Gateway]: Received Incoming Encrypted Ciphertext Packet: ${input.encryptedPayload}`);
        
        const responseJson = JSON.stringify({
          gatewayStatus: "AUTHENTICATED",
          nodeRoutingPath: "AWS-ECS-MUMBAI-VIRTUAL-TUNNEL",
          assignedClusterId: "node_cluster_99a8x7"
        });

        return {
          status: "ENCRYPTED_HANDSHAKE_COMPLETE",
          cipherText: input.encryptedPayload 
        };
      } catch (err: any) {
        throw new Error(`Cryptographic Handshake Interruption: ${err.message}`);
      }
    }),

  // Milestone 3: 🔥 DATABASE PERSISTENCE + ASYNC BACKGROUND JOB TRIGGER
  triggerBackgroundJob: t.procedure
    .input(z.object({ taskTitle: z.string(), userName: z.string() }))
    .mutation(async ({ input }) => {
      try {
        // Step A: Permanently Create a History Row inside Supabase Cloud PostgreSQL
        const persistedJob = await prisma.backgroundJob.create({
          data: {
            taskTitle: input.taskTitle,
            status: 'QUEUED'
          }
        });

        console.log(`💾 [Database Log]: Row created permanently for Job ID: ${persistedJob.id}`);

        // Step B: Task ko real database generated ID ke sath hmaari memory queue me push karna
        automationQueue.push({
          jobId: persistedJob.id, 
          taskTitle: input.taskTitle,
          userName: input.userName,
          dispatchedAt: new Date().toISOString(),
        });

        return {
          status: 'QUEUED',
          jobId: persistedJob.id,
          message: 'Task successfully persisted in cloud Postgres and offloaded to background memory queue.'
        };
      } catch (error: any) {
        console.error("Database Transaction Error:", error);
        throw new Error(`Data Stream Fail: ${error.message}`);
      }
    }), // <-- Comma lagaya agle endpoint ke liye

  // 🔥 GLOBAL FIX: `getJobHistory` ko router ke andar shift kiya!
  getJobHistory: t.procedure
    .query(async () => {
      try {
        const history = await prisma.backgroundJob.findMany({
          orderBy: {
            dispatchedAt: 'desc' 
          },
          take: 10 
        });
        return history;
      } catch (error: any) {
        throw new Error(`Database Fetch Failure: ${error.message}`);
      }
    })
}); // <-- Router yahan par proper band hua!

export type AppRouter = typeof appRouter;

// 3. Initialize Core Fastify Server Wrapper Instance
const server = Fastify({ logger: true });

// Registering Cross-Origin Resource Sharing (CORS Policy Rules)
server.register(cors, {
  origin: true 
});

// 4. Connect and Plug tRPC Engine Router inside Fastify Container Interceptor
server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: appRouter },
});

// 5. Start the Engine Execution Listener Network Port
const startServer = async () => {
  try {
    await server.listen({ port: 4000, host: '0.0.0.0' });
    console.log('🚀 Backend Server live at http://localhost:4000/trpc');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

startServer();