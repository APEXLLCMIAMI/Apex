namespace APLICACION_3
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void btnIncrementar_Click(object sender, EventArgs e)
        {
            if (progressBar1.Value < 100)
            {
                progressBar1.Value += 10;
                lblPorcentaje.Text = progressBar1.Value + "%";
            }

            if (progressBar1.Value == 100)
            {
                MessageBox.Show("¡Llegaste al 100%!",
                                "Completado", MessageBoxButtons.OK, MessageBoxIcon.Information);
                btnIncrementar.Enabled = false; // Desactiva el botón al llegar al 100%
            }

        }
    }
}
