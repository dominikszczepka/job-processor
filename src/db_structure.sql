CREATE TABLE Locations (
    location_id SERIAL PRIMARY KEY,
    country VARCHAR(100) NULL,
    city VARCHAR(100),
    latitude DECIMAL(9, 6) NULL,
    longitude DECIMAL(9, 6) NULL,
    iso_code VARCHAR(2) NULL
);

CREATE TABLE Companies (
    company_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    is_agency BOOLEAN NULL,
    tax_identification_number VARCHAR(255) NULL,
    location_id INT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES Locations(location_id) ON DELETE SET NULL
);

CREATE TABLE Categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Keywords (
    keyword_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE ContractTypes (
    contract_type_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);                    

CREATE TABLE WorkModes (
    work_mode_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Requirements (
    requirement_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Salaries (
    salary_id SERIAL PRIMARY KEY,
    min_value DECIMAL(12, 2) NULL,
    max_value DECIMAL(12, 2) NULL,
    currency VARCHAR(3) NULL,
    period VARCHAR(255) NULL
);

CREATE TABLE Benefits (
    benefit_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Industries (
    industry_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Profession (
    profession_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE JobOffers (
    job_offer_id BIGSERIAL PRIMARY KEY,
    external_id INT NOT NULL,
    source_url VARCHAR(1024) NOT NULL UNIQUE,
    source_website VARCHAR(100) NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    company_id BIGINT NULL,
    publication_timestamp TIMESTAMPTZ NULL,
    snapshot_timestamp TIMESTAMPTZ NOT NULL,
    expires_at TIMESTAMPTZ NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_remote_recruitment BOOLEAN NULL,
    experience_level VARCHAR (255) NULL,

    salary_id INT NOT NULL,
    location_id INT NULL,
    category_id INT NULL,
    industry_id INT NULL,
    profession_id INT NULL,

    FOREIGN KEY (salary_id) REFERENCES Salaries(salary_id),
    FOREIGN KEY (company_id) REFERENCES Companies(company_id) ON DELETE SET NULL,
    FOREIGN KEY (location_id) REFERENCES Locations(location_id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE SET NULL,
    FOREIGN KEY (industry_id) REFERENCES Industries(industry_id) ON DELETE SET NULL,
    FOREIGN KEY (profession_id) REFERENCES Profession(profession_id) ON DELETE SET NULL,

    CONSTRAINT uk_source_offer UNIQUE (external_id, source_url)
);

CREATE TABLE JobOfferBenefits (
    job_offer_id BIGINT NOT NULL,
    benefit_id INT NOT NULL,
    PRIMARY KEY (job_offer_id, benefit_id), -- Composite primary key
    FOREIGN KEY (job_offer_id) REFERENCES JobOffers(job_offer_id) ON DELETE CASCADE,
    FOREIGN KEY (benefit_id) REFERENCES Benefits(benefit_id) ON DELETE CASCADE
);

CREATE TABLE JobOfferRequirements (
    job_offer_id BIGINT NOT NULL,
    requirement_id INT NOT NULL,
    PRIMARY KEY (job_offer_id, requirement_id), -- Composite primary key
    FOREIGN KEY (job_offer_id) REFERENCES JobOffers(job_offer_id) ON DELETE CASCADE,
    FOREIGN KEY (requirement_id) REFERENCES Requirements(requirement_id) ON DELETE CASCADE
);

CREATE TABLE JobOfferWorkModes (
    job_offer_id BIGINT NOT NULL,
    work_mode_id INT NOT NULL,
    PRIMARY KEY (job_offer_id, work_mode_id), -- Composite primary key
    FOREIGN KEY (job_offer_id) REFERENCES JobOffers(job_offer_id) ON DELETE CASCADE,
    FOREIGN KEY (work_mode_id) REFERENCES WorkModes(work_mode_id) ON DELETE CASCADE
);

CREATE TABLE JobOfferContractTypes (
    job_offer_id BIGINT NOT NULL,
    contract_type_id INT NOT NULL,
    PRIMARY KEY (job_offer_id, contract_type_id), -- Composite primary key
    FOREIGN KEY (job_offer_id) REFERENCES JobOffers(job_offer_id) ON DELETE CASCADE,
    FOREIGN KEY (contract_type_id) REFERENCES ContractTypes(contract_type_id) ON DELETE CASCADE
);

CREATE TABLE JobOfferKeywords (
    job_offer_id BIGINT NOT NULL,
    keyword_id INT NOT NULL,
    PRIMARY KEY (job_offer_id, keyword_id),
    FOREIGN KEY (job_offer_id) REFERENCES JobOffers(job_offer_id) ON DELETE CASCADE,
    FOREIGN KEY (keyword_id) REFERENCES Keywords(keyword_id) ON DELETE CASCADE
);

CREATE TABLE JobOfferCategories (
    job_offer_id BIGINT NOT NULL,
    keyword_id INT NOT NULL,
    PRIMARY KEY (job_offer_id, keyword_id),
    FOREIGN KEY (job_offer_id) REFERENCES JobOffers(job_offer_id) ON DELETE CASCADE,
    FOREIGN KEY (keyword_id) REFERENCES Keywords(keyword_id) ON DELETE CASCADE
);


CREATE INDEX idx_joboffers_publication_timestamp ON JobOffers(publication_timestamp);
CREATE INDEX idx_joboffers_is_active ON JobOffers(is_active);
CREATE INDEX idx_joboffers_company_id ON JobOffers(company_id);
CREATE INDEX idx_joboffers_category_id ON JobOffers(category_id);
CREATE INDEX idx_joboffers_location_id ON JobOffers(location_id);
CREATE INDEX idx_joboffers_industry_id ON JobOffers(industry_id);
CREATE INDEX idx_joboffers_profession_id ON JobOffers(profession_id);