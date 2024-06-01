import express from "express";
import cors from "cors";
import connectDb from "./utils/db.js";
import bodyParser from "body-parser";
import router from "./routers/auth-router.js";

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = [
  `${process.env.FRONTENDLINK}`,
  `${process.env.FRONTENDLINK2}`,
];

const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD,OPTIONS",
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/api/", router);

const port = process.env.PORT || 4000;

connectDb().then(() => {
  app.listen(port, () => {
    console.log("running on port " + port);
  });
});
