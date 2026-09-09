namespace APLICACION_1
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
            lblCelsius = new Label();
            txtCelsius = new TextBox();
            btnConvertir = new Button();
            lblResultado = new Label();
            SuspendLayout();
            // 
            // lblTitulo
            // 
            lblTitulo.AutoSize = true;
            lblTitulo.Font = new Font("Times New Roman", 13.8F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lblTitulo.Location = new Point(253, 52);
            lblTitulo.Name = "lblTitulo";
            lblTitulo.Size = new Size(260, 26);
            lblTitulo.TabIndex = 0;
            lblTitulo.Text = "Conversor de Temperatura";
            // 
            // lblCelsius
            // 
            lblCelsius.AutoSize = true;
            lblCelsius.Font = new Font("Times New Roman", 9F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lblCelsius.Location = new Point(305, 105);
            lblCelsius.Name = "lblCelsius";
            lblCelsius.Size = new Size(146, 17);
            lblCelsius.TabIndex = 1;
            lblCelsius.Text = "Ingresar grados Celsius";
            // 
            // txtCelsius
            // 
            txtCelsius.Location = new Point(317, 151);
            txtCelsius.Name = "txtCelsius";
            txtCelsius.Size = new Size(125, 27);
            txtCelsius.TabIndex = 2;
            // 
            // btnConvertir
            // 
            btnConvertir.Location = new Point(287, 213);
            btnConvertir.Name = "btnConvertir";
            btnConvertir.Size = new Size(190, 29);
            btnConvertir.TabIndex = 3;
            btnConvertir.Text = "Convertir a Fahrenheit";
            btnConvertir.UseVisualStyleBackColor = true;
            btnConvertir.Click += btnConvertir_Click;
            // 
            // lblResultado
            // 
            lblResultado.AutoSize = true;
            lblResultado.Location = new Point(501, 154);
            lblResultado.Name = "lblResultado";
            lblResultado.Size = new Size(75, 20);
            lblResultado.TabIndex = 4;
            lblResultado.Text = "Resultado";
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(lblResultado);
            Controls.Add(btnConvertir);
            Controls.Add(txtCelsius);
            Controls.Add(lblCelsius);
            Controls.Add(lblTitulo);
            Name = "Form1";
            Text = "Form1";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label lblTitulo;
        private Label lblCelsius;
        private TextBox txtCelsius;
        private Button btnConvertir;
        private Label lblResultado;
    }
}
