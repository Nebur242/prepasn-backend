FROM jrottenberg/ffmpeg:5.0-alpine AS ffmpeg
FROM node:18-alpine AS node

COPY --from=ffmpeg / /

WORKDIR /code
COPY ../../dist/apps/hls/package.json ./
COPY ../../yarn.lock ./
RUN yarn install --frozen-lockfile
COPY ../../dist/apps/hls ./

CMD [ "node", "main.js" ]
