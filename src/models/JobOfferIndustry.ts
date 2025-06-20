import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export interface JobOfferIndustryAttributes {
    job_offer_id: number;
    industry_id: number;
}

class JobOfferIndustry extends Model<JobOfferIndustryAttributes> implements JobOfferIndustryAttributes {
    public job_offer_id!: number;
    public industry_id!: number;
}

JobOfferIndustry.init(
    {
        job_offer_id: {
            type: DataTypes.INTEGER, // Match JobOffer primary key type
            primaryKey: true,
            references: {
                model: 'JobOffers',
                key: 'job_offer_id',
            },
        },
        industry_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Industries',
                key: 'industry_id',
            },
        },
    },
    {
        sequelize,
        tableName: 'JobOfferContractTypes',
        timestamps: false,
    }
);

export default JobOfferIndustry;