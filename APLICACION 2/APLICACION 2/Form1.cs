namespace APLICACION_2
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void btnSeleccionar_Click(object sender, EventArgs e)
        {
            string opcion = "";

            if (rbSi.Checked)
                opcion = "Sí";
            else if (rbNo.Checked)
                opcion = "No";
            else if (rbTalvez.Checked)
                opcion = "Tal vez";

            if (opcion == "")
            {
                MessageBox.Show("Por favor selecciona una opción.",
                                "Sin selección", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
            else
            {
                MessageBox.Show($"Seleccionaste: {opcion}",
                                "Opción seleccionada", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }

    }
}
