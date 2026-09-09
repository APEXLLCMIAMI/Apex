using System.Collections.Generic;


namespace SISTEMADEGESTIONAUMOTRIZ.Modelos
{
    public class Empleado
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int DepartamentoId { get; set; }
        public virtual Departamento Departamento { get; set; }
    }

    public class Departamento
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public virtual ICollection<Empleado> Empleados { get; set; }
    }
}
