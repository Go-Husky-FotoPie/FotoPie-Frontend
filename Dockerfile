FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG BACKEND_API
ARG Get_Synonyms_API_Prefix

ENV BACKEND_API=${ACKEND_API}
ENV Get_Synonyms_API_Prefix=${Get_Synonyms_API_Prefix}

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]