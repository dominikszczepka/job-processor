import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Company from './Company';
import Salary from './Salary';
import Location from './Location';
import Industry from './Industry';
import Profession from './Profession';
import Benefit from './Benefit';
import Requirement from './Requirement';
import WorkMode from './WorkMode';
import ContractType from './ContractType';
import Keyword from './Keyword';

export interface JobOfferAttributes {
    job_offer_id?: number;
    external_id: string;
    source_url: string;
    source_website?: string | null;
    title: string;
    description?: string | null;
    publication_timestamp?: string | Date | null;
    snapshot_timestamp?: string | Date; // Defaulted in init
    expires_at?: string | Date | null;
    is_active?: boolean;
    is_remote_recruitment?: boolean | null;
    experience_level?: string | null;
    company_id?: number | null;
    salary_id?: number | null;
    location_id?: number | null;
    profession_id?: number | null;
    
    company?: Company;
    salary?: Salary;
    location?: Location;
    industries?: Industry[];
    profession?: Profession;
    benefits?: Benefit[];
    requirements?: Requirement[];
    workModes?: WorkMode[];
    contractTypes?: ContractType[];
    keywords?: Keyword[];
}

class JobOffer extends Model<JobOfferAttributes> implements JobOfferAttributes {
    public job_offer_id!: number;
    public external_id!: string;
    public source_url!: string;
    public source_website?: string | null;
    public title!: string;
    public description?: string | null;
    public publication_timestamp?: string | Date | null;
    public snapshot_timestamp!: string | Date;
    public expires_at?: string | Date | null;
    public is_active?: boolean;
    public is_remote_recruitment?: boolean | null;
    public experience_level?: string | null;
    public company_id?: number | null;
    public salary_id?: number | null;
    public location_id?: number | null;
    public industry_id?: number | null;
    public profession_id?: number | null;

    public readonly company?: Company;
    public readonly salary?: Salary;
    public readonly location?: Location;
    public readonly profession?: Profession;

    public readonly industries?: Industry[];
    public readonly benefits?: Benefit[];
    public readonly requirements?: Requirement[];
    public readonly workModes?: WorkMode[];
    public readonly contractTypes?: ContractType[];
    public readonly keywords?: Keyword[];
}

JobOffer.init(
    {
        job_offer_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        snapshot_timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        external_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        source_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        source_website: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT, // Changed to TEXT for potentially long descriptions
            allowNull: true,
        },
        publication_timestamp: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: true, // Consider defaulting to true?
        },
        is_remote_recruitment: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        experience_level: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Foreign keys
        company_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Company, // Use imported model
                key: 'company_id',
            },
            allowNull: true,
        },
        salary_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Salary, // Use imported model
                key: 'salary_id',
            },
            allowNull: true,
        },
        location_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Location, // Use imported model
                key: 'location_id',
            },
            allowNull: true,
        },
        profession_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Profession, // Use imported model
                key: 'profession_id',
            },
            allowNull: true,
        }
    },
    {
        sequelize,
        tableName: 'JobOffers',
        timestamps: true, // Assuming createdAt/updatedAt are useful here
        updatedAt: 'updated_at', // Standardize column names
        createdAt: 'created_at'
    }
);

export default JobOffer; 