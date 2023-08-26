import { Min, IsEmail } from "class-validator";
import { Role } from "src/role.enum";
import { hash } from "bcrypt";

import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  Unique,
  ObjectId,
} from "typeorm";

@Entity('users')
@Unique(['email'])

export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @Min(8)
  password: string;

  @Column()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
