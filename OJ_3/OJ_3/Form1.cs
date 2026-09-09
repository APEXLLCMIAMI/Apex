namespace OJ_3
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            
            richTextBoxEspecificaciones.ContextMenuStrip = contextMenuStripVehiculo;
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        // Copea
        private void copiarToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (richTextBoxEspecificaciones.SelectionLength > 0)
            {
                richTextBoxEspecificaciones.Copy();
            }

        }

        // Pegar
        private void pegarToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (Clipboard.ContainsText())
            {
                richTextBoxEspecificaciones.Paste();
            }

        }

        // Cambia de fuente
        private void cambiarFuenteToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (fontDialog1.ShowDialog() == DialogResult.OK)
            {
                richTextBoxEspecificaciones.SelectionFont = fontDialog1.Font;
            }

        }
    }
}
