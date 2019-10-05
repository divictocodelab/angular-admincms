import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageUsersComponent } from './manage-users.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [{
  path: '',
  component: ManageUsersComponent,
  children: [
    {
      path: '',
      component: UserListComponent
    },
    {
      path: 'list',
      component: UserListComponent
    },
    {
      path: 'add',
      component: UserAddComponent
    },
    {
      path: ':id/edit',
      component: UserEditComponent
    },
    {
      path: ':id/detail',
      component: UserDetailComponent
    },
   
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUsersRoutingModule { }
