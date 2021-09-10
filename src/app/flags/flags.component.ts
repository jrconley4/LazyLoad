import { Component, OnInit } from '@angular/core';
import { FeatureFlagsService } from '../core/services/feature-flags.service';
import { Flag } from '../core/models/flag.model';
import { Observable, EMPTY, Subject, of } from 'rxjs';
import { List } from 'immutable';

@Component({
  selector: 'app-flags',
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.css']
})
export class FlagsComponent implements OnInit {
  flags$!: Observable<List<Flag>>;

  constructor(private flagsService: FeatureFlagsService) {}

  ngOnInit(): void {
    //get the preloaded flags from the service
    this.flags$ = this.flagsService.flags$;
  }

  onToggle(flagId: number): void {
    //this.flagsService.setFlag();
  }
}
