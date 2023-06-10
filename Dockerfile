
#1 - Base image for the next stages
FROM node:19.2-alpine as base
WORKDIR /app
COPY src /app/src
COPY cucumber.js .
COPY generate-report.js .
COPY package.json .
COPY tsconfig.json .
COPY tsconfig.prod.json .


#2 - Install dependencies and compile TS files.
FROM base as dependencies
RUN yarn
RUN yarn run build

#4 - Run release
FROM base as release
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/dist ./dist
COPY --from=dependencies /app/tsconfig.json .
COPY --from=dependencies /app/tsconfig.prod.json .
COPY --from=dependencies /app/package.json .
COPY --from=dependencies /app/cucumber.js .
COPY --from=dependencies /app/generate-report.js .
COPY --from=dependencies /app/src/features/specs ./src/features/specs
ENTRYPOINT ["yarn", "run", "start"]