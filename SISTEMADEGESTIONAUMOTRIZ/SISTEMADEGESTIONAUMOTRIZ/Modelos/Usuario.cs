using System;

namespace SISTEMADEGESTIONAUMOTRIZ.Modelos
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nombre { get; set; }

        private string _correo;
        public string Correo
        {
            get => _correo;
            set
            {
                if (!value.Contains("@") || !value.Contains("."))
                    throw new ArgumentException("Correo no válido.");
                _correo = value;
            }
        }
    }
}