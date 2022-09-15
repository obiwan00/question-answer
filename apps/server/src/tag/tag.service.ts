import { Injectable } from "@nestjs/common";

@Injectable()
export class TagService {
  public getTags(): string[] {
    return ['mock tag', 'dragon', 'Ring'];
  }
}
