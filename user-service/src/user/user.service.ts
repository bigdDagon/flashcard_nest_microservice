import {
  Injectable,
 } from "@nestjs/common";
import { Repository, InsertResult } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Logger } from "@nestjs/common/services";

const bcrypt = require("bcrypt");

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

// ... confirmed
  async findOne(query: any): Promise<User | undefined> {
    return this.userRepository.findOne(query);
  }

  async createUser(user: any): Promise<InsertResult> {
    try {

      const userEntity = this.userRepository.create(user);

      const res = await this.userRepository.insert(userEntity);

      Logger.log('createUser - Created user');

      return res;
    } catch(e) {
      Logger.log(e);
      throw e;
    }
  }
}