import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { Center } from '../models/center';
import { Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

import { CentersService } from '../services/centers.service';
import { ClientService } from '../services/client.service';
import { autocompleteValidator } from '../validators/autocomplete-validator';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnDestroy, OnInit {

	detailsForm: FormGroup;	
	centers: Center[];
	filteredCenters: Observable<Center[]>;
	centerSubscription: ISubscription;

	constructor(
		private fb: FormBuilder,
		private centersService: CentersService,
		private clientService: ClientService,
		private router: Router) {
		this.createForm();
	}

	createForm() {
		this.detailsForm = this.fb.group({
			center: ['', [Validators.required], autocompleteValidator(this.centersService)],
			date: [new Date(Date.now()), Validators.required]
		});
	}

	ngOnInit() {
		// unset clients
		this.clientService.unset();

		// get centers
		this.centerSubscription = this.centersService.getCenters().subscribe(centers => this.centers = centers);
		
		// filter centers as input updates
		this.filteredCenters = this.detailsForm.controls.center.valueChanges
			.pipe(
				startWith(''),
				map(val => this.filter(val))
			);
	}

	ngOnDestroy() {
		this.centerSubscription.unsubscribe();
	}

	filter(val: string): Center[] {
		return this.centers ? this.centers.filter(center => center.name.toLowerCase().indexOf(val.toLowerCase()) > -1) : [];
	}

	onSubmit() {
		if (this.detailsForm.valid) {
			// send provided answers to clients service, which will find associated clients and set an array of them. Then go to route /clients
			this.clientService.setClients(this.detailsForm.controls.center.value, this.detailsForm.controls.date.value);
			this.router.navigate(['/clients']);
		}
	}

}
