namespace ejer_04
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void txtUsuario_TextChanged(object sender, EventArgs e)
        {

        }

        private void btnIngresar_Click(object sender, EventArgs e)
        {
            string usuario = txtUsuario.Text;
            string clave = txtClave.Text;

            if (usuario == "admin" && clave == "1234")
            {
                lblMensaje.Text = "Acceso concedido";
                lblMensaje.ForeColor = System.Drawing.Color.Green;
            }
            else
            {
                lblMensaje.Text = "Acceso denegado";
                lblMensaje.ForeColor = System.Drawing.Color.Red;
            }
        }
    }
}
