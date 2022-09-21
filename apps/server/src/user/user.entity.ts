import { getHashedString } from "@qa/server/user/utils/hash-string.util";
import { User } from "libs/api-interfaces/src";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity implements User {
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

  @CreateDateColumn({ select: false, name: 'create_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: string;

  @UpdateDateColumn({ select: false, name: 'updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: string;
}
