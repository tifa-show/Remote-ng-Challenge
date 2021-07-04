import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateTeamComponent} from "./team/create-team/create-team.component";
import {RidersListComponent} from "./riders-list/riders-list.component";

const routes: Routes = [
  {
    path : '',
    redirectTo : 'riders',
    pathMatch : 'full'
  },
  {
    path : 'create-team',
    component : CreateTeamComponent
  },
  {

    path : 'riders',
    component : RidersListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
