
function getPatientList() {
    var toolBars = [{
                text: 'Register',
                iconCls: 'user-add',
                id: 'contactUpload',
                handler: function () {
                    createRegistrationForm();
                }
            }, '-',
    {
        text: 'Delete',
        tooltip: '',
        iconCls: 'remove',
        handler: function () {
            removeQueedItemsOnconfirmation('contacts', 'Are you sure you want to delete all patients?');
        }
    }, '-'];
    createDisplayView( 'contacts','center-info-v','Patient Screening',toolBars);
   
}


function getPatientsOnQueue() {
    var toolBars = [{
        text: 'New Provider',
        iconCls: 'user-add',
        id: 'contactUpload',
        handler: function () {
            
        }
    }, '-',
{
text: 'Delete',
tooltip: '',
iconCls: 'remove',
handler: function () {
    removeQueedItemsOnconfirmation('contacts', 'Are you sure you want to delete all provider?');
}
}, '-'];
    createDisplayView( 'no_contacts','center-info-v','Health Providers',toolBars);
   
}


function emailQueue() {
 
    var toolBars = [{
        text: 'Send',
        tooltip: '',
        iconCls: 'email',
        handler: function () {
            if(window.navigator.onLine===true){
                confirmToSendEMail('encrypted', 'Are you sure you want to contact all queued patients?');
            }else{
                showloginerror('Error', 'Please connect to an internet network');
            }

        }
    }, '-',
    {
        text: 'Delete',
        tooltip: '',
        iconCls: 'remove',
        handler: function () {

            removeQueedItemsOnconfirmation('encrypted', 'Are you sure you want to delete all queued patients?');
        }
    }, '-'];
createDisplayView( 'queue','center-info-v','Patient Queue',toolBars);

}



function createDisplayView( searchitem,display,title,toolBars){
var viewdiv=document.getElementById(display);
viewdiv.innerHTML='';
Ext.onReady(function() {
Ext.QuickTips.init();
var closebtn= Ext.get('close-btn');
	Ext.define('GridViewDataModel', {
    extend: 'Ext.data.Model',
	fields:[
            { name: 'id', type: 'integer' },
            { name: 'firstName', type: 'string' },
            { name: 'middleName', type: 'string' },
            { name: 'lastName', type: 'string' },
            { name: 'emailAddress', type: 'string' },
            { name: 'idNumber', type: 'string' },
            { name: 'phoneNumber', type: 'string' }]
	});
	var store = Ext.create('Ext.data.Store', {
    model: 'GridViewDataModel',
	
    proxy: {
        type: 'ajax',
         url: 'contacts?listType=' + searchitem,
        reader: {
             type: 'json',
                totalProperty: 'total',
                root: 'data',
                successProperty: 'success',
                idProperty: 'id',
        }
    }
});
  store.load({pageSize:50});
       var gridWin = Ext.create('Ext.window.Window', {
            id: 'estsearchforms',
            width:900,
            height: 480,
            title: false,
            autoScroll: true,
            border: false,
            renderTo:'center-info-v',
            layout: 'fit',
            closable:true,
            maximizable:true,
            animCollapse:false,
            constrainHeader:true,
            resizable:true,
            title:title,
            items: [
                    {
                        border: false,
                        xtype: 'grid',
                        // columnLines: true,
                        tbar:toolBars,
                        store: store,
                        		bbar:{height: 20},
            dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: store,
                    dock: 'bottom',
                    displayInfo: true
                }],
             viewConfig: { stripeRows: true},
            columns: [
            new Ext.grid.RowNumberer({ width: 50, sortable: true }),
            { header: 'First Name', width: 120, sortable: true, id: 'firstName', dataIndex: 'firstName' },
            { header: 'Middle Name', width: 120, sortable: true, id: 'middleName', dataIndex: 'middleName' },
            { header: 'Last Name', width: 120, sortable: true, id: 'lastName', dataIndex: 'lastName' },
            { header: 'Phone Number', width: 100, sortable: true, id: 'phoneNumber', dataIndex: 'phoneNumber' },
            { header: 'ID Number', width: 250, sortable: true, id: 'idNumber', dataIndex: 'idNumber' }
        
        ],
        }
    ]
            

        });

       gridWin.show();

});
}

