import { initTRPC } from "@trpc/server";
import { db } from "@/server/db";

export const createContext = async () => ({ db });

const t = initTRPC.context<Awaited<ReturnType<typeof createContext>>>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
