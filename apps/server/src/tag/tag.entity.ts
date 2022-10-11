import { TopicEntity } from "@qa/server/topic/topic.entity";
import { Exclude } from 'class-transformer';
import { CreateDateColumn, Entity, ManyToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'tags' })
export class TagEntity {

  @PrimaryColumn()
  public name: string;

  @ManyToMany(() => TopicEntity, (topic) => topic.tags)
  public topics: TopicEntity[];

  @Exclude()
  @CreateDateColumn({ name: 'created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: string;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: string;
}
