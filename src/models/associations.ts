import JobOffer from './JobOffer';
import Benefit from './Benefit';
import Requirement from './Requirement';
import WorkMode from './WorkMode';
import ContractType from './ContractType';
import Keyword from './Keyword';
import Company from './Company';
import Salary from './Salary';
import Location from './Location';
import Profession from './Profession';
import Industry from './Industry';

// Many-to-Many Associations
JobOffer.belongsToMany(Benefit, { through: 'JobOfferBenefits', foreignKey: 'job_offer_id' });
Benefit.belongsToMany(JobOffer, { through: 'JobOfferBenefits', foreignKey: 'benefit_id' });

JobOffer.belongsToMany(Requirement, { through: 'JobOfferRequirements', foreignKey: 'job_offer_id' });
Requirement.belongsToMany(JobOffer, { through: 'JobOfferRequirements', foreignKey: 'requirement_id' });

JobOffer.belongsToMany(WorkMode, { through: 'JobOfferWorkModes', foreignKey: 'job_offer_id' });
WorkMode.belongsToMany(JobOffer, { through: 'JobOfferWorkModes', foreignKey: 'work_mode_id' });

JobOffer.belongsToMany(ContractType, { through: 'JobOfferContractTypes', foreignKey: 'job_offer_id' });
ContractType.belongsToMany(JobOffer, { through: 'JobOfferContractTypes', foreignKey: 'contract_type_id' });

JobOffer.belongsToMany(Keyword, { through: 'JobOfferKeywords', foreignKey: 'job_offer_id' });
Keyword.belongsToMany(JobOffer, { through: 'JobOfferKeywords', foreignKey: 'keyword_id' });

// One-to-One (hasOne) Associations
JobOffer.hasOne(Company, { foreignKey: 'company_id' });
JobOffer.hasOne(Salary, { foreignKey: 'salary_id' });
JobOffer.hasOne(Location, { foreignKey: 'location_id' });
JobOffer.hasOne(Profession, { foreignKey: 'profession_id' });
JobOffer.hasOne(Industry, { foreignKey: 'industry_id' }); 