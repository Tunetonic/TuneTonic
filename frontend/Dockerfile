FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g expo-cli

RUN yarn

COPY . .

ENV PORT=19000

EXPOSE 19000

CMD ["yarn" , "run", "dev"]