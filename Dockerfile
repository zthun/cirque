FROM node:17.3.0 as setup
WORKDIR /usr/dev
COPY . .
RUN yarn install

FROM setup as analyze
RUN yarn lint

FROM setup as test
RUN yarn test

FROM setup as build
RUN yarn build && yarn doc

FROM build as release
USER root
RUN git config --global credential.helper store && \
    git config --global user.name "Circle CI" && \
    git config --global user.email "circle-ci@zthunworks.com" && \
    git remote set-url origin https://github.com/zthun/cirque && \
    git remote -v && \
    git checkout latest
RUN --mount=type=secret,id=GIT_CREDENTIALS,dst=/root/.git-credentials npx lerna version --conventional-commits --yes --no-push -m "chore: version [skip ci]" && \
    yarn install && \
    git add . && \
    git commit --allow-empty -m "chore: update yarn lockfile [skip ci]" && \
    git push && \
    git push --tags
RUN --mount=type=secret,id=NPM_CREDENTIALS,dst=/root/.npmrc npx lerna publish from-package --yes

FROM node:17.3.0-alpine as works.apps
RUN npm install -g @zthun/works.apps
EXPOSE 4000
CMD ["zthun-works-apps"]

FROM node:17.3.0-alpine as works.cookies
RUN npm install -g @zthun/works.cookies
EXPOSE 4000
CMD ["zthun-works-cookies"]

FROM node:17.3.0-alpine as works.notifications
RUN npm install -g @zthun/works.notifications
EXPOSE 4000
CMD ["zthun-works-notifications"]

FROM node:17.3.0-alpine as works.users
RUN npm install -g @zthun/works.users
EXPOSE 4000
CMD ["zthun-works-users"]

FROM node:17.3.0-alpine as works.vault
RUN npm install -g @zthun/works.vault
EXPOSE 4000
CMD ["zthun-works-vault"]

FROM nginx:1.21.5-alpine as works.proxy
EXPOSE 8080
COPY packages/works.proxy/shared /etc/nginx/shared
COPY packages/works.proxy/certs /etc/nginx/certs
COPY packages/works.proxy/conf.d /etc/nginx/conf.d

FROM node:17.3.0-alpine as works.api
RUN npm install -g @zthun/works.api
EXPOSE 3000
CMD ["zthun-works-api"]

FROM node:17.3.0-alpine as works.web.install
RUN npm install -g @zthun/works.web

FROM nginx:1.21.5-alpine as works.web
COPY --from=works.web.install /usr/local/lib/node_modules/@zthun/works.web/dist/. /usr/share/nginx/html/
