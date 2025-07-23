
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReportViewer.aspx.cs" Inherits="AppFramework.Mvc.ReportViewer" %>
<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=14.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    
    <meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
    <title></title>
    <script type="text/javascript" src="Scripts/jquery-1.10.2.js?"></script>
    <script>
        var infologs = [];
        <% foreach (dynamic infolog in infologs)
        {
            %>
        self.top.infolog('<%= infolog.message %>', '<%= infolog.type %>');
            <%
        }
        %>
        
    </script>
    <style>
        html{
            height:95%;
        }
        /*html, body {
            height: 100%;
        }*/
        /*form, #reportviewerdiv {
            height:100%;
        }*/
    </style>
</head>
<body style="display:flex; flex-flow:column; height:100%; background:#fff">
    <form id="form1" runat="server" style="display:flex; flex-flow:column; flex: 1 1 auto">
        <div id="reportviewerdiv" style="flex: 1 1 auto">
            <asp:ScriptManager ID="ScriptManager1" runat="server" AsyncPostBackTimeOut="1200"></asp:ScriptManager>
            <rsweb:ReportViewer ID="ReportViewer1" runat="server" Width="100%" Height="100%" ZoomMode="Percent" ZoomPercent="100" OnReportRefresh="ReportViewer1_ReportRefresh" PageCountMode="Actual" OnUnload="ReportViewer1_Unload"></rsweb:ReportViewer>
        </div>
    </form>
</body>
    <script>
        $(document).ready(function () {
            setDivSizes();
            $(window).resize(function () {
                setDivSizes();
            });
        });

        //var originalContentLeftWidth = $("#contentLeft").width();
        //var originalContentRightWidth = $("#contentRight").width();

        function setDivSizes() {
            //$(".widgetlong").height(window.innerHeight - $(".widgetlong").offset().top - 70);
            //$("#form1").height($("body").innerHeight());// - $(".widgetlong").offset().top - $(".commonHead2").height() - 70 - 30);
            //$("#reportviewerdiv").height($("#form1").innerHeight());
            //$("#contentLeft").width(150);
            //$("#contentRight").width($("#content").width() - $("#contentLeft").width() - 100);
            //$("#form1").height("100%");
            //$("#form1").height("100%");
        }
    </script>
</html>
