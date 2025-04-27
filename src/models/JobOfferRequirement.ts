import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export interface JobOfferRequirementAttributes {
    job_offer_id: number;
    requirement_id: number;
}

class JobOfferRequirement extends Model<JobOfferRequirementAttributes> implements JobOfferRequirementAttributes {
    public job_offer_id!: number;
    public requirement_id!: number;
}

JobOfferRequirement.init(
    {
        job_offer_id: {
            type: DataTypes.INTEGER, // Match JobOffer primary key type
            primaryKey: true,
            references: {
                model: 'JobOffers',
                key: 'job_offer_id',
            },
        },
        requirement_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Requirements',
                key: 'requirement_id',
            },
        },
    },
    {
        sequelize,
        tableName: 'JobOfferRequirements',
        timestamps: false,
    }
);

export default JobOfferRequirement; 