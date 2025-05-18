import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import JobOffer from './JobOffer';

export interface ContractTypeAttributes {
    contract_type_id?: number;
    name: string;
}

class ContractType extends Model<ContractTypeAttributes> implements ContractTypeAttributes {
    public contract_type_id!: number;
    public name!: string;
}

ContractType.init(
    {
        contract_type_id: {
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
        tableName: 'ContractTypes',
        timestamps: false,
    }
);

export default ContractType; 