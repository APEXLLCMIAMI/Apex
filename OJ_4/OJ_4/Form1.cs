namespace OJ_4
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

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            DialogResult resultado = MessageBox.Show(
          "¿Está seguro que desea cerrar el sistema de gestión?",
          "Confirmación de cierre",
          MessageBoxButtons.YesNo,
          MessageBoxIcon.Question);

            if (resultado != DialogResult.Yes)
            {
                e.Cancel = true;   // No permite cerrar

            }
        }

    }
}
