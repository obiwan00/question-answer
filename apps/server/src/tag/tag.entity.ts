import { TopicEntity } from "@qa/server/topic/topic.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from 'class-transformer';

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
