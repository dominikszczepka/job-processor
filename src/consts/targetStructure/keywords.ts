import FieldBase from "./FieldBase";

class KeywordsField implements FieldBase {
  value = `"keywords": [ "string" // relevant skills, technologies, etc. ]`;
  array = true;
  nested = false;
}
export default KeywordsField; 