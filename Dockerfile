#first install all the dependencies

FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN corepack enable pnpm && corepack prepare pnpm@9 --activate
COPY package.json pnpm-lock.yaml ./ 
RUN pnpm i --frozen-lockfile

#build the app 

FROM node:20-alpine AS builder 
WORKDIR /app
RUN corepack enable pnpm && corepack prepare pnpm@9 --activate
COPY --from=deps /app/node_modules ./node_modules
COPY . . 
ENV NEXT_TELEMETRY_DISABLED=1
ENV DB_USER=placeholder
ENV DB_HOST=placeholder
ENV DB_NAME=placeholder
ENV DB_PASSWORD=placeholder
ENV DB_PORT=placeholder
ENV ACCESSTOKENSECRET=placeholder_value_atleast_thirty_characters_long
ENV DB_ROUNDS=12
ENV PG_POOL_MAX=10
ENV PG_POOL_TIMEOUT=30000

RUN pnpm build

#the main runner 
FROM node:20-alpine AS runner
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# run as a user not as the root so that attackers can't gain all access through vulnerablities
USER nextjs
EXPOSE 3000
CMD [ "node" , "server.js" ]