import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppInitService } from './core/services/app-init.service';

export function initializeApp1(appInitService: AppInitService) {
  return (): Promise<any> => {
    return appInitService.Init();
  }
}


//const appInitFactoryFactory = (appInitService: AppInitService) => () =>
//  appInitService.Init();

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initializeApp1, deps: [AppInitService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
