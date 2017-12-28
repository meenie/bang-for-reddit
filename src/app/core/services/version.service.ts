import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class VersionService {
  constructor(private http: HttpClient) {}

  serverVersion(): Observable<{ version: string }> {
    return this.http
      .get('/version')
      .pipe(map((version: { version: string }) => version));
  }
}
