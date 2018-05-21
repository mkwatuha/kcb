package org.kccb.model;

import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.*;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * Created by ALFAYO on 6/20/2017.
 */
public class PDFLoader {

    public static String getMessage() {
        String path="c:/tomcat6/kccb/tests/3685.pdf";
        String path2="c:/tomcat6/kccb/tests/3684.pdf";

        try {
        } catch(Exception e){
            e.printStackTrace();

        }
        return "KCCB-CVD Screening System";
    }



    /**
     * Manipulates a PDF file src with the file dest as result
     * @param src the original PDF
     * @param dest the resulting PDF
     * @throws IOException
     * @throws DocumentException
     */
    public  static void encryptPdf(String src, String dest) throws IOException, DocumentException {
        PdfReader reader = new PdfReader(src);
        PdfStamper stamper = new PdfStamper(reader, new FileOutputStream(dest));
        stamper.setEncryption("22661162".getBytes(), "22661161".getBytes(),
                PdfWriter.ALLOW_PRINTING, PdfWriter.ENCRYPTION_AES_128 | PdfWriter.DO_NOT_ENCRYPT_METADATA);
        stamper.close();
        reader.close();
    }


    private static void readPDF(String path) throws IOException,
            DocumentException {

        PdfReader reader = new PdfReader(path);
        PdfStamper stamper = new PdfStamper(reader, new FileOutputStream(
                "c:/tomcat6/kccb/tests/3684_test.pdf"));
        BaseFont bf = BaseFont.createFont(BaseFont.HELVETICA, BaseFont.CP1252,
                BaseFont.NOT_EMBEDDED);

        PdfContentByte over = stamper.getOverContent(1);

        over.beginText();
        over.setFontAndSize(bf, 10);
        over.setTextMatrix(107, 107);
        over.showText("page updated");
        over.endText();

        stamper.close();
    }


    private static void createDataDir(String path){
        File f = new File(path);
        f.mkdirs();
    }





}
