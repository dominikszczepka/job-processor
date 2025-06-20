import FieldBase from "./FieldBase";

class WorkHoursField implements FieldBase {
    value = `"work_hours": {
        "start_time": null, // string
        "end_time": null // string
    }`;
    array = false;
    nested = true;
  }
  export default WorkHoursField; 