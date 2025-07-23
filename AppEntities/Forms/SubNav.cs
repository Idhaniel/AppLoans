using AppFramework.AppClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppEntities.Forms
{
    public class SubNav : WebForm
    {
        private static SubNav me;
        public SubNav()
        {
            this.AllowSwitchTo = false;
            this.AllowSwitch = false;
            this.AllowDock = false;
            this.EnableDefaultCancelCloseButton = false;
            //this.EnableDefaultCloseButton = false;
            this.IsDataForm = false;
        }

        public override AccessLevel RequiredPermissionLevel => AccessLevel.None;

        public override void close()
        {
            if (this.DialogResult == DialogResult.OK)
            {
                this.sendToBack();
            }
            else
            {
                base.close();
            }
            //base.close();
        }

        public static SubNav getSubNavForm()
        {
            if(me == null || me.Closed)
            {
                me = new SubNav();
            }
            return me;
        }

        public override void formLoad()
        {
            base.formLoad();

            List<NavLinkInfo> menu = Nav.getMenuList(Navigation.RootMenu, "");

            callJavascriptMethodNoReply("populateMenu", menu);

            this.registerEventByCSSSelector(".menu-link", "click", menuLinkClickHandler);
        }

        private void menuLinkClickHandler(string cssselector, string eventid, Dictionary<string, string> attributes)
        {
            string id = attributes["id"];
            if (Nav.menus.ContainsKey(id))
            {
                callJavascriptMethodNoReply("closeHamburgerIfMobile");
                var menu = Nav.menus[id];
                menu.clicked();
            }
        }

        internal void display(string topmenuid)
        {
            this.callJavascriptMethod("display", topmenuid);
        }
    }
}
