import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export interface JobOfferBenefitAttributes {
    job_offer_id: number; // Part of composite PK
    benefit_id: number;   // Part of composite PK
}

class JobOfferBenefit extends Model<JobOfferBenefitAttributes> implements JobOfferBenefitAttributes {
    public job_offer_id!: number;
    public benefit_id!: number;
}

JobOfferBenefit.init(
    {
        job_offer_id: {
            type: DataTypes.INTEGER, // Match JobOffer primary key type
            primaryKey: true,
            references: {
                model: 'JobOffers', // Table name as string
                key: 'job_offer_id',
            },
        },
        benefit_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Benefits', // Table name as string
                key: 'benefit_id',
            },
        },
    },
    {
        sequelize,
        tableName: 'JobOfferBenefits',
        timestamps: false,
    }
);

export default JobOfferBenefit; 