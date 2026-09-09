using System;
using System.Threading;
using System.Windows;
using System.Windows.Media;

namespace ejercicio5
{
    public partial class MainWindow : Window
    {
        private Thread hiloProcesamiento;

        public MainWindow()
        {
            InitializeComponent();
        }


        //Este programa es un gestor de tareas de fondo que ejecuta un proceso largo sin congelar la interfaz, mostrando el progreso en tiempo real mediante una barra visual
        //que se va llenando junto a un porcentaje que actualiza cada segundo; mientras avanza, la aplicación comunica al usuario el estado del proceso
        //(inicio, porcentaje completado y finalización con éxito)
        //y cambia los colores de la pantalla según corresponda, todo manejado con threads para que
        //la experiencia sea fluida, similar a como verías una barra de descarga en cualquier instalador o descargador de archivos.

        private void BtnIniciar_Click(object sender, RoutedEventArgs e)
        {
           
            if (hiloProcesamiento != null && hiloProcesamiento.IsAlive)
            {
                return;
            }

           
            hiloProcesamiento = new Thread(EjecutarCalculoPesadoLote);
            hiloProcesamiento.IsBackground = true;

            txtEstadoHilo.Text = $"Estado inicial: {hiloProcesamiento.ThreadState}";
            txtEstadoHilo.Foreground = new SolidColorBrush(Color.FromRgb(133, 77, 14));

            hiloProcesamiento.Start();

            btnIniciar.IsEnabled = false;
        }

        private void EjecutarCalculoPesadoLote()
        {
            int managedThreadId = Thread.CurrentThread.ManagedThreadId;
            int threadId = managedThreadId;

            Dispatcher.Invoke(() => {
                txtEstadoHilo.Text = $"Hilo #{threadId} en ejecución... UI fluida";
                txtEstadoHilo.Foreground = new SolidColorBrush(Color.FromRgb(30, 58, 138)); 
            });

            for (int i = 1; i <= 5; i++)
            {
                Thread.Sleep(1500); 
                int porcentajeProgreso = i * 20;

                _ = Dispatcher.BeginInvoke(new Action(() =>
                {
                    progresoBarra.Value = porcentajeProgreso;
                    lblPorcentaje.Content = $"{porcentajeProgreso}% Procesado";
                }));
            }

           
            Dispatcher.Invoke(() => {
                txtEstadoHilo.Text = "Procesamiento finalizado con éxito.";
                txtEstadoHilo.Foreground = new SolidColorBrush(Color.FromRgb(20, 83, 45)); 
                btnIniciar.IsEnabled = true;
            });
        }
    }
}