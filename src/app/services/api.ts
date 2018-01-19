import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ServiceBase, CompanySettings } from './servicebase';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';

@Injectable()
export class ApiService extends ServiceBase {
    getHeaders(): Headers {
        let headers: Headers = new Headers({
            'Content-Type': 'application/json',
            'DBName': this.CompanySettings ? this.CompanySettings.dbName : '',
            'CompanyName': this.CompanySettings ? this.CompanySettings.company : '',
            'Authorization': `Bearer ${window.localStorage.getItem('retain_token')}`
        });

        return headers;
    }

    headers2: Headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    //http://foundation-latest.192.168.56.100.nip.io
    api_url_linux: string = 'http://foundation-change.192.168.56.100.nip.io';
    //api_url_linux: string = 'http://localhost';
    api_url_windows: string = 'http://192.168.1.45';
    //api_url: string = 'http://localhost';

    constructor(private http: Http, private router: Router) {
        super();
    }

    private getJson(resp: Response) {
        return resp.json();
    }

    private checkForError(resp: Response): Response {
        if (resp.status >= 200 && resp.status < 300) {
            return resp;
        }
        else {
            const error = new Error(resp.statusText);
            error['response'] = resp;
            console.error(error);
            throw error;
        }
    }

    getWindows(path: string): Observable<any> {
        return this.http.get(`${this.api_url_windows}${path}`, { headers: this.getHeaders() })
            .map(this.checkForError)
            .catch(err =>
                this.handleError(err))
            .map((res: Response) =>
                res.json());
    }

    getLinux(path: string): Observable<any> {
        return this.http.get(`${this.api_url_linux}${path}`, { headers: this.getHeaders() })
            .map(this.checkForError)
            .catch(err =>
                this.handleError(err))
            .map((res: Response) =>
                res.json());
    }

    private handleError(err: any): Observable<any> {
        if (err.status == 401) {
            this.router.navigate(['', 'auth']);
        }

        return Observable.throw(err);
    }

    post2(path: string, body): Observable<any> {
        var x = `${this.api_url_windows}${path}`;

        return this.http.post(x, body, { headers: this.getHeaders() })
            .map(this.checkForError)
            .catch(err =>
                Observable.throw(err))
            .map(this.getJson);
    }

    postWindows(path: string, body): Observable<any> {
        return this.http.post(`${this.api_url_windows}${path}`, body, { headers: this.headers2 })
            .map(this.checkForError)
            .catch(err =>
                //console.log(err))
                Observable.throw(err))
            .map(this.getJson);
    }

    postLinux(path: string, body): Observable<any> {
        return this.http.post(`${this.api_url_linux}${path}`, body, { headers: this.headers2 })
            .map(this.checkForError)
            .catch(err =>
                //console.log(err))
                Observable.throw(err))
            .map(this.getJson);
    }

    //delete(path: string): Observable<any> {
    //    return this.http.delete(
    //        `${this.api_url_linux}${path}`, this.getHeaders())
    //        .map(this.checkForError)
    //        .catch(err => Observable.throw(err))
    //        .map(this.getJson);
    //}

    //setHeaders(headers) {
    //    Object.keys(headers)
    //        .forEach(header => this.headers.set(header, headers[header]));
    //}
}
