import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Client, SimTime } from '../models/client';
import { ClientService } from '../services/client.service';
import { Center } from '../models/center';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ISubscription } from "rxjs/Subscription";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnDestroy, OnInit {
	clients: Client[];
	client: Observable<Client>;
	date: Date;
	center: Center;
	activeSims: SimTime[];
	params: ParamMap;
	clientSubscription: ISubscription;
	paramSubscription: ISubscription;

	@ViewChild('sidenav') sideNav: MatSidenav;

	constructor(private clientService: ClientService,
		private route: ActivatedRoute,
		private router: Router,
		private cdRef: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.clientSubscription = this.clientService.getClients().subscribe(clients => this.clients = clients);

		this.date = this.clientService.getChosenDate();
		this.center = this.clientService.getCenter();

		// subscribe to route paramter to watch for changes to selected client and parameters
		this.paramSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
			this.params = params;
			this.client = this.clientService.getClient(params.get('clientId'));
		});

	}

	ngAfterViewChecked() {
		// change detection needed when sidenav is closed from child map component
		if (!this.sideNav.opened) {
			this.sideNav.opened = false;
		}
		this.cdRef.detectChanges();
	}

	ngOnDestroy() {
		// cleanup on destroy
		this.clientSubscription.unsubscribe();
		this.paramSubscription.unsubscribe();
	}

	isInSim(simSchedule: SimTime[]): SimTime[] {
		this.activeSims = [];
		// only include sims they are scheduled for on selected date (not looking at exact times)
		for (let sim of simSchedule) {
			if (new Date(sim.startDate) < new Date(this.date) &&
				new Date(sim.endDate) > new Date(this.date)) {
				this.activeSims.push(sim);
			}
		}
		return this.activeSims;
	}

	openMap(location: SimTime | string) {
		let room = location.hasOwnProperty('sim') ? (location as any).sim : location;
		// floor is 1 if sim, 1 if room # starts with 1 and 2 if room starts with 2
		let floor = location.hasOwnProperty('sim') ? 1 : location.toString().substr(0,1) === '1' ? 1 : 2;

		// pass in correct map, floor and room
		this.router.navigate(['map', this.center.name, 'floor', floor, 'room', room], {relativeTo: this.route});

	}



}
