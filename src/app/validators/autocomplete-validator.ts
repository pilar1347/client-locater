/** autocomplete input must match item in list */
import { Center } from '../models/center';
import { CentersService } from '../services/centers.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function autocompleteValidator(centersService: CentersService): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {

  	// return null if valid or validation error object
  	return centersService.getCenters().map(res => {
  		// check that selection is in centers array
  		let isValid = false;
  		for (let center of res) {
  			if (center.name === control.value) {
  				isValid = true;
  				break;
  			}
  		}
  		return isValid ? null : { 'autocompleteInvalid': {value: control.value} };
  	});

  };
}