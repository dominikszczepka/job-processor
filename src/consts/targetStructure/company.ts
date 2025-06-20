import FieldBase from "./FieldBase";

class CompanyField implements FieldBase {
  value = `"company": {
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
  }`;
  array = false;
  nested = true;
}
export default CompanyField; 

