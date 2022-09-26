import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TagEntity } from "@qa/server/tag/tag.entity";
import { TagResponse } from "libs/api-interfaces";
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

  public getTagEntitiesByNames(tagNames: string[]): TagEntity[] {
    return tagNames.map((tagName) => {
      const newTag = new TagEntity();
      newTag.name = tagName;

      return newTag;
    });
  }

  public buildTagResponse(tags: TagEntity[]): TagResponse {
    return {
      tags: tags.map(({ name }) => name),
    };
  }
}
