import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Map } from '../models/map';
import 'rxjs/add/observable/of';

@Injectable()
export class MapService {
	map: Map;

	constructor(private http: HttpClient) { }

	parseMapResponse(id: string): Observable<Map> {
		return this.http.get('./assets/maps/'+id+'.svg', {responseType: 'text'})
		.map((svg: any) => {
			this.map = {
				id: id,
				data: svg
			};
			return this.map;
		});
	}

	getMap(id: string): Observable<Map> {
		if (this.map) {
			return Observable.of(this.map);
		} else {
			return this.parseMapResponse(id);
		}
	}

}
