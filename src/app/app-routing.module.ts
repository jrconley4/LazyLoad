import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureGuard } from './core/guards/feature-guard';
import { AuthGuard } from './core/guards/auth-guard';


const routes: Routes = 
  [{ path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule),
  canLoad: [FeatureGuard],
  canActivate: [ AuthGuard ],
  data: {
    moduleFlagName: "FlagA",
    pathFlagName: "FlagA"
  } }, 
   { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule),
   canLoad: [FeatureGuard],
   canActivate: [ AuthGuard ],
   data: {
    moduleFlagName: "FlagA",
    pathFlagName: "FlagA"
   } },
  { path: 'flags', loadChildren: () => import('./flags/flags.module').then(m => m.FlagsModule),
  canLoad: [FeatureGuard],
  canActivate: [ AuthGuard ],
  data: {
    moduleFlagName: "FlagB",
    pathFlagName: "FlagB"
  } }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
