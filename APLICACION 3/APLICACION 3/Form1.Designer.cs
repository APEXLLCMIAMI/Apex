namespace APLICACION_3
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
            progressBar1 = new ProgressBar();
            lblPorcentaje = new Label();
            btnIncrementar = new Button();
            SuspendLayout();
            // 
            // lblTitulo
            // 
            lblTitulo.AutoSize = true;
            lblTitulo.Font = new Font("Times New Roman", 13.8F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lblTitulo.Location = new Point(283, 64);
            lblTitulo.Name = "lblTitulo";
            lblTitulo.Size = new Size(195, 26);
            lblTitulo.TabIndex = 0;
            lblTitulo.Text = "Progreso de la tarea";
            // 
            // progressBar1
            // 
            progressBar1.Location = new Point(318, 154);
            progressBar1.Name = "progressBar1";
            progressBar1.Size = new Size(125, 29);
            progressBar1.TabIndex = 1;
            // 
            // lblPorcentaje
            // 
            lblPorcentaje.AutoSize = true;
            lblPorcentaje.Location = new Point(362, 209);
            lblPorcentaje.Name = "lblPorcentaje";
            lblPorcentaje.Size = new Size(29, 20);
            lblPorcentaje.TabIndex = 2;
            lblPorcentaje.Text = "0%";
            // 
            // btnIncrementar
            // 
            btnIncrementar.Location = new Point(318, 287);
            btnIncrementar.Name = "btnIncrementar";
            btnIncrementar.Size = new Size(132, 29);
            btnIncrementar.TabIndex = 3;
            btnIncrementar.Text = "Incrementar 10%";
            btnIncrementar.UseVisualStyleBackColor = true;
            btnIncrementar.Click += btnIncrementar_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(btnIncrementar);
            Controls.Add(lblPorcentaje);
            Controls.Add(progressBar1);
            Controls.Add(lblTitulo);
            Name = "Form1";
            Text = "Form1";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label lblTitulo;
        private ProgressBar progressBar1;
        private Label lblPorcentaje;
        private Button btnIncrementar;
    }
}
