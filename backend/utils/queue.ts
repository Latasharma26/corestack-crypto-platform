import { queue } from 'async';
import { prisma } from './db.js'; // <-- Live Prisma Client Client Connection

interface TaskPayload {
  jobId: string; // Real DB UUID map karne ke liye
  taskTitle: string;
  userName: string;
  dispatchedAt: string;
}

export const automationQueue = queue<TaskPayload, any>(async (task, callback) => {
  console.log(`🤖 [Background Worker] Processing Task ID: ${task.jobId}`);
  
  try {
    // 1. Database me status ko 'QUEUED' se badalkar 'PROCESSING' karna
    await prisma.backgroundJob.update({
      where: { id: task.jobId },
      data: { status: 'PROCESSING' }
    });

    // Exactly 5 Seconds Complex Loop simulation
    await new Promise((resolve) => setTimeout(resolve, 5000));
    
    // 2. Task khatam hone par status ko 'COMPLETED' karna aur timestamp lagana
    await prisma.backgroundJob.update({
      where: { id: task.jobId },
      data: { 
        status: 'COMPLETED',
        completedAt: new Date()
      }
    });

    console.log(`✅ [Database Sync Success]: Job ${task.jobId} marked as COMPLETED in Supabase!`);
  } catch (error) {
    console.error(`❌ Worker Database Update Error for Job ${task.jobId}:`, error);
    
    // Fail hone par status FAILED save karna
    await prisma.backgroundJob.update({
      where: { id: task.jobId },
      data: { status: 'FAILED' }
    }).catch(() => {});
  }

  callback();
}, 1);