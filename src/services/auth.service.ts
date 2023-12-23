import {
  UserDataInterface,
  UserDataResponseInterface,
  UserProfileType,
  UserResponseLoginInterface,
} from "../types/types";
import { instance } from "../api/axios.api";

export const AuthService = {
  async registration(
    userData: UserDataInterface,
  ): Promise<UserDataResponseInterface | undefined> {
    const { data } = await instance.post<UserDataResponseInterface>("users", {
      user: userData,
    });
    return data;
  },
  async login(
    userData: UserDataInterface,
  ): Promise<UserResponseLoginInterface | undefined> {
    const { data } = await instance.post<UserResponseLoginInterface>(
      "auth/login",
      userData,
    );
    return data;
  },
  async getProfile(): Promise<UserProfileType | undefined> {
    const { data } = await instance.get<UserProfileType>("auth/profile");

    if (data) return data;
  },
};
