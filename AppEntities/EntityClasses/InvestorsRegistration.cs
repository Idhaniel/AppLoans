using AppFramework.AppClasses;
using AppFramework.AppClasses.EDTs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppEntities.EntityClasses
{
    public partial class InvestorsRegistration : EntityBase
    {
        public override string TableName => "investors";

        protected override string TitleColumn1 => "InvestorID";

        protected override string TitleColumn2 => "LastName";

        protected override string Caption => "Investor";

        protected override void setupEntityInfo()
        {
            FieldInfoList["InvestorID"] = new FieldInfo(false, false, true, "Investor ID" ,FormDataType.String);
            FieldInfoList["FirstName"] = new FieldInfo(true, true, true, "First Name", new NameEDT());
            FieldInfoList["LastName"] = new FieldInfo(true, true, true, "Last Name", new NameEDT());
            FieldInfoList["MiddleName"] = new FieldInfo(true, true, false, "Middle Name", new NameEDT());
            FieldInfoList["Email"] = new FieldInfo(true, true, true, "Email", new EmailEDT());
            FieldInfoList["PrimaryPhoneNo"] = new FieldInfo(true, true, true, "Primary Phone No", new PhoneEDT());
            FieldInfoList["SecondaryPhoneNo"] = new FieldInfo(true, true, false, "Secondary Phone No", new PhoneEDT());
            FieldInfoList["Address"] = new FieldInfo(true, true, true, "Address", new AddressEDT());
            FieldInfoList["MeansOfIdentification"] = new FieldInfo(true, true, true, "Means of Identification", FormDataType.Blob);
        }

        public override void init()
        {
            //FieldInfoList["ID"] = AppFramework.AppClasses.AppEntities.NumberSequences.getNumber("investor_id");
            this.InvestorID = AppFramework.AppClasses.AppEntities.NumberSequences.getNumber("investor_id");
            base.init();
        }
    }
}
