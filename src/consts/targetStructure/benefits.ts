import FieldBase from "./FieldBase";

class BenefitsField implements FieldBase {
  value = `"benefits": [ "string" ]`;
  array = true;
  nested = false;
}
export default BenefitsField; 