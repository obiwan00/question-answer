import { UserEntity } from "@qa/server/user/user.entity";
import { Request } from "express";

export interface ExpressRequest extends Request {
  user?: UserEntity;
}
