import JobOfferTemplate from "../consts/JobOfferPromptTemplate";

export class PromptsGenerator {
    public generateJobOfferPrompt(rawJobData: string): string {
        return JobOfferTemplate.replace('{RAW_JOB_DATA_PLACEHOLDER}', rawJobData);
    }
}