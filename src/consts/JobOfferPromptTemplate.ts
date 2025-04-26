const JobOfferTemplate = `
Objective: Extract information from the raw job offer data provided below and map it into a structured JSON object.

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
  "external_id": null, // or number/string if present in raw data
  "source_url": "string",
  "source_website": "string_or_null",
  "title": "string",
  "description": "string_or_null",
  "publication_timestamp": "iso8601_string_or_null",
  "expires_at": "iso8601_string_or_null",
  "is_remote_recruitment": null, // boolean_or_null
  "experience_level": "string_or_null", // e.g., "Junior", "Senior", "Entry-Level"

  "company": {
    "name": "string",
    "description": "string_or_null",
    "is_agency": null, // boolean_or_null
    "tax_identification_number": "string_or_null",
    "location": { // Company's location
      "country": "string_or_null",
      "city": "string_or_null",
      "latitude": null, // number_or_null
      "longitude": null, // number_or_null
      "country_iso_code": "2_letter_string_or_null"
    }
  },

  "location": { // Job's location
    "country": "string_or_null",
    "city": "string_or_null",
    "latitude": null, // number_or_null
    "longitude": null, // number_or_null
    "country_iso_code": "2_letter_string_or_null"
  },

  "salary": {
    "min_value": null, // number_or_null
    "max_value": null, // number_or_null
    "currency": "3_letter_code_or_null", // e.g., "USD", "EUR"
    "type": "NET", // e.g., "GROSS", "NET"
    "period": "string_or_null" // e.g., "yearly", "monthly", "hourly"
  },

  "industry": { // Primary job industry
    "name": "string_or_null"
  },

  "profession": { // Primary job profession
    "name": "string_or_null"
  },

  "benefits": [ // Array of strings
    "string"
  ],

  "requirements": [ // Array of strings
    "string"
  ],

  "work_modes": [ // Array of strings, e.g., "Remote", "Hybrid", "On-site"
    "string"
  ],

  "contract_types": [ // Array of strings, e.g., "Full-time", "Part-time", "Contract"
    "string"
  ],

  "keywords": [ // Array of strings (relevant skills, technologies, etc.)
    "string"
  ]
}

Raw Job Offer Data:
{RAW_JOB_DATA_PLACEHOLDER}
`

export default JobOfferTemplate;