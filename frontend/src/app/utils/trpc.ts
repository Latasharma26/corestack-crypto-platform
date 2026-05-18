import { createTRPCReact } from '@trpc/react-query';
// Hum backend ke types ko bina actual code import kiye access kar rahe hain!
import type { AppRouter } from '../../../../backend/server';

export const trpc = createTRPCReact<AppRouter>();