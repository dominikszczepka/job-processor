import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export interface RequirementAttributes {
    requirement_id?: number;
    name: string;
}

class Requirement extends Model<RequirementAttributes> implements RequirementAttributes {
    public requirement_id!: number;
    public name!: string;
}

Requirement.init(
    {
        requirement_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: 'Requirements',
        timestamps: false,
    }
);

export default Requirement; 