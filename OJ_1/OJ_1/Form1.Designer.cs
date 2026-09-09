namespace OJ_1
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
            menuStrip1 = new MenuStrip();
            archivoToolStripMenuItem = new ToolStripMenuItem();
            menuCargarFicha = new ToolStripMenuItem();
            menuGuardarOferta = new ToolStripMenuItem();
            menuSalir = new ToolStripMenuItem();
            ediciónToolStripMenuItem = new ToolStripMenuItem();
            menuLimpiar = new ToolStripMenuItem();
            personalizarToolStripMenuItem = new ToolStripMenuItem();
            menuColor = new ToolStripMenuItem();
            menuStrip1.SuspendLayout();
            SuspendLayout();
            // 
            // menuStrip1
            // 
            menuStrip1.ImageScalingSize = new Size(20, 20);
            menuStrip1.Items.AddRange(new ToolStripItem[] { archivoToolStripMenuItem, ediciónToolStripMenuItem, personalizarToolStripMenuItem });
            menuStrip1.Location = new Point(0, 0);
            menuStrip1.Name = "menuStrip1";
            menuStrip1.Size = new Size(800, 28);
            menuStrip1.TabIndex = 0;
            menuStrip1.Text = "menuStrip1";
            // 
            // archivoToolStripMenuItem
            // 
            archivoToolStripMenuItem.DropDownItems.AddRange(new ToolStripItem[] { menuCargarFicha, menuGuardarOferta, menuSalir });
            archivoToolStripMenuItem.Name = "archivoToolStripMenuItem";
            archivoToolStripMenuItem.Size = new Size(73, 24);
            archivoToolStripMenuItem.Text = "Archivo";
            // 
            // menuCargarFicha
            // 
            menuCargarFicha.Name = "menuCargarFicha";
            menuCargarFicha.Size = new Size(191, 26);
            menuCargarFicha.Text = "Cargar Ficha ";
            menuCargarFicha.Click += menuCargarFicha_Click;
            // 
            // menuGuardarOferta
            // 
            menuGuardarOferta.Name = "menuGuardarOferta";
            menuGuardarOferta.Size = new Size(191, 26);
            menuGuardarOferta.Text = "Guardar Oferta";
            menuGuardarOferta.Click += menuGuardarOferta_Click;
            // 
            // menuSalir
            // 
            menuSalir.Name = "menuSalir";
            menuSalir.Size = new Size(191, 26);
            menuSalir.Text = "Salir ";
            menuSalir.Click += menuSalir_Click;
            // 
            // ediciónToolStripMenuItem
            // 
            ediciónToolStripMenuItem.DropDownItems.AddRange(new ToolStripItem[] { menuLimpiar });
            ediciónToolStripMenuItem.Name = "ediciónToolStripMenuItem";
            ediciónToolStripMenuItem.Size = new Size(72, 24);
            ediciónToolStripMenuItem.Text = "Edición";
            // 
            // menuLimpiar
            // 
            menuLimpiar.Name = "menuLimpiar";
            menuLimpiar.Size = new Size(224, 26);
            menuLimpiar.Text = "Limpiar Formulario";
            menuLimpiar.Click += menuLimpiar_Click;
            // 
            // personalizarToolStripMenuItem
            // 
            personalizarToolStripMenuItem.DropDownItems.AddRange(new ToolStripItem[] { menuColor });
            personalizarToolStripMenuItem.Name = "personalizarToolStripMenuItem";
            personalizarToolStripMenuItem.Size = new Size(102, 24);
            personalizarToolStripMenuItem.Text = "Personalizar";
            // 
            // menuColor
            // 
            menuColor.Name = "menuColor";
            menuColor.Size = new Size(224, 26);
            menuColor.Text = "Color de Fondo";
            menuColor.Click += menuColor_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(menuStrip1);
            MainMenuStrip = menuStrip1;
            Name = "Form1";
            Text = "Form1";
            Load += Form1_Load;
            menuStrip1.ResumeLayout(false);
            menuStrip1.PerformLayout();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private MenuStrip menuStrip1;
        private ToolStripMenuItem archivoToolStripMenuItem;
        private ToolStripMenuItem menuCargarFicha;
        private ToolStripMenuItem menuGuardarOferta;
        private ToolStripMenuItem menuSalir;
        private ToolStripMenuItem ediciónToolStripMenuItem;
        private ToolStripMenuItem menuLimpiar;
        private ToolStripMenuItem personalizarToolStripMenuItem;
        private ToolStripMenuItem menuColor;
    }
}
