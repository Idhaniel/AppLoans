using AppFramework.AppClasses;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppEntities.Forms
{
    public class ColourSchemeForm : WebForm
    {
        private Dictionary<string, string> colorVariablesDictionary;

        public ColourSchemeForm()
        {
            this.Caption = "Set Colour Scheme";
            this.EnableDefaultCloseButton = false;
        }

        [AllowCallFromView]
        public void saveColors(dynamic[] args)
        {
            JObject colorVariables = args[0];
            colorVariablesDictionary = new Dictionary<string, string>();
            foreach (var colorVariable in colorVariables)
            {
                colorVariablesDictionary[colorVariable.Key] = colorVariable.Value.ToString();
            }
            setUserSetting("colorVariables", colorVariablesDictionary);
            saveUserSettings();
        }
    }
}
