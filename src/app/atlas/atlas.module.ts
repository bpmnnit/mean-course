import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from '../angular-material.module';
import { MatSelectModule } from '@angular/material/select';
import { AtlasCreateComponent} from './atlas-create/atlas-create.component';
import { AtlasListComponent } from './atlas-list/atlas-list.component';
import { MatDatepickerModule, MatNativeDateModule, MatTableModule, MAT_DATE_LOCALE } from '@angular/material';

@NgModule({
  declarations:[
    AtlasCreateComponent,
    AtlasListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB'} // To have the MAT date format as DD/MM/YYYY
  ],
})
export class AtlasModule {

}
