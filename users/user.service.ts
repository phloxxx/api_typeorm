import bcrypt from "bcryptjs";
import { AppDataSource } from "../_helpers/db";
import { Users } from "./user.model";

const userRepository = AppDataSource.getRepository(Users);

export const userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

async function getAll(): Promise<Partial<Users>[]> {
    return await userRepository.find({
        select: ["firstName", "lastName", "email", "title", "role", "passwordHash"],
    });
}

async function getById(id: number): Promise<Partial<Users> | null> {
    const user = await userRepository.findOneBy({ id });

    if (!user) return null;

    const { title, firstName, lastName, email, role, passwordHash } = user;
    return { title, firstName, lastName, email,  role, passwordHash };
}

async function create(params: any) {
    const existingUser = await userRepository.findOneBy({ email: params.email });
    if (existingUser) {
        throw new Error(`Email "${params.email}" is already registered`);
    }

    const user = new Users();
    user.firstName = params.firstName;
    user.lastName = params.lastName;
    user.email = params.email;
    user.title = params.title;
    user.role = params.role;

    user.passwordHash = params.password ? await bcrypt.hash(params.password, 10) : "";

    await userRepository.save(user);
}

async function update(id: number, params: any) {
    const user = await userRepository.findOneBy({ id });
    if (!user) throw new Error("User not found");

    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
    }

    delete params.password;

    Object.assign(user, params);
    await userRepository.save(user);
}

async function _delete(id: number) {
    const user = await userRepository.findOneBy({ id });
    if (!user) throw new Error("User not found");
    await userRepository.remove(user);
}
