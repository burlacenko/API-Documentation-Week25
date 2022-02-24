const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// data parser - used to parse post data
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Library API",
      version: "1.0.0",
    },
  },
  apis: ["app.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /songs:
 *   get:
 *     description: Get all songs
 *     responses:
 *       200:
 *         description: Success
 *
 */
app.get("/songs", (req, res) => {
  res.send([
    {
      id: "0",
      title: "Sonata 4",
      composer: "Scriabin",
    },
  ]);
});

/**
 * @swagger
 * /song:
 *   post:
 *     description: Get one song
 *     parameters:
 *     - name: title
 *       description: Song
 *       in: body
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: Success
 *
 */
app.post("/song", (req, res) => {
  const title = req.body.title;
  res.send({ title });
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});
