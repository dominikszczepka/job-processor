import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import JobOffer from './JobOffer';

export interface BenefitAttributes {
    benefit_id?: number;
    name: string;
}

class Benefit extends Model<BenefitAttributes> implements BenefitAttributes {
    public benefit_id!: number;
    public name!: string;
}

Benefit.init(
    {
        benefit_id: {
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
        tableName: 'Benefits',
        timestamps: false,
    }
);

export default Benefit; 