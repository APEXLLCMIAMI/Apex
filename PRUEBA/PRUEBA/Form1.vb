Imports Microsoft.Data.SqlClient
Imports System.Data.SqlClient

Public Class Form1
    Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        Dim con As New SqlConnection("Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=Inventario;Integrated Security=True;TrustServerCertificate=True")
        Dim sql As String = "SELECT cod_prod, nombre, existencia FROM productos"
        Dim cmd As New SqlCommand(sql, con)

        Try
            Dim da As New SqlDataAdapter(cmd)
            Dim ds As New DataSet
            da.Fill(ds, "productos")

            Me.DataGridView1.DataSource = ds.Tables("productos")

        Catch ex As Exception
            MsgBox(ex.Message)

        End Try
    End Sub
End Class
