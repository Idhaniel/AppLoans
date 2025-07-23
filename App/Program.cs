using AppEntities;
using AppEntities.Forms;
using AppFramework.AppClasses;
using AppFramework.WebControls;
using AppFramework.WebForms;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.WebSockets;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace App
{
    class Program
    {
        static string randint = "0";

        static WebSocket webSocket;
        static void Main(string[] args)
        {
            //AppSettings.DefaultFieldLength = 255;
#if !DEBUG
            randint = new Random(DateTime.Now.Second).Next().ToString();
#endif
            loadWebLoadedAssemblies();

            start(args);
        }

        private static List<Assembly> loadWebLoadedAssemblies()
        {
            List<Assembly> ret = new List<Assembly>();
            string webloadeddllsstring = System.Configuration.ConfigurationManager.AppSettings["WebLoadedAssemblies"];
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

        private static Assembly CurrentDomain_AssemblyResolve(object sender, ResolveEventArgs args)
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

        private static void start(string[] args)
        {
            if (args.Length > 3 && args[3] == "test")
            {
                AppSettings.RunDatabaseHandlersInTestMode = true;
            }

            var setup = new Setup();
            //setup.loadAssemblyPlugins();
            setup.setupClient();

            //try
            //{
            //    DatabaseHandler.DefaultDatabaseHandlerObject = new MySqlClientSideDatabaseHandler(AppSettings.DefaultConnectionParameters);
            //}
            //catch(Exception ex)
            //{
            //    Infolog.writeToEventLog(ex, InfoType.Error);
            //    throw new Exception(ex.Message, ex);
            //}

            //setup.setupNavigationMenus();
            var assemblies = AppSettings.getAssemblies();
            var types = Util.getAllTypes();
            Type appFrameworkSetupType = null;
            foreach (var type in types)
            {
                if (typeof(AppSetup).IsAssignableFrom(type) && !type.IsAbstract)
                {
                    if (type.Assembly.GetName().Name == "AppFramework")
                    {
                        appFrameworkSetupType = type;
                        continue;
                    }
                    AppSetup setup2 = (AppSetup)Activator.CreateInstance(type);
                    //AppSettings.setLicenseEncryptionPublicKey(setup2.getLicensePublicKey());
                    setup2.setupNavigationMenus();
                }
            }
            if (appFrameworkSetupType != null)
            {
                AppSetup setup2 = (AppSetup)Activator.CreateInstance(appFrameworkSetupType);
                setup2.setupNavigationMenus();
            }
            WebApplication.setViewContainerStyles(typeof(WebForm), "width: 100%; height: 100%; top: 0px;");
            //WebApplication.setViewContainerStyles(typeof(LookupForm), "width: 50%; height: 50vh; left:25%; top: 20%; border-style: dotted; border-color:#000000");
            //WebApplication.registerStyle(typeof(WebForm), "/Content/css.css?rand=" + randint, true);
            //WebApplication.registerStyle(typeof(WebForm), "/Content/plugin.css?rand=" + randint, true);
            //WebApplication.registerStyle(typeof(WebForm), "/Content/style.css?rand=" + randint, true);
            WebApplication.registerScript(typeof(WebForm), "/Scripts/jquery-3.js?rand=" + randint);
            //WebApplication.registerScript(typeof(WebForm), "/Scripts/bootstrap.js?rand=" + randint);
            //WebApplication.registerScript(typeof(WebForm), "/Scripts/match.js?rand=" + randint);
            //WebApplication.registerScript(typeof(WebForm), "/Scripts/jquery.js?rand=" + randint);
            WebApplication.registerScript(typeof(WebForm), "/js/iframeprep.js?rand=" + randint);
            WebApplication.registerScript(typeof(WebForm), "/Scripts/AppFrameworkLocalSocketClient.js?rand=" + randint);
            //WebApplication.registerScript(typeof(Nav), "/Scripts/action.js?rand=" + randint);
            //WebApplication.registerStyle(typeof(Nav), "/Content/nav.css?rand=" + randint, false);
            //WebApplication.registerStyle(typeof(AppGrid), "/Content/app-grid.css?rand=" + randint, true);
            //WebApplication.registerStyle(typeof(AppFieldGroup), "/Content/app-field-group.css?rand=" + randint, true);
            //WebApplication.registerStyle(typeof(DefaultDetailsForm), "/Content/detailsform.css?rand=" + randint, true);
            //WebApplication.registerStyle(typeof(RunnableDialogForm), "/Content/runnabledialog.css?rand=" + randint, true);
            //WebApplication.registerScript(typeof(RunnableDialogForm), "/Scripts/runnabledialog.js?rand=" + randint);
            WebApplication.registerScript(typeof(LookupForm), "/js/lookupform.js?rand=" + randint);
            WebApplication.registerScript(typeof(MessageBox), "/js/messagebox.js?rand=" + randint);
            WebApplication.registerScript(typeof(PopupForm), "/js/lookupform.js?rand=" + randint);


            WebApplication.registerStyle(typeof(WebForm), "/css/main.css?rand=" + randint, true);
            WebApplication.registerStyle(typeof(WebForm), "/css/font-awesome.min.css?rand=" + randint, true);
            WebApplication.registerStyle(typeof(WebForm), "/css/responsive.css?rand=" + randint, true);

            WebApplication.Timeout = 1000 * 60 * 20;//20 minutes

            try
            {
                int iteration = 0;
                while (true)
                {
                    try
                    {
                        if (iteration > 0)
                        {
                            DatabaseHandler.DefaultDatabaseHandlerObject = new MySqlClientSideDatabaseHandler(AppSettings.DefaultConnectionParameters);
                        }

                        string password;
                        string receivedantiforgerytoken = "";
                        string urlprefix = System.Configuration.ConfigurationManager.AppSettings["ListenerURL"];
                        string usesslstring = System.Configuration.ConfigurationManager.AppSettings["UseSSL"];
                        bool usessl = string.IsNullOrWhiteSpace(usesslstring) ? false : bool.Parse(usesslstring);
                        string sslthumbprint = "";
                        if (usessl)
                        {
                            sslthumbprint = System.Configuration.ConfigurationManager.AppSettings["SSLThumbprint"];
                            if (string.IsNullOrWhiteSpace(sslthumbprint))
                            {
                                throw new Exception("SSLThumbprint not set in App.config");
                            }
                            var assembly = typeof(Program).Assembly;
                            var attribute = (System.Runtime.InteropServices.GuidAttribute)assembly.GetCustomAttributes(typeof(System.Runtime.InteropServices.GuidAttribute), true)[0];
                            var guid = attribute.Value;

                            Process p1 = new Process();
                            ProcessStartInfo pinfo1 = new ProcessStartInfo() { FileName = "netsh", Arguments = string.Format("http delete sslcert ipport=0.0.0.0:{0}", args[0]) };
                            p1.StartInfo = pinfo1;
                            pinfo1.UseShellExecute = false;
                            pinfo1.RedirectStandardOutput = true;
                            p1.Start();
                            p1.WaitForExit();

                            string p1output = p1.StandardOutput.ReadToEnd();

                            Process p2 = new Process();
                            ProcessStartInfo pinfo2 = new ProcessStartInfo() { FileName = "netsh", Arguments = string.Format("http add sslcert ipport=0.0.0.0:{0} certhash={1} appid={{{2}}}", args[0], sslthumbprint, guid) };
                            p2.StartInfo = pinfo2;
                            pinfo2.UseShellExecute = false;
                            pinfo2.RedirectStandardOutput = true;
                            p2.Start();
                            p2.WaitForExit();

                            string p2output = p2.StandardOutput.ReadToEnd();

                            if (p2.ExitCode != 0)
                            {
                                throw new Exception("Error setting certificate file: " + p2output);
                            }
                        }
                        webSocket = WebsocketServer.Start(urlprefix + ":" + args[0] + "/");
                        dynamic dynamictoken = webSocket.ReceiveDynamic();
                        receivedantiforgerytoken = Convert.ToString(dynamictoken.token).Replace("\"", "");

#if !DEBUG
                        password = Console.ReadLine();
                
#else
                        password = args[2];
#endif
                        //Infolog.writeToEventLog(password, InfoType.Info);


                        Session.createNewSession(args[1], password);



#if !DEBUG
                        string receivedipaddress = WebApplication.ConnectedIPAddress;

                        //string expectedipaddress = args[2];
                        string expectedantiforgerytoken = args[2];
                        //if (expectedipaddress.Trim().ToLower() != receivedipaddress.Trim().ToLower())
                        //{
                        //    Infolog.writeToEventLog(new Exception(String.Format("Expected and Received IP Addresses do not match. Expected: {0}, Received: {1}", expectedipaddress, receivedipaddress)), InfoType.Error);
                        //    Environment.Exit(0);
                        //}
                        if (receivedantiforgerytoken != expectedantiforgerytoken)
                        {
                            Infolog.writeToEventLog(new Exception(String.Format("Expected and Received Anti Forgery Tokens do not match. Expected: {0}, Received: {1}", expectedantiforgerytoken, receivedantiforgerytoken)), InfoType.Error);
                            Environment.Exit(0);
                        }
#endif

                        WebApplication.run(Nav.getNavForm(), webSocket, "appcontainer", "nav-iframe");
                    }
                    catch (RestartException e)
                    {
                        //if(!String.IsNullOrWhiteSpace(e.Message))
                        {
                            Infolog.writeToEventLog(e, InfoType.Warning);
                        }
                        WebApplication.closeAllForms(true);
                        WebsocketServer.Stop();
                    }
                    catch (Exception ex)
                    {
                        Infolog.writeToEventLog(ex, InfoType.Error);
                        throw new Exception(ex.Message, ex);
                    }

                    iteration++;
                }
            }
            catch (Exception ex)
            {
                Infolog.writeToEventLog(ex, InfoType.Error);
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
