import {
  Injectable
} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {
  Observable
} from 'rxjs';
import { FeatureFlagsService } from '../services/feature-flags.service';

//see
//https://stackoverflow.com/questions/38425461/angular2-canactivate-calling-async-function

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private flagService: FeatureFlagsService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const { data } = route;
    const pathFlagName = data?.pathFlagName;
    console.log('pathFlagName data: "' + pathFlagName);

    return this.checkFeatureFlag(pathFlagName);
  }

  async checkFeatureFlag(pathFlagName :string): Promise<boolean> {
    // Implement your authentication in authService
    const isFlagOn = await this.flagService.isFeatureFlagEnabled(pathFlagName);

    if (!isFlagOn)
      alert("Can't go there! FlagA is off.");

    return isFlagOn;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
