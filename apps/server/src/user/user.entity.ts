import { TopicEntity } from "@qa/server/topic/topic.entity";
import { getHashedString } from "@qa/server/user/utils/hash-string.util";
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ nullable: false })
  public username: string;

  @Column({ unique: true, nullable: false })
  public email: string;

  @Column({ select: false, unique: true, nullable: false })
  public password: string;

  @Column({ select: false, unique: true, nullable: false })
  public salt: string;

  @BeforeInsert()
  public async hashPassword(): Promise<void> {
    const { hashedString, salt } = getHashedString(this.password);
    this.password = hashedString;
    this.salt = salt;
  }

  @CreateDateColumn({ select: false, name: 'created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ select: false, name: 'updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;

  @OneToMany(() => TopicEntity, (topic) => topic.author)
  public topics: TopicEntity[];
}
