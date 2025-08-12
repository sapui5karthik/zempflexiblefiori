using EmpSrv as service from '../../srv/schema';
annotate service.ReadEmpSet with @(
    UI.SelectionFields : [
        EMPID,
        EMPNAME,
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : EMPID,
            Label : '{i18n>EMPID}',
        },
        {
            $Type : 'UI.DataField',
            Value : EMPNAME,
            Label : '{i18n>EMPNAME}',
        },
        {
            $Type : 'UI.DataFieldForAction',
            Label : '{i18n>Create}',
            Action : 'EMPSrv.Create'
        }
    ],
);

