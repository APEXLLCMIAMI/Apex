namespace OJ_2
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void tsBtnAbrir_Click(object sender, EventArgs e)
        {
            OpenFileDialog ofd = new OpenFileDialog();
            ofd.Title = "Abrir archivo de automotriz";
            ofd.Filter = "Todos los archivos (.txt)|.txt";

            if (ofd.ShowDialog() == DialogResult.OK)
            {
                // leera el archivo y cargar los datos en el formulario
                MessageBox.Show("Archivo seleccionado:\n" + ofd.FileName, "Abrir",
                                MessageBoxButtons.OK, MessageBoxIcon.Information);
            }


        }


        private void tsBtnGuardar_Click(object sender, EventArgs e)
        {
            SaveFileDialog sfd = new SaveFileDialog();
            sfd.Title = "Guardar archivo de automotriz";
            sfd.Filter = "Todos los archivos (.txt)|.txt";

            if (sfd.ShowDialog() == DialogResult.OK)
            {
                // guardara los datos
                MessageBox.Show("Archivo guardado en:\n" + sfd.FileName, "Guardar",
                                MessageBoxButtons.OK, MessageBoxIcon.Information);
            }

        }

        private void tsBtnInfo_Click(object sender, EventArgs e)
        {
            MessageBox.Show(
           "Datos de contacto de la UCN:\n\n" +
           "Teléfono: 88570084\n" +
           "Email: ejercicio@gmail.com\n" +
           "Dirección: Managua 23 n12",
           "Información",
           MessageBoxButtons.OK,
           MessageBoxIcon.Information);

        }
    }
}
