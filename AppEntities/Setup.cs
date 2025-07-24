using AppEntities.EntityClasses;
using AppEntities.Forms;
using AppFramework.AppClasses;
using AppFramework.AppClasses.AppEntities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Web.Configuration;

namespace AppEntities
{
    public class Setup : MainAppSetup
    {
        private static Random random = new Random(DateTime.Now.Millisecond);
        static Setup()
        {
            UserLoginTokens.GetTwoFactorAuthTokenDelegate = delegate (string username)
            {
                int maxrandomint = 999999;
                string maxrandomintstring = maxrandomint.ToString();
                int randomint = random.Next(maxrandomint);
                string randomintstring = randomint.ToString();
                while (randomintstring.Length < maxrandomintstring.Length)
                {
                    randomintstring = "0" + randomintstring;
                }
                return randomintstring;
            };

            UserLoginTokens.SendTwoFactorAuthToken += delegate (string username, string token)
            {
                Infolog.writeToEventLog(token, InfoType.Info);
            };

        }

        protected override Assembly[] loadAssemblyPlugins()
        {
            List<Assembly> assemblies = new List<Assembly>();
            //Assembly registrationCountAssembly = Assembly.Load("RegistrationCountValue");
            //if (registrationCountAssembly != null)
            //{
            //    assemblies.Add(registrationCountAssembly);
            //}
            return assemblies.ToArray();

            //return new Assembly[0];
        }

        protected override string getLicensePublicKey()
        {
            return "";
        }

        public override void setupBatchClient()
        {
            //throw new NotImplementedException();
            setupClient();
            //DatabaseHandler.DefaultDatabaseHandlerObject = new MySqlClientSideDatabaseHandler(AppSettings.DefaultConnectionParameters);
        }

        public override void setupClient()
        {
            AppSettings.EnableGlobalDatabaseLogging = true;
            //loadLicensePublicKey();
            //throw new NotImplementedException();
            //String assemblyLocation = Util.getDirectoryPath(Assembly.GetExecutingAssembly().Location);
            //AppSettings.MainAssembly = Assembly.LoadFrom(assemblyLocation + "\\BursaryEntities.dll");
            //AppSettings.FileServerLocation = assemblyLocation;
            //AppSettings.DefaultEntityNameSpace = "Bursary.EntityClasses";
            //AppSettings.DefaultEnumNameSpace = "Bursary.EntityClasses";
            //AppSettings.DefaultRunnableNameSpace = "Bursary.Forms";
            AppSettings.GetFieldAndTableInfoFromDatabase = false;
            AppSettings.UseVirtualDelete = true;
            //AppSettings.LicenseEncryptionPublicKey = new StreamReader(Util.getAssemblyResourceFileStream(AppFramework.AppClasses.AppSettings.MainAssembly, "Bursary.PublicKey.key")).ReadToEnd();
            AppSettings.ConcurrencyModel = ConcurrencyModel.Optimistic;

            string assemblylocation = Assembly.GetEntryAssembly().Location;
            string directory = Path.GetDirectoryName(assemblylocation);
            string configpath = Path.Combine(directory, "config.cfg");
            Infolog.writeToEventLog(configpath, InfoType.Info);
            AppSettings.DefaultEntityNameSpace = "AppEntities.EntityClasses";


            string[] lines = File.ReadAllLines(configpath);

            AppSettings.DefaultConnectionParameters = new string[] { lines[0], lines[1], lines[2], lines[3] };

            //AppSettings.FileServerLocation = lines[4];
            //AppSettings.ViewFileFolder = lines[5];

            AppSettings.ShowMessagesInConsole = true;
            AppSettings.MainAssembly = System.Reflection.Assembly.Load("AppEntities");

            DatabaseHandler.DefaultDatabaseHandlerObject = new MySqlClientSideDatabaseHandler(AppSettings.DefaultConnectionParameters);
        }

        public override void setupNavigationMenus()
        {
            var recentlyUsedNavMenu = new NavigationMenu("Recently Used") { Class = "fa fa-random", Position = -2 };
            var dashboardNavMenu = new NavigationMenu("Dashboard") { Class = "fa fa-database", Position = -1 };
            //dashboardNavMenu.Clicked += DashboardNavMenu_Clicked;
            recentlyUsedNavMenu.Clicked += RecentlyUsedNavMenu_Clicked;

            Navigation.RootMenu.Children.Add(recentlyUsedNavMenu);
            Navigation.RootMenu.Children.Add(dashboardNavMenu);

            Navigation.RootMenu.Children.Add(new NavigationMenu("Investors Onboarding").
                Children.Add(new NavigationMenu[] { 
                    new NavigationMenu("Register Investor",typeof(InvestorsRegistration)),
                    new NavigationMenu("Investment Interest Tiers", typeof(InvestmentInterestTier)),
                }));

            Navigation.RootMenu.Children.Add(new NavigationMenu("Main Menu")
                .Children.Add(new NavigationMenu[] {

                }));

            //Navigation.Clicked += Navigation_Clicked;
        }

        //private void Navigation_Clicked(object sender, EventArgs e)
        //{

        //}

        private void RecentlyUsedNavMenu_Clicked(object sender, EventArgs e)
        {
            var recentlyUsedForm = RecentlyUsedNavForm.getRecentlyUsedForm();
            recentlyUsedForm.bringToFront();
        }

        //private void DashboardNavMenu_Clicked(object sender, EventArgs e)
        //private void DashboardNavMenu_Clicked(object sender, EventArgs e)
        //{
        //    var subNavForm = SubNav.getSubNavForm();
        //    subNavForm.bringToFront();
        //}


        public override void setupODataService()
        {
            //throw new NotImplementedException();
            string dblocation = WebConfigurationManager.AppSettings["DatabaseHost"];
            string databasename = WebConfigurationManager.AppSettings["DatabaseName"];
            string databaseuser = WebConfigurationManager.AppSettings["DatabaseUser"];
            string databasepassword = WebConfigurationManager.AppSettings["DatabasePassword"];

            AppSettings.DefaultConnectionParameters = new string[] { dblocation, databasename, databaseuser, databasepassword };
            DatabaseHandler.DefaultDatabaseHandlerType = typeof(MySqlClientSideDatabaseHandler);
            Activator.CreateInstance(DatabaseHandler.DefaultDatabaseHandlerType);
        }

        public override void setupServer()
        {
            DatabaseHandler.DefaultDatabaseHandlerType = typeof(MySqlClientSideDatabaseHandler);
            setupClient();
        }

        protected override void setup()
        {
            //AppSettings.DefaultDataFormAccessLevel = AccessLevel.None;
            //AppSettings.DefaultRunnableAccessLevel = AccessLevel.None;
            //AppSettings.DefaultReportAccessLevel = AccessLevel.None;
        }

        public override void setupBatchServer()
        {
            //throw new NotImplementedException();
        }
    }
}
