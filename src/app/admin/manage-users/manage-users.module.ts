import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUsersRoutingModule } from './manage-users-routing.module';
import { ManageUsersComponent } from './manage-users.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ManageUsersComponent,
     UserListComponent,
     UserAddComponent,
     UserEditComponent,
     UserDetailComponent,
    ],
  imports: [
    CommonModule,
    ManageUsersRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class ManageUsersModule { }
