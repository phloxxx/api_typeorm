"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const config_json_1 = __importDefault(require("../config.json"));
const user_model_1 = require("../users/user.model");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: config_json_1.default.database.host,
    port: config_json_1.default.database.port,
    username: config_json_1.default.database.user,
    password: config_json_1.default.database.password,
    database: config_json_1.default.database.database,
    synchronize: true,
    entities: [user_model_1.User],
});
exports.AppDataSource.initialize()
    .then(() => console.log("Database connected"))
    .catch((error) => console.error("Database connection error:", error));
