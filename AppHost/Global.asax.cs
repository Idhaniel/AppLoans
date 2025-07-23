using AppFramework.AppClasses;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace AppHost
{
    public class MvcApplication : System.Web.HttpApplication
    {
        public static int firstport;
        public static int lastport;
        public static int lastportused;
        public static string applicationlocation;
        public static string antiforgerysalt;
        public static bool startapplicationonlogin;
        public static string applicationname;

        public static object portlocker = new object();
        protected void Application_Start()
        {
            loadWebLoadedAssemblies();

            start();

            //AppSetup setup = null;
            //foreach (Type type in Util.getAllTypes())
            //{
            //    if (typeof(AppFramework.AppClasses.AppSetup).IsAssignableFrom(type) && !type.IsAbstract)
            //    {
            //        setup = Activator.CreateInstance(type) as AppFramework.AppClasses.AppSetup;
            //        setup.loadLicensePublicKey();
            //        break;
            //    }
            //}
            //AppSettings.FileServerLocation = configlines[]
        }

        private List<Assembly> loadWebLoadedAssemblies()
        {
            List<Assembly> ret = new List<Assembly>();
            string webloadeddllsstring = WebConfigurationManager.AppSettings["WebLoadedAssemblies"];
            if (!string.IsNullOrWhiteSpace(webloadeddllsstring))
            {
                string[] webloadeddlls = webloadeddllsstring.Split(new char[] { ',', ' ', '|' }, StringSplitOptions.RemoveEmptyEntries);
                if (webloadeddlls.Length == 0)
                {
                    webloadeddlls = new string[] { webloadeddllsstring };
                }
                //throw new Exception(webloadeddlls[0]+"|"+webloadeddlls[1]);
                using (var webClient = new WebClient())
                {
                    foreach (var webloadeddll in webloadeddlls)
                    {
                        string temp = webloadeddll.Trim();
                        string temppdb = temp.Replace(".dll", ".pdb");

                        try
                        {
                            byte[] assemblybytes = webClient.DownloadData(temp);
                            byte[] pdbbytes = null;
                            try
                            {
                                pdbbytes = webClient.DownloadData(temppdb);
                            }
                            catch (Exception exx)
                            {
                                //we can't use this to log it as this would require loading of appframework
                                //Infolog.writeToEventLog(new Exception(string.Format("Unable to load pdb at '{0}'", temppdb), exx), InfoType.Warning);
                            }

                            Assembly assembly;
                            if (pdbbytes == null)
                            {
                                assembly = Assembly.Load(assemblybytes);
                            }
                            else
                            {
                                assembly = Assembly.Load(assemblybytes, pdbbytes);
                            }

                            ret.Add(assembly);
                            //throw new Exception(assembly.FullName);
                        }
                        catch (Exception ex)
                        {
                            throw new Exception(string.Format("Unable to load assembly at '{0}'", temp), ex);
                        }
                    }
                }
                AppDomain.CurrentDomain.AssemblyResolve += CurrentDomain_AssemblyResolve;
            }
            return ret;
        }

        private Assembly CurrentDomain_AssemblyResolve(object sender, ResolveEventArgs args)
        {
            Assembly assembly = AppDomain.CurrentDomain.GetAssemblies().FirstOrDefault(a => a.FullName == args.Name);
            if (assembly == null)
            {
                assembly = AppDomain.CurrentDomain.GetAssemblies().FirstOrDefault(a => a.GetName().Name == args.Name);
            }
            if (assembly != null)
            {
                return assembly;
            }
            else
            {
                return null;
            }
        }

        private static void start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            AppFramework.AppClasses.AppSettings.SeparateDefaultDBHandlerForHTTPRequests = true;
            AppFramework.AppClasses.AppSettings.SeparateSessionForHTTPRequests = true;
            AppSettings.ExternalUserEnviroment = true;
            AppSettings.LogOnlineUsers = false;
            AppSettings.EnableAlerts = false;

            string databasesettingsstring = WebConfigurationManager.AppSettings["DatabaseParameters"];
            string databasehandlertypename = WebConfigurationManager.AppSettings["DatabaseHandlerTypeName"];
            string mainassemblylocation = WebConfigurationManager.AppSettings["MainAssemblyLocation"];
            string portrangestring = WebConfigurationManager.AppSettings["ApplicationPortRange"];
            applicationlocation = WebConfigurationManager.AppSettings["ApplicationLocation"];
            applicationname = WebConfigurationManager.AppSettings["ApplicationName"];
            antiforgerysalt = WebConfigurationManager.AppSettings["AntiForgerySalt"];
            startapplicationonlogin = Convert.ToBoolean(WebConfigurationManager.AppSettings["StartApplicationOnLogin"]);

            if (String.IsNullOrWhiteSpace(applicationlocation))
            {
                throw new Exception("ApplicationLocation not set in Web.config");
            }

            if (string.IsNullOrWhiteSpace(portrangestring))
            {
                throw new Exception("Application Port Range not set in Web.config");
            }

            string[] databasesettings = databasesettingsstring.Split(',');
            string[] portrange = portrangestring.Split(',');

            if (portrange.Length != 2)
            {
                throw new Exception("Port range is not properly formatted. Valid examples are: 1024,65535 or *,65535 or 1024,* or *,*");
            }

            if (portrange[0] == "*" || String.IsNullOrWhiteSpace(portrange[0]))
            {
                firstport = 1024;
            }
            else
            {
                firstport = int.Parse(portrange[0]);
            }

            if (portrange[1] == "*" || String.IsNullOrWhiteSpace(portrange[1]))
            {
                lastport = 65535;
            }
            else
            {
                lastport = int.Parse(portrange[1]);
            }
            //String[] configlines = File.ReadAllLines(HttpRuntime.AppDomainAppPath + "\\bin\\config.cfg");



            AppSettings.DefaultConnectionParameters = databasesettings;// new string[] { configlines[0], configlines[1], configlines[2], configlines[3] };
            //AppSettings.FileServerLocation = WebConfigurationManager.AppSettings["FileServerLocation"];
            if (mainassemblylocation.EndsWith(".dll"))
            {
                AppSettings.MainAssembly = Assembly.LoadFrom(mainassemblylocation);
            }
            else
            {
                AppSettings.MainAssembly = Assembly.Load(mainassemblylocation);
            }
            DatabaseHandler.DefaultDatabaseHandlerType = Util.getTypeFromString(databasehandlertypename);

            if (String.IsNullOrWhiteSpace(databasehandlertypename))
            {
                throw new Exception("DatabaseHandler typpe name not specified in Web.config");
            }
            if (DatabaseHandler.DefaultDatabaseHandlerType == null)
            {
                throw new Exception("Could not find database handler type '" + databasehandlertypename + "'");
            }
        }

        protected void Application_EndRequest(object sender, EventArgs e)
        {
            try
            {
                if (DatabaseHandler.DefaultDatabaseHandlerObject != null)
                {
                    DatabaseHandler.DefaultDatabaseHandlerObject.Dispose();
                }
            }
            catch { }
        }
    }
}
