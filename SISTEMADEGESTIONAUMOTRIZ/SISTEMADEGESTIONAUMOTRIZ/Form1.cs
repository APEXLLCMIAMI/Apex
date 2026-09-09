using Microsoft.Data.Sql;
using Microsoft.Data.SqlClient;
using System;
using System.Configuration;
using System.Data;
using System.IO;
using System.Windows.Forms;

namespace SISTEMADEGESTIONAUMOTRIZ
{
    public partial class Form1 : Form
    {

        private readonly string connectionString = "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=AutoDriveDB;Integrated Security=True;Trust Server Certificate=True";

        public Form1()
        {
            InitializeComponent();
        }


        private void menuCargarFicha_Click(object sender, EventArgs e)
        {
            using (OpenFileDialog openFileDialog1 = new OpenFileDialog())
            {
                openFileDialog1.Filter = "Archivos de texto (.txt)|.txt|Todos los archivos (.)|.";
                openFileDialog1.Title = "Seleccionar ficha para cargar";
                openFileDialog1.RestoreDirectory = true;

                if (openFileDialog1.ShowDialog() == DialogResult.OK)
                {
                    try
                    {
                        richTextBoxEspecificaciones.Text = File.ReadAllText(openFileDialog1.FileName);
                        MessageBox.Show("Ficha cargada correctamente", "Éxito", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show("Error al leer el archivo:\n" + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }
                }
            }

        }

        private void menuGuardarOferta_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(richTextBoxEspecificaciones.Text))
            {
                MessageBox.Show("No hay contenido para guardar como oferta.", "Advertencia", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            using (SaveFileDialog saveFileDialog1 = new SaveFileDialog())
            {
                saveFileDialog1.Filter = "Archivos de texto (.txt)|.txt|Archivos RTF (.rtf)|.rtf|Todos los archivos (.)|.";
                saveFileDialog1.Title = "Guardar oferta como...";
                saveFileDialog1.DefaultExt = "txt";
                saveFileDialog1.AddExtension = true;
                saveFileDialog1.RestoreDirectory = true;
                saveFileDialog1.FileName = "Oferta_" + DateTime.Now.ToString("yyyyMMdd_HHmmss");

                if (saveFileDialog1.ShowDialog() == DialogResult.OK)
                {
                    try
                    {
                        File.WriteAllText(saveFileDialog1.FileName, richTextBoxEspecificaciones.Text);

                        MessageBox.Show("Oferta guardada correctamente en el archivo.", "Éxito", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show("Error al guardar el archivo:\n" + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }
                }
            }


        }

        private void menuSalir_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void menuLimpiar_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("¿Desea limpiar todos los campos del formulario?", "Confirmar", MessageBoxButtons.YesNo, MessageBoxIcon.Warning) == DialogResult.Yes)
                richTextBoxEspecificaciones.Clear();
        }

        private void menuColorFondo_Click(object sender, EventArgs e)
        {
            using (ColorDialog cd = new ColorDialog())
            {
                if (cd.ShowDialog() == DialogResult.OK)
                    this.BackColor = cd.Color;
            }

        }

        private void btnAbrir_Click(object sender, EventArgs e)
        {
            menuCargarFicha_Click(sender, e);
        }

        private void btnGuardar_Click(object sender, EventArgs e)
        {
            menuGuardarOferta_Click(sender, e);
        }

        private void btnInfo_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Datos de contacto de la automotriz\n\nTeléfono: +505 88568982\nEmail: contactoautomotriz@gmail.com", "Información");
        }

        private void copiarToolStripButton_Click(object sender, EventArgs e)
        {
            if (richTextBoxEspecificaciones.SelectionLength > 0)
                richTextBoxEspecificaciones.Copy();
        }

        private void pegarToolStripButton_Click(object sender, EventArgs e)
        {
            if (Clipboard.ContainsText())
                richTextBoxEspecificaciones.Paste();
        }

        private void CambiarFuenteToolStripButton_Click(object sender, EventArgs e)
        {
            if (fontDialog1.ShowDialog() == DialogResult.OK)
            {
                if (richTextBoxEspecificaciones.SelectionLength > 0)
                    richTextBoxEspecificaciones.SelectionFont = fontDialog1.Font;
                else
                    richTextBoxEspecificaciones.Font = fontDialog1.Font;
            }

        }
        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            if (MessageBox.Show("¿Está seguro que desea cerrar el sistema de gestión?",
                "Confirmación de cierre", MessageBoxButtons.YesNo, MessageBoxIcon.Question) != DialogResult.Yes)
                e.Cancel = true;
        }

        private void btnGuardar1_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtMarca.Text) &&
                string.IsNullOrWhiteSpace(txtModelo.Text) &&
                string.IsNullOrWhiteSpace(txtEspecificaciones.Text))
            {
                MessageBox.Show("No hay especificaciones para guardar", "Advertencia", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            try
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                using (SqlCommand cmd = new SqlCommand("INSERT INTO Vehiculos (Marca, Modelo, Especificaciones) VALUES (@marca, @modelo, @esp)", conn))
                {
                    cmd.Parameters.AddWithValue("@marca", txtMarca.Text ?? "");
                    cmd.Parameters.AddWithValue("@modelo", txtModelo.Text ?? "");
                    cmd.Parameters.AddWithValue("@esp", txtEspecificaciones.Text);

                    conn.Open();
                    cmd.ExecuteNonQuery();
                }

                MessageBox.Show("Oferta guardada correctamente en SQL Server", "Éxito", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error al guardar en la base de datos:\n" + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void btnVerVehiculo_Click(object sender, EventArgs e)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                using (SqlDataAdapter adapter = new SqlDataAdapter("SELECT * FROM Vehiculos", conn))
                {
                    DataTable dt = new DataTable();
                    adapter.Fill(dt);
                    dataGridView1.DataSource = dt;
                }

                if (dataGridView1.Columns["Id"] != null)
                {
                    dataGridView1.Columns["Id"].HeaderText = "ID";
                    dataGridView1.Columns["Id"].Width = 50;
                    dataGridView1.Columns["Id"].ReadOnly = true;
                }





                if (dataGridView1.Rows.Count == 0)
                {
                    MessageBox.Show("No hay vehículos registrados todavía.", "Información", MessageBoxButtons.OK, MessageBoxIcon.Information);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error al cargar los vehículos:\n" + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void btnAbrirForm2_Click(object sender, EventArgs e)
        {
            Form2PRT form2 = new Form2PRT();
            form2.Show();
        }

        public record PedidoReporteDto(
        string Cliente,
        string Producto,
        int Cantidad,
        decimal Subtotal,
        DateTime Fecha
        );

        private void AbrirForm2_Click(object sender, EventArgs e)
        {
            Form2PRT form2 = new Form2PRT();
            form2.ShowDialog();
        }
    }
}
