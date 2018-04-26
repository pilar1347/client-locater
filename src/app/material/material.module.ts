import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatAutocompleteModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule, MatListModule, MatIconModule, MatRadioModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatRadioModule
  ],
  exports: [
  	MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatRadioModule
  ],
  declarations: []
})
export class MaterialModule { }
