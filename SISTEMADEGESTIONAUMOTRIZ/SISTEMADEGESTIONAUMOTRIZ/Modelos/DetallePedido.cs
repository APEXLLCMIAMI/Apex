namespace SISTEMADEGESTIONAUMOTRIZ.Modelos
{
    public class DetallePedido
    {
        public int Id { get; set; }
        public string Producto { get; set; }
        public int Cantidad { get; set; }
        public int PedidoId { get; set; }
        public virtual Pedido Pedido { get; set; }
    }
}