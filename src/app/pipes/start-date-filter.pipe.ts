import { Pipe, PipeTransform } from '@angular/core';
import { Client } from '../models/client';
import 'rxjs/add/operator/filter';

@Pipe({
  name: 'startDateFilter'
})
export class StartDateFilterPipe implements PipeTransform {

  sameDate(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  transform(value: any, dateOrAny: any): any {
  	// dateOrAny will be date or 'any'
  	if (dateOrAny === 'any') {
  		return value;
  	} else if (value) {
  		return value.filter((a) => {
  			return this.sameDate(new Date(a.startDate), new Date(dateOrAny));
  		});
  	}
  }

}
