FROM node:17-alpine as dependencies
WORKDIR /towns
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

ENV NODE_ENV production
FROM node:17-alpine as builder
WORKDIR /towns
COPY . .
COPY --from=dependencies /towns/node_modules ./node_modules
RUN yarn build

FROM node:17-alpine as runner
WORKDIR /towns
COPY --from=builder /towns/public ./public
COPY --from=builder /towns/.next ./.next
COPY --from=builder /towns/node_modules ./node_modules
COPY --from=builder /towns/package.json ./package.json
COPY --from=builder /towns/init ./init
COPY --from=builder /towns/tsconfig.json ./tsconfig.json
COPY --from=builder /towns/.env.production ./.env.production

EXPOSE 3000
CMD yarn build-db ; yarn start