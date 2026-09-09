using System;
using System.Drawing;
using System.Windows.Forms;

namespace EJERCICIO_1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        // CARGAR FICHA
        private void cargarFichaToolStripMenuItem_Click(object sender, EventArgs e)
        {
            OpenFileDialog ofd = new OpenFileDialog();
            if (ofd.ShowDialog() == DialogResult.OK)
                richTextBox1.LoadFile(ofd.FileName, RichTextBoxStreamType.PlainText);
        }

        // GUARDAR OFERTA
        private void guardarOfertaToolStripMenuItem_Click(object sender, EventArgs e)
        {
            SaveFileDialog sfd = new SaveFileDialog();
            if (sfd.ShowDialog() == DialogResult.OK)
                richTextBox1.SaveFile(sfd.FileName, RichTextBoxStreamType.PlainText);
        }

        // SALIR
        private void salirToolStripMenuItem_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        // LIMPIAR FORMULARIO
        private void limpiarFormularioToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("¿Limpiar el formulario?", "Confirmar",
                MessageBoxButtons.YesNo) == DialogResult.Yes)
                richTextBox1.Clear();
        }

        // COLOR DE FONDO
        private void colorDeFondoToolStripMenuItem_Click(object sender, EventArgs e)
        {
            ColorDialog cd = new ColorDialog();
            if (cd.ShowDialog() == DialogResult.OK)
                this.BackColor = cd.Color;
        }

        // BOTON ABRIR 
        private void btnAbrir_Click(object sender, EventArgs e)
        {
            OpenFileDialog ofd = new OpenFileDialog();
            if (ofd.ShowDialog() == DialogResult.OK)
                richTextBox1.LoadFile(ofd.FileName, RichTextBoxStreamType.PlainText);
        }

        // BOTON GUARDAR (ToolStrip)
        private void btnGuardar_Click(object sender, EventArgs e)
        {
            SaveFileDialog sfd = new SaveFileDialog();
            if (sfd.ShowDialog() == DialogResult.OK)
                richTextBox1.SaveFile(sfd.FileName, RichTextBoxStreamType.PlainText);
        }

        // BOTON INFORMACION 
        private void btnInformacion_Click(object sender, EventArgs e)
        {
            MessageBox.Show(
                "AutoDrive S.A.\n" +
                "Tel: +505 2222-3333\n" +
                "Email: ventas@autodrive.com\n" +
                "Dirección: Managua, Nicaragua",
                "Información", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }

        // COPIAR 
        private void copiarToolStripMenuItem_Click(object sender, EventArgs e)
        {
            richTextBox1.Copy();
        }

        // PEGAR 
        private void pegarToolStripMenuItem_Click(object sender, EventArgs e)
        {
            richTextBox1.Paste();
        }

        // CAMBIAR FUENTE 
        private void cambiarFuenteDeLetraToolStripMenuItem_Click(object sender, EventArgs e)
        {
            FontDialog fd = new FontDialog();
            if (fd.ShowDialog() == DialogResult.OK)
                richTextBox1.Font = fd.Font;
        }

        
        }
    }
}