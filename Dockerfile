FROM node:12.20.0-alpine

WORKDIR /app

COPY . ./

RUN npm install

EXPOSE 3000

ENV HOST=0.0.0.0
ENV NODE_ENV=production
ENV PORT=3000

RUN npm run build

CMD [ "npm", "run", "start" ]