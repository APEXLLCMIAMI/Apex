namespace OJ_1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void menuCargarFicha_Click(object sender, EventArgs e)
        {
            using (OpenFileDialog openFileDialog = new OpenFileDialog())
            {
                openFileDialog.Filter = "Archivos de texto (.txt)|.txt|Todos los archivos (.)|.";
                openFileDialog.Title = "Seleccionar Ficha Técnica del Vehículo";

                if (openFileDialog.ShowDialog() == DialogResult.OK)
                {
                    try
                    {
                        // Leer el archivo y mostrarlo en un RichTextBox si lo tienes

                        MessageBox.Show("Ficha cargada desde: " + openFileDialog.FileName, "Éxito", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show("Error al leer el archivo: " + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }
                }

            }
        }

        private void menuGuardarOferta_Click(object sender, EventArgs e)
        {
            using (SaveFileDialog saveFileDialog = new SaveFileDialog())
            {
                saveFileDialog.Filter = "Archivos de texto (.txt)|.txt";
                saveFileDialog.Title = "Guardar Oferta Personalizada";
                saveFileDialog.AddExtension = true;

                if (saveFileDialog.ShowDialog() == DialogResult.OK)
                {
                    try
                    {
                        // Guardar el contenido de un RichTextBox

                        MessageBox.Show("Oferta guardada exitosamente.", "Guardado", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show("Error al guardar: " + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }
                }
            }

        }

        private void menuSalir_Click(object sender, EventArgs e)
        {
            this.Close(); // Esto disparará automáticamente el evento Form1_FormClosing
        }

        // MENU EDICION
        private void menuLimpiar_Click(object sender, EventArgs e)
        {
            DialogResult confirmacion = MessageBox.Show(
                "¿Desea limpiar todos los campos del formulario?",
                "Confirmar Limpieza",
                MessageBoxButtons.YesNo,
                MessageBoxIcon.Warning);

            if (confirmacion == DialogResult.Yes)
            {
                // Limpia aquí tus controles específicos
                // Ejemplo: richTextBoxVehiculo.Clear();
                MessageBox.Show("Formulario restablecido.", "Limpieza", MessageBoxButtons.OK, MessageBoxIcon.Asterisk);
            }
        }

        private void menuColor_Click(object sender, EventArgs e)
        {
            using (ColorDialog colorDialog = new ColorDialog())
            {
                if (colorDialog.ShowDialog() == DialogResult.OK)
                {
                    this.BackColor = colorDialog.Color;
                }
            }

        }
    }
}
