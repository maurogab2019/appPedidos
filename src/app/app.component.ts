import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  /* este se usa en el index html,para llamar a este componente*/
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /* aca definimso la clase de nuetro componente ,puede tener atributos y ser usados en html con corchetes ,ojo que ty*/
  title = 'APLICACION PEDIDOS'; 
  saludo = 'Saludo desde angular carajo';
}
