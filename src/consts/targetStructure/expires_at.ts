import FieldBase from "./FieldBase";

class ExpiresAtField implements FieldBase {
  value = `"expires_at": "iso8601_string"`;
  array = false;
  nested = false;
}
export default ExpiresAtField; 