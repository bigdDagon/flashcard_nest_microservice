import { IsEmail, IsNotEmpty } from "class-validator";
import { STATUS} from "../enums/status.enum";
import {
  Column,
  Entity,
  ObjectIdColumn,
  Unique,
  ObjectId,
} from "typeorm";

@Entity('flashcards')
@Unique(['email'])
@Unique(['question'])

export class Flashcard {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @IsNotEmpty()
  cardId: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  question: string;

  @Column()
  @IsNotEmpty()
  answer: string;

  @Column()
  @IsNotEmpty()
  status: string;
}
