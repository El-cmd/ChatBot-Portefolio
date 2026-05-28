'use strict';

const isExpectedDisconnectError = (error) =>
  error &&
  typeof error === 'object' &&
  ['ECONNRESET', 'EPIPE'].includes(error.code);

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    const server = strapi.server?.httpServer;
    const app = strapi.server?.app;

    if (!server) {
      return;
    }

    if (app?.listeners) {
      const existingErrorListeners = app.listeners('error');

      if (existingErrorListeners.length) {
        existingErrorListeners.forEach((listener) => {
          app.off('error', listener);
        });

        app.on('error', (error, ctx) => {
          if (isExpectedDisconnectError(error)) {
            return;
          }

          existingErrorListeners.forEach((listener) => {
            listener.call(app, error, ctx);
          });
        });
      }
    }

    server.on('clientError', (error, socket) => {
      if (isExpectedDisconnectError(error)) {
        if (socket.writable) {
          socket.destroy();
        }
        return;
      }

      strapi.log.error(error);
      if (socket.writable) {
        socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
      }
    });

    server.on('connection', (socket) => {
      socket.on('error', (error) => {
        if (isExpectedDisconnectError(error)) {
          return;
        }

        strapi.log.error(error);
      });
    });
  },
};
