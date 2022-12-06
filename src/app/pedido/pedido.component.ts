import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {Router} from '@angular/router';
import { Articulo } from '../Models/Articulo';
import { Clientes } from '../Models/Clientes';
import { DetallePedido } from '../Models/DetallePedido';
import { FormaPago } from '../Models/FormaPago';
import { Pedido } from '../Models/Pedido';
import { ArticulosService } from '../Servicies/articulos.service';
import { ClientesService } from '../Servicies/clientes.service';
import { DetalleService } from '../Servicies/detalle.service';
import { FormapagoService } from '../Servicies/formapago.service';
import { PedidoService } from '../Servicies/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  Titulo:string = 'Datos del Pedido';

  ListaArticulos: Articulo[]|null = null;

  ResultadoCantidadPrecio: number | null = 0;
  
  ListaArtFiltrados: Articulo[] = [];
  ListaArtPedidos: Articulo[] = [];

  ListaDetalles: DetallePedido[] = [];

  detalle:DetallePedido | null = null; 
  //mostrar o no 
  MostrarTabla:string = 'NO';
  MostrarDetalle:string = "NO";
  MostrarTablaClientes = "NO";
  MostrarSinResulCliente = "NO";
  MostrarSinResulArticulos = "NO";
  MostrarSinResulDetalle="NO";
  //total

  Total:number = 0;
  ListaClientesFiltrados:Clientes[] = [];
  ClienteSeleccionado:Clientes | null = null;
  formitaPago:string ="";

  //lista de forma pago
  FormasDePago:FormaPago[] = [];
  FormaPagoSelect:FormaPago[] = [];
  //pedido
  pedidoRegistro:Pedido | null = null;

  constructor(private router:Router,private articuloService:ArticulosService,private clientesService:ClientesService,private formaPagoService:FormapagoService,private detalleSerivice:DetalleService,private pedidoService:PedidoService) { }

  ngOnInit(): void {

    this.getFormaPagos();
    //this.GetArticulos();
  }

  FormBusqueda = new FormGroup({
    Nombre: new FormControl(null),
  });

  FormBusquedaCliente = new FormGroup({
    Nombre: new FormControl(null),
  });



  GetArticulos() {
  //aqui llamo a este metodo y me trae todos los articulos,los cargo en ListaArticulos y luego se los paso al html para que los muestre a todos en tabla
    this.articuloService.get().subscribe((res: any) => {
    this.ListaArticulos = res;
  });
  console.log(this.ListaArticulos);
  }  

  subTotal(cantidad:string,item:Articulo){
     
     this.ResultadoCantidadPrecio= parseInt(cantidad) * item.precioLista;
     console.log(cantidad);
    //var val = document.getElementById('cant');
    //click en miniscula en html
  }

  buscar(){
    //llamo al get filtrado y cargo el ListaArtFiltrados y los muestro en el html.
    this.articuloService.getArticulos(this.FormBusqueda.value.Nombre).subscribe((res:any) => {
    this.ListaArtFiltrados = res;
    });
    if(this.ListaArtFiltrados.length > 0 ){
      this.MostrarTabla = 'SI';
      this.MostrarSinResulArticulos = "NO";
    }
    else{  this.MostrarSinResulArticulos = "SI";}
    console.log(this.ListaArtFiltrados)
  }


  AgregarAlDetalle(item:Articulo , cantidadPedida:string){
    this.MostrarSinResulDetalle="NO";
    var bandera = false;
    for(var i =0 ; this.ListaArtPedidos.length > i ; i++){
        if(this.ListaArtPedidos[i].idArticulo == item.idArticulo){
          bandera = true;
          alert('Ya solicito ese articulo...'+ item.nombre + 'si desea modificar cantidad repita el proceso de seleccion')
          
        }
    }
    if(item.stockActuak >= parseInt(cantidadPedida) && bandera == false && parseInt(cantidadPedida) > 0 ){
    //calcular total
      this.ListaArtPedidos.push(item);
      //creo un detalle y lo meto a la lista
      this.detalle = {numeroPedido : 0,idArticulo: item.idArticulo , cantidad :parseInt(cantidadPedida) ,precioVenta : item.precioLista };
      this.ListaDetalles.push(this.detalle);
      this.Total = this.Total + item.precioLista * parseInt(cantidadPedida) ;

    }

    if(item.stockActuak < parseInt(cantidadPedida) || parseInt(cantidadPedida) == 0 ){
       alert("El articulo "+ item.nombre + "no tiene stock, ingrese cantidad menor o igual a :" + item.stockActuak +" y/o mayor A 0");
    }

    //console.log(this.ListaArtPedidos);
    //console.log(this.ListaDetalles);

  }

  BorrarDetalle(item:DetallePedido){
    this.MostrarSinResulDetalle="NO";
    //filtro por los que no tienen esa id del item a sacar y lo remplazo en la lista original
    var detalle = this.ListaDetalles.filter(i => i.idArticulo != item.idArticulo);

    this.ListaDetalles = detalle;
  

    var listaPedidos = this.ListaArtPedidos.filter(i => i.idArticulo != item.idArticulo);

    this.ListaArtPedidos = listaPedidos;

    console.log(this.ListaArtFiltrados);
    this.Total = this.Total - item.precioVenta * item.cantidad ;
    if(this.ListaDetalles.length <= 0){
      this.MostrarSinResulDetalle="SI";
    } 
  }

  MostrarTablaDetalle(){
      this.MostrarDetalle ="SI";
      this.MostrarTabla="NO";
      if(this.ListaDetalles.length <= 0){
        this.MostrarSinResulDetalle="SI";
      }
  }


  buscarClientes(){
      this.clientesService.getClientesNombre(this.FormBusquedaCliente.value.Nombre).subscribe((res:any) => {
      this.ListaClientesFiltrados = res;
      });
      
      console.log(this.ListaClientesFiltrados);
      if(this.ListaClientesFiltrados.length > 0 ){
        this.MostrarTablaClientes="SI";   
        this.MostrarSinResulCliente="NO";     
      }
      else {this.MostrarSinResulCliente ="SI";}
  }

  agregarCliente(item:Clientes){
    this.ClienteSeleccionado = item;   
    this.MostrarTablaClientes="NO"; 
  }


  getFormaPagos(){
    this.formaPagoService.getFormaPago().subscribe((res:any) => {
      this.FormasDePago = res;
    })

    console.log(this.FormasDePago)
  }
  
  onFormaPagoTraer(e: any) {
    //console.log(e.target.value);
    this.formitaPago = e.target.value;
    //console.log(this.formitaPago);
    this.formaPagoService.getFormaPagoId(this.formitaPago).subscribe((res:any) => {
      this.FormaPagoSelect = res;
    });

  }

  registrarPedido(){
    // console.log(this.formitaPago);
    // this.formaPagoService.getFormaPagoId(this.formitaPago).subscribe((res:any) => {
    //   this.FormaPagoSelect = res;
    // });
    // console.log(this.FormaPagoSelect);
    
    //console.log(this.FormaPagoSelect[0].Id_formapago);
    
    //&& this.FormaPagoSelect != null
    if(this.ClienteSeleccionado != null && this.ListaDetalles.length > 0 && this.FormaPagoSelect.length >0){
      //recorro la lsita detalles y los guardo
      for(var i =0; this.ListaDetalles.length > i ; i++){
          console.log(this.ListaDetalles[i])
          this.detalleSerivice.post(this.ListaDetalles[i]).subscribe((res: any) => {
            });
          this.articuloService.put(this.ListaArtPedidos[i].idArticulo,this.ListaDetalles[i].cantidad,this.ListaArtPedidos[i]).subscribe((res:any)=>{});
      }  
      //creo el pedido con sus datos
      var idFormaPago = this.FormaPagoSelect[0].Id_formapago;
      this.pedidoRegistro = {
          numeroPedido:0 , cliente: this.ClienteSeleccionado?.NumeroDoc , total: this.Total , formaPago:idFormaPago, estado:1 ,fechaPedido:new Date()
      }
      //gurada el pedido
      this.pedidoService.post(this.pedidoRegistro).subscribe((res: any) => {
        alert("PEDIDO REGISTRADO CORRECTAMENTE");
        console.log(this.pedidoRegistro);
      });  
      this.router.navigate(['inicio']);
    }
    else {alert("DEBE COMPLETAR TODOS LOS CAMPOS")}
      //var Pedido = {numeroPedido:0 , cliente: this.ClienteSeleccionado?.NumeroDoc , total: this.Total , formaPago: this.FormaPagoSelect?.Id_formapago }           

  }

}
