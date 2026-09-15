// Custom Node server used in production behind the IIS reverse proxy.
// `npm run build` first, then `NODE_ENV=production node server.js`.

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // `true` parses the query string as well as the path.
    handle(req, res, parse(req.url, true));
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
