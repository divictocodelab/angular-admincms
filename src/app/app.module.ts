import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToasterService } from './shared/services/toaster.service';
import { ToastrModule } from 'ngx-toastr';
import { ApiHandler } from './shared/services/api-handler.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TokenInterceptor } from './app.interceptor';
import { SharedModule } from './shared/module/shared.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards';
import { TokenManager } from './shared/services/token-manager.service';
import { AuthenticationService } from './auth/service';
import { NgxPaginationModule } from 'ngx-pagination';
import { LayoutService } from './shared/components/layout/service/layout.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    HttpClientModule,
  ],
  providers: [
    ToasterService,
    ApiHandler,
    AuthenticationService,
    AuthGuard,
    ApiHandler,
    TokenManager,
    LayoutService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
