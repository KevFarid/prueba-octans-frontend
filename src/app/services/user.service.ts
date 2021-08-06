import { Injectable } from '@angular/core';
import { Services } from '../models/Services';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService implements Services{

  constructor(private _http: HttpClient) { }

  url: string = 'http://localhost:8080/'

  get(){
    return this._http.get<User>(this.url + 'user')  
  }
  getById(id: string) {
    return this._http.get<User>(`${this.url}user/${id}`)
  }
  post(body: User) {
    return this._http.post<User>(`${this.url}user/`, body)
  }
  delete(id: string) {
    return this._http.delete<String>(`${this.url}user/${id}`)
  }
  put(body: any): void {
    throw new Error('Method not implemented.');
  }
}
