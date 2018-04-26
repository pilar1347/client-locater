import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsComponent } from './details/details.component';
import { ClientsComponent } from './clients/clients.component';
import { MapComponent } from './map/map.component';

const routes = [
	{
		path: '',
		redirectTo: '/details',
		pathMatch: 'full'
	},
	{
		path: 'details',
		component: DetailsComponent
	},
	{
		path: 'clients',
		component: ClientsComponent
	},
	{
		path: 'clients/:clientId',
		component: ClientsComponent
	},
	{
		path: 'clients/:clientId/map/:mapId/floor/:floorNum/room/:roomId',
		component: ClientsComponent
	}
]

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
 	exports: [ RouterModule ]
})
export class AppRoutingModule { }
