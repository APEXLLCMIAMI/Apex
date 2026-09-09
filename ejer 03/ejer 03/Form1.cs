namespace ejer_03
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void btnRojo_Click(object sender, EventArgs e)
        {
            this.BackColor = Color.Red;
        }

        private void btnVerde_Click(object sender, EventArgs e)
        {
            this.BackColor = Color.Green;
        }

        private void btnAzul_Click(object sender, EventArgs e)
        {
            this.BackColor = Color.Blue;
        }
    }
}
