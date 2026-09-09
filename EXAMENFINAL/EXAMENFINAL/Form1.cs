using System;
using System.Windows.Forms;
using Microsoft.Data.SqlClient;


namespace EXAMENFINAL
{
    public partial class Form1 : Form
    {
        SqlConnection conexion = new SqlConnection("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=BD_Escuela;Integrated Security=True;Trust Server Certificate=True");


        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
        }

        private void button1_Click_1(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtNombre.Text) ||
                string.IsNullOrWhiteSpace(txtApellido.Text) ||
                string.IsNullOrWhiteSpace(txtEdad.Text) ||
                string.IsNullOrWhiteSpace(txtCarrera.Text))
            {
                MessageBox.Show("Todos los campos son obligatorios.",
                                "Campos vacíos", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            int edad;
            if (!int.TryParse(txtEdad.Text, out edad))
            {
                MessageBox.Show("La edad debe ser un número entero.",
                                "Edad inválida", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }



            try
            {
                using (SqlConnection con = new SqlConnection(
                    @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=BD_Escuela;Integrated Security=True;Trust Server Certificate=True"))
                {
                    con.Open();

                    SqlCommand cmd = new SqlCommand(
                        "INSERT INTO Alumnos (Nombre, Apellido, Edad, Carrera) " +
                        "VALUES (@Nombre, @Apellido, @Edad, @Carrera); " +
                        "SELECT SCOPE_IDENTITY();", con);

                    cmd.Parameters.AddWithValue("@Nombre", txtNombre.Text.Trim());
                    cmd.Parameters.AddWithValue("@Apellido", txtApellido.Text.Trim());
                    cmd.Parameters.AddWithValue("@Edad", edad);
                    cmd.Parameters.AddWithValue("@Carrera", txtCarrera.Text.Trim());

                    int nuevoId = Convert.ToInt32(cmd.ExecuteScalar());

                    dataGridView1.Rows.Add(nuevoId, txtNombre.Text.Trim(),
                                           txtApellido.Text.Trim(), edad,
                                           txtCarrera.Text.Trim());

                    MessageBox.Show("Alumno guardado correctamente.",
                                    "Éxito", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    LimpiarCampos();
                }   // ← cierra el using
            }       // ← cierra el try
            catch (Exception ex)
            {
                MessageBox.Show("Error al guardar: " + ex.Message,
                                "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }

        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            dataGridView1.AllowUserToAddRows = false;
            dataGridView1.ReadOnly = true;
            dataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;

            dataGridView1.Columns.Add("IdAlumno", "ID");
            dataGridView1.Columns.Add("Nombre", "Nombre");
            dataGridView1.Columns.Add("Apellido", "Apellido");
            dataGridView1.Columns.Add("Edad", "Edad");
            dataGridView1.Columns.Add("Carrera", "Carrera");
        }

        private void button2_Click(object sender, EventArgs e)
        {

        }
        private void LimpiarCampos()
        {
            txtNombre.Text = "";
            txtApellido.Text = "";
            txtEdad.Text = "";
            txtCarrera.Text = "";
            txtNombre.Focus();
        }
    }
}
