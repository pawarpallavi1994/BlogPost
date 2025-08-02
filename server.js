const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog Post API",
      version: "1.0.0",
      description: "Simple Blog API with Swagger docs",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      schemas: {
        Post: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64c3b2a4f1e1fc1234567890" },
            title: { type: "string", example: "My Blog Post" },
            content: { type: "string", example: "Content goes here..." },
            imageUrl: {
              type: "string",
              example: "http://example.com/image.jpg",
            },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        PostInput: {
          type: "object",
          required: ["title", "content"],
          properties: {
            title: { type: "string", example: "New Title" },
            content: { type: "string", example: "This is a new post." },
            imageUrl: {
              type: "string",
              example: "http://example.com/image.png",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Blog Post API. Visit /api-docs for documentation.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📚 Swagger docs at http://localhost:${PORT}/api-docs`);
});
