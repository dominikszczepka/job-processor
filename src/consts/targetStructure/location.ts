import FieldBase from "./FieldBase";

class LocationField implements FieldBase {
  value = `"location": { 
    "country": "Polska",
    "city": "Warszawa",
    "latitude": null, //number 
    "longitude": null, //number 
    "country_iso_code": null //e.g. "PL"
    }`;
  array = false;
  nested = true;
}
export default LocationField; 