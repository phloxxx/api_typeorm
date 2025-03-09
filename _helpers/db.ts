import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "../config.json";
import { Users } from "../users/user.model";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.database.host,
    port: config.database.port,
    username: config.database.user,
    password: config.database.password,
    database: config.database.database,
    synchronize: true,
    entities: [Users],
});

AppDataSource.initialize()
    .then(() => console.log("Database connected"))
    .catch((error) => console.error("Database connection error:", error));
