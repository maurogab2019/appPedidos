import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DetallePedido } from '../Models/DetallePedido';
import { Pedido } from '../Models/Pedido';
import { DetalleService } from '../Servicies/detalle.service';
import { PedidoService } from '../Servicies/pedido.service';

@Component({
  selector: 'app-consultapedidos',
  templateUrl: './consultapedidos.component.html',
  styleUrls: ['./consultapedidos.component.css']
})
export class ConsultapedidosComponent implements OnInit {
  
  ListaPedidos:Pedido[]=[];
  ListaDetalle:DetallePedido[]=[];
  mostrarTablaPedido="NO";
  mostrarDetalle="NO";
  pedidoSeleccionado:Pedido|null = null;
  constructor(private pedidoService:PedidoService,private detalleService:DetalleService) { }

  ngOnInit(): void {
  }
    FormBusqueda = new FormGroup({
    NumeroDocOPedido: new FormControl(null),
  });

  buscarPedidosFiltro(){
    this.mostrarDetalle="NO";
    console.log(this.FormBusqueda.value.NumeroDocOPedido)
    if(this.FormBusqueda.value.NumeroDocOPedido == null){
      this.FormBusqueda.value.NumeroDocOPedido = 99999;
    }
    this.mostrarTablaPedido="NO";
    this.pedidoService.getPedidosFiltro(this.FormBusqueda.value.NumeroDocOPedido,this.FormBusqueda.value.NumeroDocOPedido).subscribe((res:any)=>{
      this.ListaPedidos=res;
    })
    if(this.ListaPedidos.length > 0){
      this.mostrarTablaPedido="SI";
    }
    console.log(this.ListaPedidos);

  }

  buscarDetalle(item:Pedido){
      this.pedidoSeleccionado=item;
      this.mostrarTablaPedido="NO";
      this.mostrarDetalle="SI";
      this.detalleService.get(item.numeroPedido).subscribe((res:any)=>{
        this.ListaDetalle=res;
      });
      console.log(this.ListaDetalle);
  }


}
