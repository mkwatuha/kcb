package org.kccb.controller;

import com.itextpdf.text.DocumentException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.kccb.model.ExtJSFormResult;
import org.kccb.model.SptPDFReader;
import org.kccb.properties.App;
import org.kccb.properties.SptConstants;
import org.kccb.service.DocumentService;
import org.w3c.dom.DOMException;

import java.io.IOException;
import java.util.Properties;

/**
 *  Controller for Contacts
 */
@Controller
@RequestMapping("/queue")
public class QueueController {

    private final Logger logger = LoggerFactory.getLogger(QueueController.class);

    @Autowired
    private DocumentService documentService;

    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody String getBouncedEmail(  @RequestParam(value = "queue") String queue) throws IOException,DocumentException{
        ExtJSFormResult extjsFormResult = new ExtJSFormResult();

        String fileName="C:\\tomcat6\\kccb\\config\\config.properties";
        SptPDFReader.manipulatePdf();
        Properties prop=App.getProperties(fileName);
        String kccbDir=prop.getProperty(SptConstants.GP_kccb_FILE_DIR);
        String cleareQueue=kccbDir+queue;
        documentService.clearFileDir(cleareQueue);
        extjsFormResult.setSuccess(true);
        return extjsFormResult.toString();
    }


}
