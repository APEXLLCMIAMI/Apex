namespace OJ_2
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            toolStrip1 = new ToolStrip();
            tsBtnAbrir = new ToolStripButton();
            tsBtnGuardar = new ToolStripButton();
            toolStripSeparator1 = new ToolStripSeparator();
            tsBtnInfo = new ToolStripButton();
            toolStrip1.SuspendLayout();
            SuspendLayout();
            // 
            // toolStrip1
            // 
            toolStrip1.ImageScalingSize = new Size(20, 20);
            toolStrip1.Items.AddRange(new ToolStripItem[] { tsBtnAbrir, tsBtnGuardar, toolStripSeparator1, tsBtnInfo });
            toolStrip1.Location = new Point(0, 0);
            toolStrip1.Name = "toolStrip1";
            toolStrip1.Size = new Size(800, 27);
            toolStrip1.TabIndex = 0;
            toolStrip1.Text = "toolStrip1";
            // 
            // tsBtnAbrir
            // 
            tsBtnAbrir.DisplayStyle = ToolStripItemDisplayStyle.Image;
            tsBtnAbrir.Image = (Image)resources.GetObject("tsBtnAbrir.Image");
            tsBtnAbrir.ImageTransparentColor = Color.Magenta;
            tsBtnAbrir.Name = "tsBtnAbrir";
            tsBtnAbrir.Size = new Size(29, 24);
            tsBtnAbrir.Text = "Abrir";
            tsBtnAbrir.Click += tsBtnAbrir_Click;
            // 
            // tsBtnGuardar
            // 
            tsBtnGuardar.DisplayStyle = ToolStripItemDisplayStyle.Image;
            tsBtnGuardar.Image = (Image)resources.GetObject("tsBtnGuardar.Image");
            tsBtnGuardar.ImageTransparentColor = Color.Magenta;
            tsBtnGuardar.Name = "tsBtnGuardar";
            tsBtnGuardar.Size = new Size(29, 24);
            tsBtnGuardar.Text = "toolStripButton1";
            tsBtnGuardar.Click += tsBtnGuardar_Click;
            // 
            // toolStripSeparator1
            // 
            toolStripSeparator1.Name = "toolStripSeparator1";
            toolStripSeparator1.Size = new Size(6, 27);
            // 
            // tsBtnInfo
            // 
            tsBtnInfo.DisplayStyle = ToolStripItemDisplayStyle.Image;
            tsBtnInfo.Image = (Image)resources.GetObject("tsBtnInfo.Image");
            tsBtnInfo.ImageTransparentColor = Color.Magenta;
            tsBtnInfo.Name = "tsBtnInfo";
            tsBtnInfo.Size = new Size(29, 24);
            tsBtnInfo.Text = "toolStripButton1";
            tsBtnInfo.Click += tsBtnInfo_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(toolStrip1);
            Name = "Form1";
            Text = "Form1";
            toolStrip1.ResumeLayout(false);
            toolStrip1.PerformLayout();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private ToolStrip toolStrip1;
        private ToolStripButton tsBtnAbrir;
        private ToolStripButton tsBtnGuardar;
        private ToolStripSeparator toolStripSeparator1;
        private ToolStripButton tsBtnInfo;
    }
}
