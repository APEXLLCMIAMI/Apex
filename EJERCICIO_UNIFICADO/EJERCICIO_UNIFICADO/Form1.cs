using System;
using System.Windows.Forms;

namespace EJERCICIO_UNIFICADO
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();

            // Configuración básica
            richTextBoxEspecificaciones.ContextMenuStrip = contextMenuStripVehiculo;

            copiarToolStripMenuItem.Click += copiarToolStripMenuItem_Click;
            pegarToolStripMenuItem.Click += pegarToolStripMenuItem_Click;
            cambiarFuenteToolStripMenuItem.Click += cambiarFuenteToolStripMenuItem_Click;
        }

        private void copiarToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (richTextBoxEspecificaciones.SelectionLength > 0)
                richTextBoxEspecificaciones.Copy();
        }

        private void pegarToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (Clipboard.ContainsText())
                richTextBoxEspecificaciones.Paste();
        }

        private void cambiarFuenteToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (fontDialog1.ShowDialog() == DialogResult.OK)
            {
                if (richTextBoxEspecificaciones.SelectionLength > 0)
                    richTextBoxEspecificaciones.SelectionFont = fontDialog1.Font;
                else
                    richTextBoxEspecificaciones.Font = fontDialog1.Font;
            }
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            DialogResult resultado = MessageBox.Show(
                "¿Está seguro que desea cerrar el sistema de gestión?",
                "Confirmación de cierre",
                MessageBoxButtons.YesNo,
                MessageBoxIcon.Question);

            if (resultado != DialogResult.Yes)
                e.Cancel = true;
        }
    }
}