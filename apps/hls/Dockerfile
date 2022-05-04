FROM jrottenberg/ffmpeg:5.0-alpine AS ffmpeg
FROM node:18-alpine AS node

COPY --from=ffmpeg / /

WORKDIR /code
COPY ../../dist/apps/hls ./

CMD [ "node", "main.js" ]
