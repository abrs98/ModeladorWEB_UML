FROM node:13.12.0-alpine
LABEL Name=modeladoruml Version=2.0.0
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
EXPOSE 3000
# CMD ["npm", "start"]
