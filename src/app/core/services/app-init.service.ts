import { Injectable } from '@angular/core';
import { FeatureFlagsService } from './feature-flags.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(private flagsService: FeatureFlagsService) { }

  Init() {

    return new Promise<void>((resolve, reject) => {
      console.log("AppInitService.init() called");
      ////do your initialisation stuff here

      /*
        export function preloadUser(userService: UserService) {
          return function () {
            return userService.getUser().toPromise();
          };
        }
      */

      this.flagsService.loadInitialData();
      console.log('AppInitService Finished');
      resolve();
    })
  }
}
