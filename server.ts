import "reflect-metadata";
import express from "express";
import cors from "cors";
import { errorHandler } from "./_middleware/error-handler";
import userRoutes from "./users/users.controller";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use(errorHandler);

const port = 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));