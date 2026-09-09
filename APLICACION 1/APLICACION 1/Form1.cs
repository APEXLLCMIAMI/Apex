namespace APLICACION_1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void btnConvertir_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtCelsius.Text))
            {
                MessageBox.Show("Por favor, ingresa un valor en Celsius.",
                                "Campo vacío", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            if (!double.TryParse(txtCelsius.Text, out double celsius))
            {
                MessageBox.Show("Ingresa un número válido.",
                                "Error de formato", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }

            double fahrenheit = (celsius * 9.0 / 5.0) + 32;
            lblResultado.Text = $"{celsius}°C = {fahrenheit:F2}°F";
        }
    }
}
