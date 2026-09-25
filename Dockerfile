FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --force

COPY . .

# Prisma client
RUN npx prisma generate

# Supabase environment variables
ENV SUPABASE_URL="https://txiveqkgzocnxgmtgmpk.supabase.co"
ENV SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4aXZlcWtnem9jbnhnbXRnbXBrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDczOTc5MSwiZXhwIjoyMDk2MzE1NzkxfQ.5YX2OM_v71p_P-eN8TTyA90GlmDIOX14rfwMkWJNy9M"

RUN npm run build

CMD ["npm", "start"]


