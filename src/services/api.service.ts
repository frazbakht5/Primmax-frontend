import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../../../environments/environment';

const environment = {
  apiUrl: 'http://54.198.183.160:5000/api/',
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  /**
   * @method httpGetWithUrl
   * @param url
   * @description this method uses http get
   */
  public httpGetWithUrl(url: any) {
    return this.http.get(url);
  }

  /**
   * @method httpPostWithUrl
   * @param url
   * @description this method uses http get
   */
  public httpPostWithUrl(url: string, data: any) {
    return this.http.post(url, data);
  }
  /**
   * @method httpGet
   * @param url
   * @description this method uses http get
   */
  public httpGet(url: string) {
    return this.http.get(environment.apiUrl + url);
  }

  /**
   * @method httpPost
   * @param url
   * @param body
   * @description this method uses http post
   */
  public httpPost(url: string, body: any) {
    return this.http.post(environment.apiUrl + url, body);
  }

  /**
   * @method httpPut
   * @param url
   * @param body
   * @description this method uses http put
   */
  public httpPut(url: string, body: any) {
    return this.http.put(environment.apiUrl + url, body);
  }

  /**
   * @method httpDelete
   * @param url
   * @description this method uses http delete
   */
  public httpDelete(url: string) {
    return this.http.delete(environment.apiUrl + url);
  }
  /**
   * @method downloadFile
   * @param url
   * @description this method uses http delete
   */
  public downloadFile(url: string): any {
    return this.http.get(url, { responseType: 'blob' });
  }
}
