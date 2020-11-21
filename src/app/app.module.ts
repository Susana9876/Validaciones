import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';

// Importar RouterModule de @angular/router
import { RouterModule } from '@angular/router';
// Importar la clase creada en el archivo APP.ROUTES
import { routes } from './app.routes';
//Para trabajar con formularios reactivos
import { ReactiveFormsModule } from '@angular/forms'
// Para trabajar con formularios
import { FormsModule } from '@angular/forms';

//Para hacer peticiones de tipo HTTP es necesario importar HTTPClientModule
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ReactiveComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
