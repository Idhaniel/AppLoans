using AppFramework.AppClasses;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppEntities.Forms
{
    public class RecentlyUsedNavForm : WebForm
    {
        private static RecentlyUsedNavForm me;
        private OrderedDictionary recentlyUsed = new OrderedDictionary();
        private RecentlyUsedNavForm()
        {
            //this.ContainerStyle = "flex: 1 1 auto; width:100%; border-style:none";
            this.EnableDefaultCancelCloseButton = false;
            this.EnableDefaultCloseButton = false;
            this.AllowSwitch = true;
            this.AllowSwitchTo = true;
            this.IsDataForm = false;
            this.AllowDock = false;
            this.Caption = "Recently Used";
            this.IsDataForm = false;
        }

        public override AccessLevel RequiredPermissionLevel => AccessLevel.None;

        public static void test()
        {

        }

        public static RecentlyUsedNavForm getRecentlyUsedForm()
        {
            if(me == null || me.Closed)
            {
                me = new RecentlyUsedNavForm();
            }
            return me;
        }

        private void Navigation_Clicked(object sender, EventArgs e)
        {
            callJavascriptMethodNoReply("closeHamburgerIfMobile");
            var menu = (NavigationMenu)sender;
            if (menu.ID != "_Recently Used" && menu.hasAction())
            {
                addRecentlyUsed(menu);
            }
        }

        public Nav Nav { get; internal set; }

        public override ViewFileLocation ViewFileLocation => ViewFileLocation.File;

        public void addRecentlyUsed(NavigationMenu menu)
        {
            //string runnableTypeName = menuLinkInfo.runnableType.FullName;
            if (recentlyUsed.Contains(menu.ID))
            {
                recentlyUsed.Remove(menu.ID);
            }

            recentlyUsed.Add(menu.ID, new NavLinkInfo { caption = menu.Caption, id = menu.ID, @class = Nav.getClass(menu), position = menu.Position });

            if (recentlyUsed.Count > 30)
            {
                recentlyUsed.RemoveAt(0);
            }

            this.generateRecentlyUsed();
        }

        public override void formLoad()
        {
            Navigation.Clicked += Navigation_Clicked;
            base.formLoad();
            try
            {
                this.recentlyUsed = new OrderedDictionary();
                var tempdic = (OrderedDictionary)this.getUserSetting("recentlyused") ?? new OrderedDictionary();
                foreach(System.Collections.DictionaryEntry temp in tempdic)
                {
                    var navigationLinkInfo = (NavLinkInfo)temp.Value;
                    if(Nav.menus.ContainsKey(navigationLinkInfo.id))
                    {
                        this.recentlyUsed.Add(navigationLinkInfo.id, navigationLinkInfo);
                    }
                }
            }
            catch(Exception ex)
            {
                Infolog.writeToEventLog(ex, InfoType.Warning);
            }
            this.generateRecentlyUsed();
        }
        
        public void generateRecentlyUsed()
        {
            this.callJavascriptMethodNoReply("generateRecentlyUsed", this.recentlyUsed);

            deRegisterEventByCSSSelector(".recentbutton", "click", recentButtonHandler);
            registerEventByCSSSelector(".recentbutton", "click", recentButtonHandler);

            saveUserSettings();
        }

        private void recentButtonHandler(string cssselector, string eventid, Dictionary<string, string> attributes)
        {
            string id = attributes["id"];
            if(Nav.menus.ContainsKey(id))
            {
                Nav.menus[id].clicked();
            }
            //var typeName = attributes["runnabletype"];
            //Type t = Util.getTypeFromString(typeName);

            //if (t != null)
            {
                //this.addRecentlyUsed((NavLinkInfo)this.recentlyUsed[typeName]);
                //this.Nav.runType(t, null);
            }
        }

        public override void saveUserSettings()
        {
            this.setUserSetting("recentlyused", this.recentlyUsed);
            base.saveUserSettings();
        }
    }
}
