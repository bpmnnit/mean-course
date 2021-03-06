import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from '../angular-material.module';
import { AtlasCreateComponent} from './atlas-create/atlas-create.component';
import { AtlasListComponent } from './atlas-list/atlas-list.component';

@NgModule({
  declarations:[
    AtlasCreateComponent,
    AtlasListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
  ],
})
export class AtlasModule {

}
