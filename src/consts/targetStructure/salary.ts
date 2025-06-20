import FieldBase from "./FieldBase";

class SalaryField implements FieldBase {
  value = `"salary": {
    "min_value": null, // number
    "max_value": null, // number
    "currency": null, // e.g., "USD", "EUR"
    "type": "NET", //e.g., "GROSS", "NET"
    "period": "string" //e.g., "yearly", "monthly", "hourly"
  }`;
  array = false;
  nested = true;
}
export default SalaryField; 