import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlagsRoutingModule } from './flags-routing.module';
import { FlagsComponent } from './flags.component';

@NgModule({
  declarations: [
    FlagsComponent
  ],
  imports: [
    CommonModule,
    FlagsRoutingModule
  ]
})
export class FlagsModule { }
