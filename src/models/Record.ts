import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

// Interface for the model's attributes
interface RecordAttributes {
    id: number;
    data: any;
    createdAt: Date;
    updatedAt: Date;
    externalId: string;
}

// Interface for the model's creation attributes (optional fields)
interface RecordCreationAttributes extends Optional<RecordAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Record extends Model<RecordAttributes, RecordCreationAttributes>
    implements RecordAttributes {
    public id!: number;
    public data!: any;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public externalId!: string;
}

Record.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        data: {
            type: DataTypes.JSONB,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        externalId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        sequelize,
        tableName: 'records',
        timestamps: true,
    }
);

export default Record; 