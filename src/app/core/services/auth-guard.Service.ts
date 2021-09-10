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
import { FeatureFlagsService } from '../core/services/feature-flags.service';

//see
//https://stackoverflow.com/questions/38425461/angular2-canactivate-calling-async-function

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private flagService: FeatureFlagsService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkFeatureFlag();
  }

  async checkFeatureFlag(): Promise<boolean> {
    // Implement your authentication in authService
    const isFlagOn = await this.flagService.isFeatureFlagEnabled("FlagA");

    if (!isFlagOn)
      alert('Sorry! Not today.');

    return isFlagOn;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
