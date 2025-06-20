import FieldBase from "./FieldBase";

class WorkDaysField implements FieldBase {
    value = `"work_days": {
        "is_monday_workday": null, // boolean
        "is_tuesday_workday": null, // boolean
        "is_wednesday_workday": null, // boolean
        "is_thursday_workday": null, // boolean
        "is_friday_workday": null, // boolean
        "is_saturday_workday": null, // boolean
        "is_sunday_workday": null, // boolean
        "are_holidays_workdays": null, // boolean
        "description" : null // string
    }`;
    array = false;
    nested = true;
  }
  export default WorkDaysField; 