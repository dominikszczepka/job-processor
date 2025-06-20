import FieldBase from "./FieldBase";

class MultipleVacanciesField implements FieldBase {
    value = `"multiple_vacancies": { 
      "multipleVacancies": true, // boolean
      "number": 3 // number of vacancies
      }`;
    array = false;
    nested = true;
  }
  export default MultipleVacanciesField; 