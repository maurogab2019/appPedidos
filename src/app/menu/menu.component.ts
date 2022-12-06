import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  navbarOpen = false;
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  Titulo:String = "BIENVENIDXOS";
  nombre:string | null="...";
  constructor() { }

  ngOnInit(): void {
    //this.nombre=prompt("ingrese nombre");
  }

}
