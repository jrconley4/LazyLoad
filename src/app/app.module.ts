import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FeatureFlagsService } from './core/services/feature-flags.service';
import { FeatureFlagDirectiveModule } from "./core/directives/feature-directive.module";
//import { AppInitService } from './core/services/app-init.service';

export function initializeApp1(featureFlagsService: FeatureFlagsService) {
  return () => featureFlagsService.loadInitialData().toPromise();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FeatureFlagDirectiveModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initializeApp1, deps: [FeatureFlagsService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
