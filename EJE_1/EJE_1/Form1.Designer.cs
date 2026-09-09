namespace EJE_1
{
    partial class Form1
    {
        private System.ComponentModel.IContainer components = null;

        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
                components.Dispose();
            base.Dispose(disposing);
        }

        private void InitializeComponent()
        {
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.archivoToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.cargarFichaToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.guardarOfertaToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator1 = new System.Windows.Forms.ToolStripSeparator();
            this.salirToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.edicionToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.limpiarFormularioToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.personalizarToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.colorDeFondoToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStrip1 = new System.Windows.Forms.ToolStrip();
            this.btnAbrir = new System.Windows.Forms.ToolStripButton();
            this.btnGuardar = new System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator2 = new System.Windows.Forms.ToolStripSeparator();
            this.btnInformacion = new System.Windows.Forms.ToolStripButton();
            this.contextMenuStrip1 = new System.Windows.Forms.ContextMenuStrip();
            this.copiarToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.pegarToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.cambiarFuenteDeLetraToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.richTextBox1 = new System.Windows.Forms.RichTextBox();
            this.openFileDialog1 = new System.Windows.Forms.OpenFileDialog();
            this.saveFileDialog1 = new System.Windows.Forms.SaveFileDialog();
            this.colorDialog1 = new System.Windows.Forms.ColorDialog();
            this.fontDialog1 = new System.Windows.Forms.FontDialog();
            this.menuStrip1.SuspendLayout();
            this.toolStrip1.SuspendLayout();
            this.contextMenuStrip1.SuspendLayout();
            this.SuspendLayout();

            // menuStrip1
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
                this.archivoToolStripMenuItem,
                this.edicionToolStripMenuItem,
                this.personalizarToolStripMenuItem });
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(784, 24);
            this.menuStrip1.TabIndex = 0;

            // archivoToolStripMenuItem
            this.archivoToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
                this.cargarFichaToolStripMenuItem,
                this.guardarOfertaToolStripMenuItem,
                this.toolStripSeparator1,
                this.salirToolStripMenuItem });
            this.archivoToolStripMenuItem.Name = "archivoToolStripMenuItem";
            this.archivoToolStripMenuItem.Text = "Archivo";

            // cargarFichaToolStripMenuItem
            this.cargarFichaToolStripMenuItem.Name = "cargarFichaToolStripMenuItem";
            this.cargarFichaToolStripMenuItem.Text = "Cargar Ficha";
            this.cargarFichaToolStripMenuItem.Click += new System.EventHandler(this.cargarFichaToolStripMenuItem_Click);

            // guardarOfertaToolStripMenuItem
            this.guardarOfertaToolStripMenuItem.Name = "guardarOfertaToolStripMenuItem";
            this.guardarOfertaToolStripMenuItem.Text = "Guardar Oferta";
            this.guardarOfertaToolStripMenuItem.Click += new System.EventHandler(this.guardarOfertaToolStripMenuItem_Click);

            // toolStripSeparator1
            this.toolStripSeparator1.Name = "toolStripSeparator1";

            // salirToolStripMenuItem
            this.salirToolStripMenuItem.Name = "salirToolStripMenuItem";
            this.salirToolStripMenuItem.Text = "Salir";
            this.salirToolStripMenuItem.Click += new System.EventHandler(this.salirToolStripMenuItem_Click);

            // edicionToolStripMenuItem
            this.edicionToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
                this.limpiarFormularioToolStripMenuItem });
            this.edicionToolStripMenuItem.Name = "edicionToolStripMenuItem";
            this.edicionToolStripMenuItem.Text = "Edición";

            // limpiarFormularioToolStripMenuItem
            this.limpiarFormularioToolStripMenuItem.Name = "limpiarFormularioToolStripMenuItem";
            this.limpiarFormularioToolStripMenuItem.Text = "Limpiar Formulario";
            this.limpiarFormularioToolStripMenuItem.Click += new System.EventHandler(this.limpiarFormularioToolStripMenuItem_Click);

            // personalizarToolStripMenuItem
            this.personalizarToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
                this.colorDeFondoToolStripMenuItem });
            this.personalizarToolStripMenuItem.Name = "personalizarToolStripMenuItem";
            this.personalizarToolStripMenuItem.Text = "Personalizar";

            // colorDeFondoToolStripMenuItem
            this.colorDeFondoToolStripMenuItem.Name = "colorDeFondoToolStripMenuItem";
            this.colorDeFondoToolStripMenuItem.Text = "Color de Fondo";
            this.colorDeFondoToolStripMenuItem.Click += new System.EventHandler(this.colorDeFondoToolStripMenuItem_Click);

            // toolStrip1
            this.toolStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
                this.btnAbrir,
                this.btnGuardar,
                this.toolStripSeparator2,
                this.btnInformacion });
            this.toolStrip1.Location = new System.Drawing.Point(0, 24);
            this.toolStrip1.Name = "toolStrip1";
            this.toolStrip1.Size = new System.Drawing.Size(784, 25);
            this.toolStrip1.TabIndex = 1;

            // btnAbrir
            this.btnAbrir.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Text;
            this.btnAbrir.Name = "btnAbrir";
            this.btnAbrir.Text = "Abrir";
            this.btnAbrir.Click += new System.EventHandler(this.btnAbrir_Click);

            // btnGuardar
            this.btnGuardar.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Text;
            this.btnGuardar.Name = "btnGuardar";
            this.btnGuardar.Text = "Guardar";
            this.btnGuardar.Click += new System.EventHandler(this.btnGuardar_Click);

            // toolStripSeparator2
            this.toolStripSeparator2.Name = "toolStripSeparator2";

            // btnInformacion
            this.btnInformacion.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Text;
            this.btnInformacion.Name = "btnInformacion";
            this.btnInformacion.Text = "Información";
            this.btnInformacion.Click += new System.EventHandler(this.btnInformacion_Click);

            // contextMenuStrip1
            this.contextMenuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
                this.copiarToolStripMenuItem,
                this.pegarToolStripMenuItem,
                this.cambiarFuenteDeLetraToolStripMenuItem });
            this.contextMenuStrip1.Name = "contextMenuStrip1";

            // copiarToolStripMenuItem
            this.copiarToolStripMenuItem.Name = "copiarToolStripMenuItem";
            this.copiarToolStripMenuItem.Text = "Copiar";
            this.copiarToolStripMenuItem.Click += new System.EventHandler(this.copiarToolStripMenuItem_Click);

            // pegarToolStripMenuItem
            this.pegarToolStripMenuItem.Name = "pegarToolStripMenuItem";
            this.pegarToolStripMenuItem.Text = "Pegar";
            this.pegarToolStripMenuItem.Click += new System.EventHandler(this.pegarToolStripMenuItem_Click);

            // cambiarFuenteDeLetraToolStripMenuItem
            this.cambiarFuenteDeLetraToolStripMenuItem.Name = "cambiarFuenteDeLetraToolStripMenuItem";
            this.cambiarFuenteDeLetraToolStripMenuItem.Text = "Cambiar Fuente de Letra";
            this.cambiarFuenteDeLetraToolStripMenuItem.Click += new System.EventHandler(this.cambiarFuenteDeLetraToolStripMenuItem_Click);

            // richTextBox1
            this.richTextBox1.ContextMenuStrip = this.contextMenuStrip1;
            this.richTextBox1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.richTextBox1.Font = new System.Drawing.Font("Arial", 11F);
            this.richTextBox1.Location = new System.Drawing.Point(0, 49);
            this.richTextBox1.Name = "richTextBox1";
            this.richTextBox1.Size = new System.Drawing.Size(784, 512);
            this.richTextBox1.TabIndex = 2;
            this.richTextBox1.Text = "";

            // Form1
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(784, 561);
            this.Controls.Add(this.richTextBox1);
            this.Controls.Add(this.toolStrip1);
            this.Controls.Add(this.menuStrip1);
            this.MainMenuStrip = this.menuStrip1;
            this.Name = "Form1";
            this.Text = "AutoDrive - Sistema de Gestión";
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.toolStrip1.ResumeLayout(false);
            this.toolStrip1.PerformLayout();
            this.contextMenuStrip1.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();
        }

        private System.Windows.Forms.MenuStrip menuStrip1;


