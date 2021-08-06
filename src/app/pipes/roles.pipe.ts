import { Pipe, PipeTransform } from '@angular/core';
import { RoleService } from '../services/role.service';

@Pipe({
  name: 'roles'
})
export class RolesPipe implements PipeTransform {
  transform(value: Number): String {
    if(value === 1){
      return "ADMINISTRADOR"
    }else if(value === 2){
      return "AUDITOR"
    }else {
      return "AUXILIAR"
    }
  }

}
