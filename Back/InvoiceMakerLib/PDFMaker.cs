using iText.Kernel.Colors;
using iText.Kernel.Font;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas.Draw;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using System.Diagnostics;

namespace InvoiceMakerLib
{
    public class PDFMaker
    {
        public void CreatePdf(InvoiceData data)
        {
            var writer = new PdfWriter("Invoice.pdf");
            var pdf = new PdfDocument(writer);
            var document = new Document(pdf);
            document.Add(new Paragraph("INVOICE").SetFontSize(50).SetFont(PdfFontFactory.CreateFont("c:/windows/fonts/cambriab.ttf")).SetFontColor(ColorConstants.BLUE));
            document.Add(new Paragraph(" "));
            document.Add(new Paragraph(data.Company.Name!.ToUpper() +".").SetFontSize(16).SetFont(PdfFontFactory.CreateFont("c:/windows/fonts/cambriab.ttf")));
            document.Add(new Paragraph($"{data.Company.Address!.ToUpper()}, \n{data.Company.City!.ToUpper()}, {data.Company.Province!.ToUpper()}").SetFontSize(12).SetFont(PdfFontFactory.CreateFont("c:/windows/fonts/calibril.ttf")).SetFontSize(14));
            document.Add(new Paragraph(" "));
            document.Add(new Paragraph("INVOICE DATE: " + data.Date.ToString("MM/dd/yyyy")).SetFontSize(12).SetFont(PdfFontFactory.CreateFont("c:/windows/fonts/cambriab.ttf")).SetFontColor(ColorConstants.BLUE));
            
            
            Paragraph p = new Paragraph("BILL TO").SetFontSize(15).SetFont(PdfFontFactory.CreateFont("c:/windows/fonts/cambriab.ttf")).SetFontColor(ColorConstants.BLUE);
            p.Add(new Tab());
            p.AddTabStops(new TabStop(320, TabAlignment.CENTER));
            p.Add($"INVOICE #");
            p.Add(new Tab());
            p.AddTabStops(new TabStop(470, TabAlignment.RIGHT));
            p.Add($"\t\t{data.InvoiceNumber}");
            document.Add(p);
            p = new Paragraph($"{data.Customer.Name}\n{data.Customer.Address}\n{data.Customer.City}, {data.Customer.Province}, {data.Customer.PostalCode}\nC/O {data.Customer.ContactName}, Email: {data.Customer.ContactEmail}")
                .SetFontSize(12).SetFont(PdfFontFactory.CreateFont("c:/windows/fonts/calibri.ttf"));
            document.Add(p);
            document.Add(new Paragraph(" "));

            SolidLine line = new SolidLine(1f);
            line.SetColor(ColorConstants.RED);
            LineSeparator ls = new LineSeparator(line);
            ls.SetWidth(520);
            document.Add(ls);


            p = new Paragraph("DESCRIPTION").SetFontSize(15).SetFont(PdfFontFactory.CreateFont("c:/windows/fonts/cambriab.ttf")).SetFontColor(ColorConstants.BLUE);
            p.Add(new Tab());
            p.AddTabStops(new TabStop(510, TabAlignment.RIGHT));
            p.Add($"AMOUNT");
            document.Add(p);
            document.Add(ls);

            foreach(var emp in data.Employees)
            {
                var total = emp.HoursWorked * emp.HourlyRate;
                p = new Paragraph($"{emp.Name} ({emp.Position}) {emp.Date.ToString("MMMM dd, yyyy")} - {emp.HoursWorked}hrs @ ${emp.HourlyRate}/hr. Total of ${total}").SetFontSize(12).SetFont(PdfFontFactory.CreateFont("c:/windows/fonts/calibri.ttf"));
                p.Add(new Tab());
                p.AddTabStops(new TabStop(490, TabAlignment.RIGHT));
                p.Add($"{total.ToString("#,0.00")}");
                document.Add(p);
                document.Add(new Paragraph(" "));
            }

            p = new Paragraph("Subtotal").SetFont(PdfFontFactory.CreateFont("c:/windows/fonts/calibri.ttf")).SetFontSize(12).SetTextAlignment(TextAlignment.RIGHT);
            p.Add(new Tab());
            p.AddTabStops(new TabStop(200, TabAlignment.RIGHT));
            p.Add($"{data.SubTotal.ToString("#,0.00")}\t\t\t");
            document.Add(p);

            p = new Paragraph("13.0%").SetFont(PdfFontFactory.CreateFont("c:/windows/fonts/calibri.ttf")).SetFontSize(12).SetTextAlignment(TextAlignment.RIGHT);
            p.Add(new Tab());
            p.AddTabStops(new TabStop(190, TabAlignment.RIGHT));
            p.Add($"{data.TaxAmount.ToString("#,0.00")}\t\t\t");
            document.Add(p);

            p = new Paragraph("Total").SetFont(PdfFontFactory.CreateFont("c:/windows/fonts/calibrib.ttf")).SetFontSize(11).SetTextAlignment(TextAlignment.RIGHT).SetFontSize(20).SetFontColor(ColorConstants.BLUE);
            p.Add(new Tab());
            p.AddTabStops(new TabStop(194, TabAlignment.RIGHT));
            p.Add($"${data.Total.ToString("#,0.00")}\t\t");
            document.Add(p);




            document.Close();
            //Process.Start("Invoice.pdf");
        }
    }
}