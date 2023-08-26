import { Min, IsEmail, IsNotEmpty, IS_EMAIL, isEmail } from "class-validator";
import { hash } from "bcrypt";

import {
  BeforeInsert,
  Column,
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
  @IsNotEmpty()
  name: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
