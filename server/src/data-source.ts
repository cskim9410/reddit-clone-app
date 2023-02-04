import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host:
    process.env.NODE_ENV === "development"
      ? "localhost"
      : "ec2-3-38-241-152.ap-northeast-2.compute.amazonaws.com",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: ["./src/entities/**/*.ts"],
  migrations: [],
  subscribers: [],
});
