import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms'
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html', 
  styles: [
  ]
})
export class ReactiveComponent implements OnInit {

  form: FormGroup;

    // getters de los controles
  get validNombre(){
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  get validApellido(){
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  }

  get validCorreo(){
    return this.form.get('correo').invalid && this.form.get('correo').touched;
  }

  //getters para controles dentro de FormGroups
  get validEstado(){
    return this.form.get('direccion.estado').invalid && this.form.get('direccion.estado').touched;
  }

  get validMun(){
    return this.form.get('direccion.municipio').invalid && this.form.get('direccion.municipio').touched;
  }

  // Getters para password (validacion personalizada)
  get Pass1(){
    return this.form.get('pass1').invalid && this.form.get('pass1').touched;
  }

  get Pass2(){
    const pass1=this.form.get('pass1').value;
    const pass2=this.form.get('pass2').value;

    // If de operador ternario
    return(pass1 === pass2)? false : true;
  }

  // Getters para un formArray
  get arrayPasatiempos(){
    return this.form.get('pasatiempos') as FormArray;
  }


  constructor(private fb: FormBuilder, private CustomVal:ValidationService) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(){
    this.form = this.fb.group({
      //El primer valor ('') representa el valor por defecto de cada control
      //Como segundo valor estaremos agregando las validaciones
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      apellido: ['', [Validators.required, Validators.minLength(4), this.CustomVal.NoChino]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        estado: ['', [Validators.required,Validators.minLength(3)]],
        municipio: ['', [Validators.required,Validators.minLength(3)]]
      }), 
      pasatiempos: this.fb.array([])
    },{
      validators: this.CustomVal.matchPassword('pass1', 'pass2')
    });
  }
  enviar(){
    console.log(this.form);

    if(this.form.invalid){
      return Object.values(this.form.controls).forEach(control =>{
        if(control instanceof FormGroup){
          return Object.values(control.controls).forEach(control => control.markAsTouched())
        }else{
          control.markAsTouched();
        }
      });
    }
  }

  //Para agregar elementos al formArray 
  newControl(){
    this.arrayPasatiempos?.push(this.fb.control('', Validators.required));
  }
  
  // Para borrar el control seleccionado del formArray
  removeControl(id:number){
    this.arrayPasatiempos.removeAt(id);

  }
}
