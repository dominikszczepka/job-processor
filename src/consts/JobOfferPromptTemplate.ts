const JobOfferTemplate = `
Objective: Extract information from the raw job offer data provided below and map it into a JSON object in a single line (no newlines, no indentation, no comments).
Instructions:
1. Analyze the "Raw Job Offer Data".
2. Populate the fields in the "Target JSON Structure" based on the analyzed data.
3. Infer data types where possible (e.g., numbers for salary values, booleans for flags, ISO 8601 for timestamps). Use standard 3-letter currency codes (e.g., "USD", "EUR"). Standardize salary periods (e.g., "yearly", "monthly", "hourly").
4. For nested objects (\`company\`, \`location\`, \`salary\`, \`industry\`, \`profession\`), extract the relevant details. If a nested object's data is entirely missing, you *can* omit the object key (e.g., omit \`"profession": {}\` if no profession info is found).
5. For arrays (\`benefits\`, \`requirements\`, \`work_modes\`, \`contract_types\`, \`keywords\`), list the identified items as strings. If none are found, use an empty array \`[]\`.
6. For Keywords array, extract relevant keywords from the Raw Job Offer Data.
7. For Benefits, requirements and keywords make sure all entries are logically divided and use verbless sentences in polish.
8. For Description, make sure to come up with the most relevant description of the Raw Job Offer Data. 
9. For Industry, make sure to come up with the most relevant industry based on the Raw Job Offer Data. 
9. Use \`null\` for optional fields where data is missing or cannot be determined (e.g., \`company.description\`, \`location.latitude\`).
10. Prioritize accuracy and completeness based *only* on the provided raw data.
11. Output *only* the final JSON object (\`json\`).
Target JSON Structure:
{
  "external_id": null, // id as number or string
  "source_url": "string",
  "source_website": "string",
  "title": "string",
  "description": "string",
  "publication_timestamp": "iso8601_string",
  "expires_at": "iso8601_string",
  "is_remote_recruitment": null, // boolean
  "experience_level": "string", // e.g., "Junior", "Senior", "Entry-Level"
  "company": {
    "name": "string",
    "description": "string",
    "is_agency": null, // boolean
    "tax_identification_number": "string",
    "location": { // Company's location
      "country": "string",
      "city": "string",
      "latitude": null, // number
      "longitude": null, // number
      "country_iso_code": null //e.g. "PL"
    }
  },
  "location": { // Job's location
    "country": "Polska",
    "city": "Warszawa",
    "latitude": null, //number
    "longitude": null, //number
    "country_iso_code": null //e.g. "PL"
  },
  "salary": {
    "min_value": null, // number
    "max_value": null, // number
    "currency": null, // e.g., "USD", "EUR"
    "type": "NET", //e.g., "GROSS", "NET"
    "period": "string" //e.g., "yearly", "monthly", "hourly"
  },
  "industry": "string",
  "profession": "string",
  "benefits": [
    "string"
  ],
  "requirements": [
    "string"
  ],
  "work_modes": [//e.g., "Remote", "Hybrid", "On-site"
    "string"
  ],
  "contract_types": [//e.g., "Full-time", "Part-time", "Contract"
    "string"
  ],
  "keywords": [//relevant skills, technologies, etc.)
    "string"
  ]
}
Raw Job Offer Data:
{RAW_JOB_DATA_PLACEHOLDER}
`

export default JobOfferTemplate;