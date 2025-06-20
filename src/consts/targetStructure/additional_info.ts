import FieldBase from "./FieldBase";

class AdditionalInfoField implements FieldBase {
    value = `"additional_info": [ {name : "string", value : [ "string" ]} ]`;
    array = true;
    nested = true;
  }
  export default AdditionalInfoField; 