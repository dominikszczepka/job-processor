import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export interface KeywordAttributes {
    keyword_id?: number;
    name: string;
}

class Keyword extends Model<KeywordAttributes> implements KeywordAttributes {
    public keyword_id!: number;
    public name!: string;
}

Keyword.init(
    {
        keyword_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Assuming keywords should be unique
        },
    },
    {
        sequelize,
        tableName: 'Keywords',
        timestamps: false,
    }
);

export default Keyword; 