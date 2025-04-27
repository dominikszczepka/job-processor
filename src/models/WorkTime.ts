import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import WorkHour from './WorkHour'; // Import for foreign key references

export interface WorkTimeAttributes {
    work_times_id?: number;
    monday_work_hour_id?: number | null;
    tuesday_work_hour_id?: number | null;
    wednesday_work_hour_id?: number | null;
    thursday_work_hour_id?: number | null;
    friday_work_hour_id?: number | null;
    saturday_work_hour_id?: number | null;
    sunday_work_hour_id?: number | null;
    description?: string | null;
}

class WorkTime extends Model<WorkTimeAttributes> implements WorkTimeAttributes {
    public work_times_id!: number;
    public monday_work_hour_id?: number | null;
    public tuesday_work_hour_id?: number | null;
    public wednesday_work_hour_id?: number | null;
    public thursday_work_hour_id?: number | null;
    public friday_work_hour_id?: number | null;
    public saturday_work_hour_id?: number | null;
    public sunday_work_hour_id?: number | null;
    public description?: string | null;
}

WorkTime.init(
    {
        work_times_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        monday_work_hour_id: {
            type: DataTypes.INTEGER,
            references: {
                model: WorkHour,
                key: 'work_hour_id',
            },
            allowNull: true,
        },
        tuesday_work_hour_id: {
            type: DataTypes.INTEGER,
            references: {
                model: WorkHour,
                key: 'work_hour_id',
            },
            allowNull: true,
        },
        wednesday_work_hour_id: {
            type: DataTypes.INTEGER,
            references: {
                model: WorkHour,
                key: 'work_hour_id',
            },
            allowNull: true,
        },
        thursday_work_hour_id: {
            type: DataTypes.INTEGER,
            references: {
                model: WorkHour,
                key: 'work_hour_id',
            },
            allowNull: true,
        },
        friday_work_hour_id: {
            type: DataTypes.INTEGER,
            references: {
                model: WorkHour,
                key: 'work_hour_id',
            },
            allowNull: true,
        },
        saturday_work_hour_id: {
            type: DataTypes.INTEGER,
            references: {
                model: WorkHour,
                key: 'work_hour_id',
            },
            allowNull: true,
        },
        sunday_work_hour_id: {
            type: DataTypes.INTEGER,
            references: {
                model: WorkHour,
                key: 'work_hour_id',
            },
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'WorkTimes',
        timestamps: false,
    }
);

export default WorkTime; 