const cds = require("@sap/cds");
const { Employee } = cds.entities;
module.exports = cds.service.impl(async function () {
    

    // Custom CREATE handler
 this.on("CREATE", 'ReadEmpSet', async (req) => {
        // Auto-generate EMPID if missing
        if (!req.data.EMPID) {
            const last = await SELECT.one.from(Employee).columns("max(EMPID) as maxId");
            req.data.EMPID = (last?.maxId || 0) + 1;
        }

        await INSERT.into(Employee).entries(req.data);

        // Return the complete record with key
        const created = await SELECT.one.from(Employee).where({ EMPID: req.data.EMPID });
        return created;
    });
});
