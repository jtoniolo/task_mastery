FROM node:current-alpine AS BUILD

WORKDIR /app
COPY ./dist/task_mastery_client task_mastery_client/
COPY ./node_modules task_mastery_client/node_modules
# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
#RUN npm --prefix ./ui --omit=dev install

FROM node:current-alpine AS SERVE

WORKDIR /app
COPY --from=BUILD /app/task_mastery_client ./task_mastery_client

RUN addgroup --system ui && \
    adduser --system -G ui ui && \
    chown -R ui:ui ./task_mastery_client

EXPOSE 4200
ENV HOST=0.0.0.0
ENV PORT=4200
USER ui
CMD [ "node", "task_mastery_client/server/server.mjs" ]