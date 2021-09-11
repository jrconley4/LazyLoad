import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FeatureFlagsService } from '../services/feature-flags.service';

@Injectable({
  providedIn: 'root',
})
export class FeatureGuard implements CanLoad {
  constructor(
    private featureFlagsService: FeatureFlagsService,
    private router: Router
  ) {}
    
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    /*const {
      data: { feature },
    } = route; */

    const { data } = route;
    const moduleFlagName = data?.moduleFlagName;
    console.log('moduleFlagName data: "' + moduleFlagName);

    if (moduleFlagName) {
      const isEnabled = this.featureFlagsService.isFeatureFlagEnabled(moduleFlagName);
      console.log('isEnabled: "' + isEnabled);
      
      if (isEnabled) {
        return true;
      }
    }

    this.router.navigate(['/']);
    return false;
  }
}
