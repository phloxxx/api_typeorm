"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../_helpers/db");
const user_model_1 = require("./user.model");
const userRepository = db_1.AppDataSource.getRepository(user_model_1.User);
exports.userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield userRepository.find();
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield userRepository.findOne({
            where: { id },
            select: ["id", "firstName", "lastName", "email"], // Excludes passwordHash
        });
    });
}
function create(params) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if the email already exists
        const existingUser = yield userRepository.findOneBy({ email: params.email });
        if (existingUser) {
            throw new Error(`Email "${params.email}" is already registered`);
        }
        // Create new user
        const user = new user_model_1.User();
        user.firstName = params.firstName;
        user.lastName = params.lastName;
        user.email = params.email;
        // Hash password
        if (params.password) {
            user.passwordHash = yield bcryptjs_1.default.hash(params.password, 10);
        }
        yield userRepository.save(user);
    });
}
function update(id, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userRepository.findOneBy({ id });
        if (!user)
            throw new Error("User not found");
        // Update only provided fields
        Object.assign(user, params);
        // Hash new password if provided
        if (params.password) {
            user.passwordHash = yield bcryptjs_1.default.hash(params.password, 10);
        }
        yield userRepository.save(user);
    });
}
function _delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userRepository.findOneBy({ id });
        if (!user)
            throw new Error("User not found");
        yield userRepository.remove(user);
    });
}
