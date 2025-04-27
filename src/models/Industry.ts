import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export interface IndustryAttributes {
    industry_id?: number;
    name: string;
}

class Industry extends Model<IndustryAttributes> implements IndustryAttributes {
    public industry_id!: number;
    public name!: string;
}

Industry.init(
    {
        industry_id: {
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
        tableName: 'Industries',
        timestamps: false,
    }
);

export default Industry; 