using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SISTEMADEGESTIONAUMOTRIZ.Modelos
{
    public record FacturaReporteDto(
        string Cliente,
        decimal Total
    );
}
