using System;
using System.Windows.Forms;


namespace ejercicio_1
{
    public partial class Form1 : Form
    {
        int contadorClics = 0;
        public Form1()
        {
            InitializeComponent();
        }

        private void btnContador_Click(object sender, EventArgs e)
        {
            contadorClics++;
            lblContador.Text = "Clics: " + contadorClics.ToString();

        }
    }
}
