using System;
using System.Windows.Forms;


namespace ejer_02
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void btnSumar_Click(object sender, EventArgs e)
        {
            double num1 = double.Parse(txtNumero1.Text);
            double num2 = double.Parse(txtNumero2.Text);
            lblResultado.Text = "Resultado: " + (num1 + num2);
        }

        private void btnRestar_Click(object sender, EventArgs e)
        {
            double num1 = double.Parse(txtNumero1.Text);
            double num2 = double.Parse(txtNumero2.Text);
            lblResultado.Text = "Resultado: " + (num1 - num2);
        }

        private void btnMultiplicar_Click(object sender, EventArgs e)
        {
            double num1 = double.Parse(txtNumero1.Text);
            double num2 = double.Parse(txtNumero2.Text);
            lblResultado.Text = "Resultado: " + (num1 * num2);
        }

        private void btnDividir_Click(object sender, EventArgs e)
        {
            double num1 = double.Parse(txtNumero1.Text);
            double num2 = double.Parse(txtNumero2.Text);
            if (num2 == 0)
            {
                MessageBox.Show("No se puede dividir entre cero.");
                return;
            }
            lblResultado.Text = "Resultado: " + (num1 / num2);
        }
    }
}
