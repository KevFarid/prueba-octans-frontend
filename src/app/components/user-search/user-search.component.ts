import { Component, OnInit, Output, EventEmitter, OnChanges, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit, OnChanges {
  
  workSearch: String = "";
  @Input() updateInfo = false;
  @Output() dataFilter = new EventEmitter<User[]>();
  
  constructor(private _user: UserService) { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    if(this.updateInfo){
      console.log('ok');
      
      this.searchName();
      this.updateInfo = false
    }
  }


  searchName(){
    this._user.get().subscribe(
      (resp: any) => {
        this.dataFilter.emit(this.filterNames(resp, this.workSearch))
      }, 
      error => {
        console.error(error['message']);
      }
    )
  }

  clearWork(){
    this.workSearch = "";
  }

  filterNames(data: [User], work: String){
    return data.filter(element => 
      element.name.toLocaleLowerCase().includes(
        work.toLocaleLowerCase().trim()
      )
    )
  }
}


