FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

ENV PORT=19000

EXPOSE 19000

CMD ["yarn" , "run", "dev"]