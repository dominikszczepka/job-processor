import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export interface JobOfferContractTypeAttributes {
    job_offer_id: number;
    contract_type_id: number;
}

class JobOfferContractType extends Model<JobOfferContractTypeAttributes> implements JobOfferContractTypeAttributes {
    public job_offer_id!: number;
    public contract_type_id!: number;
}

JobOfferContractType.init(
    {
        job_offer_id: {
            type: DataTypes.INTEGER, // Match JobOffer primary key type
            primaryKey: true,
            references: {
                model: 'JobOffers',
                key: 'job_offer_id',
            },
        },
        contract_type_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'ContractTypes',
                key: 'contract_type_id',
            },
        },
    },
    {
        sequelize,
        tableName: 'JobOfferContractTypes',
        timestamps: false,
    }
);

export default JobOfferContractType; 