import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    if (req.body.title === "type string") {
      return res.status(500).send({
        error: "An error of type string",
      });
    }
    if (new Date(req.body.publishDate).getTime() < new Date().getTime()) {
      return res.status(422).send({
        error: {
          publishDate: "Ko dc publish vao thoi diem trong qua khu",
        },
      });
    }
  }
  next();
});

// Use default router
server.use(router);
server.listen(4000, () => {
  console.log("JSON Server is running");
});
