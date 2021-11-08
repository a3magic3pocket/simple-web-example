FROM node:12

WORKDIR /root/web

COPY . /root/web

RUN cp /etc/apt/sources.list sources.list_backup
RUN sed -i -e 's/archive.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list
RUN sed -i -e 's/security.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list

RUN npm install
RUN npm run build

ENTRYPOINT npm run start