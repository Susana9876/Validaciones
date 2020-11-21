import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  NoChino(control: FormControl):{[s:string]:boolean}{
    if(control.value?.toLowerCase() === 'chino'){
      console.log('Error');
      return {NoChino: true}
    }
    return null;
  }

  matchPassword(pass1: string, pass2:string){
    return (formGroup: FormGroup) =>{
      const controlPass1 = formGroup.controls[pass1];
      const controlPass2 = formGroup.controls[pass2];

      if(controlPass1.value === controlPass2.value){
        controlPass2.setErrors(null);
      }else{
        controlPass2.setErrors({passError: true})
      }
    }
  }
}
