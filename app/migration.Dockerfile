FROM mhart/alpine-node:12
ENV NO_UPDATE_NOTIFIER=true
WORKDIR /opt/app-root/src
COPY ./ .
RUN chmod +x /opt/app-root/src/bin/run-migrations.sh \
 && npm run all:ci
CMD ["/bin/sh"]
