namespace ejer_02
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
            txtNumero1 = new TextBox();
            txtNumero2 = new TextBox();
            btnSumar = new Button();
            btnRestar = new Button();
            btnMultiplicar = new Button();
            btnDividir = new Button();
            lblResultado = new Label();
            SuspendLayout();
            // 
            // txtNumero1
            // 
            txtNumero1.Location = new Point(293, 59);
            txtNumero1.Name = "txtNumero1";
            txtNumero1.Size = new Size(125, 27);
            txtNumero1.TabIndex = 0;
            // 
            // txtNumero2
            // 
            txtNumero2.Location = new Point(293, 104);
            txtNumero2.Name = "txtNumero2";
            txtNumero2.Size = new Size(125, 27);
            txtNumero2.TabIndex = 1;
            // 
            // btnSumar
            // 
            btnSumar.Location = new Point(490, 59);
            btnSumar.Name = "btnSumar";
            btnSumar.Size = new Size(94, 29);
            btnSumar.TabIndex = 2;
            btnSumar.Text = "+";
            btnSumar.UseVisualStyleBackColor = true;
            btnSumar.Click += btnSumar_Click;
            // 
            // btnRestar
            // 
            btnRestar.Location = new Point(490, 104);
            btnRestar.Name = "btnRestar";
            btnRestar.Size = new Size(94, 29);
            btnRestar.TabIndex = 3;
            btnRestar.Text = "-";
            btnRestar.UseVisualStyleBackColor = true;
            btnRestar.Click += btnRestar_Click;
            // 
            // btnMultiplicar
            // 
            btnMultiplicar.Location = new Point(490, 154);
            btnMultiplicar.Name = "btnMultiplicar";
            btnMultiplicar.Size = new Size(94, 29);
            btnMultiplicar.TabIndex = 4;
            btnMultiplicar.Text = "x";
            btnMultiplicar.UseVisualStyleBackColor = true;
            btnMultiplicar.Click += btnMultiplicar_Click;
            // 
            // btnDividir
            // 
            btnDividir.Location = new Point(490, 207);
            btnDividir.Name = "btnDividir";
            btnDividir.Size = new Size(94, 29);
            btnDividir.TabIndex = 5;
            btnDividir.Text = "÷";
            btnDividir.UseVisualStyleBackColor = true;
            btnDividir.Click += btnDividir_Click;
            // 
            // lblResultado
            // 
            lblResultado.AutoSize = true;
            lblResultado.Location = new Point(293, 211);
            lblResultado.Name = "lblResultado";
            lblResultado.Size = new Size(78, 20);
            lblResultado.TabIndex = 6;
            lblResultado.Text = "Resultado:";
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(lblResultado);
            Controls.Add(btnDividir);
            Controls.Add(btnMultiplicar);
            Controls.Add(btnRestar);
            Controls.Add(btnSumar);
            Controls.Add(txtNumero2);
            Controls.Add(txtNumero1);
            Name = "Form1";
            Text = "Form1";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private TextBox txtNumero1;
        private TextBox txtNumero2;
        private Button btnSumar;
        private Button btnRestar;
        private Button btnMultiplicar;
        private Button btnDividir;
        private Label lblResultado;
    }
}
