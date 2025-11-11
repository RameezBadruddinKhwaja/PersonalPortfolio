Prisma setup and migrations

1. Install Prisma (dev dependency):

   npm install -D prisma @prisma/client

2. Set DATABASE_URL in your environment (local .env):

   DATABASE_URL="postgresql://user:password@host:5432/dbname"

3. Generate Prisma client:

   npx prisma generate

4. Create and run a migration:

   npx prisma migrate dev --name init

5. Use Prisma client in your backend code:

   import { PrismaClient } from '@prisma/client'
   const prisma = new PrismaClient()

Notes:
- For Supabase, the DATABASE_URL is provided in the Supabase project settings.
- Do not commit your .env with secrets.
