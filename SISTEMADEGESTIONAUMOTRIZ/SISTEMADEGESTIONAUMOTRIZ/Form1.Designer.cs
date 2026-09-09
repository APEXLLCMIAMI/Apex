namespace SISTEMADEGESTIONAUMOTRIZ
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            contextMenuStripVehiculo = new ContextMenuStrip(components);
            copiarToolStripMenuItem = new ToolStripMenuItem();
            pegarToolStripMenuItem = new ToolStripMenuItem();
            cambiarFuenteToolStripMenuItem = new ToolStripMenuItem();
            fontDialog1 = new FontDialog();
            toolStripAccesoRapido = new ToolStrip();
            btnAbrir = new ToolStripButton();
            btnGuardar = new ToolStripButton();
            toolStripSeparator1 = new ToolStripSeparator();
            btnInfo = new ToolStripButton();
            menuStripPrincipal = new MenuStrip();
            menuCargarFicha = new ToolStripMenuItem();
            menuGuardarOferta = new ToolStripMenuItem();
            menuSalir = new ToolStripMenuItem();
            menuEdicion = new ToolStripMenuItem();
            menuLimpiar = new ToolStripMenuItem();
            menuPersonalizar = new ToolStripMenuItem();
            menuColorFondo = new ToolStripMenuItem();
            toolStrip1 = new ToolStrip();
            copiarToolStripButton = new ToolStripButton();
            pegarToolStripButton = new ToolStripButton();
            CambiarFuenteToolStripButton = new ToolStripButton();
            txtMarca = new TextBox();
            txtModelo = new TextBox();
            txtEspecificaciones = new TextBox();
            label1 = new Label();
            label2 = new Label();
            label3 = new Label();
            btnGuardar1 = new Button();
            dataGridView1 = new DataGridView();
            btnVerVehiculo = new Button();
            richTextBoxEspecificaciones = new RichTextBox();
            AbrirForm2 = new Button();
            contextMenuStripVehiculo.SuspendLayout();
            toolStripAccesoRapido.SuspendLayout();
            menuStripPrincipal.SuspendLayout();
            toolStrip1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)dataGridView1).BeginInit();
            SuspendLayout();
            // 
            // contextMenuStripVehiculo
            // 
            contextMenuStripVehiculo.ImageScalingSize = new Size(20, 20);
            contextMenuStripVehiculo.Items.AddRange(new ToolStripItem[] { copiarToolStripMenuItem, pegarToolStripMenuItem, cambiarFuenteToolStripMenuItem });
            contextMenuStripVehiculo.Name = "contextMenuStripVehiculo";
            contextMenuStripVehiculo.Size = new Size(183, 76);
            // 
            // copiarToolStripMenuItem
            // 
            copiarToolStripMenuItem.Name = "copiarToolStripMenuItem";
            copiarToolStripMenuItem.Size = new Size(182, 24);
            copiarToolStripMenuItem.Text = "Copiar";
            // 
            // pegarToolStripMenuItem
            // 
            pegarToolStripMenuItem.Name = "pegarToolStripMenuItem";
            pegarToolStripMenuItem.Size = new Size(182, 24);
            pegarToolStripMenuItem.Text = "Pegar";
            // 
            // cambiarFuenteToolStripMenuItem
            // 
            cambiarFuenteToolStripMenuItem.Name = "cambiarFuenteToolStripMenuItem";
            cambiarFuenteToolStripMenuItem.Size = new Size(182, 24);
            cambiarFuenteToolStripMenuItem.Text = "Cambiar Fuente";
            // 
            // toolStripAccesoRapido
            // 
            toolStripAccesoRapido.ImageScalingSize = new Size(20, 20);
            toolStripAccesoRapido.Items.AddRange(new ToolStripItem[] { btnAbrir, btnGuardar, toolStripSeparator1, btnInfo });
            toolStripAccesoRapido.Location = new Point(0, 28);
            toolStripAccesoRapido.Name = "toolStripAccesoRapido";
            toolStripAccesoRapido.Size = new Size(800, 27);
            toolStripAccesoRapido.TabIndex = 2;
            toolStripAccesoRapido.Text = "toolStrip1";
            // 
            // btnAbrir
            // 
            btnAbrir.DisplayStyle = ToolStripItemDisplayStyle.Image;
            btnAbrir.Image = (Image)resources.GetObject("btnAbrir.Image");
            btnAbrir.ImageTransparentColor = Color.Magenta;
            btnAbrir.Name = "btnAbrir";
            btnAbrir.Size = new Size(29, 24);
            btnAbrir.Text = "Abrir";
            btnAbrir.Click += btnAbrir_Click;
            // 
            // btnGuardar
            // 
            btnGuardar.DisplayStyle = ToolStripItemDisplayStyle.Image;
            btnGuardar.Image = (Image)resources.GetObject("btnGuardar.Image");
            btnGuardar.ImageTransparentColor = Color.Magenta;
            btnGuardar.Name = "btnGuardar";
            btnGuardar.Size = new Size(29, 24);
            btnGuardar.Text = "Guardar";
            btnGuardar.Click += btnGuardar_Click;
            // 
            // toolStripSeparator1
            // 
            toolStripSeparator1.Name = "toolStripSeparator1";
            toolStripSeparator1.Size = new Size(6, 27);
            // 
            // btnInfo
            // 
            btnInfo.DisplayStyle = ToolStripItemDisplayStyle.Image;
            btnInfo.Image = (Image)resources.GetObject("btnInfo.Image");
            btnInfo.ImageTransparentColor = Color.Magenta;
            btnInfo.Name = "btnInfo";
            btnInfo.Size = new Size(29, 24);
            btnInfo.Text = "Info";
            btnInfo.Click += btnInfo_Click;
            // 
            // menuStripPrincipal
            // 
            menuStripPrincipal.ImageScalingSize = new Size(20, 20);
            menuStripPrincipal.Items.AddRange(new ToolStripItem[] { menuCargarFicha, menuGuardarOferta, menuSalir, menuEdicion, menuPersonalizar });
            menuStripPrincipal.Location = new Point(0, 0);
            menuStripPrincipal.Name = "menuStripPrincipal";
            menuStripPrincipal.Size = new Size(800, 28);
            menuStripPrincipal.TabIndex = 3;
            menuStripPrincipal.Text = "menuStrip1";
            // 
            // menuCargarFicha
            // 
            menuCargarFicha.Name = "menuCargarFicha";
            menuCargarFicha.Size = new Size(105, 24);
            menuCargarFicha.Text = "Cargar Ficha";
            menuCargarFicha.Click += menuCargarFicha_Click;
            // 
            // menuGuardarOferta
            // 
            menuGuardarOferta.Name = "menuGuardarOferta";
            menuGuardarOferta.Size = new Size(122, 24);
            menuGuardarOferta.Text = "Guardar Oferta";
            menuGuardarOferta.Click += menuGuardarOferta_Click;
            // 
            // menuSalir
            // 
            menuSalir.Name = "menuSalir";
            menuSalir.Size = new Size(52, 24);
            menuSalir.Text = "Salir";
            menuSalir.Click += menuSalir_Click;
            // 
            // menuEdicion
            // 
            menuEdicion.DropDownItems.AddRange(new ToolStripItem[] { menuLimpiar });
            menuEdicion.Name = "menuEdicion";
            menuEdicion.Size = new Size(72, 24);
            menuEdicion.Text = "Edicion";
            // 
            // menuLimpiar
            // 
            menuLimpiar.Name = "menuLimpiar";
            menuLimpiar.Size = new Size(218, 26);
            menuLimpiar.Text = "Limpiar Formulario";
            menuLimpiar.Click += menuLimpiar_Click;
            // 
            // menuPersonalizar
            // 
            menuPersonalizar.DropDownItems.AddRange(new ToolStripItem[] { menuColorFondo });
            menuPersonalizar.Name = "menuPersonalizar";
            menuPersonalizar.Size = new Size(102, 24);
            menuPersonalizar.Text = "Personalizar";
            // 
            // menuColorFondo
            // 
            menuColorFondo.Name = "menuColorFondo";
            menuColorFondo.Size = new Size(195, 26);
            menuColorFondo.Text = "Color de Fondo";
            menuColorFondo.Click += menuColorFondo_Click;
            // 
            // toolStrip1
            // 
            toolStrip1.ImageScalingSize = new Size(20, 20);
            toolStrip1.Items.AddRange(new ToolStripItem[] { copiarToolStripButton, pegarToolStripButton, CambiarFuenteToolStripButton });
            toolStrip1.Location = new Point(0, 55);
            toolStrip1.Name = "toolStrip1";
            toolStrip1.Size = new Size(800, 27);
            toolStrip1.TabIndex = 4;
            toolStrip1.Text = "toolStrip1";
            // 
            // copiarToolStripButton
            // 
            copiarToolStripButton.DisplayStyle = ToolStripItemDisplayStyle.Text;
            copiarToolStripButton.Image = (Image)resources.GetObject("copiarToolStripButton.Image");
            copiarToolStripButton.ImageTransparentColor = Color.Magenta;
            copiarToolStripButton.Name = "copiarToolStripButton";
            copiarToolStripButton.Size = new Size(57, 24);
            copiarToolStripButton.Text = "Copiar";
            copiarToolStripButton.Click += copiarToolStripButton_Click;
            // 
            // pegarToolStripButton
            // 
            pegarToolStripButton.DisplayStyle = ToolStripItemDisplayStyle.Text;
            pegarToolStripButton.Image = (Image)resources.GetObject("pegarToolStripButton.Image");
            pegarToolStripButton.ImageTransparentColor = Color.Magenta;
            pegarToolStripButton.Name = "pegarToolStripButton";
            pegarToolStripButton.Size = new Size(50, 24);
            pegarToolStripButton.Text = "Pegar";
            pegarToolStripButton.Click += pegarToolStripButton_Click;
            // 
            // CambiarFuenteToolStripButton
            // 
            CambiarFuenteToolStripButton.DisplayStyle = ToolStripItemDisplayStyle.Text;
            CambiarFuenteToolStripButton.Image = (Image)resources.GetObject("CambiarFuenteToolStripButton.Image");
            CambiarFuenteToolStripButton.ImageTransparentColor = Color.Magenta;
            CambiarFuenteToolStripButton.Name = "CambiarFuenteToolStripButton";
            CambiarFuenteToolStripButton.Size = new Size(117, 24);
            CambiarFuenteToolStripButton.Text = "Cambiar Fuente";
            CambiarFuenteToolStripButton.Click += CambiarFuenteToolStripButton_Click;
            // 
            // txtMarca
            // 
            txtMarca.Location = new Point(26, 131);
            txtMarca.Name = "txtMarca";
            txtMarca.Size = new Size(125, 27);
            txtMarca.TabIndex = 5;
            // 
            // txtModelo
            // 
            txtModelo.Location = new Point(181, 131);
            txtModelo.Name = "txtModelo";
            txtModelo.Size = new Size(125, 27);
            txtModelo.TabIndex = 6;
            // 
            // txtEspecificaciones
            // 
            txtEspecificaciones.Location = new Point(330, 131);
            txtEspecificaciones.Name = "txtEspecificaciones";
            txtEspecificaciones.Size = new Size(125, 27);
            txtEspecificaciones.TabIndex = 7;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(26, 98);
            label1.Name = "label1";
            label1.Size = new Size(50, 20);
            label1.TabIndex = 8;
            label1.Text = "Marca";
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(181, 98);
            label2.Name = "label2";
            label2.Size = new Size(61, 20);
            label2.TabIndex = 9;
            label2.Text = "Modelo";
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(330, 98);
            label3.Name = "label3";
            label3.Size = new Size(117, 20);
            label3.TabIndex = 10;
            label3.Text = "Especificaciones";
            // 
            // btnGuardar1
            // 
            btnGuardar1.Location = new Point(495, 129);
            btnGuardar1.Name = "btnGuardar1";
            btnGuardar1.Size = new Size(94, 29);
            btnGuardar1.TabIndex = 11;
            btnGuardar1.Text = "Guardar";
            btnGuardar1.UseVisualStyleBackColor = true;
            btnGuardar1.Click += btnGuardar1_Click;
            // 
            // dataGridView1
            // 
            dataGridView1.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dataGridView1.Location = new Point(12, 180);
            dataGridView1.Name = "dataGridView1";
            dataGridView1.RowHeadersWidth = 51;
            dataGridView1.Size = new Size(621, 219);
            dataGridView1.TabIndex = 12;
            // 
            // btnVerVehiculo
            // 
            btnVerVehiculo.Location = new Point(430, 409);
            btnVerVehiculo.Name = "btnVerVehiculo";
            btnVerVehiculo.Size = new Size(117, 29);
            btnVerVehiculo.TabIndex = 13;
            btnVerVehiculo.Text = "Ver Vehiculos";
            btnVerVehiculo.UseVisualStyleBackColor = true;
            btnVerVehiculo.Click += btnVerVehiculo_Click;
            // 
            // richTextBoxEspecificaciones
            // 
            richTextBoxEspecificaciones.ContextMenuStrip = contextMenuStripVehiculo;
            richTextBoxEspecificaciones.Location = new Point(12, 180);
            richTextBoxEspecificaciones.Name = "richTextBoxEspecificaciones";
            richTextBoxEspecificaciones.Size = new Size(110, 183);
            richTextBoxEspecificaciones.TabIndex = 0;
            richTextBoxEspecificaciones.Text = "";
            // 
            // AbrirForm2
            // 
            AbrirForm2.Location = new Point(669, 285);
            AbrirForm2.Name = "AbrirForm2";
            AbrirForm2.Size = new Size(94, 29);
            AbrirForm2.TabIndex = 14;
            AbrirForm2.Text = "FORM 2";
            AbrirForm2.UseVisualStyleBackColor = true;
            AbrirForm2.Click += AbrirForm2_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(AbrirForm2);
            Controls.Add(btnVerVehiculo);
            Controls.Add(dataGridView1);
            Controls.Add(btnGuardar1);
            Controls.Add(label3);
            Controls.Add(label2);
            Controls.Add(label1);
            Controls.Add(txtEspecificaciones);
            Controls.Add(txtModelo);
            Controls.Add(txtMarca);
            Controls.Add(toolStrip1);
            Controls.Add(toolStripAccesoRapido);
            Controls.Add(menuStripPrincipal);
            Controls.Add(richTextBoxEspecificaciones);
            MainMenuStrip = menuStripPrincipal;
            Name = "Form1";
            Text = "Form1";
            FormClosing += Form1_FormClosing;
            Load += Form1_Load;
            contextMenuStripVehiculo.ResumeLayout(false);
            toolStripAccesoRapido.ResumeLayout(false);
            toolStripAccesoRapido.PerformLayout();
            menuStripPrincipal.ResumeLayout(false);
            menuStripPrincipal.PerformLayout();
            toolStrip1.ResumeLayout(false);
            toolStrip1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)dataGridView1).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion
        private ContextMenuStrip contextMenuStripVehiculo;
        private ToolStripMenuItem copiarToolStripMenuItem;
        private ToolStripMenuItem pegarToolStripMenuItem;
        private ToolStripMenuItem cambiarFuenteToolStripMenuItem;
        private FontDialog fontDialog1;
        private ToolStrip toolStripAccesoRapido;
        private ToolStripButton btnAbrir;
        private ToolStripButton btnGuardar;
        private ToolStripButton btnInfo;
        private ToolStripSeparator toolStripSeparator1;
        private MenuStrip menuStripPrincipal;
        private ToolStripMenuItem menuCargarFicha;
        private ToolStripMenuItem menuGuardarOferta;
        private ToolStripMenuItem menuSalir;
        private ToolStripMenuItem menuEdicion;
        private ToolStripMenuItem menuPersonalizar;
        private ToolStripMenuItem menuLimpiar;
        private ToolStripMenuItem menuColorFondo;
        private ToolStrip toolStrip1;
        private ToolStripButton copiarToolStripButton;
        private ToolStripButton pegarToolStripButton;
        private ToolStripButton CambiarFuenteToolStripButton;
        private TextBox txtMarca;
        private TextBox txtModelo;
        private TextBox txtEspecificaciones;
        private Label label1;
        private Label label2;
        private Label label3;
        private Button btnGuardar1;
        private DataGridView dataGridView1;
        private Button btnVerVehiculo;
        private RichTextBox richTextBoxEspecificaciones;
        private Button AbrirForm2;
    }
}
