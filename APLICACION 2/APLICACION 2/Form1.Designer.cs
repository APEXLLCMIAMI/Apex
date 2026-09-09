namespace APLICACION_2
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
            lblPregunta = new Label();
            rbSi = new RadioButton();
            rbNo = new RadioButton();
            rbTalvez = new RadioButton();
            btnSeleccionar = new Button();
            SuspendLayout();
            // 
            // lblPregunta
            // 
            lblPregunta.AutoSize = true;
            lblPregunta.Font = new Font("Times New Roman", 13.8F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lblPregunta.Location = new Point(290, 58);
            lblPregunta.Name = "lblPregunta";
            lblPregunta.Size = new Size(177, 26);
            lblPregunta.TabIndex = 0;
            lblPregunta.Text = "Estas de acuerdo?";
            // 
            // rbSi
            // 
            rbSi.AutoSize = true;
            rbSi.Location = new Point(255, 117);
            rbSi.Name = "rbSi";
            rbSi.Size = new Size(42, 24);
            rbSi.TabIndex = 1;
            rbSi.TabStop = true;
            rbSi.Text = "Si";
            rbSi.UseVisualStyleBackColor = true;
            // 
            // rbNo
            // 
            rbNo.AutoSize = true;
            rbNo.Location = new Point(350, 117);
            rbNo.Name = "rbNo";
            rbNo.Size = new Size(50, 24);
            rbNo.TabIndex = 2;
            rbNo.TabStop = true;
            rbNo.Text = "No";
            rbNo.UseVisualStyleBackColor = true;
            // 
            // rbTalvez
            // 
            rbTalvez.AutoSize = true;
            rbTalvez.Location = new Point(440, 117);
            rbTalvez.Name = "rbTalvez";
            rbTalvez.Size = new Size(74, 24);
            rbTalvez.TabIndex = 3;
            rbTalvez.TabStop = true;
            rbTalvez.Text = "Tal vez";
            rbTalvez.UseVisualStyleBackColor = true;
            // 
            // btnSeleccionar
            // 
            btnSeleccionar.Location = new Point(336, 190);
            btnSeleccionar.Name = "btnSeleccionar";
            btnSeleccionar.Size = new Size(94, 29);
            btnSeleccionar.TabIndex = 4;
            btnSeleccionar.Text = "Aceptar";
            btnSeleccionar.UseVisualStyleBackColor = true;
            btnSeleccionar.Click += btnSeleccionar_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(btnSeleccionar);
            Controls.Add(rbTalvez);
            Controls.Add(rbNo);
            Controls.Add(rbSi);
            Controls.Add(lblPregunta);
            Name = "Form1";
            Text = "Form1";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label lblPregunta;
        private RadioButton rbSi;
        private RadioButton rbNo;
        private RadioButton rbTalvez;
        private Button btnSeleccionar;
    }
}
