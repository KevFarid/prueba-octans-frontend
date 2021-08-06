import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  idUser = 0;
  updateInfo = false;
  dataUsers: User[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  dataFilter(event: User[]){    
    this.dataUsers = event;
  }

  userSelect(e: any){
    this.idUser = e;
  }

  newInfo(e: any){
    this.updateInfo = e
  }
}
