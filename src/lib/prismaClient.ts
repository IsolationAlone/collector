import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    result: {
      item: {
        itemLength: {
          needs: { quotes: true },
          compute(item) {
            return item.quotes.length;
          },
        },
      },
    },
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
