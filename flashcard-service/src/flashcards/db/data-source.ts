
import { ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { Flashcard } from "../entities/flashcard.entity";
const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: "mongodb",
  host: configService.get<string>("DB_HOST"),
  port: configService.get<number>("DB_PORT"),
  database: "flashcard",
  entities: [Flashcard],
  synchronize: false,
  logging: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
