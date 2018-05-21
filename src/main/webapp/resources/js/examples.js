function displayContacts() {
    //var grid = createContactsGrid('Employee Contacts');
    genericGridView(grid);
}
function genericGridView(gridConfig, title) {
    var searchitem = '';

    var viewdiv = document.getElementById('contact-grid');

    viewdiv.innerHTML = '';
    Ext.require([
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.form.field.Number',
        'Ext.form.field.Date',
        'Ext.tip.QuickTipManager'
    ]);
    Ext.onReady(function () {

        Ext.QuickTips.init();
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

        var buyAction = Ext.create('Ext.Action', {
            iconCls: 'user-girl',
            text: 'Edit',
            disabled: true,
            handler: function (widget, event) {
                var rec = grid.getSelectionModel().getSelection()[0];
                if (rec) {

                } else {

                }
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
            layout: 'fit',
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
            maxHeight: 600,
            width: 1100,
            resizable: true,
            title: title,
            renderTo: 'landlordData',
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
                    var empname = record.get('person_name');
                    customizedFormRevised('title', 'savetable', gridConfig.formData, record);
                    // setDisplayConfig(gridConfig);
                    setDisplayConfig({ config: gridConfig.config });
                },
                itemclick: function (dv, record, item, index, e) {
                    customizedFormRevised('title', 'savetable', gridConfig.formData, record);
                    setDisplayConfig({ config: gridConfig.config });

                }
            },
            tbar: [{
                text: 'Add Record',
                tooltip: 'Customize sms message',
                iconCls: 'add',
                handler: function () {
                    createForm("Save", "NOID", "sms_smsmsgcust", "f")
                }
            }, '-', {
                text: 'PDF',
                tooltip: 'Create options',
                iconCls: 'option',
                handler: function (buttonObj, eventObj) {
                    OpenPDFstatement('c21zX3Ntc21zZ2N1c3Q=');
                    // OpenReport('c21zX3Ntc21zZ2N1c3Q=');
                }
            }, '-',
            {
                text: 'Search',
                tooltip: 'Find',
                iconCls: 'find',
                handler: function (grid, rowIndex, colIndex) {
                    //testme();
                }

            }
                ,

            {
                xtype: 'combobox',
                name: 'grdsearchsms_smsmsgcust',
                id: 'grdsearchsms_smsmsgcust',
                forceSelection: false,
                fieldLabel: false,
                queryMode: 'local',
                displayField: 'fieldcaption',
                valueField: 'fieldname',
                listeners: {
                    select: function (combo, record, index) {
                        var selVal = Ext.getCmp('grdsearchsms_smsmsgcust').getValue();
                        var selValtx = Ext.getCmp('searchfield').getValue();
                    }
                }

            },
            {
                title: 'Search',
                tooltip: 'Find record',
                xtype: 'textfield',
                name: 'searchfield',
                id: 'searchfield',
                iconCls: 'remove',
                listeners: {
                }
            }]

        });
    });
}

function contactDataSource(title) {
    var gridDef = {
        dataModel: [
            { name: 'id', type: 'integer' },
            { name: 'firstName', type: 'string' },
            { name: 'middleName', type: 'string' },
            { name: 'lastName', type: 'string' },
            { name: 'pfNumber', type: 'string' },
            { name: 'emailAddress', type: 'string' }],
        gridColumns: [
            new Ext.grid.RowNumberer({ width: 50, sortable: true }),
            { header: 'First Name', width: 75, sortable: true, id: 'firstName', dataIndex: 'firstName' },
            { header: 'Middle Name', width: 75, sortable: true, id: 'middleName', dataIndex: 'middleName' },
            { header: 'Last Name', width: 160, sortable: true, id: 'lastName', dataIndex: 'lastName' },
            { header: 'PF Number', width: 160, sortable: true, id: 'pfNumber', dataIndex: 'pfNumber' },
            { header: 'Email Address', width: 160, sortable: true, id: 'emailAddress', dataIndex: 'emailAddress' }
        ]
    };

    var gridData = gridDataSource(gridModel, 'contacts');

    return { store: gridData, columns: gridDef.gridColumns, title: title, formData: formData, config: {} };
}


function gridDataSourceModel(dataColumns) {
    return Ext.define('gridModel', {
        extend: 'Ext.data.Model',
        fields: dataColumns
    });
}


function gridDataSource(gridModel, searchitem) {
    return Ext.create('Ext.data.Store', {
        model: gridModel,
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