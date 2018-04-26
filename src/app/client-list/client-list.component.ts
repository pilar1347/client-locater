import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Client } from '../models/client';
import { Center } from '../models/center';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
	@Input() clients: Client[];
	@Input() date: Date;
	@Input() center: Center;

	@Output() navToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

	checkIn: string = 'any';

	constructor(private router: Router) { }

	ngOnInit() {
		
	}

	navOpen() {
		this.navToggle.emit(true);
	}

	filterList() {
		// TODO: if client is selected, unselect
		// changing route drops radio selection..
		// this.router.navigate(['/clients']);
	}


}
