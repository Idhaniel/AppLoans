using AppFramework.AppClasses;
using AppFramework.AppClasses.AppEntities;
using AppFramework.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace AppHost.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index(bool? test)
        {
            //if (String.IsNullOrWhiteSpace(Session["username"] as string))
            //{
            return RedirectToAction("Login", new { test = test });
            //}
            //else
            //{
            //    return View();
            //}
        }

        [HttpPost]
        public ActionResult App()
        {
            if (!String.IsNullOrWhiteSpace(Session["username"] as String))
            {
                DatabaseHandler.DefaultDatabaseHandlerObject = (DatabaseHandler)Activator.CreateInstance(DatabaseHandler.DefaultDatabaseHandlerType);
                AppFramework.AppClasses.Session.createNewSession((string)Session["username"], (string)Session["password"]);
                ViewBag.ApplicationName = MvcApplication.applicationname;
                ViewBag.porttouse = !string.IsNullOrWhiteSpace(Request.Form["porttouse"]) ? int.Parse(Request.Form["porttouse"]) : 0;
                ViewBag.antiforgerytoken = Request.Form["antiforgerytoken"] ?? "";
                ViewBag.CurrentCompany = AppFramework.AppClasses.Session.Company;
                try
                {
                    ViewBag.Companies = (from c in new AppFramework.Linq.QueryableEntity<AppFramework.AppClasses.AppEntities.Company>() select c).ToList();
                }
                catch(Exception ex)
                {
                    Infolog.writeToEventLog(ex, InfoType.Warning);
                    ViewBag.Companies = new List<Company>() {  };
                }
#if DEBUG
                ViewBag.Debug = true;
#else
                ViewBag.Debug = false;
#endif
                return View();
            }
            else
            {
                return RedirectToAction("Logout");
            }
        }

        public JsonResult Alerts(string lastretrieveddatetimestring = "")
        {
            if (Session["username"] != null)
            {
                try
                {
                    DatabaseHandler.DefaultDatabaseHandlerObject = (DatabaseHandler)Activator.CreateInstance(DatabaseHandler.DefaultDatabaseHandlerType);
                    AppFramework.AppClasses.Session.createNewSession((string)Session["username"], (string)Session["password"]);

                    DateTime lastretrieveddatetime = string.IsNullOrWhiteSpace(lastretrieveddatetimestring) ? DateTime.MinValue : DateTime.ParseExact(lastretrieveddatetimestring, "yyyy-MM-dd HH:mm:ss", System.Globalization.CultureInfo.InvariantCulture);

                    var userAlerts = (from ua in new QueryableEntity<AppFramework.AppClasses.AppEntities.UserAlerts>().Take(200) where ua.Username == AppFramework.AppClasses.Session.Username && ua.CreatedDateTime > lastretrieveddatetime orderby ua.CreatedDateTime descending select new { alertid = ua.ID, alerttitle = ua.Title, alertdescription = ua.Description, alertread = ua.Read, alertdatetimestring = ua.CreatedDateTime }).ToList();

                    var alerts = new { alerts = userAlerts, lastalertdatetimestring = userAlerts.Count > 0 ? userAlerts[0].alertdatetimestring.ToString("yyyy-MM-dd HH:mm:ss") : DatabaseHandler.DefaultDatabaseHandlerObject.SessionDateTime.ToString("yyyy-MM-dd HH:mm:ss") };

                    return Json(alerts, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    Infolog.writeToEventLog(ex, InfoType.Warning);
                    return Json(new { }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult MarkAlertsRead(string alertidsstring, bool read)
        {
            string[] alertidsarray = alertidsstring.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            if (alertidsarray.Length == 0)
            {
                alertidsarray = new string[] { alertidsstring };
            }
            long[] alertidlongarray = alertidsarray.Select(x => Convert.ToInt64(x)).ToArray();
            DatabaseHandler.DefaultDatabaseHandlerObject = (DatabaseHandler)Activator.CreateInstance(DatabaseHandler.DefaultDatabaseHandlerType);
            AppFramework.AppClasses.Session.createNewSession((string)Session["username"], (string)Session["password"]);

            var alerts = (from ua in new QueryableEntity<AppFramework.AppClasses.AppEntities.UserAlerts>() where alertidlongarray.Contains(ua.ID) select ua).ToList();

            using (new Transaction())
            {
                foreach (var alert in alerts)
                {
                    alert.Read = read;
                    alert.update();
                }
            }

            return Json(true, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteAlerts(string alertidsstring)
        {
            string[] alertidsarray = alertidsstring.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            if (alertidsarray.Length == 0)
            {
                alertidsarray = new string[] { alertidsstring };
            }
            long[] alertidlongarray = alertidsarray.Select(x => Convert.ToInt64(x)).ToArray();
            DatabaseHandler.DefaultDatabaseHandlerObject = (DatabaseHandler)Activator.CreateInstance(DatabaseHandler.DefaultDatabaseHandlerType);
            AppFramework.AppClasses.Session.createNewSession((string)Session["username"], (string)Session["password"]);

            var alerts = (from ua in new QueryableEntity<AppFramework.AppClasses.AppEntities.UserAlerts>() where alertidlongarray.Contains(ua.ID) select ua).ToList();

            using (new Transaction())
            {
                foreach (var alert in alerts)
                {
                    alert.delete();
                }
            }

            return Json(true);
        }

        public ActionResult Logout()
        {
            Session["username"] = null;
            Session["name"] = null;
            Session.Abandon();
            return RedirectToAction("Login");
        }

        public ActionResult Login(bool? test)
        {
            Session["test"] = test.HasValue && test.Value ? true : false;
            ViewBag.ApplicationName = MvcApplication.applicationname;
            return View();
        }

        [HttpPost]
        public ActionResult Login(FormCollection formCollection)
        {
            try
            {
                bool test = Session["test"] == null ? false : (bool)Session["test"];
                ViewBag.ApplicationName = MvcApplication.applicationname;
                DatabaseHandler.DefaultDatabaseHandlerObject = (DatabaseHandler)Activator.CreateInstance(DatabaseHandler.DefaultDatabaseHandlerType);
                string username = (formCollection["username"] ?? "").Trim();
                string password = formCollection["password"];
                string browserfingerprint = formCollection["browserfingerprint"];
                string twofactorauthtoken = formCollection["twofactorauthtoken"];
                string browserfingerprinthash = UserLoginTokens.getHash(browserfingerprint);

                try
                {
                    AppFramework.AppClasses.Session.createNewSession(username, password);
                }
                catch (Exception ex)
                {
                    Infolog.writeToEventLog(ex, InfoType.Error);
                    return Json(new { result = -1, error = ex.Message });
                    //ViewBag.Error = ex.Message;
                }

                if (AppFramework.AppClasses.Session.User != null)
                {
                    if (DatabaseHandler.DefaultDatabaseHandlerObject.tableSynced(typeof(SystemParameters)) == TableSyncStatus.Synced &&
                    DatabaseHandler.DefaultDatabaseHandlerObject.tableSynced(typeof(UserBrowserFingerprintHashes)) == TableSyncStatus.Synced &&
                    DatabaseHandler.DefaultDatabaseHandlerObject.tableSynced(typeof(UserLoginTokens)) == TableSyncStatus.Synced)
                    {
                        var systemParameters = SystemParameters.getParameters();
                        if (systemParameters != null && (systemParameters.UseTwoFactorAuthentication == TwoFactorAuthSetting.OnEveryLogin || systemParameters.UseTwoFactorAuthentication == TwoFactorAuthSetting.OnNewClient))
                        {
                            if (string.IsNullOrWhiteSpace(twofactorauthtoken))
                            {
                                if (systemParameters.UseTwoFactorAuthentication == TwoFactorAuthSetting.OnEveryLogin)
                                {
                                    createUserAuthToken(username);
                                    string message = getTwoFactorAuthMessage();
                                    return Json(new { result = 1, message = message });
                                }
                                else
                                {

                                    var userBrowserFingerprintHashes = (from ubfh in new QueryableEntity<UserBrowserFingerprintHashes>() where ubfh.User == username && ubfh.FingerprintHash == browserfingerprinthash && (ubfh.ExpiryDateTime >= DatabaseHandler.DefaultDatabaseHandlerObject.SessionDateTime || ubfh.ExpiryDateTime == DateTime.MinValue) select ubfh).ToList();

                                    if (userBrowserFingerprintHashes.Count == 0)
                                    {
                                        createUserAuthToken(username);
                                        string message = getTwoFactorAuthMessage();
                                        return Json(new { result = 1, message = message });
                                    }
                                }
                                //if two factor auth token has not been supplied
                                //if all the time
                                //insert token and return
                                //else if this hash does not exist for this user or it has expired
                                //insert token and return
                                //else
                                //continue as normal
                            }
                            else
                            {
                                var userLoginToken = (from ult in new QueryableEntity<UserLoginTokens>() where ult.User == username && ult.Token == twofactorauthtoken && !ult.Used && (ult.ExpiryDateTime >= DatabaseHandler.DefaultDatabaseHandlerObject.SessionDateTime || ult.ExpiryDateTime == DateTime.MinValue) orderby ult.CreatedDateTime descending select ult).FirstOrDefault();
                                if (userLoginToken == null)
                                {
                                    return Json(new { result = -2, error = "Invalid authentication token" });
                                }

                                using (new Transaction())
                                {
                                    userLoginToken.Used = true;
                                    userLoginToken.update();
                                    if (systemParameters.UseTwoFactorAuthentication == TwoFactorAuthSetting.OnNewClient)
                                    {
                                        var userBrowserFingerprintHash = new UserBrowserFingerprintHashes();
                                        userBrowserFingerprintHash.User = username;
                                        userBrowserFingerprintHash.FingerprintHash = browserfingerprinthash;
                                        if (systemParameters.UserBrowserFingerprintExpiryMinutes > 0)
                                        {
                                            userBrowserFingerprintHash.ExpiryDateTime = DatabaseHandler.DefaultDatabaseHandlerObject.SessionDateTime.AddMinutes(systemParameters.UserBrowserFingerprintExpiryMinutes);
                                        }
                                        userBrowserFingerprintHash.insert();
                                    }
                                }
                                //if two factor auth token has been supplied
                                //match it with what is in the db
                                //if it is the same, continue as normal
                                //if they are different, return error
                                //if it is correct, and usetwofactorauth == TwoFactorAuthSetting.OnNewClient
                            }
                        }
                    }

                    Session["username"] = AppFramework.AppClasses.Session.Username;
                    Session["password"] = password;
                    Session["name"] = AppFramework.AppClasses.Session.User.Name;
                    if (MvcApplication.startapplicationonlogin)
                    {
                        lock (MvcApplication.portlocker)
                        {
                            int porttouse = MvcApplication.lastportused + 1;
                            if (porttouse < MvcApplication.firstport || porttouse > MvcApplication.lastport)
                            {
                                porttouse = MvcApplication.firstport;
                            }
                            for (int i = 0; i < 2; i++)//this is rather crude, but we're doing it twice because, we may have started at the last port, or close to the last port...on the second run, it will start from the first port to make sure all ports have been checked for availability
                            {
                                if (i == 1)
                                {
                                    porttouse = MvcApplication.firstport;
                                }
                                for (; porttouse <= MvcApplication.lastport; porttouse++)
                                {
                                    Process netstatprocess = new Process();
                                    ProcessStartInfo processStartInfo = new ProcessStartInfo();
                                    processStartInfo.RedirectStandardOutput = true;
                                    processStartInfo.RedirectStandardError = true;
                                    processStartInfo.FileName = "cmd";
                                    //processStartInfo.Arguments = "netstat -ano | find \"1025\"";
                                    string cmdargument = string.Format(" /c \"netstat -ano | find \":{0}\"\"", porttouse);
                                    processStartInfo.Arguments = cmdargument;
                                    processStartInfo.UseShellExecute = false;
                                    netstatprocess.StartInfo = processStartInfo;

                                    netstatprocess.Start();
                                    netstatprocess.WaitForExit();

                                    if (netstatprocess.ExitCode == 0 || netstatprocess.ExitCode == 1)
                                    {
                                        string output = netstatprocess.StandardOutput.ReadToEnd();
                                        if (String.IsNullOrWhiteSpace(output))
                                        {
                                            Process applicationprocess = new Process();
                                            ProcessStartInfo applicationProcessStartInfo = new ProcessStartInfo();
                                            //applicationProcessStartInfo.RedirectStandardOutput = true;
                                            applicationProcessStartInfo.RedirectStandardError = true;
                                            applicationProcessStartInfo.RedirectStandardInput = true;
                                            applicationProcessStartInfo.FileName = "cmd";
                                            //processStartInfo.Arguments = "netstat -ano | find \"1025\"";

                                            string antiforgerytoken = "";

                                            string applicationcmdargument;
#if !DEBUG
                                            antiforgerytoken = Util.md5(Util.md5() + MvcApplication.antiforgerysalt);
                                            applicationcmdargument = string.Format(" /c \"\"{0}\" {1} \"{2}\" \"{3}\" \"{4}\"\"", MvcApplication.applicationlocation, porttouse, username, antiforgerytoken, test ? "test" : "live");
#else
                                            applicationcmdargument = string.Format(" /c \"\"{0}\" {1} \"{2}\" \"{3}\" \"{4}\"\"", MvcApplication.applicationlocation, porttouse, username, password, test ? "test" : "live");
#endif
                                            applicationProcessStartInfo.Arguments = applicationcmdargument;
                                            applicationProcessStartInfo.UseShellExecute = false;
                                            applicationprocess.StartInfo = applicationProcessStartInfo;
                                            applicationprocess.Start();
#if !DEBUG
                                        applicationprocess.StandardInput.WriteLine(password);
                                        //TempData["porttouse"] = porttouse;
                                        //TempData["antiforgerytoken"] = antiforgerytoken;
#endif

                                            MvcApplication.lastportused = porttouse;

                                            if (String.IsNullOrWhiteSpace(WebConfigurationManager.AppSettings["WaitForAppToStartSeconds"]))
                                            {
                                                System.Threading.Thread.Sleep(3000);
                                            }
                                            else
                                            {
                                                int waittime = int.Parse(WebConfigurationManager.AppSettings["WaitForAppToStartSeconds"]);
                                                System.Threading.Thread.Sleep(waittime * 1000);
                                            }
                                            string url;
#if !DEBUG
                                        //return RedirectToAction("App");
                                        url = "/Home/App";
#else
                                            //return RedirectToAction("App", new { port = porttouse });
                                            url = "/Home/App?port=" + porttouse;
#endif
                                            return Json(new { result = 2, url = url, porttouse = porttouse, antiforgerytoken = antiforgerytoken });
                                        }
                                    }
                                    else
                                    {
                                        string error = netstatprocess.StandardError.ReadToEnd();
                                        string output = netstatprocess.StandardOutput.ReadToEnd();
                                        throw new Exception(error);
                                    }
                                }
                            }
                        }
                        throw new Exception("No available port found");
                    }
                    else
                    {
                        int porttouse = MvcApplication.firstport;
                        string url;
#if !DEBUG
                    //TempData["porttouse"] = porttouse;
                    //return RedirectToAction("App");
                    url = "/Home/App";
#else
                        //return RedirectToAction("App", new { port = porttouse });
                        url = "/Home/App?port=" + porttouse;
#endif
                        return Json(new { result = 2, url = url, porttouse = porttouse });
                    }

                    //return RedirectToAction("Index");
                    //find a free port using netstat
                    //start the application
                    //we have to ensure that the user that connects to the application is the one the application was started for
                    //redirect to index
                }
                else
                {
                    //return View();
                    return Json(new { result = -1, error = "Session.User returned null" });
                }
            }
            catch (Exception ex)
            {
                Infolog.writeToEventLog(ex, InfoType.Error);
                return Json(new { result = -1, error = ex.Message });
            }
        }

        private static string getTwoFactorAuthMessage()
        {
            string message = "Please supply authentication token. ";
            if (UserLoginTokens.GetTwoFactorAuthMessageDelegate != null)
            {
                message += UserLoginTokens.GetTwoFactorAuthMessageDelegate();
            }

            return message;
        }

        private static void createUserAuthToken(string username)
        {
            var userLoginTokens = new UserLoginTokens();
            userLoginTokens.User = username;
            using (new Transaction())
            {
                userLoginTokens.insert();
            }
        }

        //public void AttachToProcess(int processId)
        //{
        //    foreach (EnvDTE.Process process in DTE.Debugger.LocalProcesses)
        //    {
        //        if (process.ProcessID == processId)
        //        {
        //            process.Attach();
        //            DTE.Debugger.CurrentProcess = process;
        //        }
        //    }
        //}

        public ActionResult Empty()
        {
            return new EmptyResult();
        }
    }
}