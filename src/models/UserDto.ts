export interface UserLoginDto {
  email: string;
  password: string;
}

export interface UserDto {
  id: string;
  name: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export enum Roles {
  Admin = 1,
  User
}
