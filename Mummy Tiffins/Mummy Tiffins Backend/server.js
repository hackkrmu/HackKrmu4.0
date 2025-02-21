import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./src/routes/auth.routes.js";
import postRouter from "./src/routes/post.routes.js";
import menuRouter from "./src/routes/menu.routes.js";
import dishRouter from "./src/routes/dish.routes.js";

dotenv.config();


const app = express();

app.use(express.json());
app.use(cors());


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/dish", dishRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
    }
);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}, link: http://localhost:${process.env.PORT}`);
});