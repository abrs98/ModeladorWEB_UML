# docker build -t [name] [dir]
# docker run [-it or -d (for deamon)] [optional:-p port] [name]
# docker ps (if you choose -d, for see all docker image)
# docker run -it -v $(pwd)/app [name]

# ---------- Base ----------
# FROM node:12-slim
# ENV NODE_ENV development
FROM node:12.18-alpine AS base
LABEL Name=apimodeladoruml Version=1.0.0
WORKDIR /app

# ---------- Builder ----------
# Creates:
# - node_modules: production dependencies (no dev dependencies)
# - dist: A production build compiled with Babel
FROM base AS builder
COPY ["package.json", "package-lock.json*", ".babelrc.json", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
RUN npm prune --production

# ---------- Release ----------
FROM base AS release
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
USER nonadmin