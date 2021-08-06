import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Services } from '../models/Services';
import { Role } from '../models/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService implements Services {

  url: string = 'http://localhost:8080/'

  constructor(private _http: HttpClient) { }

  get(){
    return this._http.get<Role>(this.url + "role")
  }
  getById(id: string): void {
    throw new Error('Method not implemented.');
  }
  post(body: any): void {
    throw new Error('Method not implemented.');
  }
  delete(id: string): void {
    throw new Error('Method not implemented.');
  }
  put(body: any): void {
    throw new Error('Method not implemented.');
  }
}
