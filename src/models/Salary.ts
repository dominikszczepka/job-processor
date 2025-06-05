import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export interface SalaryAttributes {
    salary_id?: number;
    min_value?: number | null;
    max_value?: number | null;
    currency?: string | null;
    type?: string | null;
    period?: string | null;
}

class Salary extends Model<SalaryAttributes> implements SalaryAttributes {
    public salary_id!: number;
    public min_value?: number | null;
    public max_value?: number | null;
    public currency?: string | null;
    public type?: string | null;
    public period?: string | null;
}

Salary.init(
    {
        salary_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        min_value: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        max_value: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        period: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'Salaries',
        timestamps: false,
    }
);

export default Salary; 