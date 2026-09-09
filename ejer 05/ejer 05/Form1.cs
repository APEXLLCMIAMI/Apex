namespace ejer_05
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void txtNombre_TextChanged(object sender, EventArgs e)
        {

        }

        private void btnAgregar_Click(object sender, EventArgs e)
        {
            string nombre = txtNombre.Text.Trim();

            if (nombre == "")
            {
                lblMensaje.Text = "Escribe un nombre primero.";
                lblMensaje.ForeColor = System.Drawing.Color.Orange;
                return;
            }

            lstNombres.Items.Add(nombre);
            lblMensaje.Text = "Nombre agregado: " + nombre;
            lblMensaje.ForeColor = System.Drawing.Color.Green;
            txtNombre.Clear();
            txtNombre.Focus();
        }
    }
}
