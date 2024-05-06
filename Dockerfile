FROM node:lts-bookworm

ENV DEBIAN_FRONTEND noninteractive

RUN apt update && apt install -y bash nano tini

WORKDIR /app

USER node

EXPOSE 5173

ENTRYPOINT ["/usr/bin/tini", "--"]

CMD npm run dev
