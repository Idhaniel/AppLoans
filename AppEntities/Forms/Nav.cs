using AppFramework.AppClasses;
using AppFramework.Runnables;
using AppFramework.WebForms;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppEntities.Forms;
using AppFramework.Linq;
using AppFramework.AppClasses.AppEntities;
using AppEntities.EntityClasses;

namespace AppEntities.Forms
{
    public class Nav : WebForm
    {
        private static Dictionary<string, NavLinkInfo> menuLinkInfo = new Dictionary<string, NavLinkInfo>();
        private RecentlyUsedNavForm dashboard;
        private List<Tuple<AppFramework.AppClasses.AppEntities.SavedReports, DashboardReports>> savedReports;
        internal static Dictionary<string, NavigationMenu> menus = new Dictionary<string, NavigationMenu>();
        private static Nav me;

        private Nav()
        {
            this.ContainerStyle = "width:100%; height: 100%; border-style:none; position: absolute";
            this.AllowSwitchTo = false;
            this.AllowSwitch = false;
            this.EnableDefaultCloseButton = false;
            this.EnableDefaultCancelCloseButton = false;
            this.ShowTitle = false;
            this.ShowInfoLog = false;
            this.IsDataForm = false;
            this.AllowDock = false;

        }

        public override AccessLevel RequiredPermissionLevel => AccessLevel.None;

        public static Nav getNavForm()
        {
            if (me == null || me.Closed)
            {
                me = new Nav();
            }
            return me;
        }

        private void NavigationMenu_StaticClicked(object sender, EventArgs e)
        {
            callJavascriptMethodNoReply("closeHamburgerIfMobile");
            NavigationMenu menuItem = (NavigationMenu)sender;
            if (!menuItem.hasAction() && menuItem.Parent == Navigation.RootMenu)
            {
                if (menuItem.Children.Count > 0)
                {
                    var subNav = SubNav.getSubNavForm();
                    if (!subNav.Opened)
                    {
                        subNav.open();
                    }
                    subNav.setCaption(menuItem.Caption);
                    subNav.bringToFront();

                    subNav.display(menuItem.ID);
                }
            }
        }

        protected override void cancelCloseHandler(string elementid, string eventid, Dictionary<string, string> attributes)
        {
            //base.cancelCloseHandler(elementid, eventid, attributes);
        }

        [AllowCallFromView]
        public void changeCompany(dynamic[] args)
        {
            if (AppFramework.AppClasses.Session.User.CanChangeCompany)
            {
                string company = args[0];
                new ChangeCompany() { Company = company, Interactive = false }.run();
            }
            else
            {
                throw new Exception("User cannot change company");
            }
        }

        [AllowCallFromView]
        public void changePassword()
        {
            new UserChangePassword().open();
        }

        [AllowCallFromView]
        public void openColourSchemeForm()
        {
            new ColourSchemeForm().open();
        }

        //[AllowCallFromView]
        public void addDashboardReport()
        {
            //RunnableArgs args = new RunnableArgs();
            //var runnable = Util.getTypeRunnable(typeof(AppFramework.AppClasses.AppEntities.SavedReports), ref args);
            //var form = (WebForm)runnable;
            //form.ContainerStyle = 
            LookupForm lookupForm = new LookupForm(typeof(AppFramework.AppClasses.AppEntities.SavedReports), "ID", null, "", null, null);
            lookupForm.JoinParameters = LinqExpressionParser.ParseStatic((from s in new QueryableEntity<AppFramework.AppClasses.AppEntities.SavedReports>()
                                                                          where (s.CreatedBy == Session.Username || s.Public) &&
                                                                                !new QueryableEntity<AppEntities.EntityClasses.DashboardReports>().Any(x => x.Username == Session.Username && x.SavedReportID == s.ID)
                                                                          select s).Expression);
            lookupForm.FormClosing += LookupForm_FormClosing;
            lookupForm.open();
        }

        //[AllowCallFromView]
        public void refreshDashboardReports()
        {
            savedReports = new List<Tuple<AppFramework.AppClasses.AppEntities.SavedReports, DashboardReports>>();

            try
            {
                savedReports = getSavedReports();
            }
            catch (Exception ex)
            {
                Infolog.add(ex);
            }

            List<string> iframeids = new List<string>();
            for (int i = 0; i < savedReports.Count; i++)
            {
                iframeids.Add(Util.md5());
            }

            callJavascriptMethod("createSavedReportIFrames", iframeids);

            if (savedReports.Count > 0)
            {
                System.Threading.Thread.Sleep(2000);
            }
            for (int i = 0; i < savedReports.Count; i++)
            {
                var savedreport = savedReports[i];
                var runnable = (ReportRun)Util.deserialize(savedreport.Item1.SerializedObject, true);
                runnable.Interactive = false;
                WebApplication.NextFormIFrameId = iframeids[i];
                runnable.run();
            }
        }

        private static List<Tuple<AppFramework.AppClasses.AppEntities.SavedReports, DashboardReports>> getSavedReports()
        {
            var savedReports = (from dr in new QueryableEntity<AppEntities.EntityClasses.DashboardReports>()
                                where dr.Username == Session.Username
                                join sr in new QueryableEntity<AppFramework.AppClasses.AppEntities.SavedReports>()
                                on dr.SavedReportID equals sr.ID
                                where (sr.CreatedBy == Session.Username || sr.Public)
                                orderby dr.SNo
                                select new Tuple<AppFramework.AppClasses.AppEntities.SavedReports, DashboardReports>(sr, dr)).ToList();
            return savedReports;
        }

        private void LookupForm_FormClosing(object sender, EventArgs e)
        {
            var lookupForm = (LookupForm)sender;
            if (lookupForm.DialogResult == DialogResult.OK && lookupForm.SelectedData != null)
            {
                var savedReport = (AppFramework.AppClasses.AppEntities.SavedReports)lookupForm.SelectedData[0];

                var dashboardReport = new AppEntities.EntityClasses.DashboardReports() { Username = Session.Username, SavedReportID = savedReport.ID };

                using (new Transaction())
                {
                    dashboardReport.insert();
                }
                this.refreshDashboardReports();
                //callJavascriptMethod("refreshDashboardReports");
            }
        }

        private static NavLinkInfo getMenuItem(NavigationMenu menu, int level)
        {
            //string itemstring;



            //if (menu.Children.Count == 0)
            {


                //Type type = AppFramework.WebControls.OperationsControl.getOperationIRunnable(menu.RunnableType, out bool isentitytype, out EntityBase sampleEntity);
                object typeInstance = null;
                if (menu.RunnableType != null)
                {
                    typeInstance = Activator.CreateInstance(menu.RunnableType);
                }
                string requiredpermission = "";
                if (typeof(EntityBase).IsAssignableFrom(menu.RunnableType))
                {
                    requiredpermission = EntityBase.getDefaultFormPermission(menu.RunnableType);
                }
                else if (typeof(EntityView).IsAssignableFrom(menu.RunnableType))
                {
                    var viewObject = (EntityView)typeInstance;
                    requiredpermission = EntityBase.getDefaultFormPermission(viewObject.JoinParameters[0].EntityBaseType);
                }
                else if (typeof(WebForm).IsAssignableFrom(menu.RunnableType))
                {
                    requiredpermission = WebForm.getPermission(menu.RunnableType, menu.Args);
                }
                else if (menu.RunnableType != null)
                {
                    requiredpermission = Runnable.getPermission(menu.RunnableType);
                }

                string requiredLicense = "";
                PermissionObjectType permissionObjectType = PermissionObjectType.NotSet;
                AccessLevel requiredAccessLevel = AccessLevel.Read;
                try
                {
                    if (menu.RunnableType != null)
                    {
                        if (typeof(EntityBase).IsAssignableFrom(menu.RunnableType))
                        {
                            requiredLicense = ((EntityBase)typeInstance).RequiredLicense;
                            permissionObjectType = PermissionObjectType.DataForm;
                        }
                        else if (typeof(EntityView).IsAssignableFrom(menu.RunnableType))
                        {
                            var viewObject = (EntityView)typeInstance;
                            requiredLicense = EntityBase.getDefaultFormPermission(viewObject.JoinParameters[0].EntityBaseType);
                            permissionObjectType = PermissionObjectType.DataForm;
                        }
                        else if (typeof(WebForm).IsAssignableFrom(menu.RunnableType))
                        {
                            requiredLicense = ((WebForm)typeInstance).RequiredLicense;
                            permissionObjectType = ((WebForm)typeInstance).IsDataForm ? PermissionObjectType.DataForm : PermissionObjectType.Form;
                            requiredAccessLevel = ((WebForm)typeInstance).RequiredPermissionLevel;
                        }
                        else if (menu.RunnableType != null)
                        {
                            requiredLicense = ((Runnable)typeInstance).RequiredLicense;
                            permissionObjectType = typeof(ReportRun).IsAssignableFrom(menu.RunnableType) ? PermissionObjectType.Report : PermissionObjectType.Runnable;
                            requiredAccessLevel = ((Runnable)typeInstance).RequiredPermissionLevel;
                        }
                    }
                }
                catch (Exception ex)
                {
                    Infolog.writeToEventLog(ex, InfoType.Warning);
                }

                if (Session.User.permissionLevel(requiredpermission, permissionObjectType) >= requiredAccessLevel && (menu.RunnableType == null || Util.hasLicense(requiredLicense, menu.RunnableType.Assembly)))
                {
                    string id = menu.ID;
                    menus[id] = menu;
                    NavLinkInfo menuItemInfo = new NavLinkInfo();
                    menuItemInfo.id = id;
                    //menuItemInfo.runnableType = menu.RunnableType;
                    //menuItemInfo.runnableArgs = menu.Args;
                    menuItemInfo.menuclass = menu.Class;
                    menuItemInfo.caption = menu.Caption;
                    menuItemInfo.@class = Nav.getClass(menu);
                    menuItemInfo.children = new List<NavLinkInfo>();
                    menuItemInfo.hasAction = menu.hasAction();
                    menuItemInfo.position = menu.Position;
                    menuLinkInfo[id] = menuItemInfo;

                    if (menu.Children.Count > 0)
                    {
                        string childrenlistid = Util.md5();
                        menuItemInfo.listid = childrenlistid;
                        menuItemInfo.children = getMenuList(menu, childrenlistid, level);
                    }

                    //if menu item has no click action, no runnable, and no children, then it should be hidden
                    if ((!menuItemInfo.hasAction && menuItemInfo.children.Count == 0) || Session.User.permissionLevel(menu.RequiredPermission, PermissionObjectType.NavigationMenu) < AccessLevel.Read)
                    {
                        return null;
                    }
                    else
                    {
                        return menuItemInfo;
                    }
                }
                else
                {
                    return null;
                }


                //else
                //{
                //    itemstring = "";
                //}
            }
            //else
            //{
            //    string childrenlistid = Util.md5();
            //    itemstring = "<li level=\"" + level + "\">";
            //    itemstring += "<a role=\"button\" data-toggle=\"collapse\" class=\"collapsed\" aria-expanded=\"false\" href=\"#" + childrenlistid + "\" aria-controls=\"" + childrenlistid + "\"><i class=\"fa fa-folder-open-o " + @class + " " +  menu.Class + "\"></i><span class=\"menu-link-span\">" + menu.Caption + "</span></a>";
            //    string menulist = getMenuList(menu, childrenlistid, level);
            //    itemstring += menulist;
            //    itemstring += "</li>";

            //    if(string.IsNullOrWhiteSpace(menulist))
            //    {
            //        itemstring = "";
            //    }
            //}
            //return itemstring;
        }

        internal static List<NavLinkInfo> getMenuList(NavigationMenu menu, string listid, int level = 0)
        {
            //string list;
            //if (menu != Navigation.RootMenu)
            //{
            //    list = "<ul class=\"collapse\" id=\"" + parentid + "\">";
            //}
            //else
            //{
            //    list = "<ul>";
            //}

            var ret = new List<NavLinkInfo>();

            //string childmenustring = "";
            foreach (var childmenu in menu.Children.Where(x => x.Children.Count == 0).OrderBy(x => x.Caption).OrderBy(x => x.Position))
            {
                var menuItem = getMenuItem(childmenu, ++level);
                //menuItem.parentid = listid;
                if (menuItem != null)
                {
                    ret.Add(menuItem);
                }
            }
            foreach (var childmenu in menu.Children.Where(x => x.Children.Count != 0).OrderBy(x => x.Caption).OrderBy(x => x.Position))
            {
                var menuItem = getMenuItem(childmenu, ++level);
                //menuItem.parentid = listid;
                if (menuItem != null)
                {
                    ret.Add(menuItem);
                }
            }
            //list += childmenustring;
            //list += "</ul>";

            //if(String.IsNullOrWhiteSpace(childmenustring))
            //{
            //    list = "";
            //}
            return ret;

        }

        public static string getClass(NavigationMenu menu)
        {
            if (string.IsNullOrWhiteSpace(menu.Class))
            {
                if (menu.RunnableType == null)
                {
                    if (menu.Children.Count == 0)
                    {
                        return "fa fa-wpforms click";
                    }
                    //else if(string.IsNullOrWhiteSpace(menu.Class))
                    //{
                    //    return "fa fa-list-alt";
                    //}
                    else
                    {
                        return "fa fa-wpforms";
                    }
                }
                else if (typeof(ReportRun).IsAssignableFrom(menu.RunnableType))
                {
                    return "fa fa-files-o report";
                }
                else if (typeof(Runnable).IsAssignableFrom(menu.RunnableType))
                {
                    return "fa fa-gg runnable";
                }
                else if (typeof(WebForm).IsAssignableFrom(menu.RunnableType) || typeof(EntityBase).IsAssignableFrom(menu.RunnableType))
                {
                    return "fa fa-wpforms form";
                }
                else
                {
                    return "fa fa-wpforms form";
                }
            }
            else
            {
                return menu.Class;
            }
        }

        public override void formLoad()
        {
            base.formLoad();
            Navigation.Clicked += NavigationMenu_StaticClicked;

            List<NavLinkInfo> menu = getMenuList(Navigation.RootMenu, "");

            callJavascriptMethodNoReply("populateMenu", menu);
            //callJavascriptMethodNoReply("openHamburger");

            //this["navdiv"] = liststring;

            this.registerEventByCSSSelector(".menu-link", "click", menuLinkClickHandler);
            this.registerEventsByElementId(new string[] { "html", "html", "html", "html", "html", "html" }, new string[] { "addreport", "refreshreports", "deletereport", "moveupreport", "movedownreport", "viewalertentity" }, new ElementIdEventHandler[] { addReportHandler, refreshReportsHandler, deleteReportHandler, moveUpReportHandler, moveDownReportHandler, viewAlertEntityHandler });
            //this.registerEventByCSSSelector("html", "refreshreports", refreshReportsHandler);

            dashboard = RecentlyUsedNavForm.getRecentlyUsedForm();
            dashboard.Nav = this;
            dashboard.open();

            //var subNav = SubNav.getSubNavForm();
            //subNav.open();

            refreshDashboardReports();

            //if(savedReports.Count == 0)
            //{
            //    this.callJavascriptMethodNoReply("switchToRecentlyUsedTab");
            //}

            //this is an extra call to neutralise the call to pauseWindow in App.cshtml
            //this.callJavascriptMethod("unpauseWindow");
        }

        private void viewAlertEntityHandler(string elementid, string eventid, Dictionary<string, string> attributes)
        {
            long alertid = Convert.ToInt32(attributes["event_alertid"]);

            var alert = (from ua in new QueryableEntity<UserAlerts>() where ua.ID == alertid select ua).FirstOrDefault();

            Type t = Util.getTypeFromString(alert.EntityName);

            var entityBase = EntityBase.constructEntity(t);
            entityBase.load(alert.EntityID);
            entityBase.show();

            using (new Transaction())
            {
                alert.Read = true;
                alert.update();
            }

            callJavascriptMethodNoReply("markAlertRead", alertid);
        }

        private void moveDownReportHandler(string elementid, string eventid, Dictionary<string, string> attributes)
        {
            int index = Convert.ToInt32(attributes["event_index"]);
            var savedReport = savedReports[index];
            var dashboardReports = savedReports.Select(x => x.Item2).ToList();
            var savedDashboardReport = savedReport.Item2;// (from dr in new QueryableEntity<DashboardReports>() where dr.Username == Session.Username && dr.SavedReportID == savedReport.Item1.ID select dr).FirstOrDefault();
            var nextDashboardReport = (from dr in dashboardReports where dr.Username == Session.Username && dr.SNo > savedDashboardReport.SNo orderby dr.SNo ascending select dr).FirstOrDefault();

            if (nextDashboardReport != null)
            {
                using (new Transaction())
                {
                    long sno = nextDashboardReport.SNo;
                    nextDashboardReport.SNo = savedDashboardReport.SNo;
                    savedDashboardReport.SNo = sno;

                    nextDashboardReport.update();
                    savedDashboardReport.update();
                }

                refreshDashboardReports();
            }
        }

        private void moveUpReportHandler(string elementid, string eventid, Dictionary<string, string> attributes)
        {
            int index = Convert.ToInt32(attributes["event_index"]);
            var savedReport = savedReports[index];
            var dashboardReports = savedReports.Select(x => x.Item2).ToList();
            var savedDashboardReport = savedReport.Item2;// (from dr in new QueryableEntity<DashboardReports>() where dr.Username == Session.Username && dr.SavedReportID == savedReport.Item1.ID select dr).FirstOrDefault();
            var previousDashboardReport = (from dr in dashboardReports where dr.Username == Session.Username && dr.SNo < savedDashboardReport.SNo orderby dr.SNo descending select dr).FirstOrDefault();

            if (previousDashboardReport != null)
            {
                using (new Transaction())
                {
                    long sno = previousDashboardReport.SNo;
                    previousDashboardReport.SNo = savedDashboardReport.SNo;
                    savedDashboardReport.SNo = sno;

                    previousDashboardReport.update();
                    savedDashboardReport.update();
                }

                refreshDashboardReports();
            }
        }

        private void deleteReportHandler(string elementid, string eventid, Dictionary<string, string> attributes)
        {
            int index = Convert.ToInt32(attributes["event_index"]);
            var savedReport = savedReports[index];
            using (new Transaction())
            {
                savedReport.Item2.delete();
            }
            refreshDashboardReports();
        }

        private void refreshReportsHandler(string cssselector, string eventid, Dictionary<string, string> attributes)
        {
            refreshDashboardReports();
        }

        private void addReportHandler(string cssselector, string eventid, Dictionary<string, string> attributes)
        {
            addDashboardReport();
        }

        private void menuLinkClickHandler(string cssselector, string eventid, Dictionary<string, string> attributes)
        {
            string id = attributes["id"];
            openMenuLink(id);
        }

        internal void openMenuLink(string id)
        {
            var menu = menus[id];
            menu.clicked();

            //NavLinkInfo info = menuLinkInfo[id];

            //Type runnableType = info.runnableType;
            //RunnableArgs args = info.runnableArgs;
            //var irunnable = runType(runnableType, args);
            //args = irunnable.Args;

            //if (info.runnableArgs == null && dashboard != null)
            {
                //dashboard.addRecentlyUsed(info);
            }
        }


    }

    [Serializable]
    public class NavLinkInfo
    {
        //public Type runnableType;
        //public RunnableArgs runnableArgs;
        public string id;
        public string caption;
        public string @class;
        public List<NavLinkInfo> children;
        //public string parentid;
        public string menuclass;
        public string listid;
        public bool hasAction;
        public int position;
    }

}
