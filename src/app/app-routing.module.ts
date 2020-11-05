import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { AuthGuard } from './auth/auth.guard';
import { DprComponent } from './gps/dprs/dpr.component';
import { AtlasCreateComponent } from './atlas/atlas-create/atlas-create.component';
import { AtlasListComponent } from './atlas/atlas-list/atlas-list.component';
import { AcqProjectCreateComponent } from './acqproject/acqproject-create/acqproject-create.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'dprcreate', component: DprComponent },
  { path: 'atlascreate', component: AtlasCreateComponent, canActivate: [AuthGuard] },
  { path: 'atlaslist', component: AtlasListComponent, canActivate: [AuthGuard] },
  { path: 'acqprojcreate', component: AcqProjectCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) } // lazy loading
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
