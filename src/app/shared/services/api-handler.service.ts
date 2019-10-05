import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenManager } from '../../shared/services/token-manager.service';
import { timeout } from 'rxjs/operators';

interface Extras {
  contentType: {
    isFormDataContent?: boolean;
    isJsonContent?: boolean;
  };
}

@Injectable()

export class ApiHandler {
  constructor(private http: HttpClient) { }

  apiGet(url, params?, extras?: Extras) {
    let options = this.renderHeaders(extras);
    options = this.appendParams(options, params);
    return this.http.get(url, options).pipe(timeout(30000));
  }

  apiPost(url, reqBody, extras?: Extras) {
    const options = this.renderHeaders(extras);
    return this.http.post(url, reqBody, options).pipe(timeout(30000));
  }

  apiUpdate(url, reqBody, extras?: Extras) {
    const options = this.renderHeaders(extras);
    return this.http.put(url, reqBody, options).pipe(timeout(30000));
  }

  apiDelete(url, extras?) {
    const options = this.renderHeaders(extras);
    return this.http.delete(url);
  }

  private renderHeaders(extras: Extras) {
    // if extras is present then apply check
    if (extras) {
      if (extras.contentType.isFormDataContent) {
        return {};
      }
    } else {
      // else assume it to be json data
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
    }
  }

  private appendParams(originalOptions, paramsObj) {
    let params = new HttpParams();
    for (const key in paramsObj) {
      if (paramsObj.hasOwnProperty(key)) {
        if (key === 'offset') {
          const val = paramsObj[key] ;
          params = params.append('offset', val.toString());
          //  params = params.append('page_num', val.toString());
        } else {
          params = params.append(key, paramsObj[key]);
        }
      }
    }
    return Object.assign({}, originalOptions, { params: params });
  }
}
