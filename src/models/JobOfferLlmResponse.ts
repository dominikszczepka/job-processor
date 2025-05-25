import Company from "./Company";
import Salary from "./Salary";
import Location from "./Location";

export interface JobOfferLlmResponse {
    job_offer_id?: number;
    external_id: string;
    source_url: string;
    source_website?: string | null;
    title: string;
    description?: string | null;
    publication_timestamp?: string | Date | null;
    snapshot_timestamp?: string | Date;
    expires_at?: string | Date | null;
    is_active?: boolean;
    is_remote_recruitment?: boolean | null;
    experience_level?: string | null;
    company_id?: number | null;
    salary_id?: number | null;
    location_id?: number | null;
    industry_id?: number | null;
    profession_id?: number | null;

    company?: Company;
    salary?: Salary;
    location?: Location;
    industry?: string;
    profession?: string;
    benefits?: string[];
    requirements?: string[];
    workModes?: string[];
    contractTypes?: string[];
    keywords?: string[];
}