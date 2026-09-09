using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace EJERCICIO_1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void richTextBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void cargarFichaToolStripMenuItem_Click(object sender, EventArgs e)
        {
            OpenFileDialog ofd = new OpenFileDialog();
            ofd.Filter = "Archivos de texto|*.txt|Todos|*.*";
            if (ofd.ShowDialog() == DialogResult.OK)
            {
                richTextBox1.LoadFile(ofd.FileName, RichTextBoxStreamType.PlainText);
                MessageBox.Show("Ficha cargada correctamente.", "Cargar Ficha",
                    MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }

        // Menú Archivo Guarda Oferta
        private void guardarOfertaToolStripMenuItem_Click(object sender, EventArgs e)
        {
            SaveFileDialog sfd = new SaveFileDialog();
            sfd.Filter = "Archivos de texto|*.txt|Todos|*.*";
            if (sfd.ShowDialog() == DialogResult.OK)
            {
                richTextBox1.SaveFile(sfd.FileName, RichTextBoxStreamType.PlainText);
                MessageBox.Show("Oferta guardada correctamente.", "Guardar Oferta",
                    MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }

        // Menú Archivo nos saca
        private void salirToolStripMenuItem_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        // Menú Edición Limpia Formulario
        private void limpiarFormularioToolStripMenuItem_Click(object sender, EventArgs e)
        {
            DialogResult resultado = MessageBox.Show(
                "¿Está seguro que desea limpiar el formulario?",
                "Confirmar",
                MessageBoxButtons.YesNo,
                MessageBoxIcon.Question);

            if (resultado == DialogResult.Yes)
                richTextBox1.Clear();
        }

        // Menú Personalizar se encarga del color de Fondo
        private void colorDeFondoToolStripMenuItem_Click(object sender, EventArgs e)
        {
            ColorDialog cd = new ColorDialog();
            if (cd.ShowDialog() == DialogResult.OK)
                this.BackColor = cd.Color;
        }





    }
}
