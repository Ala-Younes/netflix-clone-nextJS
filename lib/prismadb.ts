import { PrismaClient } from "@prisma/client";

// Global files are not affected by hot reloading...
// if its just new PrismaClient() each time we reload it will create a new
// client and we do not want that
const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prismadb = client;

export default client;
