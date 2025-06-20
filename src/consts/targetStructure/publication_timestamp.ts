import FieldBase from "./FieldBase";

class PublicationTimestampField implements FieldBase {
  value = `"publication_timestamp": "iso8601_string"`;
  array = false;
  nested = false;
}
export default PublicationTimestampField; 