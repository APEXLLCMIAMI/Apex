using Microsoft.EntityFrameworkCore;
using SISTEMADEGESTIONAUMOTRIZ.Datos;
using SISTEMADEGESTIONAUMOTRIZ.Modelos;
using SISTEMADEGESTIONAUMOTRIZ.Servicio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;
using static SISTEMADEGESTIONAUMOTRIZ.Form1;

namespace SISTEMADEGESTIONAUMOTRIZ
{
    public partial class Form2PRT : Form
    {
        private readonly AppDbContext _context = new AppDbContext();

        public Form2PRT()
        {
            InitializeComponent();
        }

        private void Form2PRT_Load(object sender, EventArgs e) { }

        private void EJE1_Click(object sender, EventArgs e)
        {
            var producto = new Producto { Nombre = "Laptop", CodigoBarras = "123456", Precio = 1500 };
            _context.Productos.Add(producto);
            _context.SaveChanges();
            dataGridView1.DataSource = _context.Productos.ToList();
        }

        private void EJE2_Click(object sender, EventArgs e)
        {
            var dep = new Departamento { Nombre = "Sistemas" };
            dep.Empleados = new List<Empleado> { new Empleado { Nombre = "Juan" } };
            _context.Departamentos.Add(dep);
            _context.SaveChanges();
            dataGridView1.DataSource = _context.Empleados.Include(x => x.Departamento).ToList();
        }

        private void EJE3_Click(object sender, EventArgs e)
        {
            var logs = new List<LogEvento>();
            for (int i = 1; i <= 10; i++)
                logs.Add(new LogEvento { Descripcion = "Evento " + i, Fecha = DateTime.Now });
            _context.LogEventos.AddRange(logs);
            _context.SaveChanges();
            dataGridView1.DataSource = _context.LogEventos.ToList();
        }

        private void EJE4_Click(object sender, EventArgs e)
        {
            try
            {
                var u = new Usuario { Nombre = "Ana", Correo = "ana@gmail.com" };
                _context.Usuarios.Add(u);
                _context.SaveChanges();
                dataGridView1.DataSource = _context.Usuarios.ToList();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error: " + ex.Message);
            }
        }

        private void EJE5_Click(object sender, EventArgs e)
        {
            var factura = new Factura { Cliente = "Carlos", Total = 500 };
            _context.Facturas.Add(factura);
            _context.SaveChanges();
            dataGridView1.DataSource = _context.Facturas
                .Where(f => f.Cliente.Contains("Carlos")).ToList();
        }

        private void EJE6_Click(object sender, EventArgs e)
        {
            dataGridView1.DataSource = _context.Productos.AsNoTracking().ToList();
            MessageBox.Show("Consulta con AsNoTracking - mejor rendimiento en lectura");
        }

        private void EJE7_Click(object sender, EventArgs e)
        {
            var cuenta = new CuentaBancaria { Titular = "Maria", Saldo = 1000 };
            _context.CuentasBancarias.Add(cuenta);
            _context.SaveChanges();
            cuenta.Saldo -= 200;
            _context.SaveChanges();
            dataGridView1.DataSource = _context.CuentasBancarias.ToList();
            MessageBox.Show("Saldo descontado correctamente");
        }

        private void EJE8_Click(object sender, EventArgs e)
        {
            MessageBox.Show("EF Core usa [Timestamp] para evitar que dos usuarios sobrescriban datos simultáneamente. Se configura con rowversion en SQL Server.");
            dataGridView1.DataSource = _context.Productos.ToList();
        }

        private void EJE9_Click(object sender, EventArgs e)
        {
            var cliente = new Cliente { Nombre = "Pedro", EstaEliminado = false };
            _context.Clientes.Add(cliente);
            _context.SaveChanges();
            cliente.EstaEliminado = true;
            _context.SaveChanges();
            dataGridView1.DataSource = _context.Clientes.ToList();
            MessageBox.Show("Cliente marcado como eliminado (borrado lógico)");
        }

        private void EJE10_Click(object sender, EventArgs e)
        {
            var pedido = new Pedido { Descripcion = "Pedido Test" };
            pedido.Detalles = new List<DetallePedido>
            {
                new DetallePedido { Producto = "Item1", Cantidad = 2 },
                new DetallePedido { Producto = "Item2", Cantidad = 1 }
            };
            _context.Pedidos.Add(pedido);
            _context.SaveChanges();
            _context.Pedidos.Remove(pedido);
            _context.SaveChanges();
            dataGridView1.DataSource = _context.DetallesPedido.ToList();
            MessageBox.Show("Pedido eliminado - detalles borrados en cascada automáticamente");
        }

        private void EJE2_Click_1(object sender, EventArgs e)
        {
            var dep = new Departamento { Nombre = "Sistemas" };
            dep.Empleados = new List<Empleado> { new Empleado { Nombre = "Juan" } };
            _context.Departamentos.Add(dep);
            _context.SaveChanges();
            dataGridView1.DataSource = _context.Empleados.Include(x => x.Departamento).ToList();
        }

        private void EJE3_Click_1(object sender, EventArgs e)
        {
            var logs = new List<LogEvento>();
            for (int i = 1; i <= 10; i++)
                logs.Add(new LogEvento { Descripcion = "Evento " + i, Fecha = DateTime.Now });
            _context.LogEventos.AddRange(logs);
            _context.SaveChanges();
            dataGridView1.DataSource = _context.LogEventos.ToList();
        }

        private void EJE4_Click_1(object sender, EventArgs e)
        {
            try
            {
                var u = new Usuario { Nombre = "Ana", Correo = "ana@gmail.com" };
                _context.Usuarios.Add(u);
                _context.SaveChanges();
                dataGridView1.DataSource = _context.Usuarios.ToList();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error: " + ex.Message);
            }
        }

        private void EJE5_Click_1(object sender, EventArgs e)
        {
            var factura = new Factura { Cliente = "Carlos", Total = 500 };
            _context.Facturas.Add(factura);
            _context.SaveChanges();
            dataGridView1.DataSource = _context.Facturas
                .Where(f => f.Cliente.Contains("Carlos")).ToList();
        }

        private void EJE6_Click_1(object sender, EventArgs e)
        {
            dataGridView1.DataSource = _context.Productos.AsNoTracking().ToList();
            MessageBox.Show("Consulta con AsNoTracking - mejor rendimiento en lectura");
        }

        private void EJE7_Click_1(object sender, EventArgs e)
        {
            var cuenta = new CuentaBancaria { Titular = "Maria", Saldo = 1000 };
            _context.CuentasBancarias.Add(cuenta);
            _context.SaveChanges();
            cuenta.Saldo -= 200;
            _context.SaveChanges();
            dataGridView1.DataSource = _context.CuentasBancarias.ToList();
            MessageBox.Show("Saldo descontado correctamente");
        }

        private void EJE8_Click_1(object sender, EventArgs e)
        {
            MessageBox.Show("EF Core usa [Timestamp] para evitar que dos usuarios sobrescriban datos simultáneamente. Se configura con rowversion en SQL Server.");
            dataGridView1.DataSource = _context.Productos.ToList();
        }

        private void EJE9_Click_1(object sender, EventArgs e)
        {
            var cliente = new Cliente { Nombre = "Pedro", EstaEliminado = false };
            _context.Clientes.Add(cliente);
            _context.SaveChanges();
            cliente.EstaEliminado = true;
            _context.SaveChanges();
            dataGridView1.DataSource = _context.Clientes.ToList();
            MessageBox.Show("Cliente marcado como eliminado (borrado lógico)");
        }

        private void EJE10_Click_1(object sender, EventArgs e)
        {
            var pedido = new Pedido { Descripcion = "Pedido Test" };
            pedido.Detalles = new List<DetallePedido>
            {
                new DetallePedido { Producto = "Item1", Cantidad = 2 },
                new DetallePedido { Producto = "Item2", Cantidad = 1 }
            };
            _context.Pedidos.Add(pedido);
            _context.SaveChanges();
            _context.Pedidos.Remove(pedido);
            _context.SaveChanges();
            dataGridView1.DataSource = _context.DetallesPedido.ToList();
            MessageBox.Show("Pedido eliminado - detalles borrados en cascada automáticamente");
        }

        private async void btnGenerar_Click(object sender, EventArgs e)
        {
         
            try
            {
                List<FacturaReporteDto> datos;

                using (var ctx = new AppDbContext())
                {
                    datos = await ctx.Facturas
                        .AsNoTracking()
                        .Select(f => new FacturaReporteDto(
                            f.Cliente,
                            f.Total))
                        .ToListAsync();
                }

                var servicio = new EFService();
                await Task.Run(() => {
                    servicio.GenerarPdf(datos, "ReporteFacturas.pdf");
                    servicio.GenerarExcel(datos, "ReporteFacturas.xlsx");
                });

                MessageBox.Show("¡Reportes generados!", "Éxito",
                    MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}", "Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            
        }
    }
}
