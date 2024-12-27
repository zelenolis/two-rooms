import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map, Observable } from 'rxjs'
import { UserResponce } from '../interfaces/interfaces'

@Injectable({
  providedIn: 'root',
})
export class GetHttpService {
  constructor(private http: HttpClient) {}

  getRequest(url: string): Observable<UserResponce> {
    return this.http.get<UserResponce>(url).pipe(
      map((res: UserResponce) => {
        if (res && Array.isArray(res.results)) {
          return res
        } else {
          throw new Error('invalid format')
        }
      }),
      catchError(() => {
        throw new Error('Something went wrong')
      }),
    )
  }
}
