FROM node:alpine AS BUILD

WORKDIR /build

# Copy the rest of the application files
COPY . .

# Install the application dependencies
RUN yarn --prod --frozen-lockfile && \
    yarn add @nestjs/cli && \
    yarn build && \
    yarn remove @nestjs/cli


# Final image
FROM node:alpine AS SERVE

WORKDIR /app

COPY --from=BUILD /build/dist/src ./api
COPY --from=BUILD /build/node_modules ./node_modules

RUN addgroup --system api && \
    adduser --system -G api api && \
    chown -R api:api .

ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

USER api

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/v1/health/liveness || exit 1

ENTRYPOINT [ "node", "./api/main" ]