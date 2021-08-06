import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  @Input() dataUsers: User[] = [];
  @Output() userSelect = new EventEmitter<Number>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(idUser: Number){
    this.userSelect.emit(idUser)
  }

}
