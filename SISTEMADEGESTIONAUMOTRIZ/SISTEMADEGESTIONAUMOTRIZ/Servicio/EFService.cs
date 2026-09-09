using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using QuestPDF.Infrastructure;
using SISTEMADEGESTIONAUMOTRIZ.Datos;
using SISTEMADEGESTIONAUMOTRIZ.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;


namespace SISTEMADEGESTIONAUMOTRIZ.Servicio
{
    public class EFService
    {
        private readonly AppDbContext _context;

        public EFService()
        {
            _context = new AppDbContext();
        }

        // Ejercicio 03: Registro Masivo
        public void InsertarLogsMasivo(List<LogEvento> eventos)
        {
            _context.LogEventos.AddRange(eventos);
            _context.SaveChanges();
        }

        // Ejercicio 05: Filtros Dinámicos con LINQ
        public List<Factura> BuscarFacturasPorCliente(string busqueda)
        {
            return _context.Facturas
                .Where(f => f.Cliente.Contains(busqueda))
                .ToList();
        }

        // Ejercicio 06: AsNoTracking
        public List<Producto> ObtenerProductosDisponibles()
        {
            return _context.Productos
                .AsNoTracking()
                .ToList();
        }

        // Ejercicio 07: Actualización de Saldos
        public bool DescontarSaldo(int cuentaId, decimal monto)
        {
            var cuenta = _context.CuentasBancarias.Find(cuentaId);
            if (cuenta == null) throw new Exception("Cuenta no encontrada.");
            if (cuenta.Saldo < monto) return false;

            cuenta.Saldo -= monto;
            _context.SaveChanges();
            return true;
        }

        // Ejercicio 09: Borrado Lógico
        public void EliminarClienteLogico(int clienteId)
        {
            var cliente = _context.Clientes.Find(clienteId);
            if (cliente == null) throw new Exception("Cliente no encontrado.");

            cliente.EstaEliminado = true;
            _context.SaveChanges();
        }

        // Ejercicio 10: Eliminación en Cascada
        public void EliminarPedido(int pedidoId)
        {
            var pedido = _context.Pedidos
                .Include(p => p.Detalles)
                .FirstOrDefault(p => p.Id == pedidoId);

            if (pedido == null) throw new Exception("Pedido no encontrado.");

            _context.Pedidos.Remove(pedido);
            _context.SaveChanges();
        }

        
        public void GenerarPdf(List<FacturaReporteDto> facturas, string ruta)
        {
            QuestPDF.Settings.License = LicenseType.Community;

            Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Margin(40);
                    page.Size(PageSizes.A4);
                    page.Header().Text("Reporte de Facturas")
                        .SemiBold().FontSize(20);

                    page.Content().Table(table =>
                    {
                        table.ColumnsDefinition(c => {
                            c.RelativeColumn();
                            c.ConstantColumn(100);
                        });

                        table.Header(h => {
                            h.Cell().Background("#2C3E50").Padding(5)
                                .Text("Cliente").FontColor("#FFFFFF").Bold();
                            h.Cell().Background("#2C3E50").Padding(5)
                                .Text("Total").FontColor("#FFFFFF").Bold();
                        });

                        foreach (var f in facturas)
                        {
                            table.Cell().Padding(5).Text(f.Cliente);
                            table.Cell().Padding(5).Text(f.Total.ToString("C"));
                        }
                    });

                    var total = facturas.Sum(f => f.Total);
                    page.Footer().AlignRight()
                        .Text($"Total General: {total:C}").Bold();
                });
            }).GeneratePdf(ruta);
        }

        public void GenerarExcel(List<FacturaReporteDto> facturas, string ruta)
        {
            using var workbook = new XLWorkbook();
            var ws = workbook.Worksheets.Add("Facturas");

            ws.Cell(1, 1).Value = "Cliente";
            ws.Cell(1, 2).Value = "Total";
            ws.Row(1).Style.Font.Bold = true;
            ws.Row(1).Style.Fill.BackgroundColor = XLColor.FromHtml("#2C3E50");
            ws.Row(1).Style.Font.FontColor = XLColor.White;

            int fila = 2;
            foreach (var f in facturas)
            {
                ws.Cell(fila, 1).Value = f.Cliente;
                ws.Cell(fila, 2).Value = f.Total;
                fila++;
            }

            ws.Cell(fila, 1).Value = "TOTAL:";
            ws.Cell(fila, 1).Style.Font.Bold = true;
            ws.Cell(fila, 2).FormulaA1 = $"=SUM(B2:B{fila - 1})";
            ws.Cell(fila, 2).Style.Font.Bold = true;
            ws.Column(2).Style.NumberFormat.Format = "$ #,##0.00";
            ws.Columns().AdjustToContents();

            workbook.SaveAs(ruta);
        }
    }
}