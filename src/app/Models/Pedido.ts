
export interface Pedido {
    numeroPedido:number;
    fechaPedido:Date;
    total:number;
    cliente:number | undefined;
    formaPago:number | undefined;
    estado:number;
}
