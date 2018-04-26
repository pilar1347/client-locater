import * as SVG from 'svg.js';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { ClientsComponent } from './clients/clients.component';
import { MapComponent } from './map/map.component';
import { ClientListComponent } from './client-list/client-list.component';
import { AppRoutingModule } from './app-routing.module';

import { CentersService } from './services/centers.service';
import { ClientService } from './services/client.service';
import { MapService } from './services/map.service';
import { StartDateFilterPipe } from './pipes/start-date-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    ClientsComponent,
    MapComponent,
    ClientListComponent,
    StartDateFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    CentersService,
    ClientService,
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
