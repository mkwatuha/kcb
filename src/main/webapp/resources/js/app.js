/**
 * Created by ALFAYO on 21/5/2018.
 */
Ext.Loader.setConfig({
    enabled: true
});
Ext.Loader.setPath('Ext.ux', '../ext/ux');

Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.ux.RowExpander',
    'Ext.selection.CheckboxModel'
]);

function estateViewPort() {

    var displayhere = 'landing-page';
    var loadtype = 'Save';
    var rid = 'NOID';
    var obj = document.getElementById(displayhere);
    obj.innerHTML = '';

  
             
        var win = Ext.create('Ext.window.Window', {
            title:  '<div class="app-loader-logo">KCCB-CVD Screening System</div>'+'<div class="app-title">KCCB</div>',
            bodyPadding: 10,
            autoScroll: true,
            maximizable: false,
            collapsible: true,
            closable: false,
            maximized: true,
            border: false,
            bodyBorder: false,
            bodyStyle: 'padding: 10px; background-color:#3d71b8',//; #DFE8F6
            margins:'50 0 0 0',
            id: 'idestatemgtwin',
            plain: true,
           html:'<div>'
           +'<ul class="home-view">'
              +' <li id="payroll-upload"><img class="expand-image" src="resources/ext/shared/icons/fam/page_white_acrobat.png"/><a>Upload Remote File</a></li>'
              +' <li id="messages"><img src="resources/ext/layout/images/grid48x48.png"/><a>Patient Queue</a></li>'            
              +' <li id="contact-list"><img src="resources/ext/layout/images/im48x48.gif"/><a>Patients</a></li>'                                                      
              +' <li id="no-contact"><img src="resources/ext/shared/icons/fam/config-users.png"/><a>Error Queue</a></li>'                    
           +'</ul>'       
           +'<div  class="display-view" id="center-info-v"></div>'
           +'</div>',
            buttonAlign: 'center'
        });

              
        win.show();    

       Ext.get('messages').on('click', function(event, target) {
        emailQueue();
         }, null, {delegate: 'img'});

       Ext.get('payroll-upload').on('click', function(event, target) {
         createUploadForm('center-info-v', 'payrollFileUpload','Upload Remote Data');
         }, null, {delegate: 'img'});

       Ext.get('contact-list').on('click', function(event, target) {
        employeeContacts();
         }, null, {delegate: 'img'});

       Ext.get('no-contact').on('click', function(event, target) {
        getEmployeesWithoutEmail();
         }, null, {delegate: 'img'});


         Ext.get('messages').on('click', function(event, target) {
        emailQueue();
         }, null, {delegate: 'a'});

       Ext.get('payroll-upload').on('click', function(event, target) {
         createUploadForm('center-info-v', 'payrollFileUpload','Upload Remote Data');
         }, null, {delegate: 'a'});

       Ext.get('contact-list').on('click', function(event, target) {
        employeeContacts();
         }, null, {delegate: 'a'});

       Ext.get('no-contact').on('click', function(event, target) {
        getEmployeesWithoutEmail();
         }, null, {delegate: 'a'});




}




