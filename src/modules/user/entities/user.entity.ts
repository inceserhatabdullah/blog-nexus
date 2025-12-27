import { Exclude } from "class-transformer";

export class UserEntity {
  id: string;
  email: string;
  isActive: boolean;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity | null>) {
    Object.assign(this, partial);
  }
}