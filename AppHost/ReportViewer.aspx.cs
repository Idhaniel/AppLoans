using AppFramework.AppClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using AppFramework.Mvc;
using System.IO;
using AppFramework.AppClasses.EDTs;
using AppFramework.AppClasses.AppEntities;
using AppHost.EDTs;
using System.Dynamic;
//using Microsoft.Reporting.WinForms;

namespace AppFramework.Mvc
{
    public partial class ReportViewer : System.Web.UI.Page
    {
        public ReportViewer()
        {

        }

        public List<dynamic> infologs = new List<dynamic>();

        private void Infolog_InfologAddedEvent(Info info)
        {
            dynamic dynamicinfo = new ExpandoObject();
            dynamicinfo.message = info.Text.Replace("\\", "\\\\").Replace("'", "\\'");
            dynamicinfo.type = info.InfoType.ToString().ToLower();
            infologs.Add(dynamicinfo);
        }

        public String ReportClass
        {
            get
            {
                return (Session["__report_class"] ?? "").ToString();
            }
        }

        public String RunnableId
        {
            get
            {
                return Request["runnableid"];
            }
        }

        //public String MainAssemblyName
        //{
        //    get
        //    {
        //        return (String)Session["__main_assembly"];
        //    }
        //}

        protected void Page_Load(object sender, EventArgs e)
        {
            Session["infolog"] = null;


            //if(AppSettings.MainAssembly == null)
            //{
            //    AppSettings.MainAssembly = Assembly.Load(this.MainAssemblyName);
            //}

            DatabaseHandler.DefaultDatabaseHandlerObject = new MySqlClientSideDatabaseHandler(AppSettings.DefaultConnectionParameters);

            try
            {
                //clearOldRunnablesFromSession();
                //if (!this.IsPostBack)
                //{
                if (!String.IsNullOrWhiteSpace(Request["__report_class"]))
                {
                    Session["__report_class"] = Request["__report_class"] ?? Session["__report_class"];
                    Session["__user_name"] = Request["__user_name"] ?? Session["__user_name"];
                    Session["__company"] = Request["__company"] ?? Session["__company"];
                    //Session["__main_assembly"] = Request["__main_assembly"] ?? Session["__main_assembly"];
                    //string reportclass = Request["__report_class"];
                    //string username = Request["__user_name"];
                    //string company = Request["__company"];



                    Type runnableType = Util.getAllTypes().FirstOrDefault(x => x.FullName.ToUpper() == this.ReportClass.ToUpper());

                    var parameternames = Request.Form.AllKeys;

                    Runnable instance = (Runnable)Activator.CreateInstance(runnableType);

                    //string interactivestring = Request["__interactive"];
                    //bool interactive = Convert.ToBoolean(interactivestring);
                    //instance.Interactive = interactive;

                    //if (interactive)
                    {
                        if (parameternames.Any(x => x.StartsWith("runnable_parameter_")))
                        {
                            instance.createParameters();

                            foreach (var parametername in parameternames)
                            {
                                
                                if (parametername.StartsWith("runnable_parameter_") && !parametername.EndsWith("_enum_type"))
                                {
                                    string actualparametername = parametername.Substring("runnable_parameter_".Length);
                                    //instance.Parameters
                                    string enumtype = Request.Form[parametername + "_enum_type"];
                                    Type enumType = null;
                                    if (!String.IsNullOrWhiteSpace(enumtype))
                                    {
                                        enumType = Util.getTypeFromString(enumtype);
                                    }
                                    if(!instance.Parameters.ContainsKey(actualparametername))
                                    {
                                        throw new Exception(string.Format("Parameter '{0}' not created in runnable", actualparametername));
                                    }
                                    var parameter = instance.Parameters[actualparametername];// new RunnableParameterInfo(new TempEDT(enumType, ""));
                                    parameter.Value = Request.Form[parametername];
                                    instance.Parameters[parametername.Replace("runnable_parameter_", "")] = parameter;
                                }
                            }
                        }

                        string joinparameterbase64string = Request["__join_parameters"];

                        if (!String.IsNullOrWhiteSpace(joinparameterbase64string))
                        {
                            byte[] joinparameterbytes = Convert.FromBase64String(joinparameterbase64string);
                            //MemoryStream s = new MemoryStream();
                            //s.Position = 0;

                            instance.JoinParameters = (JoinParameter[])Util.deserialize(joinparameterbytes);
                        }

                        string argsbase64string = Request["__args"];

                        if(!String.IsNullOrWhiteSpace(argsbase64string))
                        {
                            byte[] argsbytes = Convert.FromBase64String(argsbase64string);

                            instance.Args = (RunnableArgs)Util.deserialize(argsbytes);
                        }

                        string interactivestring = Request["__interactive"];
                        if(!string.IsNullOrWhiteSpace(interactivestring))
                        {
                            instance.Interactive = bool.Parse(interactivestring);
                        }
                    }

                    Session[this.RunnableId] = instance;
                }

                AppFramework.AppClasses.Session.User = new Users() { Username = (String)Session["__user_name"] };

                Infolog.registerInfologAddedEventListener(Infolog_InfologAddedEvent);

                AppFramework.AppClasses.Session.Company = (String)Session["__company"];
                AppFramework.AppClasses.Session.User.loadUserPermissions();
                Runnable.loadAllRunnablePermissions();
                MicrosoftReportViewerReportRun runnable = (MicrosoftReportViewerReportRun)Session[this.RunnableId];
                String title = "Report";
                try
                {
                    title = runnable.SafeTitle;
                }
                catch (Exception ex)
                {
                    Infolog.writeToEventLog(ex, InfoType.Warning);
                }

                this.Title = title;




                //AppFramework.Mvc.Util.connect(Session["username"] as String, Session["password"] as String);

                runnable.LocalReport = ReportViewer1.LocalReport;
                ReportViewer1.LocalReport.EnableExternalImages = true;

                ReportViewer1.LocalReport.EnableExternalImages = true;
                ReportViewer1.Drillthrough += runnable.ReportViewer_Drillthrough;

                if (!this.IsPostBack)
                {

                    //ReportViewer1.

                    //runnable.WebReportViewer = ReportViewer1;
                    //ReportViewer1.LocalReport.SubreportProcessing += LocalReport_SubreportProcessing;

                    //runnable.PrintDestination = PrintDestination.File;
                    //runnable.Interactive = false;
                    //runnable.PrintDestination = PrintDestination.Screen;
                    ////runnable.JoinParameters
                    ////runnable.FileFormat = PrintFileFormat.PDF;

                    ////if (!runnable.HasSubReport)
                    ////{
                    ////    //this is because, the subreport method will only be called when the reportviewer sees that it needs the subreport...and this only happens during rendering
                    ////    runnable.DoNotRender = true;
                    ////}
                    //runnable.run();
                    //runnable.initReport();
                    //runnable
                    //runnable.initReport();
                    //var reportbytes = runnable.run();
                    //runnable.run();
                    //try
                    //{
                    //    runnable.postInitDatasources();
                    //}
                    //catch (Exception ex) { Infolog.writeToEventLog(ex, InfoType.Error); }

                    var WebReportViewer = ReportViewer1;
                    if (runnable.AvailableFileFormats.Distinct().Count() != Enum.GetValues(typeof(PrintFileFormat)).Length)
                    {
                        ReportViewer1.ShowExportControls = false;
                    }

                    //ReportViewer1.local
                    //WebReportViewer.ShowExportControls.

                    if (runnable.ReportType == MicrosoftReportViewerReportType.File)
                    {
                        WebReportViewer.LocalReport.ReportPath = runnable.CompleteReportPath;
                    }
                    else
                    {
                        //if it is embeded
                        Assembly reportAssembly = runnable.GetType().Assembly;

                        WebReportViewer.LocalReport.LoadReportDefinition(reportAssembly.GetManifestResourceStream(runnable.reportPath()));

                        String[] resources = reportAssembly.GetManifestResourceNames();
                        foreach (String resource in resources)
                        {
                            if (resource.EndsWith(".rdlc"))
                            {
                                //String subReportPrefix = reportPath().Replace(".rdlc", "");
                                if (String.CompareOrdinal(resource, runnable.reportPath()) != 0)//load all other embeded reports as subreports because there's no fullproof and simple way to tell which ones are the subreports
                                {
                                    try
                                    {
                                        String reportName;// = resource;
                                        String[] splitResourceString = resource.Split('.');
                                        reportName = splitResourceString[splitResourceString.Length - 2];
                                        WebReportViewer.LocalReport.LoadSubreportDefinition(reportName, reportAssembly.GetManifestResourceStream(resource));
                                        if (WebReportViewer != null)
                                        {
                                            WebReportViewer.LocalReport.LoadSubreportDefinition(reportName, reportAssembly.GetManifestResourceStream(resource));
                                        }
                                    }
                                    catch (Exception ex)
                                    {
                                        Infolog.writeToEventLog(ex, InfoType.Error);
                                    }
                                }
                            }
                        }
                    }




                    //runnable.ReportViewer = WebReportViewer;
                    bool originallyinteractive = runnable.Interactive;
                    runnable.Interactive = false;
                    runnable.PrintDestination = PrintDestination.InteractiveDisplay;
                    //runnable.JoinParameters
                    //runnable.FileFormat = PrintFileFormat.PDF;

                    //if (!runnable.HasSubReport)
                    //{
                    //    //this is because, the subreport method will only be called when the reportviewer sees that it needs the subreport...and this only happens during rendering
                    //    runnable.DoNotRender = true;
                    //}
                    if (originallyinteractive)
                    {
                        runnable.getParameterValues();
                    }
                    runnable.run();

                    if(!runnable.InteractiveCanRender)
                    {
                        ReportViewer1.Visible = false;
                    }
                    //var doRunMethod = runnable.GetType().GetMethod("doRun", BindingFlags.NonPublic | BindingFlags.Instance);
                    //doRunMethod.Invoke(runnable, null);
                    //runnable.initReport();
                    //runnable.postInitReport();
                    //runnable.initDataSources();
                    //runnable.postInitDatasources();


                    //foreach (var ds in runnable.LocalReport.DataSources)
                    //{
                    //    WebReportViewer.LocalReport.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource(ds.Name, ds.Value));
                    //}

                    //runnable.LocalReport.DataSources.Clear();//to free memory

                    //foreach (var parameter in runnable.LocalReport.GetParameters())
                    //{
                    //    WebReportViewer.LocalReport.SetParameters(new Microsoft.Reporting.WebForms.ReportParameter(parameter.Name, parameter.Values.ToArray()));
                    //}

                    //var webDataSourceNames = WebReportViewer.LocalReport.GetDataSourceNames();
                    //if (webDataSourceNames.Contains("ReportParameters"))
                    //{
                    //    WebReportViewer.LocalReport.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource("ReportParameters", reportParameterLines));
                    //}
                }
                //else
                //{
                //    ReportViewer1.Drillthrough += ReportViewer1_Drillthrough;
                //    ReportViewer1.LocalReport.SubreportProcessing += LocalReport_SubreportProcessing;
                //}
            }
            catch (Exception ex)
            {
                Infolog.add(ex);
                DatabaseHandler.DefaultDatabaseHandlerObject.rollBackTransaction();
                ReportViewer1.Visible = false;
                //Session["ReportError"] = ex.Message;
                //Response.Redirect("ReportError.aspx");
                //Response.Redirect("~/Infolog");
            }
        }

        //void ReportViewer1_Drillthrough(object sender, Microsoft.Reporting.WebForms.DrillthroughEventArgs e)
        //{
        //    try
        //    {
        //        //((Microsoft.Reporting.WebForms.LocalReport)e.Report).EnableExternalImages = true;
        //        var drillthroughwinlocalreport = new Microsoft.Reporting.WinForms.LocalReport();
        //        MicrosoftReportViewerReportRun runnable = getReportRunnable();
        //        if (runnable.ReportType == MicrosoftReportViewerReportType.File)
        //        {
        //            string originalreportpath = runnable.reportPath();
        //            string directory = System.IO.Path.GetDirectoryName(originalreportpath);
        //            string subreportcompletepath = MicrosoftReportViewerReportRun.getCompleteReportPath(directory + "/" + e.ReportPath + ".rdlc");
        //            var reportfilestream = System.IO.File.Open(subreportcompletepath, System.IO.FileMode.Open, System.IO.FileAccess.Read);
        //            drillthroughwinlocalreport.LoadReportDefinition(reportfilestream);
        //            reportfilestream.Close();
        //        }
        //        else
        //        {
        //            Assembly reportAssembly = runnable.GetType().Assembly;
        //            drillthroughwinlocalreport.LoadReportDefinition(reportAssembly.GetManifestResourceStream(e.ReportPath));
        //        }

        //        var drillthroughargs = new Microsoft.Reporting.WinForms.DrillthroughEventArgs(e.ReportPath, drillthroughwinlocalreport);
        //        ((Microsoft.Reporting.WinForms.LocalReport)drillthroughargs.Report).EnableExternalImages = ReportViewer1.LocalReport.EnableExternalImages;

        //        foreach (var webdrillthroughparameter in e.Report.GetParameters())
        //        {
        //            drillthroughargs.Report.SetParameters(new Microsoft.Reporting.WinForms.ReportParameter(webdrillthroughparameter.Name, webdrillthroughparameter.Values.ToArray()));
        //        }

        //        var runnableMethods = runnable.GetType().GetMethods(BindingFlags.Static | BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.DeclaredOnly);

        //        foreach (var runnableMethod in runnableMethods)
        //        {
        //            var methodParameters = runnableMethod.GetParameters();
        //            if (methodParameters.Length == 2 &&
        //                methodParameters[0].ParameterType == typeof(object) &&
        //                methodParameters[1].ParameterType == typeof(Microsoft.Reporting.WinForms.DrillthroughEventArgs))
        //            {
        //                runnableMethod.Invoke(runnableMethod.IsStatic ? null : runnable, new object[] { sender, drillthroughargs });

        //                foreach (var ds in drillthroughwinlocalreport.DataSources)
        //                {
        //                    ((Microsoft.Reporting.WebForms.LocalReport)e.Report).DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource(ds.Name, ds.Value));
        //                }

        //                drillthroughwinlocalreport.DataSources.Clear();//to free up memory

        //                foreach (var parameter in drillthroughwinlocalreport.GetParameters())
        //                {
        //                    ((Microsoft.Reporting.WebForms.LocalReport)e.Report).SetParameters(new Microsoft.Reporting.WebForms.ReportParameter(parameter.Name, parameter.Values.ToArray()));
        //                }

        //                break;
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Infolog.writeToEventLog(ex, InfoType.Error);
        //        throw new Exception(ex.Message, ex);
        //    }

        //    //throw new NotImplementedException();
        //    //new Microsoft.Reporting.WebForms.DrillthroughEventArgs();
        //    //new Microsoft.Reporting.WinForms.DrillthroughEventArgs(
        //}

        //private MicrosoftReportViewerReportRun getReportRunnable()
        //{
        //    string runnablesessionkey = this.Request["runnablesessionkey"];
        //    MicrosoftReportViewerReportRun runnable = (MicrosoftReportViewerReportRun)Session[runnablesessionkey];
        //    return runnable;
        //}

        //private void clearOldRunnablesFromSession()
        //{
        //    for (int i = 0; i < Session.Keys.Count; i++)
        //    {
        //        string key = Session.Keys[i];
        //        if (key.StartsWith("runnable_") && key != this.Request["runnablesessionkey"])
        //        {
        //            Session[key] = null;
        //        }
        //    }
        //}

        //Dictionary<String, int> subreportcount = new Dictionary<string, int>();
        //void LocalReport_SubreportProcessing(object sender, Microsoft.Reporting.WebForms.SubreportProcessingEventArgs e)
        //{
        //    if (!subreportcount.ContainsKey(e.ReportPath))
        //    {
        //        subreportcount[e.ReportPath] = 0;
        //    }

        //    try
        //    {
        //        //throw new NotImplementedException();
        //        MicrosoftReportViewerReportRun runnable = getReportRunnable();
        //        var subreportprocessingeventargs = runnable.SubreportProcessingEventArgs.Where(x => e.ReportPath == x.ReportPath).ToList();



        //        if (subreportprocessingeventargs.Count > subreportcount[e.ReportPath])
        //        {
        //            foreach (var formdatasource in subreportprocessingeventargs[subreportcount[e.ReportPath]].DataSources)
        //            {
        //                e.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource(formdatasource.Name, formdatasource.Value));
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Infolog.writeToEventLog(ex, InfoType.Error);
        //        throw new Exception(ex.Message, ex);
        //    }
        //    finally
        //    {
        //        subreportcount[e.ReportPath]++;
        //    }
        //}

        protected void ReportViewer1_ReportRefresh(object sender, System.ComponentModel.CancelEventArgs e)
        {
            //AppFramework.Mvc.Util.connect(Session["username"] as String, Session["password"] as String);
        }

        protected void ReportViewer1_Unload(object sender, EventArgs e)
        {
            //string runnablesessionkey = this.Request["runnablesessionkey"];
            //Session[runnablesessionkey] = null;
        }
    }
}