import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export interface WorkModeAttributes {
    work_mode_id?: number;
    name: string;
}

class WorkMode extends Model<WorkModeAttributes> implements WorkModeAttributes {
    public work_mode_id!: number;
    public name!: string;
}

WorkMode.init(
    {
        work_mode_id: {
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
        tableName: 'WorkModes',
        timestamps: false,
    }
);

export default WorkMode; 