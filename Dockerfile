FROM node:alpine
WORKDIR /usr/app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3333
RUN npx prisma migrate dev
CMD ["npm","run","dev"]