FROM node:alpine AS BUILD

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install --force

# Copy the rest of the application files
COPY . .

# Install the NestJS CLI and build the application, then remove the CLI
RUN npm run build
    

FROM node:alpine AS SERVE

WORKDIR /usr/src/app

COPY --from=BUILD /usr/src/app ./

RUN addgroup --system api && \
    adduser --system -G api api && \
    chown -R api:api .

ENV HOST=0.0.0.0
ENV PORT=3000
#ENV NODE_PATH=/app/node_modules
EXPOSE 3000

USER api

# HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
#   CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/v1/health/liveness || exit 1

ENTRYPOINT [ "node", "./api/main" ]