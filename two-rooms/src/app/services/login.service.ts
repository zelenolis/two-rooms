import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  private readonly backUrl = 'https://parseapi.back4app.com/classes/team'

  getUsers(): Observable<object> {
    return this.http.get(this.backUrl)
  }
}
