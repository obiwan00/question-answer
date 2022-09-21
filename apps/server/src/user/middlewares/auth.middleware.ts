import { Injectable, NestMiddleware } from "@nestjs/common";
import { ExpressRequest } from "@qa/server/models/express-request.model";
import { EnvFields } from "@qa/server/typeorm/config/env-fields.model";
import { getEnvFieldValue } from "@qa/server/typeorm/config/get-env-value.util";
import { UserService } from "@qa/server/user/user.service";
import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";


@Injectable()
export class AuthMiddleware implements NestMiddleware {

  public constructor(private readonly userService: UserService) {
  }

  public async use(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> {
    if (!req.headers?.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = verify(token, getEnvFieldValue(EnvFields.SECRET_KEY));
      const user = await this.userService.findById(decode.id);
      req.user = user;
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
