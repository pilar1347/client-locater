import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Center } from '../models/center';
import { Client } from '../models/client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientService {
	clients: Client[];
	date: Date;
	center: Center;

  	constructor(private http: HttpClient) { }

  	setClients(center: Center, date: Date): void {
  		// for now we'll just get a json file of clients, but this would be call to BE service
  		this.date = date;
  		this.center = center;
  		this.parseClientResponse();
  	}

  	parseClientResponse(): Observable<Client[]> {
  		return this.http.get('./assets/clients.json')
  		.map((response: Response) => response)
  		.map((json: any) => {
  			// sort by name
  			this.clients = json.sort((a: Client, b: Client) => {
  				return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  			});  			
  			return this.clients;
  		});
  	}

  	getClients(): Observable<Client[]> {
  		if (this.clients) {
  			return Observable.of(this.clients);
  		} else {
  			return this.parseClientResponse();
  		}
  	}

    getClient(id: number | string): Observable<Client> {
      return this.getClients()
        .map(clients => clients.find(client => client.id === +id));
    }

  	getChosenDate() {
  		// return this.date;
      // for demo, return selected date or today
      // in final, return selected date or if none selected redirect to details page
  		return this.date || new Date(Date.now());
  	}

  	getCenter() {
      // For demo center is always demo mapSvg
  		return { name: 'mapSvg' };
  		// return this.center;
  	}

  	unset() {
  		this.clients = null;
  	}

}
