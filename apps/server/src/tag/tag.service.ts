import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TagEntity } from "@qa/server/tag/tag.entity";
import { Repository } from "typeorm";

@Injectable()
export class TagService {

  public constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {

  }

  public async findAll(): Promise<TagEntity[]> {
    return await this.tagRepository.find();
  }
}
