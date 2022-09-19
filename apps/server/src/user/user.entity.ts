import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { randomBytes, pbkdf2Sync } from "crypto";

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ nullable: false })
  public username: string;

  @Column({ unique: true, nullable: false })
  public email: string;

  @Column({ unique: true, nullable: false })
  public password: string;

  @Column({ unique: true, nullable: false })
  public salt: string;

  @BeforeInsert()
  public async hashPassword(): Promise<void> {
    this.salt = randomBytes(16).toString('hex');
    const contentToHash = this.password;
    const iterations = 1000;
    const keyLenth = 64;
    const digestAlgorithm = 'sha512';

    this.password = pbkdf2Sync(contentToHash, this.salt, iterations, keyLenth, digestAlgorithm).toString('hex');
  }

  @CreateDateColumn({ name: 'create_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: string;
}
