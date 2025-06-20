import FieldBase from "./FieldBase";

class ExperienceLevelField implements FieldBase {
  value = `"experience_level": "string" // e.g., "Junior", "Senior", "Entry-Level"`;
  array = false;
  nested = false;
}
export default ExperienceLevelField; 