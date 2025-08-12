using { zempcapm1.db   } from '../db/datamodel';

service EmpSrv {

    entity ReadEmpSet as projection on db.Employee {
        key EMPID,
        EMPNAME
    };

}
