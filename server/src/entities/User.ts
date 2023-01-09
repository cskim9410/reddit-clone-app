import { IsEmail } from "class-validator";
import { Length } from "class-validator/types/decorator/decorators";
import bcrypt from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
  BeforeInsert,
} from "typeorm";

@Entity("users")
export class User {
  @Index()
  @IsEmail(undefined, { message: "이메일 주소가 잘못되었습니다." })
  @Length(1, 255, { message: "이메일 주소는 비워둘 수 없습니다." })
  @Column({ unique: true })
  email: string;

  @Index()
  @Length(3, 32, { message: "사용자 이름은 3자 이상이어야 합니다." })
  @Column()
  username: string;

  @Length(6, 244, { message: "비밀번호는 6자리 이상이어야 합니다." })
  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
