namespace ejer_03
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
            btnRojo = new Button();
            btnVerde = new Button();
            btnAzul = new Button();
            SuspendLayout();
            // 
            // btnRojo
            // 
            btnRojo.Location = new Point(379, 73);
            btnRojo.Name = "btnRojo";
            btnRojo.Size = new Size(94, 29);
            btnRojo.TabIndex = 0;
            btnRojo.Text = "Rojo";
            btnRojo.UseVisualStyleBackColor = true;
            btnRojo.Click += btnRojo_Click;
            // 
            // btnVerde
            // 
            btnVerde.Location = new Point(379, 136);
            btnVerde.Name = "btnVerde";
            btnVerde.Size = new Size(94, 29);
            btnVerde.TabIndex = 1;
            btnVerde.Text = "Verde";
            btnVerde.UseVisualStyleBackColor = true;
            btnVerde.Click += btnVerde_Click;
            // 
            // btnAzul
            // 
            btnAzul.Location = new Point(379, 201);
            btnAzul.Name = "btnAzul";
            btnAzul.Size = new Size(94, 29);
            btnAzul.TabIndex = 2;
            btnAzul.Text = "Azul";
            btnAzul.UseVisualStyleBackColor = true;
            btnAzul.Click += btnAzul_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(btnAzul);
            Controls.Add(btnVerde);
            Controls.Add(btnRojo);
            Name = "Form1";
            Text = "Form1";
            ResumeLayout(false);
        }

        #endregion

        private Button btnRojo;
        private Button btnVerde;
        private Button btnAzul;
    }
}
