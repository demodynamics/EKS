import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } from "../config.js";
console.log(DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME)

const config: TypeOrmModuleOptions = {
    type : 'postgres',
    host : DB_HOST,
    port : DB_PORT,
    username : DB_USERNAME,
    password : DB_PASSWORD,
    database : DB_NAME,
    entities: ["dist/**/*.entity{.ts,.js}"],
    autoLoadEntities : true,
    synchronize : false,
    logging: [
        'query',
        'error',
        'warn'
    ]
};
console.log("database loaded")
export default config