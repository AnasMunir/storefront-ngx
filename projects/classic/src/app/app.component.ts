import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { map, share, catchError, tap } from 'rxjs/operators';
import { TransferState, makeStateKey } from '@angular/platform-browser';

const STATE_KEY = makeStateKey('appState');

@Component({
  selector: 'fishry-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'classic';

  constructor(private http: Http, private state: TransferState) {
    let resp = this.state.get(STATE_KEY, null as any);
    if (resp) {
      console.log('resp already set', resp);
    } else {
      this.fetchGeneralSettings().subscribe(resp => {
        console.log('resp not set', resp);
        this.state.set(STATE_KEY, resp as any);
      });
    }
  }

  private fetchGeneralSettings(appDomain?: string) {
    let response = this.http.get(`https://fishry-storefront-apis-stg.azurewebsites.net/get-store-info?domain=${'classic.stgfishry.com'}`);
    return response.pipe(
      map(resp => resp.json().data),
      share()
    );
  }
}
