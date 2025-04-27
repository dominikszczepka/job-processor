import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export interface JobOfferKeywordAttributes {
    job_offer_id: number;
    keyword_id: number;
}

class JobOfferKeyword extends Model<JobOfferKeywordAttributes> implements JobOfferKeywordAttributes {
    public job_offer_id!: number;
    public keyword_id!: number;
}

JobOfferKeyword.init(
    {
        job_offer_id: {
            type: DataTypes.INTEGER, // Match JobOffer primary key type
            primaryKey: true,
            references: {
                model: 'JobOffers',
                key: 'job_offer_id',
            },
        },
        keyword_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Keywords',
                key: 'keyword_id',
            },
        },
    },
    {
        sequelize,
        tableName: 'JobOfferKeywords',
        timestamps: false,
    }
);

export default JobOfferKeyword; 