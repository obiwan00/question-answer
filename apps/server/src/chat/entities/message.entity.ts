import { TopicEntity } from "@qa/server/topic/topic.entity";
import { UserEntity } from "@qa/server/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'message' })
export class MessageEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public body: string;

  @ManyToOne(() => TopicEntity, (topic) => topic.messages)
  public topic: TopicEntity;

  @ManyToOne(() => UserEntity, (author) => author.messages, { eager: true })
  public author: UserEntity;

  @CreateDateColumn({ name: 'created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;
}
