import { Sequelize } from "sequelize";

const sequelize = new Sequelize('api_nodejs', 'root', '070203', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;