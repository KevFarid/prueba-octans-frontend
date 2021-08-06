import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnChanges {

  @Input() idUser = 0;
  @Output() updateInfo = new EventEmitter<Boolean>();
  roleList: Role[] = [];
  respMessage: any = {
    message: "",
    status: false
  }
  lastIdUsers: number = 0;
  statusForm: String = "DISABLED"
  userData: User = {
    id_user: 0,
    id_role: 1,
    name: '',
    active: ''
  };

  form = this.createForm();

  constructor(private _role: RoleService, private _user: UserService) { }

  ngOnInit(): void {
    this.getRoleList();
    this.getUserById();
    this.lastId()
  }

  ngOnChanges(): void{
    this.getUserById();
    this.disableForm();
    this.lastId();
  }

  getUserById(){
    this.form.disable();
    if(this.idUser !== 0){
      this._user.getById(this.idUser.toString()).subscribe(resp => {
        this.userData = resp;
        this.form = this.updateForm(resp)
      })
    }
  }

  getRoleList(){
    this._role.get().subscribe((resp: any) => {
      this.roleList = resp
    })
  }

  updateChanges(){
    this.updateInfo.emit(true)
    setTimeout(()=> {
      this.updateInfo.emit(false)
    }, 1000)
  }

  sendMessage(message: String, status: Boolean){
    this.respMessage = {
      message,
      status
    }

    setTimeout(()=>{
      this.respMessage['message'] = ''
    }, 3000)
  }

  updateForm(user: User){

    let activeStatus = () => {
      if(user.active === "YES"){
        return true
      }else{
        return false
      }
    }

    return new FormGroup({
      id_role: new FormControl(user.id_role, Validators.required),
      name: new FormControl(user.name, Validators.required),
      active: new FormControl(activeStatus(), Validators.required),
    })

  }

  createForm(){
    return new FormGroup({
      id_role: new FormControl(3, Validators.required),
      name: new FormControl('', Validators.required),
      active: new FormControl(false, Validators.required),
    })
  }

  lastId(){
    this._user.get().subscribe((resp:any) => {
      this.lastIdUsers = resp[resp.length - 1]['id_user'];
    });
  }

  newUser(){
    this.statusForm = "NEW";
    this.form.enable();
    this.form = this.createForm();
  }
  
  editUser(){
    this.statusForm = "EDIT";
    this.form.enable();
  }

  saveUser(){
    if(this.form.valid){
      if(this.statusForm === "NEW"){
        let savedUser = this.form.value;
        savedUser['active'] = this.form.value['active']? 'YES': 'NO';
        this._user.post(savedUser).subscribe(resp => {
          this.disableForm();
          this.sendMessage(`Se ha creado el usuario con la id: ${this.lastIdUsers + 1}`, true);
          this.updateChanges();
        }, ()=> this.sendMessage(`Error al guardar el usuario. Se pudo causar porque el usuario se repite`, false))

      }else if(this.statusForm === "EDIT"){
        let newUser = this.form.value
        newUser['id_user']= this.idUser;
        newUser['active'] = this.form.value['active']? 'YES': 'NO';
        this._user.post(newUser).subscribe(resp => {
          this.disableForm();
          this.sendMessage(`Se ha actualizado el usuario con la id: ${resp['id_user']}`, true);
          this.updateChanges();
        }, ()=> this.sendMessage(`Error al guardar el usuario. Se pudo causar porque el usuario se repite`, false))
      }
    }    
  }

  disableForm(){
    this.form.disable();
    this.statusForm = "DISABLED"
  }

  deleteUser(){
    this._user.delete(this.idUser.toString()).subscribe(resp => {
      this.sendMessage(resp, true);
      this.updateChanges();
    },
      (error)=> {
        this.sendMessage(error['error']['text'], true);
        this.updateChanges();
      })
  }

  cancelForm(){
    this.getUserById();
    this.disableForm();
  }

}
