import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  private readonly backUrl = 'https://parseapi.back4app.com/classes/team'

  getUsers(): Observable<object> {
    const headers = new HttpHeaders({
      First: '********',
      Second: '********',
    })

    return this.http.get(this.backUrl, { headers })
  }
}
