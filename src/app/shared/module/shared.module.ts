import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../components/layout/header/header.component';
import { FooterComponent } from '../components/layout/footer/footer.component';
import { NavigationBarComponent } from '../components/layout/navigation-bar/navigation-bar.component';
import { SidebarComponent } from '../components/layout/sidebar/sidebar.component';
import { NoDataComponent } from '../components/no-data/no-data.component';
import { ConfirmationBoxComponent } from '../components/confirmation-box/confirmation-box.component';
import { NumberOnlyDirective } from '../directives/number.directive';
import { TrimValueAccessorDirective } from '../directives/trim-value-accessor.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NoDataComponent,
    NavigationBarComponent,
    SidebarComponent,
    ConfirmationBoxComponent,
    NumberOnlyDirective,
    TrimValueAccessorDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavigationBarComponent,
    SidebarComponent,
    NoDataComponent,
    ConfirmationBoxComponent,
    NumberOnlyDirective,
    TrimValueAccessorDirective
  ]
})
export class SharedModule { }
