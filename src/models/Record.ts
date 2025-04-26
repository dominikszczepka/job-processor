import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

// --- Interfaces for the expected JSON structure based on db_structure.sql ---

interface LocationData {
    country?: string | null;
    city: string;
    latitude?: number | null;
    longitude?: number | null;
    iso_code?: string | null;
}

interface CompanyData {
    name: string;
    description?: string | null;
    is_agency?: boolean | null;
    tax_identification_number?: string | null;
    location?: LocationData | null; // Nested location for the company
}

interface SalaryData {
    min_value?: number | null;
    max_value?: number | null;
    currency?: string | null;
    period?: string | null;
}

// Represents the expected structure of the JSON stored in the 'data' field
interface JobOfferData {
    externalId: number; // Matches JobOffers.external_id (INT)
    source_url: string;
    source_website?: string | null;
    title: string;
    description?: string | null;
    company?: CompanyData | null;
    publication_timestamp?: string | Date | null;
    snapshot_timestamp: string | Date;
    expires_at?: string | Date | null;
    is_active?: boolean; // Allow undefined initially, default handled by DB? Or require it? Let's allow optional for flexibility from LLM.
    is_remote_recruitment?: boolean | null;
    experience_level?: string | null;
    salary?: SalaryData | null; // Make optional as LLM might not return it
    location?: LocationData | null; // Job offer's own location
    category?: string | null;
    industry?: string | null;
    profession?: string | null;
    benefits?: string[] | null;
    requirements?: string[] | null;
    work_modes?: string[] | null;
    contract_types?: string[] | null;
    keywords?: string[] | null;
}

// --- Sequelize Model Definition ---

// Interface for the model's attributes
interface RecordAttributes {
    id: number;
    data: JobOfferData; // Use the structured interface
    createdAt: Date;
    updatedAt: Date;
    externalId: number; // Changed to number
}

// Interface for the model's creation attributes (optional fields)
// Make data also optional here as it's provided during creation
interface RecordCreationAttributes extends Optional<RecordAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Record extends Model<RecordAttributes, RecordCreationAttributes>
    implements RecordAttributes {
    public id!: number;
    public data!: JobOfferData; // Use the structured interface
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public externalId!: number; // Changed to number
}

Record.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        data: {
            type: DataTypes.JSONB, // Keep storing as JSONB
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        externalId: {
            type: DataTypes.INTEGER, // Changed to INTEGER
            allowNull: false,
            unique: true // Assuming externalId from the source should be unique in this staging table too
        }
    },
    {
        sequelize,
        tableName: 'records', // Stays as 'records' - this model maps to the staging table
        timestamps: true,
    }
);

export default Record;
// Export the data interface if it needs to be used elsewhere (e.g., in MessageProcessor validation)
export { JobOfferData, SalaryData, CompanyData, LocationData }; 