import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export interface WorkHourAttributes {
    work_hour_id?: number;
    start_time?: string | null;
    end_time?: string | null;
}

class WorkHour extends Model<WorkHourAttributes> implements WorkHourAttributes {
    public work_hour_id!: number;
    public start_time?: string | null;
    public end_time?: string | null;
}

WorkHour.init(
    {
        work_hour_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        start_time: {
            type: DataTypes.STRING, // Consider TIME type if appropriate for DB
            allowNull: true,
        },
        end_time: {
            type: DataTypes.STRING, // Consider TIME type if appropriate for DB
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'WorkHours',
        timestamps: false,
    }
);

export default WorkHour; 