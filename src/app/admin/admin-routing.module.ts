import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: '',
      component: DashboardComponent
    },
    // {
    //   path: '',
    //   loadChildren: './manage-users/manage-users.module#ManageUsersModule'
    // },
    {
      path: 'users',
      loadChildren: './manage-users/manage-users.module#ManageUsersModule'
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
