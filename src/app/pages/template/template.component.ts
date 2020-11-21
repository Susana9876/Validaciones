import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [
  ]
})
export class TemplateComponent implements OnInit {

  constructor(private cs: CountriesService) { }

  ngOnInit(): void {
    this.cs.getCountries().subscribe(data => {

      this.Countries = data;
      console.log(this.Countries);
      //Agregar la opcion default
      this.Countries.unshift({
        name: '--Seleccione un país--',
        code: ''
      })
    });
  }

  usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    pais: '',
    genero: 'F'
  };

  Countries: any[] = [];

  enviar(form: NgForm){
    console.log(form);
    if (form.invalid) Object.values(form.controls).forEach(control => control.markAsTouched());
  }
  

}
