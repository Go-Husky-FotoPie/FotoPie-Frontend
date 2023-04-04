FROM node:18-alpine

WORKDIR /app

COPY ["package*.json", "package-lock.json*", "./"]

ARG BACKEND_API
ARG Get_Synonyms_API_Prefix

ENV BACKEND_API=${BACKEND_API}
ENV Get_Synonyms_API_Prefix=${Get_Synonyms_API_Prefix}

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]