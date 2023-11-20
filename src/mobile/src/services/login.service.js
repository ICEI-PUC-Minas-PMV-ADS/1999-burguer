import { apiLogin } from "./api.service";

export const postLogin = async (email, senha) => {
    return apiLogin("/login", { email, senha });
}