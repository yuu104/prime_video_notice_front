import { users } from "@prisma/client";
import { userRepository } from "src/repositories/UserRepository";

export type CreateUserParams = {
  id: string;
  mail: string;
};

export const userFactory = () => {
  return {
    findById: (params: string): Promise<users> => {
      return userRepository.findById(params);
    },
    createUser: async (params: CreateUserParams): Promise<void> => {
      await userRepository.createUser(params);
    },
  };
};
