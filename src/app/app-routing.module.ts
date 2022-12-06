import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticuloComponent } from './articulo/articulo.component';
import { ConsultapedidosComponent } from './consultapedidos/consultapedidos.component';
import { InicioComponent } from './inicio/inicio.component';
import { PedidoComponent } from './pedido/pedido.component';
import { PersoniComponent } from './personi/personi.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    //{ path: '', redirectTo: '', pathMatch: 'full' },
    { path:'inicio', component: InicioComponent },
    { path:'pedido', component: PedidoComponent },
    { path:'articulo', component: ArticuloComponent },
    { path:'consultaPedido', component: ConsultapedidosComponent },

  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
