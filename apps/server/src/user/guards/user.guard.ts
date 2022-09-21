import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ExpressRequest } from "@qa/server/models/express-request.model";

@Injectable()
export class AuthGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<ExpressRequest>();

    if (request.user) {
      return true;
    }

    throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
  }
}
