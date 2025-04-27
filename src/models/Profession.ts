import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export interface ProfessionAttributes {
    profession_id?: number;
    name: string;
}

class Profession extends Model<ProfessionAttributes> implements ProfessionAttributes {
    public profession_id!: number;
    public name!: string;
}

Profession.init(
    {
        profession_id: {
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
        tableName: 'Professions',
        timestamps: false,
    }
);

export default Profession; 