import FieldBase from "./FieldBase";

class ContractTypesField implements FieldBase {
  value = `"contract_types": [//e.g., "Full-time", "Part-time", "Contract"]`;
  array = true;
  nested = false;
}
export default ContractTypesField;