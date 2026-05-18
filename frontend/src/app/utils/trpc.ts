import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../../backend/server'; // Apne folder path ke hisab se match kar lena

export const trpc = createTRPCReact<AppRouter>();

// 🔥 LIVE ENVIRONMENT LINKS BRIDGE FILTER
export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Agar browser me chal raha hai aur hum local production check kar rahe hain
    if (process.env.NEXT_PUBLIC_API_URL) {
      return process.env.NEXT_PUBLIC_API_URL;
    }
    // Agar browser variable miss ho jaye toh fallback dynamic internet url
    return 'https://corestack-backend.onrender.com';
  }
  
  // SSR (Server Side Rendering) handle karne ke liye fallback
  return process.env.NEXT_PUBLIC_API_URL || 'https://corestack-backend.onrender.com';
}