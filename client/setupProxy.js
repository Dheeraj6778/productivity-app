const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://horoscopeapi-horoscope-v1.p.rapidapi.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // Remove the '/api' prefix when forwarding the request
      },
    })
  );
};
