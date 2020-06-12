FROM mhart/alpine-node:12
ENV NO_UPDATE_NOTIFIER=true
WORKDIR /opt/app-root/src
COPY ./ .
RUN rm -rf /opt/app-root/src/frontend/node_modules \
 && rm -rf /opt/app-root/src/frontend/dist \
 && rm -rf /opt/app-root/src/node_modules \
 && chmod +x /opt/app-root/src/bin/run-migrations.sh \
 && npm run all:ci
CMD ["/bin/sh"]
