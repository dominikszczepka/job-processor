const JobOfferTemplate = `
Objective: Extract information from the job offer data provided below and map it into a JSON object in a single line (no newlines, no indentation, no comments).
Instructions:
1. Analyze the "Raw Job Offer Data".
2. Populate the fields in the "Target JSON Structure" based on the analyzed data.
3. Prioritize accuracy and completeness based *only* on the provided raw data.
4. Use \`null\` for optional fields where data is missing or cannot be determined.
5. Infer data types where possible (e.g., numbers for salary values, booleans for flags, ISO 8601 for timestamps).
{INSTRUCTIONS}

Target JSON Structure:
{TARGET_STRUCTURE}

Raw Job Offer Data:
{RAW_JOB_DATA_PLACEHOLDER}
`

export default JobOfferTemplate;