using PROGRAMACIONESCRITORIO;

namespace PROGRAMACIONESCRITORIO
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private async void btnCargar_Click(object sender, EventArgs e)
        {
            ApiService api = new ApiService();
            btnCargar.Enabled = false;

            try
            {
                // --- INICIO DE SIMULACIÓN DE PRUEBA ---
                // 1. Simula una espera de 2 segundos (el usuario verá el botón desactivado)
                await Task.Delay(2000);

                // 2. Fuerza la interrupción para probar que el catch funciona
                throw new TaskCanceledException();

                // --- CÓDIGO REAL (Comentado durante la prueba) ---
                // var datos = await api.GetAsync<List<ProductoDto>>("https://api.tu-sitio.com/datos");
                // miDataGrid.DataSource = datos;
            }
            catch (TaskCanceledException)
            {
                // Aquí aterrizará el código forzado de la línea 11
                MostrarErrorUsuario("El servidor tardó demasiado en responder. Por favor, intenta de nuevo más tarde.");
            }
            catch (HttpRequestException ex)
            {
                if (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    MostrarErrorUsuario("No pudimos encontrar la información solicitada en el servidor (Error 404).");
                }
                else
                {
                    MostrarErrorUsuario("El servidor tardó demasiado en responder. Por favor, intenta de nuevo más tarde.");
                }
            }
            catch (Exception)
            {
                MostrarErrorUsuario("Ocurrió un error inesperado al procesar los datos.");
            }
            finally
            {
                btnCargar.Enabled = true;
            }

        }

        private void MostrarErrorUsuario(string mensaje)
        {
            MessageBox.Show(mensaje, "Estado de la conexión", MessageBoxButtons.OK, MessageBoxIcon.Warning);
        }

    }
}
