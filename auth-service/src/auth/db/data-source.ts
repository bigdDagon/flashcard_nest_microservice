import { User } from "../entities/user.entity";

import { ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: "mongodb",
  host: configService.get<string>("DB_HOST"),
  port: configService.get<number>("DB_PORT"),
  // username: configService.get<string>("DB_USERNAME"),
  // password: configService.get<string>("DB_PASSWORD"),
  database: "flashcard",
  entities: [User],
  synchronize: false,
  logging: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
