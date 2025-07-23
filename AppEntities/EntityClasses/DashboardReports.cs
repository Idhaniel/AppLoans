using AppFramework.AppClasses;
using AppFramework.AppClasses.EDTs;
using AppFramework.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppEntities.EntityClasses
{
    public partial class DashboardReports : EntityBase
    {
        public override string TableName => "dashboardreports";

        protected override string TitleColumn1 => "Username";

        protected override string TitleColumn2 => "SNo";

        protected override string Caption => "Dashboard Reports";

        protected override void setupEntityInfo()
        {
            FieldInfoList["Username"] = new FieldInfo(true, false, true, new UserEDT());
            FieldInfoList["SavedReportID"] = new FieldInfo(true, false, true, "Saved Report ID", new IDEDT());
            FieldInfoList["SNo"] = new FieldInfo(true, true, true, "S No", new IDEDT());

            TableInfo.KeyInfoList["Unique"] = new KeyInfo(KeyType.Unique, "Username", "SavedReportID");
            TableInfo.KeyInfoList["Unique2"] = new KeyInfo(KeyType.Unique, "Username", "SNo");
        }

        public override void init()
        {
            base.init();
            this.Username = Session.Username;
        }

        protected override long insert(bool forceWrite, bool callSaveMethod)
        {
            if(this.SNo == 0)
            {
                var sno = (from dr in new QueryableEntity<DashboardReports>() where dr.Username == this.Username select dr.Max(x => x.SNo)).FirstOrDefault();
                this.SNo = sno + 1;
            }
            return base.insert(forceWrite, callSaveMethod);
        }
    }
}
