FROM mhart/alpine-node:12
MAINTAINER Ayush agb.ayushgupta@gmail.com

RUN mkdir -p /github-api-parser
WORKDIR /github-api-parser
COPY . ./

RUN npm install

CMD ["npm", "start"]
