namespace APLICACION_5
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        private void CargarOpciones()
        {
            cmbOpciones.Items.Add("Paisaje");
            cmbOpciones.Items.Add("Ciudad");
            cmbOpciones.Items.Add("Playa");
        }

        private void cmbOpciones_SelectedIndexChanged(object sender, EventArgs e)
        {
            string nombreArchivo = "";

            switch (cmbOpciones.SelectedIndex)
            {
                case 0: nombreArchivo = "paisaje.jpg"; break;
                case 1: nombreArchivo = "ciudad.jpg"; break;
                case 2: nombreArchivo = "playa.jpg"; break;
            }

            // Ruta de la imagen en la carpeta del proyecto
            string ruta = Path.Combine(Application.StartupPath, nombreArchivo);

            if (File.Exists(ruta))
            {
                pictureBox1.Image = Image.FromFile(ruta);
            }
            else
            {
                MessageBox.Show($"No se encontró la imagen: {nombreArchivo}\n\nAsegúrate de copiar las imágenes a la carpeta:\n{Application.StartupPath}",
                                "Imagen no encontrada", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                pictureBox1.Image = null;
            }

        }
    }
}
