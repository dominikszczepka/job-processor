import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export interface LocationAttributes {
    location_id?: number;
    country?: string | null;
    city: string;
    latitude?: number | null;
    longitude?: number | null;
    iso_code?: string | null;
}

class Location extends Model<LocationAttributes> implements LocationAttributes {
    public location_id!: number; 
    public country?: string | null;
    public city!: string;
    public latitude?: number | null;
    public longitude?: number | null;
    public iso_code?: string | null;
}

Location.init(
    {
        location_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        iso_code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'Locations',
        timestamps: false,
    }
);

export default Location; 