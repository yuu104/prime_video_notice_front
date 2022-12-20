import { users } from "@prisma/client";
import axios from "axios";
import { CreateUserParams } from "src/models/User";

export type UserRepository = {
  findById: (id: string) => Promise<users>;
  createUser: (params: CreateUserParams) => Promise<void>;
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
});

const resorce = "/users";

const findById = async (id: string): Promise<users> => {
  const response = await instance.get(`/${resorce}/${id}`);

  return response.data;
};

const createUser = (params: CreateUserParams): Promise<void> => {
  return instance.post(`/${resorce}`, params);
};

export const userRepository: UserRepository = {
  findById,
  createUser,
};
