import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Center } from '../models/center';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class CentersService {
	centers: Center[];

  	constructor(private http: HttpClient) { }

  	getCenters(): Observable<Center[]> {

  		if (this.centers) {
  			// return cached centers
  			return Observable.of(this.centers);
  		} else {
  			// centers not yet stored
	   		return this.http.get('./assets/centers.json')
	  			.map((response: Response) => response)
	  			.map((json: any) => {
	  				this.centers = json.sort((a:Center, b:Center) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0 )
	  				return this.centers;
	  			}); 			
  		}

	}

}
