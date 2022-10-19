import { TopicEntity } from "@qa/server/topic/topic.entity";
import { UserEntity } from "@qa/server/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'answer' })
export class AnswerEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public body: string;

  @Column({ default: false })
  public accepted: boolean;

  @Column({ default: 0 })
  public likesCount: number;

  @ManyToOne(() => TopicEntity, (topic) => topic.answers)
  public topic: TopicEntity;

  @ManyToOne(() => UserEntity, (user) => user.answers, { eager: true })
  public author: UserEntity;

  @ManyToMany(() => UserEntity, (user) => user.answerLikes)
  public likes: UserEntity[];

  @ManyToMany(() => UserEntity, (user) => user.answerDislikes)
  public dislikes: UserEntity[];

  @CreateDateColumn({ name: 'created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;
}
