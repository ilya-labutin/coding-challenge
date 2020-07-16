FROM node:12.18.0-alpine3.9

WORKDIR /usr/src/app

COPY ./package.json .
COPY install.sh install.sh

ARG NEXT_ENV
ENV NEXT_ENV ${NEXT_ENV:-production}
RUN chmod u+x install.sh && ./install.sh

COPY . .
RUN npm run build

CMD ./entrypoint.sh