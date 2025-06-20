import FieldBase from "./FieldBase";

class RequirementsField implements FieldBase {
  value = `"requirements": [ "string" ]`;
  array = true;
  nested = false;
}
export default RequirementsField; 