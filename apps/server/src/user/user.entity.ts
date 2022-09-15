import { User } from "@qa/api-interfaces";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class UserEntity implements User {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ nullable: false })
  public username: string;

  @Column({ unique: true, nullable: false })
  public email: string;

  @Column({ name: 'google_id', unique: true, nullable: false })
  public googleId: string;

  @CreateDateColumn({ name: 'create_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: string;
}
