import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Location from './Location'; // Import for foreign key reference

// Interface for Company attributes
export interface CompanyAttributes {
    company_id?: number;
    name: string;
    description?: string | null;
    is_agency?: boolean | null;
    tax_identification_number?: string | null;
    location_id?: number | null;

    location?: Location;
}

// Define the Company model
class Company extends Model<CompanyAttributes> implements CompanyAttributes {
    public company_id!: number;
    public name!: string;
    public description?: string | null;
    public is_agency?: boolean | null;
    public tax_identification_number?: string | null;
    public location_id?: number | null;

    public readonly location?: Location;
}

Company.init(
    {
        company_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_agency: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        tax_identification_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        location_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Location, // Reference the imported model class
                key: 'location_id',
            },
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'Companies',
        timestamps: false,
    }
);

export default Company; 