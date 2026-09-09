namespace APLICACION_5
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
            lblTitulo = new Label();
            cmbOpciones = new ComboBox();
            pictureBox1 = new PictureBox();
            ((System.ComponentModel.ISupportInitialize)pictureBox1).BeginInit();
            SuspendLayout();
            // 
            // lblTitulo
            // 
            lblTitulo.AutoSize = true;
            lblTitulo.Font = new Font("Times New Roman", 16.2F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lblTitulo.Location = new Point(260, 52);
            lblTitulo.Name = "lblTitulo";
            lblTitulo.Size = new Size(228, 33);
            lblTitulo.TabIndex = 0;
            lblTitulo.Text = "Seleccionar paisaje";
            // 
            // cmbOpciones
            // 
            cmbOpciones.DropDownStyle = ComboBoxStyle.DropDownList;
            cmbOpciones.FormattingEnabled = true;
            cmbOpciones.Items.AddRange(new object[] { "Paisaje", "Ciudad", "Playa" });
            cmbOpciones.Location = new Point(206, 115);
            cmbOpciones.Name = "cmbOpciones";
            cmbOpciones.RightToLeft = RightToLeft.Yes;
            cmbOpciones.Size = new Size(151, 28);
            cmbOpciones.TabIndex = 1;
            cmbOpciones.SelectedIndexChanged += cmbOpciones_SelectedIndexChanged;
            // 
            // pictureBox1
            // 
            pictureBox1.Location = new Point(443, 115);
            pictureBox1.Name = "pictureBox1";
            pictureBox1.Size = new Size(252, 157);
            pictureBox1.SizeMode = PictureBoxSizeMode.Zoom;
            pictureBox1.TabIndex = 2;
            pictureBox1.TabStop = false;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(pictureBox1);
            Controls.Add(cmbOpciones);
            Controls.Add(lblTitulo);
            Name = "Form1";
            Text = "Form1";
            ((System.ComponentModel.ISupportInitialize)pictureBox1).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label lblTitulo;
        private ComboBox cmbOpciones;
        private PictureBox pictureBox1;
    }
}
