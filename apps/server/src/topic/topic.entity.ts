import { TagEntity } from "@qa/server/tag/tag.entity";
import { UserEntity } from "@qa/server/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'topics' })
export class TopicEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public slug: string;

  @Column()
  public title: string;

  @Column()
  public body: string;

  @Column({ default: 0 })
  public likesCount: number;

  @ManyToOne(() => UserEntity, (user) => user.topics, { eager: true })
  public author: UserEntity;

  @ManyToMany(() => TagEntity, (tag) => tag.name, { cascade: true, eager: true })
  @JoinTable()
  public tags: TagEntity[];

  @ManyToMany(() => UserEntity)
  public likes: UserEntity[];

  @ManyToMany(() => UserEntity)
  public dislikes: UserEntity[];

  @CreateDateColumn({ name: 'created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;
}
