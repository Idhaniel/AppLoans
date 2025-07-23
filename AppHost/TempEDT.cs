using AppFramework.AppClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AppHost.EDTs
{
    [Serializable]
    public class TempEDT : ExtendedDataType
    {
        private string label;
        private FormDataType formDataType;
        private int length;
        private Type enumType;
        private LookupInfo lookupInfo;

        public TempEDT(FormDataType _formDataType, String _label, int _length = -1)
        {
            formDataType = _formDataType;
            label = _label;
            length = _length;
            enumType = null;
            if (formDataType == AppFramework.AppClasses.FormDataType.Enum)
            {
                throw new Exception("Use overload MiscEDT(Type, String) for Enum EDTs");
            }
        }
        public TempEDT(Type _enumType, String _label)
        {
            formDataType = AppFramework.AppClasses.FormDataType.Enum;
            label = _label;
            length = -1;
            enumType = _enumType;
        }

        protected override string DefaultLabel
        {
            get
            {
                return label;
            }
        }

        public override FormDataType FormDataType
        {
            get
            {
                return formDataType;
            }
        }

        public override int Length
        {
            get
            {
                return length;
            }
        }

        public override LookupInfo LookupInfo
        {
            get { return lookupInfo; }
            
        }

        public void setLookupInfo(LookupInfo lookupInfo)
        {
            this.lookupInfo = lookupInfo;
        }

        public override Type EnumType
        {
            get
            {
                return enumType;
            }
        }
    }
}
