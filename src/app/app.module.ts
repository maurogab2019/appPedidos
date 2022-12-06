import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonaComponent } from './personas/persona.component';
import { PersoniComponent } from './personi/personi.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';
//import { PreloadAllModules, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PedidoComponent } from './pedido/pedido.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { ArticuloComponent } from './articulo/articulo.component';
import { ConsultapedidosComponent } from './consultapedidos/consultapedidos.component';

@NgModule({
  declarations: [
    AppComponent, PersonaComponent, PersoniComponent, MenuComponent, InicioComponent, PedidoComponent, ArticuloComponent, ConsultapedidosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
