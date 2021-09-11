import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Flag } from '../models/flag.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { List } from 'immutable';

//todo: move this to it's own file or refactor out
interface booleanReturn {
  retData: boolean;
}

@Injectable({ providedIn: 'root' })
export class FeatureFlagsService {
  //https://gist.github.com/seidme/0eab3aa431db2e9b1dceb17a0cc569f7#file-puppies-store-service-ts
  // Make _flagsSource private so it's not accessible from the outside, 
  // expose it as flags$ observable (read-only) instead.
  // Write to _flagsSource only through specified store methods below.

  //good
  private _flagsSource: BehaviorSubject<List<Flag>> = new BehaviorSubject(List<Flag>([]));

  // Exposed observable (read-only).
  //todo: add readonly in front of flag$ and use loadFlags logic to populate _flagsSource
  readonly flags$ = this._flagsSource.asObservable();
  private flagsUrl = 'https://localhost:5001/api/FeatureFlags/';

  //good
  constructor(private http: HttpClient) { }

  //good
  setFlag(flagId: number, bitValue: boolean) {
    this.http.post<any>(this.flagsUrl + 'SetFlag', { flagId: flagId, newValue: bitValue }).subscribe(data => {
      this.loadInitialData();
      //this.postId = data.id;
    });
  }

  //todo: combine with load flags
  private getAllFlags(): Observable<Flag[]> {
    // All flags observable
    return this.http.get<Flag[]>(this.flagsUrl)
      .pipe(
        tap(data => console.log('Flags', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  //todo: this makes a call to the API. Need to check the in-memory store (flags)
  async isFeatureFlagOn(flagId: number): Promise<boolean> {
    //we have to do a promise to wait for it
    const data = await this.http.get<booleanReturn>(this.flagsUrl + 'Value/' + flagId).toPromise();

    console.log("Data: " + JSON.stringify(data));

    //not sure why it must be done this way, but it works.
    if (data)
      return true;
    else
      return false;
  }

  //delete me
  getFeatureFlag(flagName: string): Flag {
    let flags = this._flagsSource.getValue();
    let index = flags.findIndex((flag: Flag) => flag.name === flagName);
    let flag: Flag = flags.get(index)!; // flag: Flag 

    return flag;
  }

  //todo: test to see if this works. if so, get rid of isFeatureFlagOn
  isFeatureFlagEnabled(flagName: string): boolean {
    //let isOn: boolean = this._flagsSource[flag]; //this.flags$ && this.flags$[flag];

    let flag: Flag = this.getFeatureFlag(flagName);
    let isOn = flag && flag.bitValue;

    return isOn;
  }

  loadInitialData() {
    this.getAllFlags()
      .subscribe(
        res => {
          let flags = (<Object[]>res).map((flag: any) =>
            new Flag({ flagId: flag.flagId, name: flag.name, bitValue: flag.bitValue }));

          this._flagsSource.next(List(flags));
        },
        err => console.log("Error retrieving Flags")
      );
  }

  //add this?
  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }


  /*
  loadFlags(): void {
    this.flags$ = this.fetchFlags();
    console.log(this.flags$);
  }

  //todo: figure out how to use loadFlags to populate _flagsource
  /*
  loadFlags() {
    this.myflags$ = this.fetchFlags();

    this._flagsSource.next(this.myflags$);

    this._setFlags(this.myflags$);
    this.flags$ = this.getFlags();
    console.log('Flags = ' + this.flags$)
  }
  */

  // ------------------------------------------------------------------------------------------
  // client-side options that we may or may not need
  // ------------------------------------------------------------------------------------------

  // Get last value without subscribing to the flags$ observable (synchronously).
  /*
  getFlags(): Flag[] {
    return this._flagsSource.getValue();
  }

  private _setFlags(flags: Flag[]): void {
    this._flagsSource.next(flags);
  }

  addFlag(flag: Flag): void {
    const flags = [...this.getFlags(), flag];
    this._setFlags(flags);
  }

  removeFlag(flag: Flag): void {
    const flags = this.getFlags().filter(p => p.FlagId !== flag.FlagId);
    this._setFlags(flags);
  }

  setFlagOn(flag: Flag): void {
    const flags = this.getFlags().map(p =>
      p.FlagId === flag.FlagId ? { ...p, ...{ BitValue: true } } : p
    );
    this._setFlags(flags);
  }

  setFlagOff(flag: Flag): void {
    const flags = this.getFlags().map(p =>
      p.FlagId === flag.FlagId ? { ...p, ...{ BitValue: false } } : p
    );
    this._setFlags(flags);
  }

  /*
  loadFlags(flag: Flag): void {
    this.flags$ = this.flagsService.getFlags();
    console.log(this.flags$);
  }
  */
}
