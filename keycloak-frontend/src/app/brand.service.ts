import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  readonly apiEndPoint: string = 'brands';
  readonly apiModelName: string = 'brand';

  constructor(private httpClient: HttpClient) {
  }


  test() {
    return lastValueFrom(
      this.httpClient.get(
        `http://localhost:8081/foo/list`
      )
    );
  }

 
}
