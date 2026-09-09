using System.Collections.Generic;

namespace SISTEMADEGESTIONAUMOTRIZ.Modelos
{
    public class Pedido
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public virtual ICollection<DetallePedido> Detalles { get; set; }
    }
}