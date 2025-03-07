import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

export const User = sequelize.define(
    'User',
    {
        matricula: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }
)