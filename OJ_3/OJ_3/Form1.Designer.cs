namespace OJ_3
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            components = new System.ComponentModel.Container();
            richTextBoxEspecificaciones = new RichTextBox();
            contextMenuStripVehiculo = new ContextMenuStrip(components);
            copiarToolStripMenuItem = new ToolStripMenuItem();
            pegarToolStripMenuItem = new ToolStripMenuItem();
            cambiarFuenteToolStripMenuItem = new ToolStripMenuItem();
            fontDialog1 = new FontDialog();
            contextMenuStripVehiculo.SuspendLayout();
            SuspendLayout();
            // 
            // richTextBoxEspecificaciones
            // 
            richTextBoxEspecificaciones.ContextMenuStrip = contextMenuStripVehiculo;
            richTextBoxEspecificaciones.Location = new Point(250, 141);
            richTextBoxEspecificaciones.Name = "richTextBoxEspecificaciones";
            richTextBoxEspecificaciones.Size = new Size(216, 120);
            richTextBoxEspecificaciones.TabIndex = 0;
            richTextBoxEspecificaciones.Text = "";
            // 
            // contextMenuStripVehiculo
            // 
            contextMenuStripVehiculo.ImageScalingSize = new Size(20, 20);
            contextMenuStripVehiculo.Items.AddRange(new ToolStripItem[] { copiarToolStripMenuItem, pegarToolStripMenuItem, cambiarFuenteToolStripMenuItem });
            contextMenuStripVehiculo.Name = "contextMenuStripVehiculo";
            contextMenuStripVehiculo.Size = new Size(241, 76);
            // 
            // copiarToolStripMenuItem
            // 
            copiarToolStripMenuItem.Name = "copiarToolStripMenuItem";
            copiarToolStripMenuItem.Size = new Size(240, 24);
            copiarToolStripMenuItem.Text = "Copiar";
            copiarToolStripMenuItem.Click += copiarToolStripMenuItem_Click;
            // 
            // pegarToolStripMenuItem
            // 
            pegarToolStripMenuItem.Name = "pegarToolStripMenuItem";
            pegarToolStripMenuItem.Size = new Size(240, 24);
            pegarToolStripMenuItem.Text = "Pegar";
            pegarToolStripMenuItem.Click += pegarToolStripMenuItem_Click;
            // 
            // cambiarFuenteToolStripMenuItem
            // 
            cambiarFuenteToolStripMenuItem.Name = "cambiarFuenteToolStripMenuItem";
            cambiarFuenteToolStripMenuItem.Size = new Size(240, 24);
            cambiarFuenteToolStripMenuItem.Text = "Cambiar Fuente de Letra";
            cambiarFuenteToolStripMenuItem.Click += cambiarFuenteToolStripMenuItem_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(richTextBoxEspecificaciones);
            Name = "Form1";
            Text = "Form1";
            Load += Form1_Load;
            contextMenuStripVehiculo.ResumeLayout(false);
            ResumeLayout(false);
        }

        #endregion

        private RichTextBox richTextBoxEspecificaciones;
        private ContextMenuStrip contextMenuStripVehiculo;
        private ToolStripMenuItem copiarToolStripMenuItem;
        private ToolStripMenuItem pegarToolStripMenuItem;
        private ToolStripMenuItem cambiarFuenteToolStripMenuItem;
        private FontDialog fontDialog1;
    }
}
