import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonDetailsComponent } from './person-details/person-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/person-list', pathMatch: 'full' },
  { path: 'person-list', component: PersonListComponent },
  { path: 'person-details', component: PersonDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
