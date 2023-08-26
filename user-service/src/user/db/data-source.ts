import { User } from "src/user/entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: "mongodb",
  host: configService.get<string>("DB_HOST"),
  port: configService.get<number>("DB_PORT"),
  database: "flashcard",
  entities: [User],
  synchronize: false,
  logging: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
