import FieldBase from "./FieldBase";

class ExternalIdField implements FieldBase {
  value = `"external_id": null // id as number or string`;
  array = false;
  nested = false;
}
export default ExternalIdField; 