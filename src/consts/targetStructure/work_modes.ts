import FieldBase from "./FieldBase";

class WorkModesField implements FieldBase {
  value = `  "work_modes": [//e.g., "Remote", "Hybrid", "On-site"]`;
  array = true;
  nested = false;
}
export default WorkModesField; 