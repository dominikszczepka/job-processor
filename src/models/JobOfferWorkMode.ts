import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export interface JobOfferWorkModeAttributes {
    job_offer_id: number;
    work_mode_id: number;
}

class JobOfferWorkMode extends Model<JobOfferWorkModeAttributes> implements JobOfferWorkModeAttributes {
    public job_offer_id!: number;
    public work_mode_id!: number;
}

JobOfferWorkMode.init(
    {
        job_offer_id: {
            type: DataTypes.INTEGER, // Match JobOffer primary key type
            primaryKey: true,
            references: {
                model: 'JobOffers',
                key: 'job_offer_id',
            },
        },
        work_mode_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'WorkModes',
                key: 'work_mode_id',
            },
        },
    },
    {
        sequelize,
        tableName: 'JobOfferWorkModes',
        timestamps: false,
    }
);

export default JobOfferWorkMode; 