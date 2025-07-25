using AppFramework.AppClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppEntities.EntityClasses
{
    public class InvestmentInterestTier : EntityBase
    {
        public override string TableName => "investment_interest_tier";

        protected override string TitleColumn1 => "TierID";

        protected override string TitleColumn2 => "InterestRate";

        protected override string Caption => "Interest Tier";

        protected override void setupEntityInfo()
        {
            FieldInfoList["TierID"] = new FieldInfo(true, true, true, "Tier ID", FormDataType.String);
            FieldInfoList["MinLockInDays"] = new FieldInfo(true, true, true, "Minimum Days Locked", FormDataType.Integer);
            //FieldInfoList["MaxAmount"] = new FieldInfo(true, true, true, "Maximum Amount", FormDataType.Real);
            FieldInfoList["InterestRate"] = new FieldInfo(true, true, true, "Interest Rate", FormDataType.Real);
            FieldInfoList["TierName"] = new FieldInfo(true, true, true, "Tier Name", FormDataType.String);

            TableInfo.KeyInfoList["TierID"] = new KeyInfo(KeyType.PrimaryField, "TierID");
            TableInfo.KeyInfoList["Unique"] = new KeyInfo(KeyType.Unique, "MinAmount", "MaxAmount");
        }
    }
}
