import JobOffer from "@job-metrics/normalizer-base/dist/models/JobOffer";
import JobOfferTemplate from "../consts/JobOfferPromptTemplate";
import ExternalIdField from "../consts/targetStructure/external_id";
import BenefitsField from "../consts/targetStructure/benefits";
import CompanyField from "../consts/targetStructure/company";
import ContractTypesField from "../consts/targetStructure/contract_types";
import LocationField from "../consts/targetStructure/location";
import SalaryField from "../consts/targetStructure/salary";
import KeywordsField from "../consts/targetStructure/keywords";
import WorkModesField from "../consts/targetStructure/work_modes";
import RequirementsField from "../consts/targetStructure/requirements";
import ProfessionField from "../consts/targetStructure/profession";
import IndustriesField from "../consts/targetStructure/industry";
import ExperienceLevelField from "../consts/targetStructure/experience_level";
import IsRemoteRecruitmentField from "../consts/targetStructure/is_remote_recruitment";
import ExpiresAtField from "../consts/targetStructure/expires_at";
import PublicationTimestampField from "../consts/targetStructure/publication_timestamp";
import SourceWebsiteField from "../consts/targetStructure/source_website";
import SourceUrlField from "../consts/targetStructure/source_url";
import DescriptionField from "../consts/targetStructure/description";
import TitleField from "../consts/targetStructure/title";
import AboutEmployerField from "../consts/targetStructure/about_employer";
import WorkHoursField from "../consts/targetStructure/work_hours";
import WorkDaysField from "../consts/targetStructure/work_days";
import EmploymentTypeField from "../consts/targetStructure/employment_type";
import MultipleVacanciesField from "../consts/targetStructure/multiple_vacancies";
import AdditionalInfoField from "../consts/targetStructure/additional_info";
import ResponsibilitiesField from "../consts/targetStructure/responsibilities";
import IsShiftWorkField from "../consts/targetStructure/is_shift_work";
import PossibleNightWorkField from "../consts/targetStructure/possible_night_work";
import FieldBase from "../consts/targetStructure/FieldBase";

export class PromptsGenerator {
    public generateJobOfferPrompt(jobData: string): string {
        const job = JSON.parse(jobData) as JobOffer;
        let fields = [] as FieldBase[];
        if(!job.external_id){ fields.push(new ExternalIdField()); }
        if(!job.benefits){ fields.push(new BenefitsField()); }
        if(!job.company){ fields.push(new CompanyField()); }
        if(!job.contractTypes){ fields.push(new ContractTypesField()); }
        if(!job.location){ fields.push(new LocationField()); }
        if(!job.salary){ fields.push(new SalaryField()); }
        if(!job.workModes){ fields.push(new WorkModesField()); }
        if(!job.requirements){ fields.push(new RequirementsField()); }
        if(!job.profession){ fields.push(new ProfessionField()); }
        if(!job.industries){ fields.push(new IndustriesField()); }
        if(!job.experience_level){ fields.push(new ExperienceLevelField()); }
        if(!job.is_remote_recruitment){ fields.push(new IsRemoteRecruitmentField()); }
        if(!job.expires_at){ fields.push(new ExpiresAtField()); }
        if(!job.publication_timestamp){ fields.push(new PublicationTimestampField()); }
        if(!job.source_website){ fields.push(new SourceWebsiteField()); }
        if(!job.source_url){ fields.push(new SourceUrlField()); }
        if(!job.description){ fields.push(new DescriptionField()); }
        if(!job.title){ fields.push(new TitleField()); }
        if(!job.about_employer){ fields.push(new AboutEmployerField()); }
        if(!job.workHours){ fields.push(new WorkHoursField()); }
        if(!job.workTime){ fields.push(new WorkDaysField()); }
        if(!job.employmentType){ fields.push(new EmploymentTypeField()); }
        if(!job.multiple_vacancies){ fields.push(new MultipleVacanciesField()); }
        if(!job.additionalInfo){ fields.push(new AdditionalInfoField()); }
        if(!job.responsibilities){ fields.push(new ResponsibilitiesField()); }
        if(!job.is_shift_work){ fields.push(new IsShiftWorkField()); }
        if(!job.possible_night_work){ fields.push(new PossibleNightWorkField()); }
        fields.push(new KeywordsField());
        return JobOfferTemplate
          .replace('{RAW_JOB_DATA_PLACEHOLDER}', jobData)
          .replace('{INSTRUCTIONS}', this.getObjectives(fields))
          .replace('{TARGET_STRUCTURE}', this.getTargetStructure(fields));
    }

    private getObjectives(fields: FieldBase[]): string{
        let objectives = [] as string[];
        return objectives.join('\n');
    }

    private getTargetStructure(fields: FieldBase[]): string{
        let fieldsDescription = [] as string[];
        return fieldsDescription.join('\n');
    }

}