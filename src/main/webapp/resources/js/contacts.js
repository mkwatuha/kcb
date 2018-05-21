Ext.namespace('App');
Ext.onReady(function () {

    App.contactFormStore = formDataSource();
});

function getPatientList() {
    App.contactStore = contactDataSource('contacts');
    var toolBars = [{
        text: 'Add Person',
        tooltip: 'Create new person',
        iconCls: 'add',
        handler: function () {
            createRegistrationForm();
        }
    }, '-',
    {
        text: 'Delete',
        tooltip: '',
        iconCls: 'remove',
        handler: function () {
            removeQueedItemsOnconfirmation('contacts', 'Are you sure you want to delete all contacts?');
        }
    }, '-'];
    genericGridView(App.contactConfig, 'Person Registration', toolBars);
}

function emailQueue() {
    App.queueStore = contactDataSource('queue');

    var toolBars = [{
        text: 'Send Messages',
        tooltip: '',
        iconCls: 'email',
        handler: function () {
            confirmToSendEMail('encrypted', 'Are you sure you want to send all queued messages?');
        }
    }, '-',
    {
        text: 'Delete',
        tooltip: '',
        iconCls: 'remove',
        handler: function () {

            removeQueedItemsOnconfirmation('encrypted', 'Are you sure you want to delete all queued messages?');
        }
    }, '-'];

    genericGridView(App.contactConfig, 'Email Queue', toolBars);
}
function getPatientsOnQueue() {
    App.queueStore = contactDataSource('no_address');
    var toolBars = [{
        text: 'Send',
        tooltip: '',
        iconCls: 'email',
        handler: function () {
            confirmToSendEMail('no_contacts', 'Are you sure you want to email to patients on queue?');
        }
    }, '-',
    {
        text: 'Delete',
        tooltip: '',
        iconCls: 'remove',
        handler: function () {

            removeQueedItemsOnconfirmation('no_contacts', 'Are you sure you want to delete patients on queue?');
        }
    }, '-'];
    genericGridView(App.contactConfig, 'Patients on Queue', toolBars);
}



function createQueueDataSource(title) {
    var gridDef = {
        dataModel: [
            { name: 'id', type: 'integer' },
            { name: 'firstName', type: 'string' },
            { name: 'middleName', type: 'string' },
            { name: 'lastName', type: 'string' },
            { name: 'phoneNumber', type: 'string' },
            { name: 'idNumber', type: 'string' },
            { name: 'emailAddress', type: 'string' }],
        gridColumns: [
            new Ext.grid.RowNumberer({ width: 50, sortable: true }),
            { header: 'First Name', width: 75, sortable: true, id: 'firstName', dataIndex: 'firstName' },
            { header: 'Middle Name', width: 75, sortable: true, id: 'middleName', dataIndex: 'middleName' },
            { header: 'Last Name', width: 160, sortable: true, id: 'lastName', dataIndex: 'lastName' },
            { header: 'Phone Number', width: 160, sortable: true, id: 'phoneNumber', dataIndex: 'phoneNumber' },
            { header: 'ID Number', width: 160, sortable: true, id: 'idNumber', dataIndex: 'idNumber' }
        ]
    };
    var gridModel = gridDataSourceModel(gridDef.dataModel);
    App.queueModel = gridModel;
    App.emailQueueStore = gridDataSource(gridModel, 'queue');


    return { store: App.emailQueueStore, columns: gridDef.gridColumns, title: title, formData: {}, config: {} };
}


function genericGridView(gridConfig, title, toolBars) {
    var searchitem = '';

    var viewdiv = document.getElementById('center-info');

    viewdiv.innerHTML = '';
    Ext.require([
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.form.field.Number',
        'Ext.form.field.Date',
        'Ext.tip.QuickTipManager'
    ]);
    Ext.onReady(function () {
        // createContactsGrid()
        Ext.QuickTips.init();
        // App.ContactStore =
        var store = gridConfig.store;
        store.load();

        var closebtn = Ext.get('close-btn');

        var sellAction = Ext.create('Ext.Action', {
            icon: '../shared/icons/fam/delete.gif',  // Use a URL in the icon config
            text: 'Delete',
            disabled: true,
            handler: function (widget, event) {

            }
        });



        var contextMenu = Ext.create('Ext.menu.Menu', {
            items: []
        });

        // Grid Definition
        var grid = Ext.create('Ext.grid.Panel', {
            store: store,
            stateful: true,
            closable: true,
            multiSelect: true,
            iconCls: 'icon-grid',
            stateId: 'stateGrid',
            animCollapse: false,
            constrainHeader: true,
            layout: {
                type: 'fit',
                align: 'stretch',
                pack: 'start'
            },
            columnLines: true,
            bbar: { height: 20 },
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: store,
                dock: 'bottom',
                displayInfo: true
            }],
            features: [{
                id: 'group',
                ftype: 'groupingsummary',
                groupHeaderTpl: '{name}',
                hideGroupedHeader: true,
                enableGroupingMenu: false
            }],

            columns: gridConfig.columns,
            autoHeight: true,
            resizable: true,
            title: title,
            renderTo: 'center-info',
            viewConfig: {
                stripeRows: true,
                listeners: {
                    itemcontextmenu: function (view, rec, node, index, e) {
                        e.stopEvent();
                        contextMenu.showAt(e.getXY());
                        return false;
                    }
                }
            }
            ,
            listeners: {
                itemdblclick: function (dv, record, item, index, e) {

                },
                itemclick: function (dv, record, item, index, e) {


                }
            },
            tbar: toolBars

        });
    });
}

function contactDataSource(search) {
    var gridDef = {
        dataModel: [
            { name: 'id', type: 'integer' },
            { name: 'firstName', type: 'string' },
            { name: 'middleName', type: 'string' },
            { name: 'lastName', type: 'string' },
            { name: 'phoneNumber', type: 'string' },
            { name: 'idNumber', type: 'string' },
            { name: 'emailAddress', type: 'string' }],
        gridColumns: [
            new Ext.grid.RowNumberer({ width: 50, sortable: true }),
            { header: 'First Name', width: 75, sortable: true, id: 'firstName', dataIndex: 'firstName' },
            { header: 'Middle Name', width: 75, sortable: true, id: 'middleName', dataIndex: 'middleName' },
            { header: 'Last Name', width: 160, sortable: true, id: 'lastName', dataIndex: 'lastName' },
            { header: 'Phone Number', width: 160, sortable: true, id: 'phoneNumber', dataIndex: 'phoneNumber' },
            { header: 'ID Number', width: 160, sortable: true, id: 'idNumber', dataIndex: 'idNumber' }
        ]
    };
    App.myContactsModel = gridDataSourceModel(gridDef.dataModel);
    App.myContactsModel = gridModel;
    var store = gridDataSource(search);
    App.contactConfig = { store: store, columns: gridDef.gridColumns, formData: {}, config: {} };
    return store;
}


function gridDataSourceModel(dataColumns) {
    return Ext.define('gridModel', {
        extend: 'Ext.data.Model',
        fields: dataColumns
    });
}


function gridDataSource(searchitem) {
    return Ext.create('Ext.data.Store', {
        model: App.myContactsModel,
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
}

function formDataSource() {
    App.contactFormModel = Ext.define('ContactFormModel', {
        extend: 'Ext.data.Model',
        fields: [
            { name: 'id', type: 'integer' },
            { name: 'firstName', type: 'string' },
            { name: 'middleName', type: 'string' },
            { name: 'lastName', type: 'string' },
            { name: 'phoneNumber', type: 'string' },
            { name: 'idNumber', type: 'string' },
            { name: 'emailAddress', type: 'string' }]
    });
    App.contactFormDataSource = Ext.create('Ext.data.Store', {
        model: 'ContactFormModel',
        proxy: {
            type: 'ajax',
            enctype: false,
            url: 'contacts',
            reader: {
                type: 'json',
                totalProperty: 'total',
                root: 'data',
                successProperty: 'success',
                idProperty: 'id',
            },
            encode: false,
            writeAllFields: true,
            listful: true,
            constructor: function (config) {
                App.SpringWriter.superclass.constructor.call(this, config);
            },
            render: function (params, baseParams, data) {
                params.jsonData = data;
            }

        }
    });
}

function saveContact(data) {
    var contactFormDataArray = new Array({});
    var newContact = new App.contactFormModel(JSON.parse(data));
    contactFormDataArray.push(newContact);
    App.contactFormDataSource.add(contactFormDataArray);
    App.contactFormDataSource.save();
}

Ext.onReady(function () {
    var modelFields = [{ name: 'id', type: 'integer' }, { name: 'file', type: 'string' }];
    var model = Ext.define('emailModel', {
        extend: 'Ext.data.Model',
        fields: modelFields
    });

    App.emailFIleStore = Ext.create('Ext.data.Store', {
        model: model,
        proxy: {
            type: 'json',
            url: 'email?listType=1',
            writer: {
                encode: false,
                writeAllFields: true,
                listful: true,
                constructor: function (config) {
                    App.emailFIleStore.superclass.constructor.call(this, config);
                },
                render: function (params, baseParams, data) {
                    params.jsonData = data;
                }
            }
        }
    });

});