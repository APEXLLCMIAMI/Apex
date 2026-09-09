using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SISTEMADEGESTIONAUMOTRIZ.Modelos
{
    public class Producto
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string CodigoBarras { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Precio { get; set; }

        [MaxLength(100)]
        public string Nombre { get; set; }
    }
}