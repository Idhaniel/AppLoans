var preMessageHandlers = {};//the format of these will be preMessageHandlers[messagetype][]
var postMessageHandlers = {};
var __websocket;
var eventno = 1;
var methodcallno = 1;
var eventdonefunctions = [];
var methodcalldonefunctions = [];
var pauseindex = 0;
var pauseoverlayid = "";
var viewno = 1;
var startingzindex = 0;
var enumdata = {};
var opened = false;
var loaded = false;
var anonymouselementid = 0;
var helpurl = "";
var elementStyles = {};
var infologmessagesdiv;
var infologdiv;
var infologdivid;
var elementCreatedHooks = {};
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var formTypeName = "";
var formCaption = "";
var rowselectorwidth = "20px";
var leftdockwidth = "50%";
var rightdockwidth = "50%";
var leftdockleft = 0;
var rightdockright = 0;
var dockenabled = false;
var randomjsfilequerystring = Math.random() * 20;
var mandatoryfieldcolour = '#ff0000';
var grideditsavedeletetdwidth = '90px';

function mobilecheck() {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}
//var pendingevents = [];
function connect() {
    let port;
    if (typeof porttouse !== 'undefined' && porttouse) {
        port = porttouse;
    }
    if (!port) {
        port = queryParameter("port");
    }

    if (!port) {
        alert("Port not set in js client");
        self.top.location = "/";
    }
    __websocket = new WebSocket("ws://" + location.hostname + ":" + port + "/");
    __websocket.onopen = function () {
        __websocket.send(JSON.stringify(antiforgerytoken));

        setInterval(function () {
            if (__websocket.readyState === __websocket.OPEN) {
                __j.ajax("/Home/Empty");
            }
        }, 60000);
    }
    __websocket.onmessage = onmessage;
    __websocket.onerror = function () {
        alert("Connection error. Please close the application and restart it");
        self.top.location = "/";
    }
    __websocket.onclose = function () {
        alert("Connection to server has been lost");
        self.top.location = "/";
    }

    if (!antiforgerytoken) {
        antiforgerytoken = "";
    }



}

function queryParameter(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = top.location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

function mainWindow() {
    return self.top;
}

function websocket() {
    var mainwindow = mainWindow();
    //if (mainwindow == null)
    //{
    //    alert("mainwindow is null");
    //    //console.log("mainwindow is null");
    //}
    return mainwindow.__websocket;
}

function sendMessage(message) {
    //console.log("Sent: " + message);
    try {
        websocket().send(message);
    }
    catch (error) {
        debugger;
        console.log(error);
        alert(error);
        self.top.location = "/";
    }
}

function prepareIframes(done) {
    var iframes = __j("iframe");
    var prepareIframeNo = function (i) {
        var iframe = iframes.get(i);
        if (iframe) {
            prepareIframe(iframe, function () {
                i++;
                prepareIframeNo(i);
            });
        }
        else {
            if (done) {
                done();
            }
        }
    }
    prepareIframeNo(0);
    //if()
    //for (var i = 0; i < iframes.length; i++)
    //{
    //    prepareIframe(iframes.get(i));
    //}
}



function prepareIframe(iframe, done) {
    if (iframe.contentDocument) {
        iframe.contentDocument.domain = document.domain;
        dynamicallyLoadScript('/Scripts/AppFrameworkJSClient.js?rand=' + self.top.randomjsfilequerystring, iframe, function () {
            var checkIfPrepared = function () {
                if (iframe.contentWindow.appframeworkprepared) {
                    //console.log("Prepared iframe " + iframe.id);
                    //clearInterval(appframeworkpreparedinterval);
                    if (done) {
                        done();
                    }
                }
                else {
                    setTimeout(checkIfPrepared, 500);
                }
            };
            checkIfPrepared();
        });
    }
}

//function close()
//{
//    callFormMethod("close");
//}

function closeView() {
    var frame = self.frameElement;// document.getElementById(iframeid),
    frameDoc = frame.contentDocument || frame.contentWindow.document;
    frameDoc.removeChild(frameDoc.documentElement);
    frame.opened = false;
    frame.showing = false;
    //__j(frame).hide();
    var container = getIframeContainer(self.frameElement);
    __j(container).hide();


    //__j(self.parent.getElementById(iframe.id)).hide();
}

function showView() {
    var container = getIframeContainer(self.frameElement);
    __j(container).show();
    __j(container).css("opacity", "1");
    if (container.tagName == 'div' || container.tagName == 'DIV') {
        __j(container).css('display', 'flex');
        __j(container).css('flex-flow', 'column');
    }
    else {
        __j(container).show();
    }
    self.frameElement.showing = true;
}

function hideView() {
    var container = getIframeContainer(self.frameElement);
    __j(container).hide();
    self.frameElement.showing = false;
}

function registerCreatedHook(tagName, callback, ignoreallreadycreated) {
    if (Array.isArray(tagName)) {
        for (let i = 0; i < tagName.length; i++) {
            registerCreatedHook(tagName[i], callback);
        }
    }
    else {
        tagName = tagName.toLowerCase();
        if (elementCreatedHooks[tagName] === undefined) {
            elementCreatedHooks[tagName] = [];
        }
        elementCreatedHooks[tagName].push(callback);
    }

    if (!ignoreallreadycreated) {
        //to handle all the ones created before the script was added to the html
        __j().ready(function () {
            let elements = document.getElementsByTagName(tagName);
            for (let i = 0; i < elements.length; i++) {
                let element = elements[i];
                callCreatedHook(element);
            }
        });
    }
}

function deRegisterCreatedHook(tagName, callback) {
    tagName = tagName.toLowerCase();
    if (elementCreatedHooks[tagName]) {
        //let hooks = [];
        let hooks = elementCreatedHooks[tagName];
        let callbackindex = hooks.indexOf(callback);
        if (callbackindex != -1) {
            hooks.splice(callbackindex, 1);
        }
    }
}

function callCreatedHook(element) {
    let tagname = element.tagName.toLowerCase();
    if (elementCreatedHooks[tagname]) {
        for (let i = 0; i < elementCreatedHooks[tagname].length; i++) {
            let fn = elementCreatedHooks[tagname][i];
            fn.apply(null, [element]);
        }
    }
}

function clearAllViewCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;max-age=0;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
}

function setViewCookie(cname, cvalue) {
    //var d = new Date();
    //d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "max-age=" + 31536000;
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getViewCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//registerHook(hookname, callback) {
//    if (this.hooks[hookname] === undefined) {
//        this.hooks[hookname] = [];
//    }
//    this.hooks[hookname].push(callback);
//}

//deRegisterHook(hookname, callback) {
//    if (this.hooks[hookname]) {
//        //let hooks = [];
//        let hooks = this.hooks[hookname];
//        let callbackindex = hooks.indexOf(callback);
//        if (callbackindex != -1) {
//            hooks.splice(callbackindex, 1);
//        }
//    }
//}

//callHook(hookname, arg) {
//    if (this.hooks[hookname]) {
//        for (let i = 0; i < this.hooks[hookname].length; i++) {
//            let fn = this.hooks[hookname][i];
//            fn.apply(this, [arg]);
//        }
//    }
//}

//function ClientServerMessage()
//{
//    var containeriframeid;
//    var viewid;
//    var messagetype;
//    var message;
//}
//function showView(iframeid, html, innercontaineriframeid)
function openView(html, viewid, dialog, containerstyle, caption, formtypename, done) {
    //debugger;
    formTypeName = formtypename;
    formCaption = caption;
    var iframe = self.frameElement;
    var container = getIframeContainer(iframe);
    if (containerstyle) {

        __j(container).attr("style", containerstyle);
    }
    let doc = iframe.contentWindow.document;
    doc.open();
    //debugger;
    doc.write(html);
    doc.close();

    var htmlnode = __j(iframe).contents().find('html');
    if (iframe.opened) {
        throw "The view in IFrame '" + iframe.id + "' has not yet been closed, so the iframe cannot be used to display another view";
    }
    //htmlnode.html(html);
    var bodynode = htmlnode.find('body');

    if (bodynode && !bodynode.attr("id")) {
        bodynode.attr("id", "body");//not using this anymore
    }
    iframe.contentDocument.getElementsByTagName("html")[0].setAttribute("id", "html");

    var contextmenulist = document.createElement('ul');
    __j(contextmenulist).attr("id", "formcontextmenu");
    __j(contextmenulist).attr("class", "formcontextmenu");
    __j(contextmenulist).attr("style", "display: none; z- index: 10; position: absolute; overflow: hidden; white-space: nowrap;");

    let htmlelement = iframe.contentDocument.getElementsByTagName("html")[0];
    //htmlelement.appendChild(contextmenulist);
    document.body.appendChild(contextmenulist);

    prepareLookup(doc);

    //debugger;
    __j(iframe.cancelclosebutton).on("click", function (event) {
        //var iframeid = 
        //innercontaineriframe.contentWindow.callFormMethod("defaultCancelCloseButtonClick");
        let newevent = doc.createEvent("CustomEvent");
        newevent.initCustomEvent("cancelclose", false, false, null);
        htmlelement.dispatchEvent(newevent);
    });

    __j(iframe.closebutton).on("click", function (event) {
        //var iframeid = 
        //innercontaineriframe.contentWindow.callFormMethod("defaultCloseButtonClick");
        let newevent = doc.createEvent("CustomEvent");
        newevent.initCustomEvent("close", false, false, null);
        htmlelement.dispatchEvent(newevent);
    });

    __j(document).bind("mousedown", function (e) {

        // If the clicked element is not the menu
        if (!__j(e.target).parents(".formcontextmenu").length > 0) {

            // Hide it
            __j(".formcontextmenu").hide(100);
        }
    });

    //createIframe(innercontaineriframeid, done);
    //__j(container).hide();
    __j(container).css("opacity", "0");
    iframe.opened = true;
    iframe.showing = false;
    iframe.viewid = viewid;
    iframe.dialog = dialog;
    if (container !== iframe) {
        __j(container).css('position', 'absolute');
    }
    //debugger;
    __j(container).css("z-index", mainWindow().viewno + self.top.startingzindex);
    setCaption(iframe.id, caption);
    //self.top.getElementById
    mainWindow().viewno++;
    if (dialog) {//no longer using dialogs
        var overlay = mainWindow().document.getElementById(pauseoverlayid);
        __j(overlay).css("z-index", mainWindow().viewno + self.top.startingzindex);
        mainWindow().viewno++;
        __j(container).css("z-index", mainWindow().viewno + self.top.startingzindex);
        __j(iframe).css("z-index", mainWindow().viewno + self.top.startingzindex);
        __j(container).attr("dialog", "dialog");
        __j(iframe).attr("dialog", "dialog");
        //__j(iframe).attr("z-index", iframe.style.zindex);

    }
    //debugger;
    if (iframe.contentWindow.appframeworkprepared) {
        done();
    }
    else {//this may be the case on firefox where replacing the html unloads scripts...in which case, the iframe will need to be prepared again :(
        prepareIframe(iframe, done);
    }
}

function setViewProperties(propertiesobject) {
    //debugger;
    if (propertiesobject.enabledefaultclosebutton) {
        enableDefaultCloseButton();
    }
    else {
        disableDefaultCloseButton();
    }

    if (propertiesobject.enabledefaultcancelclosebutton) {
        enableDefaultCancelCloseButton();
    }
    else {
        disableDefaultCancelCloseButton();
    }

    if (propertiesobject.allowswitch) {
        enableSwitchButton();
    }
    else {
        disableSwitchButton();
    }

    if (propertiesobject.showtitle) {
        showTitle();
    }
    else {
        hideTitle();
    }

    if (propertiesobject.allowdock) {
        enableDockButtons();
    }
    else {
        disableDockButtons();
    }

    if (propertiesobject.styles) {
        let styles = propertiesobject.styles;
        for (let s = 0; s < styles.length; s++) {
            let link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('type', 'text/css');
            link.setAttribute('href', styles[s]);

            let headelement = document.head;
            if (!headelement) {
                headelement = document.documentElement;
            }

            headelement.appendChild(link);
        }
    }

    if (propertiesobject.scripts) {
        let scripts = propertiesobject.scripts;
        let loadscripts = function () {
            if (scripts.length > 0) {
                let temp = scripts.splice(0, 1);
                let script = temp[0];
                dynamicallyLoadScript(script, null, function () {
                    loadscripts();
                });
            }
            else {
                sendSuccess();
                //done();
            }
        };
        loadscripts();
    }
    else {
        sendSuccess();
    }
}

function setCaption(iframeid, caption) {
    formCaption = caption;
    self.top.__j("#caption_" + iframeid).text(caption);
}


function setHelpURL(url) {
    helpurl = url;
}

function dockLeft(containerdiv) {

    let innercontainerdiv = containerdiv;
    if (!innercontainerdiv.originalwidth) {
        innercontainerdiv.originalwidth = innercontainerdiv.style.width;
    }

    if (!innercontainerdiv.originalleft) {
        innercontainerdiv.originalleft = innercontainerdiv.style.left;
    }

    if (!innercontainerdiv.originalright) {
        innercontainerdiv.originalright = innercontainerdiv.style.right;
    }

    __j(innercontainerdiv).css("left", leftdockleft);
    __j(innercontainerdiv).css('right', '');
    __j(innercontainerdiv).width(leftdockwidth);
    __j(innercontainerdiv).addClass('dockedleftform');
    __j(innercontainerdiv).removeClass('dockedrightform');

}

function dockRight(containerdiv) {

    let innercontainerdiv = containerdiv;
    if (!innercontainerdiv.originalwidth) {
        innercontainerdiv.originalwidth = innercontainerdiv.style.width;
    }

    if (!innercontainerdiv.originalleft) {
        innercontainerdiv.originalleft = innercontainerdiv.style.left;
    }

    if (!innercontainerdiv.originalright) {
        innercontainerdiv.originalright = innercontainerdiv.style.right;
    }

    //__j(innercontainerdiv).css("left", 0);
    __j(innercontainerdiv).width(rightdockwidth);
    __j(innercontainerdiv).css('left', '');
    __j(innercontainerdiv).css('right', rightdockright);
    __j(innercontainerdiv).addClass('dockedrightform');
    __j(innercontainerdiv).removeClass('dockedleftform');

}

function dockCentre(containerdiv) {

    let innercontainerdiv = containerdiv;
    if (innercontainerdiv.originalwidth) {
        innercontainerdiv.style.width = innercontainerdiv.originalwidth;
    }

    if (innercontainerdiv.originalleft) {
        innercontainerdiv.style.left = innercontainerdiv.originalleft;
    }

    if (innercontainerdiv.originalright) {
        innercontainerdiv.style.right = innercontainerdiv.originalright;
    }

    __j(innercontainerdiv).css('left', '');
    __j(innercontainerdiv).css('right', '');
    __j(innercontainerdiv).removeClass('dockedleftform');
    __j(innercontainerdiv).removeClass('dockedrightform');

}
//function openLink(url)
//{
//    window.open(url, "_blank");
//    //let newwindow = new Window();
//    //newwindow.open(url);
//}

function createIframe(iframeid, applicationcontainer, style, autogenerated, showinfolog, done) {
    var innercontainerdiv = document.createElement('div');
    __j(innercontainerdiv).attr("id", "container_" + iframeid);
    __j(innercontainerdiv).attr("iframeid", iframeid);
    __j(innercontainerdiv).attr("class", "iframecontainerdiv");

    if (style) {
        __j(innercontainerdiv).attr("style", style);
    }

    __j(innercontainerdiv).css('display', 'flex');
    __j(innercontainerdiv).css('flex-flow', 'column');

    var innercontaineriframe = document.createElement('iframe');
    let containerdiv = document.createElement('div');

    var captiondiv = document.createElement('div');
    __j(captiondiv).attr("class", "captiondiv");
    __j(captiondiv).attr("id", "caption_" + iframeid);
    __j(captiondiv).attr("iframeid", iframeid);

    var helpbutton = document.createElement('button');
    helpbutton.innerText = '?';
    helpbutton.setAttribute('class', 'helpbutton');
    helpbutton.setAttribute('iframeid', iframeid);
    helpbutton.setAttribute('id', 'help_' + iframeid);

    var forminfobutton = document.createElement('button');
    forminfobutton.innerText = 'i';
    forminfobutton.setAttribute('class', 'forminfobutton');
    forminfobutton.setAttribute('iframeid', iframeid);
    forminfobutton.setAttribute('id', 'forminfo_' + iframeid);

    var closebutton = document.createElement('button');
    closebutton.innerText = "Save & Close";
    __j(closebutton).attr("class", "closebutton");
    __j(closebutton).attr("iframeid", iframeid);
    __j(closebutton).attr("id", "close_" + iframeid);
    __j(closebutton).attr("title", "Alt + C");
    var switchbutton = document.createElement('button');
    switchbutton.innerText = "Switch";
    __j(switchbutton).attr("class", "switchbutton");
    __j(switchbutton).attr("iframeid", iframeid);
    __j(switchbutton).attr("id", "switch_" + iframeid);
    var cancelclosebutton = document.createElement('button');
    cancelclosebutton.innerText = "Cancel";
    __j(cancelclosebutton).attr("class", "cancelclosebutton");
    __j(cancelclosebutton).attr("iframeid", iframeid);
    __j(cancelclosebutton).attr("id", "close_" + iframeid);
    __j(cancelclosebutton).attr("title", "Alt + Q");

    var dockleftbutton = document.createElement('button');
    dockleftbutton.innerText = "Dock Left";
    __j(dockleftbutton).attr("class", "dockleftbutton dockbutton");
    __j(dockleftbutton).attr("iframeid", iframeid);
    __j(dockleftbutton).attr("id", "dockleft_" + iframeid);
    __j(dockleftbutton).attr("title", "Alt + L");
    dockleftbutton.addEventListener("click", function () {
        //store original containerdiv width css
        //store original containerdiv left css
        //store original containerdiv right css
        //add invisible slim div after containerdiv with the expand cursur

        dockLeft(innercontainerdiv);
    });

    var dockrightbutton = document.createElement('button');
    dockrightbutton.innerText = "Dock Right";
    __j(dockrightbutton).attr("class", "dockrightbutton dockbutton");
    __j(dockrightbutton).attr("iframeid", iframeid);
    __j(dockrightbutton).attr("id", "dockleft_" + iframeid);
    __j(dockrightbutton).attr("title", "Alt + R");
    dockrightbutton.addEventListener("click", function () {
        dockRight(innercontainerdiv);
    });

    var dockcentrebutton = document.createElement('button');
    dockcentrebutton.innerText = "Fill";
    __j(dockcentrebutton).attr("class", "dockcentrebutton dockbutton");
    __j(dockcentrebutton).attr("iframeid", iframeid);
    __j(dockcentrebutton).attr("id", "dockcentre_" + iframeid);
    __j(dockcentrebutton).attr("title", "Alt + F");
    dockcentrebutton.addEventListener("click", function () {
        dockCentre(innercontainerdiv);
    });


    innercontaineriframe.showing = false;
    innercontaineriframe.switchbutton = switchbutton;
    innercontaineriframe.closebutton = closebutton;
    innercontaineriframe.cancelclosebutton = cancelclosebutton;
    innercontaineriframe.dockleftbutton = dockleftbutton;
    innercontaineriframe.dockrightbutton = dockrightbutton;
    innercontaineriframe.dockcentrebutton = dockcentrebutton;
    innercontaineriframe.captiondiv = captiondiv;
    innercontaineriframe.autogenerated = autogenerated;
    innercontaineriframe.helpbutton = helpbutton;
    innercontaineriframe.forminfobutton = forminfobutton;

    __j(innercontaineriframe).css("border-width", 0);
    __j(innercontaineriframe).css('flex', '1 1 auto');
    __j(innercontaineriframe).attr("autogenerated", autogenerated);
    var iframediv = document.createElement('div');
    __j(iframediv).attr("class", "iframediv");
    __j(iframediv).attr('iframeid', iframeid);
    __j(iframediv).attr("autogenerated", autogenerated);
    __j(iframediv).css('flex', '1 1 auto');
    __j(iframediv).css('display', 'flex');
    __j(iframediv).css('flex-flow', 'column');

    var controlsdiv = document.createElement('div');
    __j(controlsdiv).attr("class", "controlsdiv");
    __j(controlsdiv).attr("iframeid", iframeid);
    __j(controlsdiv).css('flex', '0 1 auto');

    //if (showinfolog) {

    //}

    var buttonsdiv = document.createElement('div');
    __j(buttonsdiv).attr("class", "formbuttonsdiv");
    __j(buttonsdiv).attr("iframeid", iframeid);
    __j(buttonsdiv).attr("id", "buttons_" + iframeid);


    //controlsdiv.appendChild(popoutbutton);
    controlsdiv.appendChild(captiondiv);
    buttonsdiv.appendChild(forminfobutton);
    buttonsdiv.appendChild(helpbutton);

    if (!mobilecheck()) {
        buttonsdiv.appendChild(dockleftbutton);
        buttonsdiv.appendChild(dockrightbutton);
        buttonsdiv.appendChild(dockcentrebutton);
    }

    buttonsdiv.appendChild(switchbutton);
    buttonsdiv.appendChild(cancelclosebutton);
    buttonsdiv.appendChild(closebutton);
    controlsdiv.appendChild(buttonsdiv);

    //if (showinfolog) {
    //    controlsdiv.appendChild(infologdiv);
    //    __j(infologdiv).hide();
    //}

    $(containerdiv).css("flex", "1 1 auto");
    $(containerdiv).css("display", "flex");
    $(containerdiv).css("flex-direction", "column");
    containerdiv.setAttribute("class", "iframecontainersubdiv");
    containerdiv.setAttribute("iframeid", iframeid);

    innercontainerdiv.appendChild(containerdiv);

    containerdiv.appendChild(controlsdiv);


    iframediv.appendChild(innercontaineriframe);
    containerdiv.appendChild(iframediv);
    __j(innercontaineriframe).css('width', '100%');

    __j(innercontaineriframe).attr("id", iframeid);
    //__j(innercontainerdiv).hide();

    __j(switchbutton).on("click", function (event) {
        innercontaineriframe.contentWindow.callFormMethod("switchView");
    });

    helpbutton.addEventListener("click", function (event) {
        if (innercontaineriframe.contentWindow.helpurl) {
            window.open(innercontaineriframe.contentWindow.helpurl);
        }
        else {
            alert('Help url not set');
        }
    });

    forminfobutton.addEventListener("click", function (event) {
        innercontaineriframe.contentWindow.callFormMethod("openFormInfoForm");
    });

    var parent = self.top.document.getElementById(applicationcontainer);
    parent.appendChild(innercontainerdiv);


    prepareIframe(innercontaineriframe, function () {

        done();
    });//this will load this file into the iframe, which will also callPrepareIframes();
}

function infolog(message, type) {
    let infologmessagesdiv = self.top.infologmessagesdiv;
    //if (infologmessagesdiv) 
    {
        let infodiv = document.createElement('div');
        infodiv.setAttribute('class', 'infodiv ' + type);
        let infospan = document.createElement('span');
        infospan.innerText = message;
        infospan.innerHTML = infospan.innerText.replace('\r\n', '<br />').replace('\n', '<br />');
        infodiv.appendChild(infospan);
        infologmessagesdiv.appendChild(infodiv);

        let infologdiv = self.top.infologdiv;
        __j(infologdiv).show();

        infologmessagesdiv.scrollTop = infologmessagesdiv.scrollHeight;
        //__j(infologdiv).css("z-index", 999998);
    }
}

function clearInfolog() {
    let infologmessagesdiv = self.top.infologmessagesdiv;
    //if (infologmessagesdiv)
    {
        clearChildNodes(infologmessagesdiv);
        let infologdiv = self.top.infologdiv;
        __j(infologdiv).hide();
        //__j(infologdiv).css("z-index", 0);
    }

}

function disableDockButtons() {
    dockenabled = false;
    __j(self.frameElement.dockleftbutton).css("display", "none");
    __j(self.frameElement.dockrightbutton).css("display", "none");
    __j(self.frameElement.dockcentrebutton).css("display", "none");
}

function enableDockButtons() {
    dockenabled = true;
    __j(self.frameElement.dockleftbutton).css("display", "initial");
    __j(self.frameElement.dockrightbutton).css("display", "initial");
    __j(self.frameElement.dockcentrebutton).css("display", "initial");
}

function disableDefaultCloseButton() {
    __j(self.frameElement.closebutton).attr("disabled", "disabled");
}

function disableDefaultCancelCloseButton() {
    __j(self.frameElement.cancelclosebutton).attr("disabled", "disabled");
}

function disableSwitchButton() {
    __j(self.frameElement.switchbutton).attr("disabled", "disabled");
}

function enableDefaultCloseButton() {
    __j(self.frameElement.closebutton).removeAttr("disabled");
}

function enableDefaultCancelCloseButton() {
    __j(self.frameElement.cancelclosebutton).removeAttr("disabled");
}

function enableSwitchButton() {
    __j(self.frameElement.switchbutton).removeAttr("disabled");
}

function hideTitle() {
    __j(self.frameElement.captiondiv).hide();
}

function showTitle() {
    __j(self.frameElement.captiondiv).show();
}

function compare(iframe1, iframe2) {
    var iframe1zindex = iframe1.style.zIndex ? parseInt(iframe1.style.zIndex) : 0;
    var iframe2zindex = iframe2.style.zIndex ? parseInt(iframe2.style.zIndex) : 0;
    if (iframe1zindex < iframe2zindex)
        return -1;
    if (iframe1zindex > iframe2zindex)
        return 1;
    return 0;
}

function moveViewToTop(iframeid) {
    var temp = self.top.document.querySelectorAll("div.iframecontainerdiv");
    var iframes = [];
    for (var i = 0; i < temp.length; i++) {
        iframes.push(temp[i]);
    }
    iframes = iframes.sort(compare);
    //alert(iframes[0].style.zIndex);
    //alert(iframes[iframes.length - 1].style.zIndex);

    var iframe = self.top.document.getElementById(iframeid);
    var indexofiframe = iframes.indexOf(iframe);

    var topiframe = iframes[iframes.length - 1];
    setViewZIndex(iframe, topiframe.style.zIndex);

    for (var i = iframes.length - 1; i > indexofiframe; i--) {
        var newZindex = iframes[i].style.zIndex ? parseInt(iframes[i].style.zIndex) - 1 : 0;
        setViewZIndex(iframes[i], newZindex);
    }

    //var indexofcurrentiframes.indexOf(self.frameElement);

    //alert(iframes.length);
}

function setViewZIndex(iframe, newzindex) {
    __j(iframe).css("z-index", newzindex);
    var viewdiv = self.top.document.getElementById("container_" + iframe.id);
    __j(viewdiv).css("z-index", newzindex);
}

//function switchViewToTop(containeriframeid)
//{
//    //alert(containeriframeid);
//    //var topiframe = 
//}

function getIframeParentWithId(element, parentid) {
    var tempparent = element.parentElement;

    if (!tempparent) {
        return null;
    }

    if (tempparent.id == parentid) {
        return tempparent;
    }
    else {
        return getIframeParentWithId(tempparent, parentid);
    }
}

function getIframeContainer(iframe) {
    var tempparent = getIframeParentWithId(iframe, "container_" + iframe.id);

    var parent = tempparent ? tempparent : iframe;

    return parent;
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

//function getPreMessageHandlers(messagetype)
//{

//}

function preparePreMessageHandlerDictionary(messagetype) {
    //var iframeids = Object.keys(mainWindow().preMessageHandlers);
    //var frameid = self.frameElement.id;
    //if (iframeids.indexOf(frameid) < 0) {
    //    mainWindow().preMessageHandlers[frameid] = {};
    //}
    var messagetypes = Object.keys(preMessageHandlers);
    if (messagetypes.indexOf(messagetype) < 0) {
        preMessageHandlers[messagetype] = [];
    }
}

function preparePostMessageHandlerDictionary(messagetype) {
    //var iframeids = Object.keys(mainWindow().postMessageHandlers);
    //var frameid = self.frameElement.id;
    //if (iframeids.indexOf(frameid) < 0) {
    //    mainWindow().postMessageHandlers[frameid] = {};
    //}
    var messagetypes = Object.keys(postMessageHandlers);
    if (messagetypes.indexOf(messagetype) < 0) {
        postMessageHandlers[messagetype] = [];
    }
}

function registerPreMessageHandler(messagetype, handler) {
    preparePreMessageHandlerDictionary();
    deRegisterPreMessageHandler(messagetype, handler);//to make sure no duplicates
    preMessageHandlers[messagetype].push(handler);
}

function deRegisterPreMessageHandler(messagetype, handler) {
    preparePreMessageHandlerDictionary();
    var index = preMessageHandlers[messagetype].indexOf(handler)
    if (index !== -1) {
        preMessageHandlers[messagetype].splice(index, 1);
    }
}

function registerPostMessageHandler(messagetype, handler) {
    preparePostMessageHandlerDictionary();
    deRegisterPostMessageHandler(messagetype, handler);//to make sure no duplicates
    postMessageHandlers[messagetype].push(handler);
}

function deRegisterPostMessageHandler(messagetype, handler) {
    preparePostMessageHandlerDictionary();
    var index = postMessageHandlers[messagetype].indexOf(handler)
    if (index !== -1) {
        postMessageHandlers[messagetype].splice(index, 1);
    }
}



function focusOnTopMost() {

    let compare = function (iframe1, iframe2) {
        var iframe1zindex = iframe1.style.zIndex ? parseInt(iframe1.style.zIndex) : 0;
        var iframe2zindex = iframe2.style.zIndex ? parseInt(iframe2.style.zIndex) : 0;
        if (iframe1zindex < iframe2zindex)
            return -1;
        if (iframe1zindex > iframe2zindex)
            return 1;
        return 0;
    }

    var temp = self.top.document.querySelectorAll("div.iframecontainerdiv");
    var iframes = [];
    for (var i = 0; i < temp.length; i++) {
        var iframe = self.top.document.getElementById(__j(temp[i]).attr("iframeid"));
        if (iframe.showing && iframe.opened) {
            iframes.push(iframe);
        }
    }

    if (iframes.length > 0) {
        iframes = iframes.sort(compare);

        let topiframe = iframes[iframes.length - 1];

        topiframe.contentWindow.focus();
    }
}

function setProgress(progress, progresstext) {
    if (self != mainWindow()) {
        mainWindow().setProgress(progress);
    }
    else {
        let overlay = document.getElementById(pauseoverlayid);
        if (overlay) {
            overlay.setAttribute("progress", progress + "%");
            if (progresstext) {
                overlay.setAttribute("progresstext", progresstext);
            }
            else {
                overlay.setAttribute("progresstext", "");
            }
        }
    }
}

function prepareOverlay() {
    if (!pauseoverlayid) {
        var div = document.createElement('div');
        //div.innerHTML = '<b>Loading...</b>';
        pauseoverlayid = "appframeworkdefaultoverlay";
        __j(div).attr("id", pauseoverlayid);
        //__j(div).css('background-color', 'rgba(0, 0, 0, 0.8)');


        document.body.appendChild(div);
    }

    var overlay = document.getElementById(pauseoverlayid);
    __j(overlay).css('position', 'absolute');
    __j(overlay).css('left', '0px');
    __j(overlay).css('top', '0px');
    __j(overlay).css('width', '100%');
    __j(overlay).css('height', '100vh');
    //__j(overlay).css('z-index', '999999');
    __j(overlay).hide();
}

function prepareInfolog() {
    let infologdiv;

    if (infologdivid) {
        infologdiv = document.getElementById(infologdivid);

        if (!infologdiv) {
            setTimeout(prepareInfolog);
            return;
        }
    }
    else {
        infologdiv = document.createElement('div');
        infologdiv.setAttribute("class", "infologdiv");
        __j(infologdiv).css("z-index", 999990);
    }



    __j(infologdiv).hide();
    //innercontaineriframe.infologdiv = infologdiv;

    let infologheader = document.createElement('div');
    infologheader.setAttribute("class", "infologheader");
    infologheader.innerText = "Infolog";

    infologdiv.appendChild(infologheader);

    var infologmessagesdiv = document.createElement('div');
    infologmessagesdiv.setAttribute('class', 'infologmessagesdiv');
    var infologbuttonsdiv = document.createElement('div');
    infologbuttonsdiv.setAttribute('class', 'infologbuttonsdiv');

    var clearinfologbutton = document.createElement('button');
    clearinfologbutton.innerText = 'Clear Log';
    clearinfologbutton.setAttribute('class', 'clearinfologbutton');
    clearinfologbutton.setAttribute('id', 'clearinfologbutton');

    clearinfologbutton.addEventListener("click", function (event) {
        //innercontaineriframe.contentWindow.callFormMethod("clearInfolog");
        clearInfolog();
    });

    infologbuttonsdiv.appendChild(clearinfologbutton);

    document.body.appendChild(infologdiv);

    self.infologmessagesdiv = infologmessagesdiv;
    self.infologdiv = infologdiv;

    infologdiv.appendChild(infologmessagesdiv);
    infologdiv.appendChild(infologbuttonsdiv);
}

function showLookup(entity, entityname, fieldgroup, loadableelementid, lookupcolumn, lookupelementid) {
    let lookupinnerdiv = document.getElementById('__lookup_innerdiv');
    let lookupdiv = document.getElementById('__lookup_div');
    let captiondiv = document.getElementById('__lookup_captiondiv');
    let buttonsdiv = document.getElementById('__lookup_buttonsdiv');
    let selectbutton = document.getElementById('__lookup_selectbutton');

    if (loadableelementid) {
        selectbutton.setAttribute('loadableelementid', loadableelementid);
    }

    selectbutton.setAttribute('lookupcolumn', lookupcolumn);
    selectbutton.setAttribute('lookupelementid', lookupelementid);
    __j(lookupdiv).css('display', 'initial');
    let grid = document.getElementById('__lookup_grid');
    grid.createFields([]);
    grid.setAttribute('entity', entity);
    grid.setAttribute('autofieldsgroup', fieldgroup);
    captiondiv.innerText = 'Select ' + entityname;

    let middiv = document.getElementById('__lookup_mid_div');
    __j(middiv).height(__j(lookupinnerdiv).innerHeight() - __j(captiondiv).outerHeight() - __j(buttonsdiv).outerHeight());
}

function prepareLookup(document) {
    //debugger;
    let lookupdiv = document.createElement('div');
    lookupdiv.setAttribute('class', 'lookupdiv');
    lookupdiv.setAttribute('id', '__lookup_div');
    __j(lookupdiv).css('position', 'absolute');
    __j(lookupdiv).css('width', '100%');
    __j(lookupdiv).css('height', '100%');
    __j(lookupdiv).css('display', 'none');
    __j(lookupdiv).css('top', '0px');
    __j(lookupdiv).css('z-index', '100000');

    let lookupinnerdiv = document.createElement('div');
    lookupinnerdiv.setAttribute('id', '__lookup_innerdiv');
    lookupdiv.appendChild(lookupinnerdiv);

    __j(lookupinnerdiv).css("width", "50%");
    __j(lookupinnerdiv).css("height", "50%");
    __j(lookupinnerdiv).css("position", "absolute");
    __j(lookupinnerdiv).css("left", "20%");
    __j(lookupinnerdiv).css("top", "20%");
    __j(lookupinnerdiv).css("border-style", "solid");
    __j(lookupinnerdiv).css("background-color", "var(--primary-background-color)");
    //__j(lookupinnerdiv).css("display", "flex");
    //__j(lookupinnerdiv).css("flex-direction", "column");

    let captiondiv = document.createElement('div');
    captiondiv.setAttribute('id', '__lookup_captiondiv')
    captiondiv.innerText = 'Select ';
    captiondiv.setAttribute('class', 'lookupcaptiondiv');

    let buttonsdiv = document.createElement('div');
    buttonsdiv.setAttribute('id', '__lookup_buttonsdiv');
    let selectbutton = document.createElement('button');
    selectbutton.setAttribute('id', '__lookup_selectbutton');
    selectbutton.innerText = 'Select';
    let cancelbutton = document.createElement('button');
    cancelbutton.innerText = 'Cancel';
    cancelbutton.setAttribute('id', '__lookup_cancelbutton');
    cancelbutton.addEventListener('click', function () {
        __j(lookupdiv).css('display', 'none');
    });

    buttonsdiv.appendChild(selectbutton);
    buttonsdiv.appendChild(cancelbutton);
    //__j(buttonsdiv).css('flex', '0 0 auto');

    let middiv = document.createElement('div');
    middiv.setAttribute('id', '__lookup_mid_div');
    //__j(middiv).height(__j(lookupinnerdiv).innerHeight() - __j(captiondiv).outerHeight() - __j(buttonsdiv).outerHeight());
    //__j(middiv).css('flex', '1 0 auto');

    //let griddiv = document.createElement('div');
    //__j(griddiv).css('width', '100%');
    //__j(griddiv).css('height', '100%');

    //middiv.appendChild(griddiv);

    middiv.innerHTML = '<app-grid id="__lookup_grid" noentitycontrols noargsassociation noedit></app-grid>';




    //__j(middiv).height()

    lookupinnerdiv.appendChild(captiondiv);
    lookupinnerdiv.appendChild(middiv);
    lookupinnerdiv.appendChild(buttonsdiv);

    document.body.appendChild(lookupdiv);
}

function showOverlay() {

    if (self !== mainWindow()) {
        mainWindow().showOverlay();
    }
    else {
        setProgress(0, "");
        var div = document.getElementById(pauseoverlayid);
        //__j(div).height(__j(document.body).height());
        __j(div).focus();
        __j(div).show();
        __j(div).css('z-index', 999999);
        //__j(div).height(__j(document).outerHeight());
    }
}

function hideOverlay() {
    if (self !== mainWindow()) {
        mainWindow().hideOverlay();
    }
    else {
        setProgress(0, "");
        var div = document.getElementById(pauseoverlayid);
        __j(div).hide();
    }
}

function obliterateOverlay() {
    mainWindow().pauseindex = 0;
    setProgress(0, "");
    hideOverlay();
}

function pauseWindow() {
    mainWindow().pauseindex++;
    if (mainWindow().pauseindex == 1) {
        //__j("*").attr('disabled', 'disabled');
        showOverlay();
    }
}

function unpauseWindow() {
    mainWindow().pauseindex--;
    if (mainWindow().pauseindex < 0) {
        mainWindow().pauseindex = 0;
    }
    if (mainWindow().pauseindex == 0) {
        //__j("*").removeAttr('disabled');
        hideOverlay();

        //let sendpendingevents = function () {
        //    if (pendingevents.length > 0) {
        //        let event = pendingevents.shift();
        //        sendClientEventToServer(event, null, null, function () {
        //            sendpendingevents();
        //        });
        //    }
        //}

        //sendpendingevents();
    }
}

function windowPaused() {
    return mainWindow().pauseindex > 0;
}

function registerValueElementStyles(tagName, styles) {
    if (Object.keys(elementStyles).indexOf(tagName.toUpperCase()) == -1) {
        elementStyles[tagName.toUpperCase()] = [];
    }
    for (let i = 0; i < styles.length; i++) {
        elementStyles[tagName.toUpperCase()].push(styles[i]);
    }
}

function sendSuccess(operation) {
    var returnobj = { messagetype: "status", message: { status: "success", operation: operation } };
    sendMessage(JSON.stringify(returnobj));
}

function forwardMessage(message) {
    var iframes = __j("iframe");
    //debugger;
    for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes.get(i);
        //console.log('forwarding message to ' + iframe.id);
        if (iframe && iframe.contentWindow && iframe.contentWindow.__forwardMessage != null) {
            iframe.contentWindow.__forwardMessage(message);
        }
        else {
            //debugger;
        }
    }
    //var iframeid = data.containeriframeid;
    //var iframe = document.getElementById(iframeid);

}

function __forwardMessage(message) {
    onmessage(message);
}

function onmessage(message) {
    //return;


    try {
        var data = JSON.parse(message.data);

        if (data.messagetype == "eventreply") {

        }

        if (data.messagetype == "methodcallreply") {

        }

        if (data.messagetype == "infolog") {
            //if (self === top) {
            //    forwardMessage(message);
            //}
            //else
            {
                infolog(data.message.message, data.message.type);
            }
            return;
        }

        if (data.messagetype == "clearinfolog") {
            //if (self === top) {
            //    forwardMessage(message);
            //}
            //else
            {
                //infolog(data.message.message, data.message.type);
                clearInfolog();
            }
            return;
        }

        //don't forward eventreply because the view/iframe may have been closed within the event
        if (data.messagetype != "eventreply" && data.messagetype != "methodcallreply" && data.containeriframeid && (self.frameElement == null || self.frameElement.id != data.containeriframeid)) {
            if (self === self.top) {
                forwardMessage(message);
            }
        }
        else {
            //console.log("Received: " + message.data);

            preparePreMessageHandlerDictionary(data.messagetype);
            preparePostMessageHandlerDictionary(data.messagetype);
            pauseWindow();
            for (var i = 0; i < preMessageHandlers.length; i++) {
                if (preMessageHandlers[i]) {
                    preMessageHandlers[i]();
                }
            }


            var done = function () {
                for (var i = 0; i < postMessageHandlers.length; i++) {
                    if (postMessageHandlers[i]) {
                        postMessageHandlers[i]();
                    }
                }
                unpauseWindow();
            };

            if (data.messagetype !== "open" && data.messagetype != "eventreply" && data.messagetype != "methodcallreply") {
                //messages can only be passed to a view if the view is showing
                if (self.frameElement && !self.frameElement.opened) {
                    debugger;
                    throw "The form in IFrame '" + self.frameElement.id + "' is not showing or has been closed";
                }
                //check if open
                //if not, throw exception
            }

            switch (data.messagetype) {
                case "enumdata":
                    enumdata = data.message.enumdata;
                    done();
                    break;
                case "createcontainer":
                    var applicationcontainerid = data.message.applicationcontainerid;
                    var containerdiv = document.createElement('div');
                    __j(containerdiv).attr("id", applicationcontainerid);
                    var body = document.getElementsByTagName('body')[0];
                    body.appendChild(containerdiv);
                    sendSuccess("createcontainer");
                    done();
                    break;
                case "open":
                    var html = data.message.html;
                    //var innercontaineriframeid = data.message.innercontaineriframeid;
                    var containerstyle = data.message.containerstyle;
                    var dialog = data.message.dialog;
                    var caption = data.message.caption;
                    var formtypename = data.message.formtypename;

                    //var iframeid = data.containeriframeid;
                    //var iframe = document.getElementById(iframeid);

                    //showView(iframeid, html, innercontaineriframeid);
                    openView(html, data.viewid, dialog, containerstyle, caption, formtypename, function () {
                        sendSuccess("open");
                        opened = true;
                        done();
                        let newevent = document.createEvent("CustomEvent");
                        newevent.initCustomEvent("opened", false, false, null);
                        document.dispatchEvent(newevent);
                    });
                    //send response
                    break;
                case "loaded":
                    //showView();
                    //let htmlelement = document.getElementById('html');
                    //if (htmlelement) {
                    //    htmlelement.focus();
                    //}
                    registerkeypress();
                    window.focus();
                    //sendSuccess("loaded");
                    loaded = true;
                    done();
                    let newevent = document.createEvent("CustomEvent");
                    newevent.initCustomEvent("loaded", false, false, null);
                    document.dispatchEvent(newevent);
                    break;
                case "close":
                    closeView();
                    //alert("closed");
                    sendSuccess("closed");
                    done();
                    let newevent2 = document.createEvent("CustomEvent");
                    newevent2.initCustomEvent("closed", false, false, null);
                    document.dispatchEvent(newevent2);
                    setTimeout(function () {
                        if (self.frameElement.autogenerated) {
                            try {
                                var container = getIframeContainer(self.frameElement);
                                container.remove();
                            }
                            catch (error) {
                                alert(error);
                            }
                        }
                    }, 10000);//10 seconds should be more than enough time to finsh up what the iframe was doing e.g sending a reply or whatever
                    //basically i found that if i remove the iframe immediately after calling done(), it throws an error.

                    focusOnTopMost();
                    break;
                case "loadscripts":
                    var scripts = data.message.scripts;

                    if (!scripts || scripts.length == 0) {
                        sendSuccess();
                        done();
                    }
                    else {
                        let loadscripts = function () {
                            if (scripts.length > 0) {
                                let temp = scripts.splice(0, 1);
                                let script = temp[0];
                                dynamicallyLoadScript(script, null, function () {
                                    loadscripts();
                                });
                            }
                            else {
                                sendSuccess();
                                done();
                            }
                        }
                        loadscripts();
                    }
                    break;
                case "loadstyles":
                    //<link rel="stylesheet" type="text/css" href="theme.css">
                    var styles = data.message.styles;

                    for (let s = 0; s < styles.length; s++) {
                        let link = document.createElement('link');
                        link.setAttribute('rel', 'stylesheet');
                        link.setAttribute('type', 'text/css');
                        link.setAttribute('href', styles[s]);

                        let headelement = document.head;
                        if (!headelement) {
                            headelement = document.documentElement;
                        }

                        headelement.appendChild(link);
                    }

                    sendSuccess();
                    done();
                    break;
                case "eventreply":
                    var eventno = data.message.eventno;
                    if (mainWindow().eventdonefunctions[eventno]) {
                        mainWindow().eventdonefunctions[eventno]();
                        mainWindow().eventdonefunctions[eventno] = null;
                    }
                    done();
                    break;
                case "methodcallreply":
                    var methodcallno = data.message.methodcallno;
                    var result = data.message.result;
                    if (mainWindow().methodcalldonefunctions[methodcallno]) {
                        mainWindow().methodcalldonefunctions[methodcallno](result);
                        mainWindow().methodcalldonefunctions[methodcallno] = null;
                    }
                    done();
                    break;
                case "registerservereventbyid":
                    registerServerEventByElementId(data.message.elementid, data.message.event);
                    sendSuccess("eventregistered");
                    done();
                    break;
                case "registerservereventsbyid":
                    var elementids = data.message.elementids;
                    var events = data.message.events;
                    for (var i = 0; i < elementids.length; i++) {
                        registerServerEventByElementId(elementids[i], events[i]);
                    }
                    sendSuccess("eventsregistered");
                    done();
                    break;
                case "deregisterservereventbyid":
                    deRegisterServerEventByElementId(data.message.elementid, data.message.event);
                    sendSuccess("eventderegistered");
                    done();
                    break;

                case "registerservereventbyselector":
                    registerServerEventByCSSSelector(data.message.selector, data.message.event);
                    sendSuccess("eventregisteredbyselector");
                    done();
                    break;

                //case "deregisterservereventbyselector":
                //    deRegisterServerEventByCSSSelector(data.message.elementid, data.message.event);
                //    sendSuccess();
                //    done();
                //    break;
                case "methodcallnoreply":
                    var args = data.message.args;

                    let fn3 = window[data.message.methodname];
                    var ret = null;
                    if (typeof fn3 === 'function') {
                        //Apply is used because, it will take the argument list as an array, and it passes the array to the function to be called. 
                        if (!args) {
                            args = [];
                        }
                        ret = fn3.apply(undefined, args);
                    }
                    else {
                        throw "Could not find function '" + data.message.methodname + "'";
                    }
                    done();
                    break;
                case "methodcall":
                    //var scriptstring = "";// data.message.methodname + "(";
                    var args = data.message.args;

                    let fn = window[data.message.methodname];
                    var ret = null;
                    if (typeof fn === 'function') {
                        //Apply is used because, it will take the argument list as an array, and it passes the array to the function to be called. 
                        if (!args) {
                            args = [];
                        }
                        ret = fn.apply(undefined, args);
                    }
                    else {
                        throw "Could not find function '" + data.message.methodname + "'";
                    }
                    sendMessage(JSON.stringify({ messagetype: "methodcallreply", result: ret }));
                    done();
                    break;
                case "controlmethodcallnoreply":
                    var args = data.message.args;
                    var elementid = data.message.elementid;
                    var element = document.getElementById(elementid);

                    //if (!iOS)
                    {
                        let fn4 = element[data.message.methodname];
                        var ret = null;
                        if (typeof fn4 === 'function') {
                            //Apply is used because, it will take the argument list as an array, and it passes the array to the function to be called. 
                            if (!args) {
                                args = [];
                            }
                            ret = fn4.apply(element, args);
                        }
                        else {
                            throw "Could not find function '" + data.message.methodname + "' in '" + elementid + "'";;
                        }
                    }
                    done();
                    break;
                case "controlmethodcall":
                    //var scriptstring = "";// data.message.methodname + "(";
                    var args = data.message.args;
                    var elementid = data.message.elementid;
                    var element = document.getElementById(elementid);

                    //if (!iOS)
                    {
                        let fn2 = element[data.message.methodname];
                        var ret = null;
                        if (typeof fn2 === 'function') {
                            //Apply is used because, it will take the argument list as an array, and it passes the array to the function to be called. 
                            if (!args) {
                                args = [];
                            }
                            ret = fn2.apply(element, args);
                        }
                        else {
                            throw "Could not find function '" + data.message.methodname + "' in '" + elementid + "'";;
                        }
                    }
                    sendMessage(JSON.stringify({ messagetype: "controlmethodcallreply", result: ret }));
                    done();
                    break;
                case "executescript":
                    var script = data.message.script;
                    var ret = eval(script);
                    sendMessage(JSON.stringify({ messagetype: "executescriptreply", result: ret }));
                    done();
                    break;
                case "createiframe":
                    createIframe(data.message.newiframeid, data.message.applicationcontainer, data.message.style, data.message.autogenerated, data.message.showinfolog, function () {
                        sendSuccess("iframecreated");
                        done();
                    });
                    break;
                case "error":
                    error(data.message.message, data.message.clientStackTrace);
                    done();
                    break;
                case "info":
                    info(data.message.message, data.message.clientStackTrace);
                    done();
                    break;
                case "warning":
                    warning(data.message.message, data.message.clientStackTrace);
                    done();
                    break;
                case "progress":
                    let progress = data.message.progress;
                    let progresstext = data.message.progresstext;
                    setProgress(progress, progresstext);
                    done();
                    break;
                default:
                    done();
                    break;
            }
        }
    }
    catch (error) {
        debugger;
        console.log(error);
        var errorstring;

        if (error.message) {
            errorstring = JSON.stringify({ messagetype: "exception", exception: error.message, stack: error.stack });
        }
        else if (typeof error === "string") {
            errorstring = JSON.stringify({ messagetype: "exception", exception: error, stack: "" });
        }
        else {
            errorstring = JSON.stringify({ messagetype: "exception", exception: JSON.stringify(error), stack: "" });
        }

        console.log(errorstring);
        sendMessage(errorstring);
    }

}

function registerkeypress() {
    //debugger;

    document.addEventListener("keydown", function (event) {
        //debugger;

        if ((event.key == 's' || event.key == 'S') && event.altKey) {
            //debugger;
            let newevent = document.createEvent("CustomEvent");
            newevent.initCustomEvent("save", false, false, null);
            let html = document.getElementById('html');
            html.dispatchEvent(newevent);
        }

        if ((event.key == 'q' || event.key == 'Q') && event.altKey) {
            //debugger;
            let newevent = document.createEvent("CustomEvent");
            newevent.initCustomEvent("cancelclose", false, false, null);
            let html = document.getElementById('html');
            html.dispatchEvent(newevent);
        }

        if ((event.key == 'c' || event.key == 'C') && event.altKey) {
            //debugger;
            let newevent = document.createEvent("CustomEvent");
            newevent.initCustomEvent("close", false, false, null);
            let html = document.getElementById('html');
            html.dispatchEvent(newevent);
        }

        if ((event.key == 'w' || event.key == 'W') && event.altKey) {
            //debugger;
            let newevent = document.createEvent("CustomEvent");
            newevent.initCustomEvent("edit", false, false, null);
            let html = document.getElementById('html');
            html.dispatchEvent(newevent);
        }

        if ((event.key == 'n' || event.key == 'N') && event.altKey) {
            //debugger;
            let newevent = document.createEvent("CustomEvent");
            newevent.initCustomEvent("create", false, false, null);
            let html = document.getElementById('html');
            html.dispatchEvent(newevent);
        }

        let container = self.top.__j(".iframecontainerdiv[iframeid=\"" + self.frameElement.id + "\"]").get(0);
        if ((event.key == 'l' || event.key == 'L') && event.altKey) {
            //debugger;
            if (dockenabled) {
                dockLeft(container);
            }
        }

        if ((event.key == 'r' || event.key == 'R') && event.altKey) {
            //debugger;
            if (dockenabled) {
                dockRight(container);
            }
        }

        if ((event.key == 'f' || event.key == 'F') && event.altKey) {
            //debugger;
            if (dockenabled) {
                dockCentre(container);
            }
        }
    });
}

function getElementValue(elementid) {
    var element = document.getElementById(elementid);
    if (element.value !== undefined) {
        return element.value;
    }
    //else if (element.tagName.toLowerCase() == "input" ||
    //    element.tagName.toLowerCase() == "app-string-edit" ||
    //    element.tagName.toLowerCase() == "app-string-display" ||
    //    element.tagName.toLowerCase() == "app-enum-edit" ||
    //    element.tagName.toLowerCase() == "app-enum-display" ||
    //    element.tagName.toLowerCase() == "app-num-edit" ||
    //    element.tagName.toLowerCase() == "app-num-display" ||
    //    element.tagName.toLowerCase() == "textarea") {
    //    return element.value;
    //}
    else if (element.tagName.toLowerCase() == "select") {
        return element.options[element.selectedIndex].value;
    }
    else {
        return element.innerHTML;
    }
}

function setElementValue(elementid, value) {
    var element = document.getElementById(elementid);
    if (element.value !== undefined) {
        element.value = value;
    }
    //if (element.tagName.toLowerCase() == "input" ||
    //    element.tagName.toLowerCase() == "app-string-edit" ||
    //    element.tagName.toLowerCase() == "app-string-display" ||
    //    element.tagName.toLowerCase() == "app-enum-edit" ||
    //    element.tagName.toLowerCase() == "app-enum-display" ||
    //    element.tagName.toLowerCase() == "app-num-edit" ||
    //    element.tagName.toLowerCase() == "app-num-display" || 
    //    element.tagName.toLowerCase() == "textarea") {
    //    element.value = value;
    //}
    else if (element.tagName.toLowerCase() == "select") {
        for (let i = 0; i < element.options.length; i++) {
            if (element.options[i].value == value) {
                element.selectedIndex = i;
                break;
            }
        }
    }
    else {
        element.innerHTML = value;
    }
}

var defaultids = 0;

function setRandomIdsForEntityElements(elementtypes) {
    for (let i = 0; i < elementtypes.length; i++) {
        let elementtype = elementtypes[i];
        let elements = document.getElementsByTagName(elementtype);
        for (let j = 0; j < elements.length; j++) {
            let element = elements[j];
            if (!element.id) {
                element.setAttribute("id", "entityelement_" + defaultids++);
            }
        }
    }
}

function getElementAttributeValue(elementid, attr) {
    if (attr == "tagName") {
        return document.getElementById(elementid).tagName;
    }
    else {
        var element = document.getElementById(elementid);
        return __j(element).attr(attr);
    }
}

function setElementAttributeValue(elementid, attr, value) {
    if (attr == "tagName") {
    }
    var element = document.getElementById(elementid);
    __j(element).attr(attr, value);
}

function removeElementAttribute(elementid, attr) {
    var element = document.getElementById(elementid);
    element.removeAttribute(attr);
}


//function runServerEvent()
//{
//    pauseWindow();
//    unpauseWindow();
//}

function error(errormessage, stacktrace) {
    alert(errormessage + " " + stacktrace);
}

function info(infomessage) {
    alert(infomessage);
}

function warning(warningmessage) {
    alert(warningmessage);
}

function isPrimitive(test) {
    return (test !== Object(test));
};

function sendClientEventToServer(event, cssselector, custommessage, done) {
    //if (event.originalEvent)
    //{
    //    event = event.originalEvent;
    //}
    if (self.frameElement.opened && !windowPaused()) {// || (self.frameElement.dialog && self.frameElement.style.zIndex > mainWindow().document.getElementById(pauseoverlayid).style.zIndex)) {

        if (event.type == "selectionchanged") {
            //console.log("selection changed");
        }

        pauseWindow();
        mainWindow().eventno++;
        //console.log(event);
        var elementattributes = {};// = event.srcElement.attributes;
        //debugger;
        for (var i = 0; i < event.currentTarget.attributes.length; i++) {
            var attrib = event.currentTarget.attributes[i];
            if (attrib.specified) {
                elementattributes[attrib.name] = attrib.value;
            }
        }

        let keys = Object.keys(event);
        let eventdata = {};
        for (var i = 0; i < keys.length; i++) {
            //eventdata[keys[i]] = event[keys[i]];
            if (isPrimitive(event[keys[i]])) {
                elementattributes["event_" + keys[i]] = event[keys[i]];
            }
        }

        var eventsendstring = JSON.stringify({ messagetype: "event", message: { eventtype: event.type, elementid: event.currentTarget.id, cssselector: cssselector, custommessage: custommessage, attributes: elementattributes, eventdata: eventdata, eventno: mainWindow().eventno }, containeriframeid: self.frameElement.id, viewid: self.frameElement.viewid });
        //console.log(eventsendstring);
        mainWindow().eventdonefunctions[mainWindow().eventno] = function () {
            unpauseWindow();
            if (done) {
                done();
            }
        };
        sendMessage(eventsendstring);
    }
    else {
        //pendingevents.push(event);
        //console.log(event);
        //console.log("Event not sent to server. inserted into pendingevents");
    }
}

function registerServerEventByElementId(elementid, event) {
    //__j("#elementid").on(event)
    document.getElementById(elementid).addEventListener(event, sendClientEventToServer);
}

function deRegisterServerEventByElementId(elementid, event) {
    document.getElementById(elementid).removeEventListener(event, sendClientEventToServer);
}

function registerServerEventByCSSSelector(selector, event) {
    //__j("#elementid").on(event)
    //document.getElementById(elementid).addEventListener(event, sendClientEventToServer);

    var eventhandler = function (e) {
        //debugger;
        sendClientEventToServer(e, selector);
    }

    __j(document).on(event, selector, eventhandler);

    //var elements = document.querySelectorAll(selector);
    //if (elements) {
    //    for (let i = 0; i < elements.length; i++) {
    //        let element = elements[i];
    //        element.addEventListener(event, eventhandler);
    //    }
    //}
    //else {
    //    //console.log("no elements for selector: " + selector);
    //}
    //__j(selector).on(event, eventhandler);
}

function css(selector, style, value) {
    //let element = document.getElementById(id);
    if (value) {
        __j(selector).css(style, value);
        return value;
    }
    else {
        return __j(selector).css(style);
    }
}
//function deRegisterServerEventByCSSSelector(selector, event) {
//    //document.getElementById(elementid).removeEventListener(event, sendClientEventToServer);

//    __j(selector).off(event, sendClientEventToServer);
//}

//function sendToServer(message)
//{
//    var messagestring = JSON.stringify(message);
//    sendMessage(messagestring);
//}

//function eventHandler(event)
//{
//    //ensure nothing can be done on the page so that no data can be sent into the websocket
//}

function callFormMethod(methodName, argsarray, donefunction) {
    if (!windowPaused()) {
        pauseWindow();
        mainWindow().methodcallno++;
        var eventsendstring = JSON.stringify({ messagetype: "methodcall", message: { methodname: methodName, args: argsarray, methodcallno: mainWindow().methodcallno }, containeriframeid: self.frameElement.id, viewid: self.frameElement.viewid });
        mainWindow().methodcalldonefunctions[mainWindow().methodcallno] = function (result) {
            unpauseWindow();
            if (donefunction) {
                donefunction(result);
            }
        };
        sendMessage(eventsendstring);
    }
}

function dynamicallyLoadScript(url, iframe, onload) {

    var doc = document;

    if (iframe) {
        doc = iframe.contentDocument;
    }

    var script = doc.createElement("script"); // Make a script DOM node
    script.src = url; // Set it's src to the provided URL

    let headelement = doc.head;
    if (!headelement) {
        headelement = doc.documentElement;
    }
    script.onload = function () {
        //console.log("loaded script " + url + " in " + (iframe ? iframe.id : ""));
        onload();
    };
    headelement.appendChild(script); // Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)


}

function prepare() {
    //if (!self.crel)

    //dynamicallyLoadScript('/Scripts/crel.min.js', null, function () 

    dynamicallyLoadScript('/Scripts/jquery-1.10.2.min.js?', null, function () {
        __j = jQuery.noConflict(true);
        prepareIframes(function () {
            prepareOverlay();
            prepareInfolog();
            //prepareLookup();
            __j("*").on('focus', function (event) {
                //if iframe's index is below event source's overlay's index, and overlay is showing, then blur
                //also remember to set the zindex of the overlay to 1 plus the calling iframe's zindex
                if (windowPaused()) {
                    event.srcElement.blur();
                }
            });

            __j("iframe").on('click', function (event) {
                if (windowPaused() && !(self.frameElement.dialog && self.frameElement.style.zIndex > mainWindow().document.getElementById(pauseoverlayid).style.zIndex)) {
                    event.stopPropagation();
                    event.preventDefault();
                }
            });

            if (window.top === window.self) {
                connect();
            }

            appframeworkprepared = true;
        });
    });
}

//function loadAppEnumSelects(enumjsonsjson)
//{
//    let enumjsons = JSON.parse(enumjsonsjson);
//    let enums = Object.keys(enumjsons);
//    for (let i = 0; i < enums.length; i++) {
//        let enumvalue = enums[i];
//        let appenumjqueryobjects = __j("app-enum[enum='" + enumvalue + "']");
//        let enumvalues = JSON.parse(enumjsons[enumvalue]);
//        for (let j = 0; j < appenumjqueryobjects.length; j++) {
//            let appenumelement = appenumjqueryobjects.get(j);
//            appenumelement.load(enumvalues);
//        }
//    }

//    //pauseWindow();
//    //setTimeout(function () {
//    //    var appenums = __j("app-enum");
//    //    for (let i = 0; i < appenums.length; i++) {
//    //        appenums.get(i).load();
//    //    }
//    //    unpauseWindow();
//    //});
//}

//function getAppEnumSelectEnums()
//{
//    let appenums = document.getElementsByTagName("app-enum");
//    let enums = [];
//    for (let i = 0; i < appenums.length; i++) {
//        //let enumvalue = "";
//        let enumvalue = appenums[i].getAttribute("enum");
//        if (enums.indexOf(enumvalue) === -1)
//        {
//            enums.push(enumvalue);
//        }
//    }
//    //return JSON.stringify(enums);
//    return enums;
//}
function setHtmlId() {
    document.getElementsByTagName("html")[0].setAttribute("id", "html");
}

function getElementIDs(selector) {
    let ids = [];
    let elementsjqueryobject = __j(selector);
    for (let i = 0; i < elementsjqueryobject.length; i++) {
        let element = elementsjqueryobject.get(i);
        if (element.id) {
            ids.push(element.id);
        }
    }
    return ids;
}

function getElementAttributes(id) {
    let grid = document.getElementById(id);
    let gridattributes = {};
    if (grid) {
        for (let j = 0; j < grid.attributes.length; j++) {
            var attrib = grid.attributes[j];
            if (attrib.specified) {
                gridattributes[attrib.name] = attrib.value;
            }
        }
        gridattributes["tagName"] = grid.tagName;
    }

    return gridattributes;
}

function getElementsAttributes(tagName) {
    let elements = document.getElementsByTagName(tagName);
    let elementsattributes = [];
    for (let i = 0; i < elements.length; i++) {
        let elementattributes = getElementAttributes(elements[i].id);
        elementsattributes.push(elementattributes);
    }
    return elementsattributes;
}

function getTagsElementsAttributes(tagNames) {
    let tagsElementsAttributes = {};
    for (let i = 0; i < tagNames.length; i++) {
        let tagName = tagNames[i];
        let elementsattributes = getElementsAttributes(tagName);
        tagsElementsAttributes[tagName] = elementsattributes;
    }
    return tagsElementsAttributes;
}

//function getAppGridsAttributes()
//{
//    let grids = document.getElementsByTagName('app-grid');
//    let gridsattributes = [];
//    for (let i = 0; i < grids.length; i++) {
//        let gridattributes = getElementAttributes(grids[i].id);
//        gridsattributes.push(gridattributes);
//    }
//    return gridsattributes;
//}

//function getFieldGroupAttributes() {
//    let grids = document.getElementsByTagName('app-field-group');
//    let gridsattributes = [];
//    for (let i = 0; i < grids.length; i++) {
//        let gridattributes = getElementAttributes(grids[i].id);
//        gridsattributes.push(gridattributes);
//    }
//    return gridsattributes;
//}

function createFields(id, fields) {
    let grid = document.getElementById(id);
    grid.createFields(fields);
}

function clearData(id) {
    let grid = document.getElementById(id);
    grid.clearData();
}

function loadElement(id, pageno, data) {
    let grid = document.getElementById(id);
    grid.loadData(pageno, data);
}

function createFieldGroupFields(id, fields) {
    let fieldgroup = document.getElementById(id);
    fieldgroup.createFields(fields);
}

function clearChildNodes(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

//function clearGridData(id) {
//    let grid = document.getElementById(id);
//    grid.clearData();
//    //clearChildNodes(grid.tbody);
//}

function setCustomElementAttributes(element, fieldinfo) {
    if (fieldinfo.enumtype) {
        element.setAttribute("enum", fieldinfo.enumtype);
    }
    if (fieldinfo.lookuptype) {
        element.setAttribute("lookupentity", fieldinfo.lookuptype);
    }
    if (fieldinfo.lookupcriteria) {
        element.setAttribute("lookupcriteria", fieldinfo.lookupcriteria);
    }
    if (fieldinfo.lookupcolumn) {
        element.setAttribute("lookupfield", fieldinfo.lookupcolumn);
    }

    if (fieldinfo.displaydecimalplaces) {
        element.setAttribute("decimals", fieldinfo.displaydecimalplaces);
    }
    if (fieldinfo.displayrows) {
        element.setAttribute("rows", fieldinfo.displayrows);
    }

    element.setAttribute("datatype", fieldinfo.datatype);

    if (fieldinfo.mandatory && element.tagName.endsWith("-EDIT")) {
        element.setAttribute("mandatory", "");
        __j(element.inputelement).css('border-color', mandatoryfieldcolour);
        __j(element.inputelement).css('outline-color', mandatoryfieldcolour);
    }
}

function createDisplayElement(fieldinfo) {
    let element = null;
    switch (fieldinfo.datatype) {
        case "string":
            element = document.createElement('app-string-display');
            break;
        case "text":
            element = document.createElement('app-text-display');
            break;
        case "integer":
        case "largeinteger":
        case "real":
            element = document.createElement('app-num-display');
            break;
        case "enum":
            element = document.createElement('app-enum-display');
            break;
        case "boolean":
            element = document.createElement('app-bool-display');
            __j(element).css("min-width", "5px");
            break;
        case "date":
            element = document.createElement('app-date-display');
            break;
        case "datetime":
            element = document.createElement('app-date-time-display');
            break;
        case "time":
            element = document.createElement('app-time-display');
            break;
        case "blob":
            element = document.createElement('app-file-display');
            if (fieldinfo.mimetype) {
                element.setAttribute("mimetype", fieldinfo.mimetype);
            }
            if (fieldinfo.fileext) {
                element.setAttribute("fileext", fieldinfo.fileext);
            }
            break;
        default:
            throw "Unknown field type " + fieldinfo.type;
            break;
    }

    if (element) {
        setCustomElementAttributes(element, fieldinfo);
    }

    return element;
}

function createEditorElement(fieldinfo) {
    let element = null;
    switch (fieldinfo.datatype) {
        case "string":
            element = document.createElement('app-string-edit');
            break;
        case "text":
            element = document.createElement('app-text-edit');
            break;
        case "integer":
        case "largeinteger":
        case "real":
            element = document.createElement('app-num-edit');
            break;
        case "enum":
            element = document.createElement('app-enum-edit');
            break;
        case "boolean":
            element = document.createElement('app-bool-edit');
            __j(element).css("min-width", "5px");
            break;
        case "date":
            element = document.createElement('app-date-edit');
            break;
        case "datetime":
            element = document.createElement('app-date-time-edit');
            break;
        case "time":
            element = document.createElement('app-time-edit');
            break;
        case "blob":
            element = document.createElement('app-file-edit');
            if (fieldinfo.mimetype) {
                element.setAttribute("mimetype", fieldinfo.mimetype);
            }
            if (fieldinfo.fileext) {
                element.setAttribute("fileext", fieldinfo.fileext);
            }
            break;
        default:
            break;
    }

    if (element) {
        setCustomElementAttributes(element, fieldinfo);
    }

    return element;
}

class AppElement extends HTMLElement {
    constructor() {
        super();
        this.hooks = {};
    }

    connectedCallback() {
        this.callHook("connectedCallback", this);
    }

    disconnectedCallback() {
        this.callHook("disconnectedCallback", this);
    }

    registerServerEventByElementId(childelementid, event) {
        //var entityElement = document.getElementById(elementid);
        this.shadowRoot.getElementById(childelementid).addEventListener(event, sendClientEventToServer);
    }

    deRegisterServerEventByElementId(childelementid, event) {
        //var entityElement = document.getElementById(elementid);
        this.shadowRoot.getElementById(childelementid).removeEventListener(event, sendClientEventToServer);
    }

    registerServerEventByCSSSelector(childrenselector, event) {
        let elements = this.shadowRoot.querySelectorAll(childrenselector);

        var eventhandler = function (e) {
            sendClientEventToServer(e, childrenselector);
        }

        //var elements = document.querySelectorAll(selector);
        if (elements) {
            for (let i = 0; i < elements.length; i++) {
                let element = elements[i];
                element.addEventListener(event, eventhandler);
            }
        }

        //var eventhandler = function (e) {
        //    debugger;
        //    sendClientEventToServer(e, childrenselector);
        //}
        //debugger;
        //__j(document).on(event, childrenselector, eventhandler);
    }

    getElementValue(elementid) {
        var element = this.shadowRoot.getElementById(elementid);
        if (element.tagName.toLowerCase() == "input" ||
            element.tagName.toLowerCase() == "app-string-edit" ||
            element.tagName.toLowerCase() == "app-string-display" ||
            element.tagName.toLowerCase() == "app-enum-edit" ||
            element.tagName.toLowerCase() == "app-enum-display" ||
            element.tagName.toLowerCase() == "app-num-edit" ||
            element.tagName.toLowerCase() == "app-num-display" ||
            element.tagName.toLowerCase() == "textarea") {
            return element.value;
        }
        else if (element.tagName.toLowerCase() == "select") {
            return element.options[element.selectedIndex].value;
        }
        else {
            return element.innerHTML;
        }
    }

    setElementValue(elementid, value) {
        var element = this.shadowRoot.getElementById(elementid);
        if (element.tagName.toLowerCase() == "input" ||
            element.tagName.toLowerCase() == "app-string-edit" ||
            element.tagName.toLowerCase() == "app-string-display" ||
            element.tagName.toLowerCase() == "app-enum-edit" ||
            element.tagName.toLowerCase() == "app-enum-display" ||
            element.tagName.toLowerCase() == "app-num-edit" ||
            element.tagName.toLowerCase() == "app-num-display" ||
            element.tagName.toLowerCase() == "textarea") {
            element.value = value;
        }
        else if (element.tagName.toLowerCase() == "select") {
            for (let i = 0; i < element.options.length; i++) {
                if (element.options[i].value == value) {
                    element.selectedIndex = i;
                    break;
                }
            }
        }
        else {
            element.innerHTML = value;
        }
    }

    getElementAttributeValue(elementid, attr) {
        if (attr == "tagName") {
            return this.shadowRoot.getElementById(elementid).tagName;
        }
        else {
            var element = this.shadowRoot.getElementById(elementid);
            return __j(element).attr(attr);
        }
    }

    setElementAttributeValue(elementid, attr, value) {
        if (attr == "tagName") {
        }
        var element = this.shadowRoot.getElementById(elementid);
        __j(element).attr(attr, value);
    }

    removeElementAttribute(elementid, attr) {
        var element = this.shadowRoot.getElementById(elementid);
        element.removeAttribute(attr);
    }

    registerStyles(styles) {

        for (let i = 0; i < styles.length; i++) {
            let link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('type', 'text/css');
            link.setAttribute('href', styles[i]);
            this.shadowRoot.appendChild(link);
        }
    }

    registerHook(hookname, callback) {
        if (this.hooks[hookname] === undefined) {
            this.hooks[hookname] = [];
        }
        this.hooks[hookname].push(callback);
    }

    deRegisterHook(hookname, callback) {
        if (this.hooks[hookname]) {
            //let hooks = [];
            let hooks = this.hooks[hookname];
            let callbackindex = hooks.indexOf(callback);
            if (callbackindex != -1) {
                hooks.splice(callbackindex, 1);
            }
        }
    }

    callHook(hookname, arg) {
        if (this.hooks[hookname]) {
            for (let i = 0; i < this.hooks[hookname].length; i++) {
                let fn = this.hooks[hookname][i];
                fn.apply(this, [arg]);
            }
        }
    }
}

class EntityElement extends AppElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['entity',
            'associatedelement',
            'autofields',
            'autofieldsgroup',
            'fields',
            'style'
            //'pagelength'
        ];
    }

    get entity() {
        return this.getAttribute('entity');
    }
    set entity(value) {
        this.setAttribute('entity', value);
    }

    get associatedelement() {
        return this.getAttribute('associatedelement');
    }
    set associatedelement(value) {
        this.setAttribute('associatedelement', value);
    }

    get autofields() {
        return this.hasAttribute('autofields');
    }
    set autofields(value) {
        if (value) {
            this.setAttribute('autofields', 'autofields');
        }
        else {
            this.removeAttribute('autofields');
        }
    }

    get autofieldsgroup() {
        return this.getAttribute('autofieldsgroup');
    }
    set autofieldsgroup(value) {
        this.setAttribute('autofieldsgroup', value);
    }


    get fields() {
        return this.getAttribute('fields');
    }
    set fields(value) {
        this.setAttribute('fields', value);
    }


}

class AppOperationsControl extends EntityElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.operationslist = document.createElement('ul');
        this.divelement = document.createElement('div');
        this.divelement.setAttribute("class", "app-operations-container");
        this.divelement.appendChild(this.operationslist);
        this.shadowRoot.appendChild(this.divelement);
        this.operationelements = {};

        callCreatedHook(this);
        //this.level1lis = [];
    }

    static get observedAttributes() {
        EntityElement.observedAttributes;
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "style":
                this.divelement.setAttribute("style", newVal);
                break;
            default:
                break;
        }
    }

    setOperationUsability(canRunValues) {
        for (var operationid in canRunValues) {
            let operationelement = this.operationelements[operationid];
            if (operationelement) {
                let canrun = canRunValues[operationid];
                if (canrun) {
                    operationelement.removeAttribute("disabled");
                }
                else {
                    operationelement.setAttribute("disabled", "disabled");
                }
            }
        }
        this.callHook("setOperationUsability", this.operationslist);
    }

    clear() {
        if (this.operationslist) {
            clearChildNodes(this.operationslist);
        }
        this.operationelements = {};
        this.callHook("clear", this.operationslist);
        //clearChildNodes(this.operationslist);
    }

    createOperations(operation, parentul, level) {
        if (!level) {
            level = 1;
            //this.level1lis = [];
        }
        this.availablecontrols = 0;
        if (!parentul) {
            if (operation.operations) {
                for (let i = 0; i < operation.operations.length; i++) {
                    let childoperation = operation.operations[i];
                    this.createOperations(childoperation, this.operationslist, 1);
                }
            }
            this.callHook("createOperations", this.operationslist);
            return;
        }
        let operationsli = document.createElement('li');
        operationsli.setAttribute("level", level);
        operationsli.setAttribute("class", "operations-li");
        operationsli.setAttribute("title", operation.title);
        operationsli.setAttribute("operationid", operation.id);
        if (level == 1) {
            //__j(operationsli).css('display', 'inline-block');
            //__j(operationsli).css('vertical-align', 'top');
            //__j(operationsli).css('margin-right', '20px');
            //this.level1lis.push(operationsli);
        }
        let operationelementtagname = operation.operations ? "span" : "button";
        let operationelement = document.createElement(operationelementtagname);
        operationelement.setAttribute("level", level);
        operationelement.setAttribute("class", "operations-li-element");
        if (operation.tooltip) {
            operationelement.setAttribute("title", operation.tooltip);
        }
        operationelement.setAttribute("operationid", operation.id);
        operationelement.innerText = operation.title;
        this.operationelements[operation.id] = operationelement;
        operationsli.appendChild(operationelement);

        if (operation.operations) {
            let childoperationsul = document.createElement('ul');
            for (let i = 0; i < operation.operations.length; i++) {
                let childoperation = operation.operations[i];
                this.createOperations(childoperation, childoperationsul, level + 1);
                //childoperationsul.appendChild(childoperationli);
            }
            operationsli.appendChild(childoperationsul);
        }
        else {
            let thiselement = this;
            operationelement.setAttribute("disabled", "disabled");
            //operationelement.setAttribute("id", )
            operationelement.addEventListener("click", function (event) {
                let newevent = document.createEvent("CustomEvent");
                newevent.initCustomEvent("operationclicked", false, false, null);
                newevent.operation = this.getAttribute("operationid");
                thiselement.dispatchEvent(newevent);
            });
            //handle click here
        }

        parentul.appendChild(operationsli);
    }
}

class AppFieldGroup extends EntityElement {
    constructor() {
        super();
        //this.__readonly = false;
        this.divelement = document.createElement('div');
        //this.divelement.setAttribute('style', 'display: inline-flex; flex-direction: row; width:100%');
        this.divelement.setAttribute('class', 'fieldgroup_host_div');
        let shadowRoot = this.attachShadow({ mode: 'open' });
        //let style = document.createElement('style');
        //style.innerHTML = '.fieldgroup_column{display:inline-block; vertical-align:top}';
        //shadowRoot.appendChild(style);
        shadowRoot.appendChild(this.divelement);

        this.fielddivs = [];

        this.fieldinfos = [];
        this.indexes = [];
        this.fieldnames = [];
        this.ineditmode = false;
        this.dataeditable = [];
        this.edited = [];
        this.columndivs = [];

        callCreatedHook(this);
        //this.createFields();
    }
    static get observedAttributes() {
        return EntityElement.observedAttributes.concat([
            //'autofocus',
            'readonly',
            'caption'
        ]);
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "readonly":
                setReadOnly();
                break;
            default:
                break;
        }
    }

    get readonly() {
        return this.hasAttribute("readonly");
    }
    set readonly(value) {
        this.setAttribute("readonly", "readonly");
    }

    get columns() {
        let columns = this.getAttribute("columns");
        if (!columns) {
            columns = 1;
        }
        return columns;
    }

    retrieveUpdatedValues() {
        let data = [];
        for (let i = 0; i < this.fieldinfos.length; i++) {
            let field = this.fieldinfos[i];
            let idprefix = this.id + "_" + field.field;
            let editorid = idprefix + "_" + "editor";
            let editor = this.shadowRoot.getElementById(editorid);

            if (this.edited[this.indexes[i]] && this.edited[this.indexes[i]][this.fieldnames[i]]) {

                data.push({ index: this.indexes[i], fieldname: this.fieldnames[i], value: editor.value });
            }
        }
        return data;
    }

    //setEditable(index, field) {
    //}

    setValues(data, dataeditable) {
        //console.log(data);
        this.dataeditable = dataeditable;
        for (let i = 0; i < this.fieldinfos.length; i++) {
            let field = this.fieldinfos[i];

            let idprefix = this.id + "_" + field.field;
            let editorid = idprefix + "_" + "editor";
            let displayid = idprefix + "_" + "display";

            let editor = this.shadowRoot.getElementById(editorid);
            let display = this.shadowRoot.getElementById(displayid);

            let index = this.indexes[i];
            let fieldname = this.fieldnames[i];

            let datavalue = data[index][fieldname];

            editor.value = datavalue;
            display.value = datavalue;


        }
        this.editMode(this.ineditmode);
    }

    clearData() {
        for (let i = 0; i < this.fieldinfos.length; i++) {
            let field = this.fieldinfos[i];

            let idprefix = this.id + "_" + field.field;
            let editorid = idprefix + "_" + "editor";
            let displayid = idprefix + "_" + "display";

            let editor = this.shadowRoot.getElementById(editorid);
            let display = this.shadowRoot.getElementById(displayid);

            let index = this.indexes[i];
            let fieldname = this.fieldnames[i];

            //let datavalue = data[index][fieldname];

            editor.value = "";
            display.value = "";

            this.editMode(false);
        }
    }

    //setNonEditableFieldsInvisible() {

    //}

    editMode(edit) {
        if (edit) {
            for (let i = 0; i < this.fieldinfos.length; i++) {
                let field = this.fieldinfos[i];
                let idprefix = this.id + "_" + field.field;
                let editorid = idprefix + "_" + "editor";
                let displayid = idprefix + "_" + "display";

                let editordiv = this.shadowRoot.getElementById(editorid + "_div");
                let displaydiv = this.shadowRoot.getElementById(displayid + "_div");
                if (this.dataeditable[this.indexes[i]][this.fieldnames[i]]) {
                    __j(editordiv).css("display", "block");
                    __j(displaydiv).css("display", "none");
                }
                else {
                    __j(editordiv).css("display", "none");
                    __j(displaydiv).css("display", "block");
                }
            }
        }
        else {

            let divs = this.shadowRoot.querySelectorAll(".field-display-div");
            divs.forEach(function (div) {
                __j(div).css("display", "block");
            });
            divs = this.shadowRoot.querySelectorAll(".field-editor-div");
            divs.forEach(function (div) {
                __j(div).css("display", "none");
            });
        }
        this.ineditmode = edit;

        this.callHook("editMode", this);

        //this.setNonEditableFieldsInvisible();
    }

    createFields(fields) {
        clearChildNodes(this.divelement);
        this.fielddivs = [];

        this.fieldinfos = fields;
        this.indexes = [];
        this.fieldnames = [];
        this.edited = [];

        for (let i = 0; i < this.fieldinfos.length; i++) {
            let fieldinfo = this.fieldinfos[i];

            let field = fieldinfo.field;
            let splitfield = field.split('.');
            let index = splitfield[0];
            let fieldname = splitfield[1];

            this.indexes.push(index);
            this.fieldnames.push(fieldname);
        }

        this.columndivs = [];

        for (let x = 0; x < this.columns; x++) {
            let columndiv = document.createElement('div');
            columndiv.setAttribute('class', 'fieldgroup_column');
            columndiv.setAttribute('column', (x + 1));
            //__j(columndiv).css("display", "inline-block");
            //__j(columndiv)
            this.columndivs.push(columndiv);
            this.divelement.appendChild(columndiv);
        }

        let fieldspercolumn = fields.length / this.columns;

        let fieldspercolumnint = Math.ceil(fieldspercolumn);

        //if (fieldspercolumnint < fieldspercolumn) {
        //    fieldspercolumnint++;
        //}

        for (let i = 0; i < fields.length; i++) {
            let column = i / fieldspercolumn;

            column = Math.floor(column);
            //let column = i % this.columns;

            let fieldhostdiv = this.createField(i, column);

            let columndiv = this.columndivs[column];
            //this.divelement.appendChild(fieldhostdiv);
            columndiv.appendChild(fieldhostdiv);
            //this.divelement.appendChild()

        }

        this.callHook("createFields", this);
    }

    createField(i, column) {


        let fields = this.fieldinfos;
        let field = fields[i];

        let idprefix = this.id + "_" + field.field;
        let editorid = idprefix + "_" + "editor";
        let displayid = idprefix + "_" + "display";

        let fieldhostdiv = document.createElement('div');
        fieldhostdiv.setAttribute("class", "field-host-div");
        let fieldlabeldiv = document.createElement('div');
        fieldlabeldiv.setAttribute("class", "field-group-label-div");
        let fieldlabel = document.createElement('label');
        fieldlabel.setAttribute("class", "field-group-label");
        fieldlabel.innerText = field.label;
        fieldlabel.setAttribute("for", editorid);
        if (field.mandatory) {
            fieldlabel.setAttribute("mandatory", "mandatory");
        }

        let displaydiv = document.createElement('div');
        displaydiv.setAttribute("class", "field-display-div");
        displaydiv.setAttribute("id", displayid + "_div");
        let editordiv = document.createElement('div');
        editordiv.setAttribute("class", "field-editor-div");
        editordiv.setAttribute("id", editorid + "_div");
        __j(editordiv).hide();
        let display = createDisplayElement(field);
        display.setAttribute("id", displayid);
        display.setAttribute("class", "field-group-display-element")

        let editor = createEditorElement(field);

        let thiselement = this;
        editor.addEventListener("change", function (event) {
            if (!thiselement.edited[thiselement.indexes[i]]) {
                thiselement.edited[thiselement.indexes[i]] = {};
            }
            thiselement.edited[thiselement.indexes[i]][thiselement.fieldnames[i]] = true;
        });

        editor.setAttribute("id", editorid);
        editor.setAttribute("loadableelement", this.id);
        editor.setAttribute("class", "field-group-editor-element");
        let displayandeditorcontainer = document.createElement('div');
        displayandeditorcontainer.setAttribute("class", "display-editor-container");


        displaydiv.appendChild(display);
        editordiv.appendChild(editor);

        fieldlabeldiv.appendChild(fieldlabel);


        fieldhostdiv.appendChild(fieldlabeldiv);
        displayandeditorcontainer.appendChild(displaydiv);
        displayandeditorcontainer.appendChild(editordiv);
        fieldhostdiv.appendChild(displayandeditorcontainer);

        this.fielddivs.push(fieldhostdiv);

        this.callHook("createField", fieldhostdiv);

        return fieldhostdiv;
    }

    //loadData(data) {
    //}
}

class LoadableElement extends EntityElement {
    constructor() {
        super();
        //this.__toppage = 0;
        //this.__bottompage = 0;

        //if (!this.getAttribute("id")) {
        //    anonymouselementid++;
        //    this.setAttribute("id", "anon_" + anonymouselementid);
        //}
    }

    static get observedAttributes() {
        return EntityElement.observedAttributes.concat([
            'allowcreate',
            'allowedit',
            'allowdelete',
            'autoload',
            'autoselect',
            'noargsassociation',
            'sortfield',
            'sortorder',
            'criteria',
            'pagelength',
            'selectedpageno',
            'selectedrowno'
        ]);
    }

    //get toppage() {
    //    return this.__toppage;
    //}
    //get bottompage() {
    //    return this.__bottompage;
    //}

    get allowcreate() {
        return this.hasAttribute('allowcreate');
    }
    set allowcreate(value) {
        if (value) {
            this.setAttribute('allowcreate', 'allowcreate');
        }
        else {
            this.removeAttribute('allowcreate');
        }
    }

    get allowedit() {
        return this.hasAttribute('allowedit');
    }
    set allowedit(value) {
        if (value) {
            this.setAttribute('allowedit', 'allowedit');
        }
        else {
            this.removeAttribute('allowedit');
        }
    }

    get allowdelete() {
        return this.hasAttribute('allowdelete');
    }
    set allowdelete(value) {
        if (value) {
            this.setAttribute('allowdelete', 'allowdelete');
        }
        else {
            this.removeAttribute('allowdelete');
        }
    }

    get autoload() {
        return this.hasAttribute('autoload');
    }
    set autoload(value) {
        if (value) {
            this.setAttribute('autoload', 'autoload');
        }
        else {
            this.removeAttribute('autoload');
        }
    }

    get autoselect() {
        return this.hasAttribute('autoselect');
    }
    set autoselect(value) {
        if (value) {
            this.setAttribute('autoselect', 'autoselect');
        }
        else {
            this.removeAttribute('autoselect');
        }
    }

    get noargsassociation() {
        return this.hasAttribute('noargsassociation');
    }
    set noargsassociation(value) {
        if (value) {
            this.setAttribute('noargsassociation', 'noargsassociation');
        }
        else {
            this.removeAttribute('noargsassociation');
        }
    }

    get sortfield() {
        return this.getAttribute('sortfield');
    }
    set sortfield(value) {
        this.setAttribute('sortfield', value);
    }

    get sortorder() {
        return this.getAttribute('sortorder');
    }
    set sortorder(value) {
        this.setAttribute('sortorder', value);
    }

    get criteria() {
        return this.getAttribute('criteria');
    }
    set criteria(value) {
        this.setAttribute('criteria', value);
    }

    get pagelength() {
        return this.getAttribute('pagelength');
        //if (this.hasAttribute('pagelength')) {
        //    return this.getAttribute('pagelength');
        //}
        //else {
        //    return this.defaultpagelength;
        //}
    }
    set pagelength(value) {
        this.setAttribute('pagelength', value);
    }
}

class AppSelect extends LoadableElement {
    constructor() {
        super();
        let thiselement = this;
        this.selectelement = document.createElement('select');
        let shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(this.selectelement);

        this.selectelement.addEventListener("change", function (event) {
            if (this.selectedIndex > 0) {
                let newevent = document.createEvent("CustomEvent");
                let rowno = this.selectedIndex - 1;//- 1 because of the empty option
                //thiselement.setAttribute("selectedpageno", 1);
                //thiselement.setAttribute("selectedrowno", rowno);
                newevent.initCustomEvent("selectionchanged", false, false, null);
                newevent.selectedpageno = 1;
                newevent.selectedrowno = rowno;
                thiselement.dispatchEvent(newevent);
            }
        });

        let emptyoption = document.createElement('option');
        //option.setAttribute("value", value);
        emptyoption.innerText = 'Please Select...';
        emptyoption.setAttribute('disabled', 'disabled');
        this.selectelement.appendChild(emptyoption);
        this.selectelement.selectedIndex = 0;

        callCreatedHook(this);
    }

    static get observedAttributes() {
        return ['valuefield', 'displayfield'].concat(LoadableElement.observedAttributes);
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            //case "height":
            //    this.setWidthAndHeight();
            //    break;
            case "style":
                this.selectelement.setAttribute("style", newVal);
                break;
            default:
                break;
        }
        //super.attributeChangedCallback(attrName, oldVal, newVal);
    }

    addData(value, text) {
        let option = document.createElement('option');
        option.setAttribute("value", value);
        option.innerText = text;
        this.selectelement.appendChild(option);
    }

    setValues(row, data) {
        this.selectelement.options[row + 1].setAttribute("value", data[row][this.valuefield]);
        this.selectelement.options[row + 1].innerText = data[row][this.displayfield];
    }

    loadData(data) {
        for (let i = 0; i < data.length; i++) {
            //let option = document.createElement('option');
            //option.setAttribute("value", data[i][this.valuefield]);
            //option.innerText = data[i][this.displayfield];
            //this.selectelement.appendChild(option);
            this.addData(data[i][this.valuefield], data[i][this.displayfield]);
        }
        this.selectelement.selectedIndex = 0;
    }

    clear() {
        for (i = this.selectelement.options.length - 1; i >= 1; i--) {
            this.selectelement.options.remove(i);
        }
    }

    select(row) {
        this.selectelement.selectedIndex = row + 1;
        //let valuefound = false;
        //for (let i = 0; i < this.selectelement.options.length; i++) {
        //    if (this.selectelement.options[i].value == v) {
        //        this.selectelement.selectedIndex = i;
        //        valuefound = true;
        //        break;
        //    }
        //}
    }

    get valuefield() {
        return this.getAttribute("valuefield");
    }
    get displayfield() {
        return this.getAttribute('displayfield');
    }


}

class AppGrid extends LoadableElement {
    constructor() {
        super();
        let thiselement = this;
        this.firstradiobutton = null;
        this.alldata = {};
        this.__previousscrolltop = 0;
        this.toploaded = false;
        this.bottomloaded = false;
        this.multiselectdiv = null;
        //this.createnewdiv = null;
        this.reloaddiv = null;
        this.movetofirstdiv = null;
        this.movetonextdiv = null;
        this.movetopreviousdiv = null;
        this.movetolastdiv = null;
        this.reloadrecorddiv = null;
        this.deleterecorddiv = null;
        this.displaycolumns = [];
        this.displaycolumnelementhtml = [];
        this.displaycolumnelementdisplayproperties = [];
        this.displaycolumnelementdisplaymethodentityindexes = [];
        this.displaycolumnheadertexts = [];
        this.multiselectmode = false;
        this.selectedradiobuttons = [];
        this.defaultpagelength = iOS ? 40 : 40;
        this.fieldscreated = false;
        this.tbodies = {};
        this.fieldinfos = [];
        this.indexes = [];
        this.fieldnames = [];
        this.searchinputs = [];
        this.connected = false;
        this._shadowRoot = null;

        //debugger;
        //document.addEventListener("loaded", function () {
        //    thiselement.selectDefault();
        //})
    }



    connectedCallback() {
        super.connectedCallback();
        if (!this.connected) {
            let thiselement = this;

            this.headertableelement = document.createElement('table');
            this.bodytableelement = document.createElement('table');

            this.elementcontainer = document.createElement('div');
            this.headandbodycontainer = document.createElement('div');
            this.headandbodycontainer.setAttribute("class", "app-grid-head-and-body-tables-container");
            this.headcontainer = document.createElement('div');
            this.headcontainer.setAttribute("class", "app-grid-table-head-container");
            this.bodycontainer = document.createElement('div');
            this.bodycontainer.setAttribute("class", "app-grid-table-body-container");

            //__j(this.headertableelement).css("table-layout", "fixed");
            //__j(this.bodytableelement).css("table-layout", "fixed");

            __j(this.elementcontainer).css("display", "flex");
            __j(this.elementcontainer).css("flex-direction", "column");

            //__j(this.bodycontainer).css('overflow-y', 'auto');
            //__j(this.bodycontainer).css('overflow-x', 'hidden');
            __j(this.bodycontainer).css('width', '100%');

            //__j(this.bodycontainer).css('position', 'relative');
            __j(this.headcontainer).css("z-index", "10000");
            this.bodycontainer.setAttribute("class", "app-grid-body-container");
            this.headandbodycontainer.addEventListener("scroll", function (event) {
                //console.log(event);
                //console.log(this.scrollTop + ", " + __j(this).innerHeight() + ", " + this.scrollHeight + ", " + __j(thiselement.bodycontainer).outerHeight());
                //console.log("Needs to load up: " + thiselement.needsToLoadUp);
                //console.log("Needs to load down: " + thiselement.needsToLoadDown);
                let scrolldirection = "down"
                if (this.scrollTop < thiselement.__previousscrolltop) {
                    scrolldirection = "up";
                }

                thiselement.__previousscrolltop = this.scrollTop;

                if (scrolldirection == "up" && thiselement.needsToLoadUp()) {
                    thiselement.dispatchLoadEvent(scrolldirection);
                }
                else if (scrolldirection == "down" && thiselement.needsToLoadDown()) {
                    thiselement.dispatchLoadEvent(scrolldirection);
                }
                //console.log("scrolling");
                //when near top, load current page - 1, if nothing loads, toploaded = true;
                //when near bottom, load current page + 1, if nothing loads, bottomloaded = true;
            });

            __j(this.headandbodycontainer).css("position", "relative");

            this.headandbodycontainer.addEventListener("scroll", function (event) {
                __j(thiselement.headcontainer).css("top", this.scrollTop);
            });

            this.headandbodycontainer.addEventListener("touchmove", function (event) {
                __j(thiselement.headcontainer).css("top", this.scrollTop);
            });

            window.addEventListener("scroll", function (event) {
                __j(thiselement.headcontainer).css("top", thiselement.headandbodycontainer.scrollTop);
            });



            this.thead = document.createElement('thead');
            this.bodythead = document.createElement('thead');
            //this.tbody = document.createElement('tbody');

            this.headertableelement.appendChild(this.thead);
            this.bodytableelement.appendChild(this.bodythead);
            //this.tableelement.appendChild(this.tbody);
            //this.headtr = null;
            //this.searchtr = null;

            this.headtr = document.createElement('tr');
            this.headtr.setAttribute('class', 'header');
            this.searchtr = document.createElement('tr');
            this.searchtr.setAttribute('class', 'search');
            this.controlstr = document.createElement('tr');
            this.controlstr.setAttribute('class', 'controls');
            this.controlstd = document.createElement('td');
            this.controlstd.setAttribute('class', 'controls-td');

            //this.entitycontrolstr = document.createElement('tr');
            //this.entitycontrolstr.setAttribute('class', 'entitycontrols');
            //this.entitycontrolstd = document.createElement('td');
            //this.entitycontrolstd.setAttribute('class', 'entitycontrols-td');

            //this.tableelement.appendChild(this.thead);
            this.thead.appendChild(this.controlstr);
            this.thead.appendChild(this.headtr);
            this.thead.appendChild(this.searchtr);

            this.controlstr.appendChild(this.controlstd);

            if (!this.noentitycontrols) {
                this.entitycontrolsdiv = document.createElement('div');
                this.entitycontrolsdiv.setAttribute("class", "app-grid-controls-div");
                __j(this.entitycontrolsdiv).css("flex", "0 1 auto");
                this.appentitycontrol = document.createElement('app-operations-control');
                this.appentitycontrol.setAttribute("id", this.id + "_entity_operations_control");
                this.appentitycontrol.setAttribute("associatedelement", this.id);
                this.appentitycontrol.setAttribute("collapse", "");
                this.appentitycontrol.setAttribute("gridoperationscontrol", "");
                this.entitycontrolsdiv.appendChild(this.appentitycontrol);
                this.elementcontainer.appendChild(this.entitycontrolsdiv);
                this.appentitycontrol.setAttribute("hiddencontrols", "__edit __delete __createnew __details " + (this.getAttribute("hiddencontrols") ? this.getAttribute("hiddencontrols") : ""));

                if (this.noentityoperations) {
                    this.appentitycontrol.setAttribute("noentityoperations", "");
                }
            }

            __j(this.headandbodycontainer).css("flex", "1 1 auto");
            __j(this.headandbodycontainer).css("display", "flex");
            __j(this.headandbodycontainer).css("flex-direction", "column");
            __j(this.headandbodycontainer).css("overflow", "auto");
            //__j(this.headandbodycontainer).css("overflow-y", "hidden");

            __j(this.headcontainer).css("position", "absolute");
            __j(this.headcontainer).css("flex", "0 1 auto");
            __j(this.bodycontainer).css("flex", "1 1 auto");
            this.bodycontainer.setAttribute("class", "app-grid-table-body-container");



            //if (!this.width) {
            //    this.width = 500;
            //}
            if (!this.height) {
                this.height = "100%";
            }

            window.addEventListener("resize", function () {
                //this is to force a resize of the grid

                __j(thiselement.elementcontainer).css("min-height", "");

                setTimeout(function () {
                    __j(thiselement.elementcontainer).css("min-height", thiselement.height);
                }, 100);

                __j(thiselement.elementcontainer).css("min-width", "");

                setTimeout(function () {
                    __j(thiselement.elementcontainer).css("min-width", thiselement.width);
                }, 100);
            });

            //let resizeinterval = setInterval(function () {
            //    if (!self.frameElement.opened) {
            //        clearInterval(resizeinterval);
            //    }
            //    else {
            //        //thiselement.elementcontainer.setAttribute("force_reflow", (new Date()).getTime());
            //        //__j(thiselement.elementcontainer).css("height", this.height);


            //        //__j(thiselement.elementcontainer).css("min-height", thiselement.height);
            //        //let zoom = document.body.style.zoom;
            //        //document.body.style.zoom = zoom + 0.0000001;
            //        //document.body.style.zoom = zoom;
            //    }
            //}, 1000);

            if (!this.pagelength) {
                this.pagelength = this.defaultpagelength;
            }

            //__j(this.bodycontainer).css("flex", "1 1 auto");
            //__j(this.bodycontainer).css("height", "100%");

            this.elementcontainer.appendChild(this.headandbodycontainer);

            this.createControls();

            this.headcontainer.appendChild(this.headertableelement);
            this.bodycontainer.appendChild(this.bodytableelement);

            //this.bodycontainer.appendChild(this.entitycontrolsdiv);
            this._shadowRoot = this.headandbodycontainer.attachShadow({ mode: 'open' });



            this._shadowRoot.appendChild(this.headcontainer);
            this._shadowRoot.appendChild(this.bodycontainer);

            this.appendChild(this.elementcontainer);



            this.setWidthAndHeight();

            callCreatedHook(this);

            this.connected = true;
        }
    }

    get noentitycontrols() {
        return this.hasAttribute("noentitycontrols");
    }
    get noentityoperations() {
        return this.hasAttribute("noentityoperations");
    }
    get noedit() {
        return this.hasAttribute('noedit');
    }
    get shadowRoot() {
        return this._shadowRoot;
    }
    static get observedAttributes() {
        return LoadableElement.observedAttributes.concat([
            'nogridfilter',
            'caption',
            'width',
            'height',
            'startposition',
            'style'//,
            //'hiddencontrols'
        ]);
    }
    //compensateForEntityControlsDiv() {
    //    if (this.entitycontrolsdiv) {
    //        __j(this.bodycontainer).css("height", __j(this.bodycontainer).height() - __j(this.entitycontrolsdiv).height());
    //    }
    //}
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "width":
            case "height":
                this.setWidthAndHeight();
                break;
            case "style":
                //this.bodycontainer.setAttribute("style", newVal);
                //this.compensateForEntityControlsDiv();
                break;
            //case "hiddencontrols":
            //    //this.appentitycontrol.setAttribute("hiddencontrols", )
            //    break;
            default:
                break;
        }
    }
    needsToLoadUp() {
        let pagesloaded = Object.keys(this.alldata);
        let ret = !this.toploaded && ((this.headandbodycontainer.scrollTop <= (this.headandbodycontainer.clientHeight * 1.25)) || (this.startposition != null && this.startposition.toLowerCase() == "last" && pagesloaded.length == 1)); // || (this.startposition.toLowerCase() == "last" && pagesloaded.length == 1 && this.alldata[pagesloaded[0]].length < this.pagelength));
        if (ret == null) {
            debugger;
        }
        return ret;
    }
    needsToLoadDown() {
        return !this.bottomloaded && (this.headandbodycontainer.scrollHeight - this.headandbodycontainer.scrollTop) <= (this.headandbodycontainer.clientHeight * 1.25);
    }

    get startposition() {
        return this.getAttribute('startposition');
    }
    set startposition(value) {
        this.setAttribute('startposition', value);
    }

    //get style() {
    //    return this.getAttribute("style");
    //}
    //set style(value) {
    //    this.setAttribute("style", value);
    //    this.bodycontainer.setAttribute("style", newVal);
    //}

    get nogridfilter() {
        return this.hasAttribute('nogridfilter');
    }
    set nogridfilter(value) {
        if (value) {
            this.setAttribute('nogridfilter', 'nogridfilter');
        }
        else {
            this.removeAttribute('nogridfilter');
        }
    }

    get caption() {
        return this.getAttribute('caption');
    }
    set caption(value) {
        this.setAttribute('caption', value);
    }

    get width() {
        return this.getAttribute('width');
        //if (this.hasAttribute('width')) {
        //    return this.getAttribute('width');
        //}
        //else {
        //    return "100%";
        //}
    }
    set width(value) {
        this.setAttribute('width', value);
        this.setWidthAndHeight();
    }

    get height() {
        return this.getAttribute('height');
        //if (this.hasAttribute('height')) {
        //    return this.getAttribute('height');
        //}
        //else {
        //    return "100%";
        //}
    }
    set height(value) {
        this.setAttribute('height', value);
        this.setWidthAndHeight();
    }

    get selectedrowno() {
        return this.getAttribute("selectedrowno");
    }

    get selectedpageno() {
        return this.getAttribute("selectedpageno");
    }

    updateRow(pageno, rowno, data, canedit) {
        for (let i = 0; i < this.fieldinfos.length; i++) {
            let fieldinfo = this.fieldinfos[i];

            let displayelementname = this.id + "_" + pageno.toString() + "_" + rowno + "_" + fieldinfo.field + "_display";

            let displayelement = this.shadowRoot.getElementById(displayelementname);

            displayelement.value = data[this.indexes[i]][this.fieldnames[i]];
        }
        this.alldata[pageno][rowno] = data;

        if (!this.noedit) {
            let editbuttonid = this.id + '_grid_edit_button_' + pageno + '_' + rowno;
            let savebuttonid = this.id + '_grid_save_button_' + pageno + '_' + rowno;
            //let deletebuttonid = this.id + '_grid_delete_button_' + pageno + '_' + rowno;

            let editbutton = this.shadowRoot.getElementById(editbuttonid);
            let savebutton = this.shadowRoot.getElementById(savebuttonid);
            //let deletebutton = this.shadowRoot.getElementById(deletebuttonid);

            if (!canedit) {
                editbutton.setAttribute('disabled', '');
            }
            else {
                editbutton.removeAttribute('disabled');
            }

            savebutton.setAttribute('disabled', '');
        }
        //if (!candelete) {
        //    deletebutton.setAttribute('disabled', '');
        //}
        //else {
        //    deletebutton.removeAttribute('disabled');
        //}
    }
    get toppage() {
        let keys = Object.keys(this.alldata);
        let toppage = Math.min(...keys);
        //if (toppage == null) {
        //    debugger;
        //}
        return toppage;
        //return this.__toppage;
    }
    get bottompage() {
        let keys = Object.keys(this.alldata);
        let bottompage = Math.max(...keys);
        //if (bottompage == null) {
        //    debugger;
        //}
        return bottompage;
        //return this.__bottompage;
    }
    clearData() {
        this.alldata = {};
        let pagenos = Object.keys(this.tbodies);
        for (let i = 0; i < pagenos.length; i++) {
            if (this.tbodies[pagenos[i]].parentNode == this.bodytableelement) {
                this.bodytableelement.removeChild(this.tbodies[pagenos[i]]);
            }
        }
        this.tbodies = {};
        //this.__bottompage = 0;
        //this.__toppage = 0;
        this.firstradiobutton = null;
        this.removeAttribute("selectedpageno");
        this.removeAttribute("selectedrowno");
        this.selectedradiobuttons = [];

        this.callHook("clearData", this);
    }
    loadData(pageno, data, caneditarray) {
        //let firstload = false;


        let thiselement = this;
        if (pageno == 0) {
            return;
        }

        if (this.toppage == 0) {
            this.toploaded = false;
        }
        if (this.bottompage == 0) {
            this.bottomloaded = false;
        }

        let direction = "";

        if (pageno < this.toppage) {
            direction = "up";
        }
        else if (pageno > this.bottompage) {
            direction = "down";
        }
        else if (this.toppage > 0 && this.bottompage > 0) {
            console.error("looks like this is a data page that has been loaded before");
            return;
        }

        this.alldata[pageno] = data;

        let tbody = document.createElement('tbody');
        tbody.setAttribute('id', this.id + "_" + pageno.toString());
        tbody.setAttribute('pageno', pageno);
        tbody.setAttribute('class', 'app-grid-page-tbody');
        this.tbodies[pageno] = tbody;

        let toptr = this.shadowRoot.getElementById(this.id + "_" + this.toppage.toString() + "_0");
        let originaltoptroffsettop = 0;

        if (toptr) {
            originaltoptroffsettop = toptr.offsetTop;
        }

        for (let i = 0; i < data.length; i++) {
            //debugger;
            let tr = this.createRow(pageno, i, data[i], caneditarray[i]);
            tbody.appendChild(tr);
        }

        if (direction == "up") {
            insertAfter(tbody, this.bodythead);

            if (toptr) {
                this.headandbodycontainer.scrollTop = toptr.offsetTop - originaltoptroffsettop;
            }
        }
        else {
            this.bodytableelement.appendChild(tbody);
        }

        //if (loaded) {
        //this.selectDefault();
        //}

        //if (pageno < this.toppage) {
        //    this.__toppage = pageno;
        //}
        //if (pageno > this.bottompage) {
        //    this.__bottompage = pageno;
        //}

        //if (this.toppage == 0) {
        //    this.__toppage = pageno;
        //}
        //if (this.bottompage == 0) {
        //    this.__bottompage = pageno;
        //}

        //if this is the first page loaded
        if (Object.keys(this.alldata).length == 1) {
            if (this.startposition == "last") {
                this.headandbodycontainer.scrollTop = this.headandbodycontainer.scrollHeight;
                //this.bottomloaded = true;
            }
            else {
                this.headandbodycontainer.scrollTop = 0;
                //this.toploaded = true;
            }
        }

        //if (pageno == 1 && data.length < this.pagelength) {
        //    this.topLoaded = true;
        //    this.bottomLoaded = true;
        //}
        if (pageno == 1) {// || (direction == "up" && data.length < this.pagelength)) {
            this.toploaded = true;
        }
        if (data.length < this.pagelength) {
            this.bottomloaded = true;
        }

        if (!Object.keys(this.alldata).includes(1)) {
            //if page 1 is not loaded, then toploaded is = false;
            this.toploaded = false;
        }

        this.__previousscrolltop = this.headandbodycontainer.scrollTop;


        if (Object.keys(this.alldata).length == 1) {
            if (this.startposition == "last") {
                setTimeout(function () {
                    thiselement.scrollToRow(pageno, thiselement.alldata[pageno].length - 1);
                }, 2500);
            }
        }
    }

    setColumnWidth(col) {
        //debugger;
        let header = this.shadowRoot.getElementById(this.id + "_header_div_" + col);

        let width = __j(header).width();

        let searchinput = this.shadowRoot.getElementById(this.id + "_search_input_" + col);
        if (searchinput) {
            let widthstring = width + "px";
            __j(searchinput).css("width", widthstring);
        }
        let sortinput = this.shadowRoot.getElementById(this.id + "_sort_input_" + col);
        if (sortinput) {
            let widthstring = width + "px";
            __j(sortinput).css("width", widthstring);
        }

        let pagenos = Object.keys(this.tbodies);
        let firsttddiv;

        for (let i = 0; i < pagenos.length; i++) {
            let pageno = pagenos[i];
            //for (let rowno = 0; rowno < this.pagelength; rowno++) {
            for (let rowno = 0; this.alldata[pageno] && rowno < this.alldata[pageno].length; rowno++) {
                let tddiv = this.shadowRoot.getElementById(this.id + "_" + pageno + "_" + rowno + "_" + col + "_host_div");//students_1_0_0_host_div

                let tddisplaydiv = this.shadowRoot.getElementById(this.id + "_" + pageno + "_" + rowno + "_display_" + col + "_host_div");
                if (!tddiv && !tddisplaydiv) {
                    break;
                }
                else {
                    if (!tddiv) {
                        tddiv = tddisplaydiv;
                    }
                    if (!firsttddiv) {
                        firsttddiv = tddiv;
                    }
                    this.setCellWidth(pageno, rowno, col, tddiv, width);
                }
            }
            //this.setCellWidth(pageno, )
        }

        //if (firsttddiv) {
        //    let actualcolumnwidth = __j(firsttddiv).width();
        //    __j(header).width(actualcolumnwidth);
        //    this.columnsizes[col] = actualcolumnwidth;
        //}

        //this.setHeaderWidth(col, width);

        //document.cookie = formTypeName + "_" + this.id + "_col_" + col + "=";
        setViewCookie(formTypeName + "_" + formCaption + "_" + this.id + "_col_" + col, width);
    }

    //setColumnWidths(pageno) {
    //    for (let rowno = 0; rowno < this.pagelength; rowno++) {
    //        let tr = this.shadowRoot.getElementById(this.id + "_" + pageno + "_" + rowno + "_tr");
    //        if (tr) {
    //            for (let col = 0; col < this.headerths.length; col++) {
    //                this.setCellWidth(pageno, rowno, col);
    //            }
    //        }
    //        else {
    //            break;
    //        }

    //    }
    //}

    //setHeaderWidth(col, width) {
    //    //debugger;
    //    if (width === undefined) {
    //        let header = this.shadowRoot.getElementById(this.id + "_header_div_" + col); //students_header_div_col_5
    //        width = __j(header).width();
    //    }

    //    let headerth = this.shadowRoot.getElementById(this.id + "_header_th_" + col);
    //    __j(headerth).width(width);
    //}

    setCellWidth(pageno, rowno, col, tddiv, width) {
        if (!tddiv) {
            tddiv = this.shadowRoot.getElementById(this.id + "_" + pageno + "_" + rowno + "_" + col + "_host_div");//students_1_0_0_host_div
        }
        if (width === undefined) {
            let header = this.shadowRoot.getElementById(this.id + "_header_div_" + col); //students_header_div_col_5
            width = __j(header).width();
        }
        __j(tddiv).outerWidth(width);
    }

    //rowSelected(event) {
    //    //alert(this);

    //}
    dispatchMultiSelectEvent(multiselect) {
        let newevent = document.createEvent("CustomEvent");
        newevent.initCustomEvent("multiselect", false, false, null);
        newevent.multiselect = multiselect;
        this.dispatchEvent(newevent);
    }

    dispatchLoadEvent(direction) {
        //debugger;
        let newevent = document.createEvent("CustomEvent");
        newevent.initCustomEvent("loadmore", false, false, null);
        newevent.pageno = direction == "up" ? this.toppage - 1 : this.bottompage + 1;
        //if (!newevent.pageno) {
        //    debugger;
        //}
        newevent.direction = direction;
        this.dispatchEvent(newevent);
    }

    dispatchSelectionChangedEvent(pageno, rowno, force) {
        if ((!(this.selectedpageno == pageno && this.selectedrowno == rowno) || force) && !this.multiselectmode) {
            let newevent = document.createEvent("CustomEvent");
            newevent.initCustomEvent("selectionchanged", false, false, null);
            newevent.selectedpageno = pageno;
            newevent.selectedrowno = rowno;
            this.dispatchEvent(newevent);
        }
    }

    dispatchMultiSelectionChangedEvent(pageno, rowno, select) {
        if (this.multiselectmode) {

            //}
            let newevent = document.createEvent("CustomEvent");
            //this.setAttribute("selectedpageno", pageno);
            //this.setAttribute("selectedrowno", rowno);
            newevent.initCustomEvent("multiselectionchanged", false, false, null);
            newevent.selectedpageno = pageno;
            newevent.selectedrowno = rowno;
            newevent.select = select;
            this.dispatchEvent(newevent);
        }
    }

    markRowSelected(pageno, rowno, controlsdata) {

        if (controlsdata) {
            if (controlsdata.allowmultiselect) {
                this.multiselectdiv.removeAttribute("disabled");
            }
            else {
                this.multiselectdiv.setAttribute("disabled", "disabled");
            }

            //if (controlsdata.allowcreatenew) {
            //    this.createnewdiv.removeAttribute("disabled");
            //}
            //else {
            //    this.createnewdiv.setAttribute("disabled", "disabled");
            //}

            //if (controlsdata.allowdelete) {
            //    this.deleterecorddiv.removeAttribute("disabled");
            //}
            //else {
            //    this.deleterecorddiv.setAttribute("disabled", "disabled");
            //}
        }

        if (this.selectedpageno) {
            let oldtr = this.shadowRoot.getElementById(this.id + "_" + this.selectedpageno + "_" + this.selectedrowno + "_tr");
            if (oldtr) {
                oldtr.removeAttribute("selected");
            }
        }

        this.setAttribute("selectedpageno", pageno);
        this.setAttribute("selectedrowno", rowno);

        let radiobutton = this.shadowRoot.getElementById(this.id + "_" + pageno.toString() + "_" + rowno + "_" + "tr_selector_radiobutton");
        radiobutton.checked = true;

        let tr = this.shadowRoot.getElementById(this.id + "_" + pageno + "_" + rowno + "_tr");
        if (tr) {
            tr.setAttribute("selected", "selected");
        }

        //if (!(this.selectedpageno == pageno && this.selectedrowno == rowno)) {

        //}
    }

    scrollToRow(pageno, rowno) {
        let firstradiobutton = this.shadowRoot.getElementById(this.id + "_1_0_" + "tr_selector_radiobutton");
        let radiobutton = this.shadowRoot.getElementById(this.id + "_" + pageno.toString() + "_" + rowno + "_" + "tr_selector_radiobutton");
        if (radiobutton) {
            //this.bodycontainer.scrollTop = radiobutton.parentElement.offsetTop - firstradiobutton.parentElement.offsetTop + __j(this.thead).outerHeight() - __j(this.bodycontainer).innerHeight();// radiobutton.scrollTop - radiobutton.offsetTop;
            this.headandbodycontainer.scrollTop = radiobutton.parentElement.parentElement.offsetTop;
        }
    }

    addDisplayColumn(colindex, headerText, elementHtml, entityindex, displayProperty) {
        this.displaycolumns.push(colindex);
        this.displaycolumnelementhtml.push(elementHtml);
        this.displaycolumnelementdisplaymethodentityindexes.push(entityindex);
        this.displaycolumnelementdisplayproperties.push(displayProperty);
        this.displaycolumnheadertexts.push(headerText);
        this.createFields(this.fieldinfos);//we have to recreate the fields
    }

    createDisplayFieldTd(col, pageno, rowno) {
        let i = this.displaycolumns.indexOf(col);
        let elementhtml = this.displaycolumnelementhtml[i];
        let entityindex = this.displaycolumnelementdisplaymethodentityindexes[i];
        let displayproperty = this.displaycolumnelementdisplayproperties[i];

        let fieldinfo = this.fieldinfos[i];
        let td = document.createElement('td');
        td.setAttribute('id', this.id + "_" + pageno.toString() + "_" + rowno + "_display_" + col + "_td");
        td.setAttribute('class', 'app-grid-td');
        td.setAttribute('pageno', pageno);
        td.setAttribute('rowno', rowno);
        td.setAttribute('entityindex', entityindex);
        td.setAttribute('displayproperty', displayproperty);

        let tdhostdiv = document.createElement('div');
        tdhostdiv.setAttribute('id', this.id + "_" + pageno.toString() + "_" + rowno + "_display_" + col + "_host_div");
        tdhostdiv.setAttribute('class', 'app-grid-td-host-div');
        __j(tdhostdiv).css("text-overflow", "ellipsis");
        __j(tdhostdiv).css("white-space", "nowrap");
        __j(tdhostdiv).css("overflow", "hidden");
        tdhostdiv.setAttribute('pageno', pageno);
        tdhostdiv.setAttribute('rowno', rowno);
        tdhostdiv.setAttribute('entityindex', entityindex);
        tdhostdiv.setAttribute('displayproperty', displayproperty);

        let tddatadiv = document.createElement('div');
        tddatadiv.setAttribute('id', this.id + "_" + pageno.toString() + "_" + rowno + "_display_" + col + "_data");
        tddatadiv.setAttribute('class', 'app-grid-td-data-div');
        __j(tddatadiv).css("display", "inline-block");
        tddatadiv.setAttribute('pageno', pageno);
        tddatadiv.setAttribute('rowno', rowno);
        tddatadiv.setAttribute('entityindex', entityindex);
        tddatadiv.setAttribute('displayproperty', displayproperty);

        var tempdiv = document.createElement('div');
        tempdiv.innerHTML = elementhtml;

        let displayelement = tempdiv.firstChild;
        displayelement.setAttribute("id", this.id + "_" + pageno.toString() + "_" + rowno + "_display_" + col + "_display");
        displayelement.setAttribute('entityindex', entityindex);
        displayelement.setAttribute('pageno', pageno);
        displayelement.setAttribute('rowno', rowno);
        displayelement.setAttribute('displayproperty', displayproperty);
        __j(displayelement).css("width", "100%");
        tddatadiv.appendChild(displayelement);

        tdhostdiv.appendChild(tddatadiv);

        this.setCellWidth(pageno, rowno, col, tdhostdiv);

        this.callHook("createDisplayFieldTd", td);

        td.appendChild(tdhostdiv);

        return td;
    }

    //detailsclicked() {
    //    let newevent = document.createEvent("CustomEvent");
    //    this.setAttribute("selectedpageno", pageno);
    //    this.setAttribute("selectedrowno", rowno);
    //    newevent.initCustomEvent("detailslinkclicked", false, false, null);
    //    this.dispatchEvent(newevent);
    //}
    multiSelectMode(multiselect) {
        var elements = this.selectedradiobuttons;

        for (let i = 0; i < elements.length; i++) {
            elements[i].setAttribute('type', multiselect ? 'checkbox' : 'radio');
        }

        this.multiselectmode = multiselect;

        if (!multiselect) {
            //this.dispatchRefreshEvent();
            for (let j = 0; j < elements.length; j++) {
                if (elements[j].checked) {
                    let pageno = elements[j].getAttribute("pageno");
                    let rowno = elements[j].getAttribute("rowno");
                    //when multiselect is ended, we need to do this
                    //this.dispatchSelectionChangedEvent(pageno, rowno, true);
                    //this.markRowSelected(this.selectedpageno, this.selectedrowno);

                    break;
                }
            }
        }

        if (this.multiselectmode) {
            this.multiselectdiv.setAttribute("on", "on");
        }
        else {
            this.multiselectdiv.removeAttribute("on");
        }
    }

    //reloadRow(pageno, rowno, rowdata, canedit, candelete) {
    //    this.alldata[pageno][rowno] = rowdata;
    //    this.createRow(pageno, rowno, rowdata);
    //}

    getEditedData(pageno, rowno, newrecord) {
        let rowdata = this.alldata[pageno][rowno];
        let editeddata = {};
        for (let i = 0; i < this.fieldinfos.length; i++) {
            let fieldinfo = this.fieldinfos[i];

            if ((newrecord && fieldinfo.editableoncreate) || (!newrecord && fieldinfo.editableonupdate)) {
                let editorelement = this.shadowRoot.getElementById(this.id + "_" + pageno + "_" + rowno + "_" + fieldinfo.field + "_editor");
                let displayelement = this.shadowRoot.getElementById(this.id + "_" + pageno + "_" + rowno + "_" + fieldinfo.field + "_display");
                //if (editorelement && editorelement.value != rowdata[this.indexes[i]][this.fieldnames[i]]) {
                if (editorelement && editorelement.value != displayelement.value) {
                    if (!editeddata[this.indexes[i]]) {
                        editeddata[this.indexes[i]] = {};
                    }
                    editeddata[this.indexes[i]][this.fieldnames[i]] = editorelement.value;
                }
            }
        }
        return editeddata;
    }

    editMode(pageno, rowno, edit, editablefields) {
        //if (edit) {
        //debugger;
        let rowdata = this.alldata[pageno][rowno];
        for (let i = 0, col = 0; i < this.fieldinfos.length; i++ , col++) {
            while (this.displaycolumns.indexOf(col) >= 0) {
                //let td = this.createDisplayFieldTd(col, pageno, rowno);
                //tr.appendChild(td);
                col++;
            }

            let fieldinfo = this.fieldinfos[i];
            let tddatadiv = this.shadowRoot.getElementById(this.id + "_" + pageno.toString() + "_" + rowno + "_" + fieldinfo.field + "_data");
            let tdeditdiv;

            let editbuttonid = this.id + '_grid_edit_button_' + pageno + '_' + rowno;
            let savebuttonid = this.id + '_grid_save_button_' + pageno + '_' + rowno;

            let editbutton = this.shadowRoot.getElementById(editbuttonid);
            let savebutton = this.shadowRoot.getElementById(savebuttonid);

            if (edit) {
                //if()
                savebutton.removeAttribute('disabled');
                editbutton.setAttribute('disabled', '');
                //if (fieldinfo.editableonupdate) {
                if (editablefields.indexOf(fieldinfo.field) >= 0) {
                    let tdhostdiv = this.shadowRoot.getElementById(this.id + "_" + pageno + "_" + rowno + "_" + col + "_host_div");
                    let displayelement = this.shadowRoot.getElementById(this.id + "_" + pageno + "_" + rowno + "_" + fieldinfo.field + "_display");

                    __j(tddatadiv).hide();

                    tdeditdiv = document.createElement('div');
                    tdeditdiv.setAttribute('id', this.id + "_" + pageno.toString() + "_" + rowno + "_" + fieldinfo.field + "_edit");
                    tdeditdiv.setAttribute('class', 'app-grid-td-edit-div');
                    __j(tdeditdiv).css("display", "inline-block");
                    tdeditdiv.setAttribute('pageno', pageno);
                    tdeditdiv.setAttribute('rowno', rowno);
                    tdeditdiv.setAttribute('entityindex', this.indexes[i]);
                    tdeditdiv.setAttribute('fieldname', this.fieldnames[i]);

                    let editorelement = createEditorElement(fieldinfo);
                    if (editorelement.tagName.toLowerCase() == "app-text-edit") {
                        editorelement.setAttribute("rows", "1");
                    }
                    editorelement.setAttribute("id", this.id + "_" + pageno.toString() + "_" + rowno + "_" + fieldinfo.field + "_editor");
                    editorelement.setAttribute("loadableelement", this.id);
                    editorelement.value = rowdata[this.indexes[i]][this.fieldnames[i]];

                    if (editorelement.inputelement) {
                        __j(editorelement.inputelement).css("width", "100%");
                    }
                    //else {
                    //    __j(editorelement).css("width", "100%");
                    //}

                    if (editorelement.tagName.toUpperCase() == "APP-TEXT-EDIT") {
                        __j(tdeditdiv).css("display", "block");
                        __j(editorelement.inputelement).css("resize", "none");
                    }

                    //if (editorelement.tagName.toUpperCase() == "APP-STRING-EDIT" || editorelement.tagName.toUpperCase() == "APP-ENUM-EDIT") {
                    if (editorelement.tagName.toUpperCase() == "APP-NUM-EDIT") {
                        __j(editorelement.inputelement).css("width", "95%");
                    }
                    //else if (editorelement.tagName.toUpperCase() == "APP-DATE-EDIT" || editorelement.tagName.toUpperCase() == "APP-DATE-TIME-EDIT" || editorelement.tagName.toUpperCase() == "APP-TIME-EDIT") {
                    //    __j(tdeditdiv).css("width", "99%");
                    //    __j(editorelement).css("width", "99%");
                    //}
                    else if (editorelement.tagName.toUpperCase() != "APP-BOOL-EDIT") {
                        __j(tdeditdiv).css("width", "100%");
                    }


                    tdeditdiv.appendChild(editorelement);

                    tdhostdiv.appendChild(tdeditdiv);
                }
            }
            else {
                //first save the data
                //when that is done, go ahead and delete the editor divs
                //this.saveEditedData(pageno, rowno, function () {
                //    
                //});
                //debugger;
                editbutton.removeAttribute('disabled');
                savebutton.setAttribute('disabled', '');

                tdeditdiv = this.shadowRoot.getElementById(this.id + "_" + pageno.toString() + "_" + rowno + "_" + fieldinfo.field + "_edit");
                if (tdeditdiv) {
                    __j(tdeditdiv).remove();
                }
                __j(tddatadiv).show();
            }

            while (this.displaycolumns.indexOf(col) >= 0) {
                //let td = this.createDisplayFieldTd(col, pageno, rowno);
                //tr.appendChild(td);
                col++;
            }
        }

        let tr = this.shadowRoot.getElementById(this.id + "_" + pageno + "_" + rowno + "_tr");
        if (edit) {
            if (tr) {
                tr.setAttribute("editmode", "");
            }
            if (this.multiselectdiv) {
                this.multiselectdiv.setAttribute("disabled", "");
            }
        }
        else {
            if (tr) {
                tr.removeAttribute("editmode");
            }
            if (this.multiselectdiv) {
                this.multiselectdiv.removeAttribute("disabled");
            }
        }
        //}
        //else {
        //}
    }

    removeRow(pageno, rowno) {
        let trid = this.id + "_" + pageno.toString() + "_" + rowno + "_tr";
        let tr = this.shadowRoot.getElementById(trid);
        tr.remove();
    }

    createRow(pageno, rowno, rowdata, canedit) {
        let trid = this.id + "_" + pageno.toString() + "_" + rowno + "_tr";
        let tr = this.shadowRoot.getElementById(trid);
        if (tr) {
            clearChildNodes(tr);
        }
        else {
            tr = document.createElement('tr');
            tr.setAttribute('id', trid);
            tr.setAttribute('class', 'app-grid-tr clickable');
            tr.setAttribute('pageno', pageno);
            tr.setAttribute('rowno', rowno);
        }
        let thiselement = this;

        let rowselectortd = document.createElement('td');
        rowselectortd.setAttribute('id', this.id + "_" + pageno.toString() + "_" + rowno + "_" + "tr_selector_td");
        rowselectortd.setAttribute('class', 'app-grid-rowselector_td app-grid-td');
        rowselectortd.setAttribute('pageno', pageno);
        rowselectortd.setAttribute('rowno', rowno);

        let selectorradiobutton = document.createElement('input');
        this.selectedradiobuttons.push(selectorradiobutton);

        if (this.multiselectmode) {
            selectorradiobutton.setAttribute("type", "checkbox");
        }
        else {
            selectorradiobutton.setAttribute("type", "radio");
        }
        //__j(selectorradiobutton).width("20px");
        selectorradiobutton.setAttribute('id', this.id + "_" + pageno.toString() + "_" + rowno + "_" + "tr_selector_radiobutton");
        selectorradiobutton.setAttribute('name', this.id + "_rowselector");
        selectorradiobutton.setAttribute('class', 'app-grid-rowselector_radiobutton');
        selectorradiobutton.setAttribute('pageno', pageno);
        selectorradiobutton.setAttribute('rowno', rowno);
        selectorradiobutton.setAttribute('gridid', this.id);

        if (this.firstradiobutton == null && (this.startposition == "first" || !this.startposition)) {// || pageno < this.toppage || this.toppage == 0) {
            this.firstradiobutton = selectorradiobutton;
        }
        else if (this.startposition == "last") {
            this.firstradiobutton = selectorradiobutton;
        }
        //however, if you're supposed to start at the bottom, we should be using last radio button


        selectorradiobutton.addEventListener("click", function (e) {
            //e.preventDefault();
            //event.stopPropagation();
            //if (this.getAttribute("type").toLowerCase() == "checkbox")
            {
                this.checked = !this.checked;
            }
            //return false;
            //if (this.checked)
            //{
            //    if (thiselement.multiselectmode) {
            //        //thiselement.dispatchMultiSelectionChangedEvent(pageno, rowno, this.checked);
            //    }
            //    else {
            //        thiselement.dispatchSelectionChangedEvent(pageno, rowno);
            //    }
            //}
            //if (thiselement.multiselectmode) {
            //    thiselement.dispatchMultiSelectionChangedEvent(pageno, rowno, this.checked);
            //}
        });

        tr.addEventListener("click", function (event) {
            if (thiselement.multiselectmode) {
                selectorradiobutton.checked = !selectorradiobutton.checked;
            }
            else {
                selectorradiobutton.checked = true;
            }
            if (pageno != thiselement.selectedpageno || rowno != thiselement.selectedrowno) {
                if (thiselement.multiselectmode) {
                    //thiselement.dispatchMultiSelectionChangedEvent(pageno, rowno);
                }
                else {
                    thiselement.dispatchSelectionChangedEvent(pageno, rowno);
                }
            }
            if (thiselement.multiselectmode) {
                thiselement.dispatchMultiSelectionChangedEvent(pageno, rowno, selectorradiobutton.checked);
            }
        });

        let rowselectordiv = document.createElement('div');
        rowselectordiv.setAttribute("id", this.id + "_selector_div_" + pageno + "_" + rowno);
        __j(rowselectordiv).width(rowselectorwidth);
        rowselectordiv.appendChild(selectorradiobutton);
        rowselectortd.appendChild(rowselectordiv);
        //detailslinktd.appendChild(detailslink);
        //reloadlinktd.appendChild(reloadlink);
        //deletelinktd.appendChild(deletelink);

        tr.appendChild(rowselectortd);

        let editsavedeletetd = document.createElement('td');
        editsavedeletetd.setAttribute('class', 'grid_edit_save_deleted_td app-grid-td');
        let editsavedeletediv = document.createElement('div');
        editsavedeletediv.setAttribute('class', 'grid_edit_save_deleted_div');

        //if (!candelete) {
        //    //debugger;
        //}

        if (!thiselement.noedit) {
            let editbutton = document.createElement('button');
            editbutton.setAttribute('pageno', pageno);
            editbutton.setAttribute('rowno', rowno);
            editbutton.setAttribute('id', this.id + '_grid_edit_button_' + pageno + '_' + rowno);
            editbutton.setAttribute('class', 'grid_edit_button grid_inline_control_button');
            editbutton.innerText = 'Edit';
            if (!canedit) {
                editbutton.setAttribute('disabled', '');
            }
            editbutton.addEventListener('click', function click(e) {
                let newevent = document.createEvent("CustomEvent");
                newevent.initCustomEvent("edit", false, false, null);
                newevent.pageno = pageno;
                newevent.rowno = rowno;
                thiselement.dispatchEvent(newevent);
            });

            let savebutton = document.createElement('button');
            savebutton.setAttribute('pageno', pageno);
            savebutton.setAttribute('rowno', rowno);
            savebutton.setAttribute('id', this.id + '_grid_save_button_' + pageno + '_' + rowno);
            savebutton.setAttribute('class', 'grid_save_button grid_inline_control_button');
            savebutton.innerText = 'Save';
            savebutton.setAttribute('disabled', '');
            
            savebutton.addEventListener('click', function click(e) {
                let newevent = document.createEvent("CustomEvent");
                newevent.initCustomEvent("save", false, false, null);
                newevent.pageno = pageno;
                newevent.rowno = rowno;
                thiselement.dispatchEvent(newevent);
            });

            let detailsbutton = document.createElement('button');
            detailsbutton.setAttribute('pageno', pageno);
            detailsbutton.setAttribute('rowno', rowno);
            detailsbutton.setAttribute('id', this.id + '_grid_details_button_' + pageno + '_' + rowno);
            detailsbutton.setAttribute('class', 'grid_details_button grid_inline_control_button');
            detailsbutton.innerText = 'Details';
            detailsbutton.addEventListener('click', function click(e) {
                let newevent = document.createEvent("CustomEvent");
                newevent.initCustomEvent("details", false, false, null);
                newevent.pageno = pageno;
                newevent.rowno = rowno;
                thiselement.dispatchEvent(newevent);
            });

            editsavedeletetd.setAttribute('pageno', pageno);
            editsavedeletetd.setAttribute('rowno', rowno);

            editsavedeletediv.appendChild(editbutton);
            editsavedeletediv.appendChild(savebutton);
            editsavedeletediv.appendChild(detailsbutton);
        }
            //editsavedeletediv.appendChild(deletebutton);

        __j(editsavedeletediv).css('width', (!thiselement.noedit ? grideditsavedeletetdwidth : 0));
        __j(editsavedeletediv).css('overflow', 'hidden');

        editsavedeletetd.appendChild(editsavedeletediv);
        

        tr.appendChild(editsavedeletetd);
        
        //tr.appendChild(detailslinktd);
        //tr.appendChild(reloadlinktd);
        //tr.appendChild(deletelinktd);

        for (let i = 0, col = 0; i < this.fieldinfos.length; i++) {

            while (this.displaycolumns.indexOf(col) >= 0) {
                let td = this.createDisplayFieldTd(col, pageno, rowno);
                tr.appendChild(td);
                col++;
            }

            let td = this.createFieldTd(tr, i, col, pageno, rowno, rowdata);
            __j(td).width();
            tr.appendChild(td);

            col++;

            while (this.displaycolumns.indexOf(col) >= 0) {
                let td = this.createDisplayFieldTd(col, pageno, rowno);
                tr.appendChild(td);
                col++;
            }
        }

        this.callHook("createRow", tr);

        return tr;
    }

    createFieldTd(tr, i, col, pageno, rowno, rowdata) {
        let fieldinfo = this.fieldinfos[i];
        let td = document.createElement('td');
        td.setAttribute('id', this.id + "_" + pageno.toString() + "_" + rowno + "_" + fieldinfo.field + "_td");
        td.setAttribute('class', 'app-grid-td');
        td.setAttribute('pageno', pageno);
        td.setAttribute('rowno', rowno);
        td.setAttribute('entityindex', this.indexes[i]);
        td.setAttribute('fieldname', this.fieldnames[i]);

        let tdhostdiv = document.createElement('div');
        tdhostdiv.setAttribute('id', this.id + "_" + pageno.toString() + "_" + rowno + "_" + col + "_host_div");
        tdhostdiv.setAttribute('class', 'app-grid-td-host-div');
        __j(tdhostdiv).css("text-overflow", "ellipsis");
        __j(tdhostdiv).css("white-space", "nowrap");
        __j(tdhostdiv).css("overflow", "hidden");
        tdhostdiv.setAttribute('pageno', pageno);
        tdhostdiv.setAttribute('rowno', rowno);
        tdhostdiv.setAttribute('entityindex', this.indexes[i]);
        tdhostdiv.setAttribute('fieldname', this.fieldnames[i]);

        let tddatadiv = document.createElement('div');
        tddatadiv.setAttribute('id', this.id + "_" + pageno.toString() + "_" + rowno + "_" + fieldinfo.field + "_data");
        tddatadiv.setAttribute('class', 'app-grid-td-data-div');
        __j(tddatadiv).css("display", "inline-block");
        tddatadiv.setAttribute('pageno', pageno);
        tddatadiv.setAttribute('rowno', rowno);
        tddatadiv.setAttribute('entityindex', this.indexes[i]);
        tddatadiv.setAttribute('fieldname', this.fieldnames[i]);

        let displayelement = createDisplayElement(fieldinfo);
        if (displayelement.tagName.toLowerCase() == "app-text-display") {
            displayelement.setAttribute("rows", "1");
        }

        if (displayelement.tagName.toLowerCase() == "app-num-display") {
            __j(tdhostdiv).css("text-align", "right");
        }
        displayelement.setAttribute("id", this.id + "_" + pageno.toString() + "_" + rowno + "_" + fieldinfo.field + "_display");
        displayelement.setAttribute("loadableelement", this.id);
        displayelement.value = rowdata[this.indexes[i]][this.fieldnames[i]];

        if (displayelement.inputelement) {
            __j(displayelement.inputelement).css("width", "100%");
        }
        else {
            __j(displayelement).css("width", "100%");
        }

        if (displayelement.tagName.toUpperCase() == "APP-TEXT-DISPLAY" || displayelement.tagName.toUpperCase() == "APP-TEXT-EDIT") {
            __j(tddatadiv).css("display", "block");
            __j(displayelement.inputelement).css("resize", "none");
        }

        tddatadiv.appendChild(displayelement);

        tdhostdiv.appendChild(tddatadiv);

        this.setCellWidth(pageno, rowno, col, tdhostdiv);

        this.callHook("createFieldTd", td);

        td.appendChild(tdhostdiv);

        return td;
    }

    dispatchRefreshEvent() {
        let startposition = this.startposition;
        this.setAttribute("startposition", startposition);
        let newevent = document.createEvent("CustomEvent");
        newevent.startposition = startposition;
        newevent.initCustomEvent("refresh", false, false, null);
        this.dispatchEvent(newevent);
    }

    dispatchFilterEvent() {
        let newevent = document.createEvent("CustomEvent");
        newevent.initCustomEvent("filter", false, false, null);
        this.dispatchEvent(newevent);
    }

    createFields(fields) {
        //if (!this.fieldscreated) {
        let thiselement = this;
        //}
        this.fieldinfos = fields;
        this.indexes = [];
        this.fieldnames = [];
        this.searchinputs = [];
        this.sortinputs = [];
        this.headerths = [];
        this.resizeset = false;
        this.columnsizes = [];

        clearChildNodes(this.headtr);
        clearChildNodes(this.searchtr);

        let temp = document.createElement('th');
        let tempdiv = document.createElement('div');
        tempdiv.setAttribute("id", this.id + "_selector_header_div");
        __j(tempdiv).width(rowselectorwidth);
        temp.appendChild(tempdiv);

        let temp2 = document.createElement('th');
        let tempdiv2 = document.createElement('div');
        tempdiv2.setAttribute("id", this.id + "_selector_header_div");
        __j(tempdiv2).width(!thiselement.noedit ? grideditsavedeletetdwidth : 0);
        temp2.appendChild(tempdiv2);
        //__j(temp).width(rowselectorwidth);

        //let temp2 = document.createElement('th');//removed because details button was removed
        //let temp5 = document.createElement('th');
        //let temp7 = document.createElement('th');
        this.headtr.appendChild(temp);
        this.headtr.appendChild(temp2);
        //this.headtr.appendChild(temp2);//removed because details button was removed
        //this.headtr.appendChild(temp5);
        //this.headtr.appendChild(temp7);
        for (let i = 0, col = 0; i < fields.length; i++ , col++) {
            let createdisplaycolumnsfunction = function () {
                //debugger;
                while (this.displaycolumns.indexOf(col) >= 0) {
                    let thtemp = document.createElement('th');
                    this.headerths.push(thtemp);
                    let thtempdiv = document.createElement('div');
                    thtemp.appendChild(thtempdiv);
                    thtemp.setAttribute("id", this.id + "_header_th_" + col);
                    thtempdiv.setAttribute("id", this.id + "_header_div_" + col);
                    thtempdiv.setAttribute("class", "header_div");
                    thtempdiv.innerText = this.displaycolumnheadertexts[this.displaycolumns.indexOf(col)];
                    this.headtr.appendChild(thtemp);
                    //this.setHeaderWidth(col);
                    col++;
                }
            }

            createdisplaycolumnsfunction.apply(this);

            let th = document.createElement('th');
            let thdiv = document.createElement('div');
            th.setAttribute('class', 'header');
            th.setAttribute('data-field', fields[i].field);
            th.setAttribute("id", this.id + "_header_th_" + col);
            thdiv.setAttribute("id", this.id + "_header_div_" + col);
            thdiv.setAttribute("class", "header_div");
            thdiv.innerText = fields[i].label;
            th.appendChild(thdiv);
            this.headtr.appendChild(th);
            this.headerths.push(th);
            //this.setHeaderWidth(col);

            createdisplaycolumnsfunction.apply(this);
        }
        let temp3 = document.createElement('th');
        temp3.setAttribute("class", "radiobuttonheader");
        let temp4 = document.createElement('th');
        //let temp6 = document.createElement('th');
        //let temp8 = document.createElement('th');
        this.searchtr.appendChild(temp3);
        this.searchtr.appendChild(temp4);
        //this.searchtr.appendChild(temp6);
        //this.searchtr.appendChild(temp8);
        for (let i = 0, col = 0; i < fields.length; i++ , col++) {
            while (this.displaycolumns.indexOf(col) >= 0) {
                let thtemp = document.createElement('th');
                this.searchtr.appendChild(thtemp);
                col++;
            }
            let th = document.createElement('th');
            th.setAttribute('data-field', fields[i].field);
            th.setAttribute('class', 'search');

            let searchinput = document.createElement('input');
            searchinput.setAttribute('type', 'text');
            searchinput.setAttribute('data-field', fields[i].field);
            searchinput.setAttribute("placeholder", "Search...");
            searchinput.setAttribute("id", this.id + "_search_input_" + col);
            this.searchinputs.push(searchinput);
            searchinput.addEventListener("keydown", function (event) {
                if (event.keyCode == 13) {
                    //alert("here");
                    thiselement.dispatchFilterEvent();
                }
            });

            let sortinput = document.createElement('select');
            sortinput.setAttribute('type', 'text');
            sortinput.setAttribute('data-field', fields[i].field);
            sortinput.setAttribute("id", this.id + "_sort_input_" + col);
            let emptyoption = document.createElement('option');
            emptyoption.innerText = 'Sort...';
            emptyoption.setAttribute("disabled", "disabled");
            let ascendingoption = document.createElement('option');
            ascendingoption.innerText = "Ascending";
            ascendingoption.value = "asc";
            let descendingoption = document.createElement('option');
            descendingoption.innerText = "Descending";
            descendingoption.value = "desc";
            sortinput.appendChild(emptyoption);
            sortinput.selectedIndex = 0;
            sortinput.appendChild(ascendingoption);
            sortinput.appendChild(descendingoption);
            this.sortinputs.push(sortinput);
            sortinput.addEventListener("change", function (event) {
                //clear all other sort inputs
                for (let i = 0; i < thiselement.sortinputs.length; i++) {
                    if (thiselement.sortinputs[i] != this) {
                        thiselement.sortinputs[i].selectedIndex = 0;
                    }
                }
                thiselement.dispatchFilterEvent();
            });

            let searchinputdiv = document.createElement('div');
            searchinputdiv.setAttribute("class", "searchinputdiv");
            let sortinputdiv = document.createElement('div');
            sortinputdiv.setAttribute("class", "sortinputdiv");

            searchinputdiv.appendChild(searchinput);
            sortinputdiv.appendChild(sortinput);

            th.appendChild(sortinputdiv);
            th.appendChild(searchinputdiv);
            this.searchtr.appendChild(th);

            while (this.displaycolumns.indexOf(col) >= 0) {
                let thtemp = document.createElement('th');
                this.searchtr.appendChild(thtemp);
                col++;
            }
        }
        for (let i = 0; i < this.fieldinfos.length; i++) {
            let fieldinfo = this.fieldinfos[i];

            let field = fieldinfo.field;
            let splitfield = field.split('.');
            let index = splitfield[0];
            let fieldname = splitfield[1];

            this.indexes.push(index);
            this.fieldnames.push(fieldname);
        }


        //this.controlstr.setAttribute('class', 'grid-controls-tr');
        //this.controlstd.setAttribute("colspan", this.fieldinfos.length + 2 + this.displaycolumns.length);//changed because details button was removed
        this.controlstd.setAttribute("colspan", this.fieldinfos.length + 2 + this.displaycolumns.length);

        __j(thiselement.bodycontainer).css("margin-top", __j(thiselement.headcontainer).outerHeight());
        let setbodymargintimeout = setInterval(function () {
            if (!self.frameElement.opened) {
                clearTimeout(setbodymargintimeout);
            }
            else {
                __j(thiselement.bodycontainer).css("margin-top", __j(thiselement.headcontainer).outerHeight());
            }
        }, 1000);


        if (this.columnresizeinterval) {
            clearInterval(this.columnresizeinterval);
        }

        this.columnresizeinterval = setInterval(function () {
            if (!self.frameElement.opened) {
                clearInterval(this.columnresizeinterval);
            }
            else {
                for (let i = 0; i < thiselement.headerths.length; i++) {
                    let thdiv = thiselement.shadowRoot.getElementById(thiselement.id + "_header_div_" + i);
                    let width = __j(thdiv).width();
                    if (thiselement.columnsizes[i] !== null && thiselement.columnsizes[i] !== undefined) {
                        if (width != thiselement.columnsizes[i]) {
                            thiselement.columnsizes[i] = width;
                            thiselement.setColumnWidth(i);
                        }
                    }
                }
            }
        }, 500);
        //__j(this.headcontainer).css('width', this.bodycontainer.clientWidth);

        //this.setColumnWidths(pageno);
        if (!this.resizeset) {
            //this.setInputWidths();
            for (let i = 0; i < this.headerths.length; i++) {
                let thdiv = this.shadowRoot.getElementById(this.id + "_header_div_" + i);

                let savedlength = getViewCookie(formTypeName + "_" + formCaption + "_" + this.id + "_col_" + i);
                if (savedlength) {
                    //debugger;
                    setViewCookie(formTypeName + "_" + formCaption + "_" + this.id + "_col_" + i, savedlength);//to prolong the expiry date
                    __j(thdiv).width(savedlength);
                }

                let width = __j(thdiv).width();

                this.columnsizes[i] = width;

                let searchinput = this.shadowRoot.getElementById(this.id + "_search_input_" + i);
                if (searchinput) {
                    let widthstring = width + "px";
                    __j(searchinput).css("width", widthstring);
                }
                let sortinput = this.shadowRoot.getElementById(this.id + "_sort_input_" + i);
                if (sortinput) {
                    let widthstring = width + "px";
                    __j(sortinput).css("width", widthstring);
                }

                __j(thdiv).css("resize", "horizontal");
                __j(thdiv).css("border", "1px; solid");
                __j(thdiv).css("overflow", "auto");

                //thdiv.addEventListener("mouseup", function (event) {
                //    thiselement.setColumnWidth(i);
                //});
            }
            this.resizeset = true;
        }

        this.callHook("createFields", this);

        //this.entitycontrolstd.setAttribute("colspan", this.fieldinfos.length + 2 + this.displaycolumns.length);

        //reloadrecorddiv.setAttribute('id', this.id + "_" + pageno.toString() + "_" + rowno + "_" + "tr_reload_link");


        //deleterecorddiv.setAttribute('id', this.id + "_" + pageno.toString() + "_" + rowno + "_" + "tr_delete_link");
        //deleterecorddiv.setAttribute('class', 'app-grid-row_delete_link');
        //deleterecorddiv.setAttribute('gridid', this.id);
        //deleterecorddiv.innerText = "Delete";

    }

    clearFilters() {
        for (let i = 0; i < this.searchinputs.length; i++) {
            this.searchinputs[i].value = "";
        }

        for (let i = 0; i < this.sortinputs.length; i++) {
            this.sortinputs[i].selectedIndex = 0;
        }

        this.callHook("clearFilters", this);
    }

    getSortSettings() {
        for (let i = 0; i < this.sortinputs.length; i++) {
            if (this.sortinputs[i].selectedIndex > 0) {
                return { field: this.sortinputs[i].getAttribute("data-field"), direction: this.sortinputs[i].options[this.sortinputs[i].selectedIndex].value };
            }
        }
        return null;
    }

    getFilterValues() {
        let filters = {};

        for (let i = 0; i < this.searchinputs.length; i++) {
            let field = this.searchinputs[i].getAttribute('data-field');
            let value = this.searchinputs[i].value;
            filters[field] = value;
        }

        return filters;
    }

    createControls() {
        let thiselement = this;
        let controlsdiv = document.createElement('div');
        controlsdiv.setAttribute('class', 'grid-controls');

        let gridcontrolsdiv = document.createElement('div');
        gridcontrolsdiv.setAttribute("style", 'grid-controls-controls');

        this.multiselectdiv = document.createElement('button');
        this.multiselectdiv.setAttribute("id", this.id + "_multiselect");
        this.multiselectdiv.setAttribute("class", "grid-multiselect");
        this.multiselectdiv.innerText = "Multi-Select";
        this.multiselectdiv.addEventListener("click", function (event) {
            //thiselement.multiSelectMode(!thiselement.multiselectmode);

            thiselement.dispatchMultiSelectEvent(!thiselement.multiselectmode);
        });

        //this.createnewdiv = document.createElement('button');
        //this.createnewdiv.setAttribute("id", this.id + "_createnew");
        //this.createnewdiv.setAttribute("class", "grid-createnew");
        //this.createnewdiv.innerText = "Create New";
        //this.createnewdiv.addEventListener("click", function (event) {
        //    let newevent = document.createEvent("CustomEvent");
        //    newevent.initCustomEvent("createnew", false, false, null);
        //    thiselement.dispatchEvent(newevent);
        //});

        this.reloaddiv = document.createElement('button');
        this.reloaddiv.setAttribute("id", this.id + "_reload-grid");
        this.reloaddiv.setAttribute("class", "grid-reload-grid");
        this.reloaddiv.innerText = "Refresh";
        this.reloaddiv.addEventListener("click", function (event) {
            thiselement.dispatchRefreshEvent();
        });

        this.movetofirstdiv = document.createElement('button');
        this.movetofirstdiv.setAttribute("id", this.id + "_move-to-first");
        this.movetofirstdiv.setAttribute("class", "grid-move-to-first");
        this.movetofirstdiv.innerText = "First";
        this.movetofirstdiv.addEventListener("click", function (event) {
            thiselement.bottomloaded = false;
            let startposition = "first";
            thiselement.setAttribute("startposition", startposition);
            let newevent = document.createEvent("CustomEvent");
            newevent.startposition = startposition;
            newevent.initCustomEvent("refresh", false, false, null);
            thiselement.dispatchEvent(newevent);
            thiselement.scrollToRow(1, 0);
        });

        this.movetopreviousdiv = document.createElement('button');
        this.movetopreviousdiv.setAttribute("id", this.id + "_move-to-previous");
        this.movetopreviousdiv.setAttribute("class", "grid-move-to-previous");
        this.movetopreviousdiv.innerText = "Previous";
        this.movetopreviousdiv.addEventListener("click", function (event) {
            let pageno = thiselement.selectedpageno;
            let rowno = thiselement.selectedrowno;
            if (rowno == 0) {
                pageno--;
                rowno = thiselement.alldata[pageno].length - 1; // thiselement.pagelength - 1;
            }
            else {
                rowno--;
            }
            if (pageno > 0) {
                if (!thiselement.multiselectmode) {
                    thiselement.dispatchSelectionChangedEvent(pageno, rowno);
                }
                thiselement.scrollToRow(pageno, rowno);
            }
        });

        this.movetonextdiv = document.createElement('button');
        this.movetonextdiv.setAttribute("id", this.id + "_move-to-next");
        this.movetonextdiv.setAttribute("class", "grid-move-to-next");
        this.movetonextdiv.innerText = "Next";
        this.movetonextdiv.addEventListener("click", function (event) {
            let pageno = thiselement.selectedpageno;
            let rowno = thiselement.selectedrowno;
            if (rowno >= thiselement.alldata[pageno] - 1) {
                pageno++;
                rowno = 0;
            }
            else {
                rowno++;
            }
            if (pageno > 0) {
                if (!thiselement.multiselectmode) {
                    thiselement.dispatchSelectionChangedEvent(pageno, rowno);
                }
                thiselement.scrollToRow(pageno, rowno);
            }
        });

        this.movetolastdiv = document.createElement('button');
        this.movetolastdiv.setAttribute("id", this.id + "_move-to-last");
        this.movetolastdiv.setAttribute("class", "grid-move-to-last");
        this.movetolastdiv.innerText = "Last";
        this.movetolastdiv.addEventListener("click", function (event) {
            thiselement.toploaded = false;
            let startposition = "last";
            thiselement.setAttribute("startposition", startposition);
            let newevent = document.createEvent("CustomEvent");
            newevent.startposition = startposition;
            newevent.initCustomEvent("refresh", false, false, null);
            thiselement.dispatchEvent(newevent);

            //if (thiselement.alldata[1] && thiselement.alldata[1].length > 0) {
            //    thiselement.scrollToRow(1, thiselement.alldata[1].length - 1);
            //}
        });



        this.reloadrecorddiv = document.createElement('button');
        this.reloadrecorddiv.setAttribute("id", this.id + "_reload-record");
        this.reloadrecorddiv.setAttribute("class", "grid-reload-record");
        this.reloadrecorddiv.innerText = "Reload Selected";
        this.reloadrecorddiv.addEventListener("click", function (event) {
            let newevent = document.createEvent("CustomEvent");
            newevent.initCustomEvent("reloadlinkclicked", false, false, null);
            thiselement.dispatchEvent(newevent);
        });

        this.clearquerydiv = document.createElement('button');
        this.clearquerydiv.setAttribute("id", this.id + "_clear-query-button");
        this.clearquerydiv.setAttribute("class", "grid-clear-query-button");
        this.clearquerydiv.innerText = "Clear Query";
        this.clearquerydiv.addEventListener("click", function (event) {
            let newevent = document.createEvent("CustomEvent");
            newevent.initCustomEvent("clearquerylinkclicked", false, false, null);
            thiselement.dispatchEvent(newevent);
        });

        this.querydiv = document.createElement('button');
        this.querydiv.setAttribute("id", this.id + "_query-button");
        this.querydiv.setAttribute("class", "grid-query-button");
        this.querydiv.innerText = "Query";
        this.querydiv.addEventListener("click", function (event) {
            let newevent = document.createEvent("CustomEvent");
            newevent.initCustomEvent("querylinkclicked", false, false, null);
            thiselement.dispatchEvent(newevent);
        });

        this.exporttoexceldiv = document.createElement('button');
        this.exporttoexceldiv.setAttribute("id", this.id + "_export-button");
        this.exporttoexceldiv.setAttribute("class", "grid-query-button");
        this.exporttoexceldiv.innerText = "Export";
        this.exporttoexceldiv.addEventListener("click", function (event) {
            let newevent = document.createEvent("CustomEvent");
            newevent.initCustomEvent("exportlinkclicked", false, false, null);
            thiselement.dispatchEvent(newevent);
        });

        //reloadrecorddiv.setAttribute('class', 'app-grid-row_reload_link');
        //reloadrecorddiv.setAttribute('gridid', this.id);
        //reloadrecorddiv.innerText = "Reload Selected";


        //this.deleterecorddiv = document.createElement('button');
        //this.deleterecorddiv.setAttribute("id", this.id + "_delete-record");
        //this.deleterecorddiv.setAttribute("class", "grid-delete-record");
        //this.deleterecorddiv.innerText = "Delete Selected";
        //this.deleterecorddiv.setAttribute("disabled", "disabled");
        //this.deleterecorddiv.addEventListener("click", function (event) {
        //    let newevent = document.createEvent("CustomEvent");
        //    newevent.initCustomEvent("deletelinkclicked", false, false, null);
        //    thiselement.dispatchEvent(newevent);
        //});

        let rowcontrolsdiv = document.createElement('div');

        gridcontrolsdiv.appendChild(this.multiselectdiv);
        //gridcontrolsdiv.appendChild(this.createnewdiv);
        gridcontrolsdiv.appendChild(this.reloadrecorddiv);
        gridcontrolsdiv.appendChild(this.reloaddiv);
        gridcontrolsdiv.appendChild(this.movetofirstdiv);
        gridcontrolsdiv.appendChild(this.movetonextdiv);
        gridcontrolsdiv.appendChild(this.movetopreviousdiv);
        gridcontrolsdiv.appendChild(this.movetolastdiv);
        gridcontrolsdiv.appendChild(this.querydiv);
        gridcontrolsdiv.appendChild(this.clearquerydiv);
        gridcontrolsdiv.appendChild(this.exporttoexceldiv);


        //rowcontrolsdiv.appendChild(this.deleterecorddiv);

        controlsdiv.appendChild(gridcontrolsdiv);
        controlsdiv.appendChild(rowcontrolsdiv);

        this.headcontainer.appendChild(controlsdiv);
    }

    getSelectedData() {
        let pageno = this.getAttribute("selectedpageno");
        let rowno = this.getAttribute("selectedrowno");

        if (pageno) {
            return this.alldata[pageno][rowno];
        }
        else {
            return null;
        }
    }

    //selectionChanged() {
    //}

    //active() {
    //}

    setWidthAndHeight() {
        __j(this.elementcontainer).css('width', this.width);
        __j(this.elementcontainer).css('height', this.height);

        //this.compensateForEntityControlsDiv();
    }
}

class AppValueElement extends HTMLElement {
    constructor() {
        super();
        this.hooks = {};
        this.attachShadow({ mode: 'open' });
        if (Object.keys(elementStyles).indexOf(this.tagName.toUpperCase()) != -1) {
            let styles = elementStyles[this.tagName];
            for (let i = 0; i < styles.length; i++) {
                let style = styles[i];
                let link = document.createElement('link');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('type', 'text/css');
                link.setAttribute('href', style);
                this.shadowRoot.appendChild(link);
            }
        }
    }
    connectedCallback() {
        this.callHook("connectedCallback", this);
    }

    disconnectedCallback() {
        this.callHook("disconnectedCallback", this);
    }

    registerHook(hookname, callback) {
        if (this.hooks[hookname] === undefined) {
            this.hooks[hookname] = [];
        }
        this.hooks[hookname].push(callback);
    }

    deRegisterHook(hookname, callback) {
        if (this.hooks[hookname]) {
            //let hooks = [];
            let hooks = this.hooks[hookname];
            let callbackindex = hooks.indexOf(callback);
            if (callbackindex != -1) {
                hooks.splice(callbackindex, 1);
            }
        }
    }

    callHook(hookname, arg) {
        if (this.hooks[hookname]) {
            for (let i = 0; i < this.hooks[hookname].length; i++) {
                let fn = this.hooks[hookname][i];
                fn.apply(this, [arg]);
            }
        }
    }
}

class AppStringEdit extends AppValueElement {
    constructor() {
        super();
        //this gives an error saying that the result of document.createElement must not have attributes
        //if (!this.getAttribute("id")) {
        //    anonymouselementid++;
        //    this.setAttribute("id", "anon_" + anonymouselementid);
        //}
        this.spanelement = document.createElement('span');
        this.spanelement.setAttribute('style', 'display: inline-flex; flex-direction: row; width:100%');
        this.inputelement = document.createElement('input');
        this.inputelement.setAttribute('type', 'text');
        this.inputelement.setAttribute('style', 'flex: 1 1 auto; min-width:5px');

        let shadowRoot = this.shadowRoot;
        this.spanelement.appendChild(this.inputelement);

        let thiselement = this;
        this.inputelement.addEventListener("change", function (event) {
            thiselement.dispatchChangeEvent();
        });

        this.inputelement.addEventListener("blur", function (event) {
            thiselement.dispatchBlurEvent();
        });

        this.lookupbuttonelement = document.createElement('button');
        this.lookupbuttonelement.setAttribute('style', 'flex: 0 1 auto;');
        this.lookupbuttonelement.setAttribute('tabindex', '-1');
        //this.lookupbuttonelement.setAttribute('value', '...');
        this.lookupbuttonelement.innerText = '...';

        this.spanelement.appendChild(this.lookupbuttonelement);
        //let thiselement = this;
        this.lookupbuttonelement.addEventListener('click', function (event) {
            thiselement.lookupbuttonelement.setAttribute("initialvalue", thiselement.value);
            thiselement.lookupbuttonelement.setAttribute("lookupentity", thiselement.lookupentity);
            thiselement.lookupbuttonelement.setAttribute("lookupfield", thiselement.lookupfield);
            thiselement.lookupbuttonelement.setAttribute("app-string-edit-id", thiselement.id);
            //thiselement.lookupbuttonelement.setAttribute("hostelement", thiselement.getAttribute("hostelement"));
            thiselement.lookupbuttonelement.setAttribute("loadableelement", thiselement.getAttribute("loadableelement"));
            sendClientEventToServer(event, undefined, "lookupbuttonclick");//we have to use this because if we register by css selector, new elements will not be registered for that event...and these kinds of elements are generated all the time...e.g when app-grid loads or loads more
        });

        shadowRoot.appendChild(this.spanelement);

        this.setLookupVisibility();
        //if (this.lookupentity && this.lookupfield) {

        //}

        //this.aelement = null;
        //if (this.lookupentity && this.lookupfield) {
        //    this.aelement = document.createElement('a');

        //    this.spanelement.appendChild(this.aelement);
        //}
        //this.load();
        callCreatedHook(this);
    }
    dispatchChangeEvent() {
        let newevent = document.createEvent("CustomEvent");
        newevent.initCustomEvent("change", false, false, null);
        this.dispatchEvent(newevent);
    }
    dispatchBlurEvent() {
        let newevent = document.createEvent("CustomEvent");
        newevent.initCustomEvent("blur", false, false, null);
        this.dispatchEvent(newevent);
    }
    static get observedAttributes() {
        return [//'style',
            'inputstyle',
            'buttonstyle',
            'autofocus',
            'maxlength',
            'pattern',
            'placeholder',
            'readonly',
            'disabled',
            'required',
            'value',
            'lookupentity',
            'lookupfield'];
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            //case "style":
            //    this.spanelement.setAttribute("style", newVal);
            //    break;
            case "inputstyle":
                this.inputelement.setAttribute("style", newVal);
                break;
            case "buttonstyle":
                this.lookupbuttonelement.setAttribute("style", newVal);
                break;
            case "value":
                let changed = this.value != newVal;
                this.value = newVal;
                if (changed) {
                    this.dispatchChangeEvent();
                }
                //this.setValue();
                break;
            //case "lookupentity":
            //    break;
            //case "lookupfield":
            //    break;
            case "autofocus":
            case "maxlength":
            case "pattern":
            case "placeholder":
            case "required":
                this.inputelement.setAttribute(attrName, newVal);
                break;
            case "readonly":
                //if (oldVal != newVal) {

                //}
                this.setLookupVisibility();
                this.inputelement.setAttribute(attrName, newVal);
                break;
            case "disabled":
                this.inputelement.setAttribute(attrName, newVal);
                this.lookupbuttonelement.setAttribute(attrName, newVal);
                break;
            case "lookupentity":
            case "lookupfield":
                this.setLookupVisibility();
                break;
            default:
                break;
        }
    }
    get lookupentity() {
        return this.getAttribute("lookupentity");
    }
    get lookupfield() {
        return this.getAttribute("lookupfield");
    }
    //get lookupcriteria() {
    //    return this.getAttribute("lookupcriteria");
    //}
    set value(v) {
        this.inputelement.value = v;
        //setValue();
    }
    get value() {
        return this.inputelement.value;
    }
    get readonly() {
        return this.hasAttribute("readonly");
    }
    get disabled() {
        return this.hasAttribute("disabled");
    }
    setLookupVisibility() {
        //if (this.readonly) {
        //    __j(this.lookupbuttonelement).hide();
        //}
        //else {
        //    __j(this.lookupbuttonelement).show();
        //}
        if (this.lookupentity && this.lookupfield && !this.readonly) {
            __j(this.lookupbuttonelement).css("display", "block");
        }
        else {
            __j(this.lookupbuttonelement).css("display", "none");
        }
    }
}

class AppStringDisplay extends AppValueElement {
    constructor() {
        super();
        let thiselement = this;
        this.__lookuplinkclick = function (event) {
            sendClientEventToServer(event, undefined, "lookuplinkclick");
            let contextmenu = document.getElementById("formcontextmenu");
            __j(contextmenu).hide(100);
            //remove selection caused by double click
            //if (document.selection && document.selection.empty) {
            //    document.selection.empty();
            //} else if (window.getSelection) {
            //    var sel = window.getSelection();
            //    sel.removeAllRanges();
            //}
        };
        this.__lookuplistlinkclick = function (event) {
            sendClientEventToServer(event, undefined, "lookuplistlinkclick");
            let contextmenu = document.getElementById("formcontextmenu");
            __j(contextmenu).hide(100);
        };
        this.__lookupcontextmenu = function (event) {
            event.preventDefault();
            let contextmenu = document.getElementById("formcontextmenu");
            contextmenu.innerHTML = '';

            let gotorecord = document.createElement('li');
            let gotorecordlink = document.createElement('a');
            gotorecordlink.innerText = "Go To '" + thiselement.value + "' Details";
            gotorecordlink.setAttribute("href", "javascript:void(0)");
            gotorecordlink.setAttribute("lookupentity", event.currentTarget.getAttribute("lookupentity"));
            gotorecordlink.setAttribute("lookupfield", event.currentTarget.getAttribute("lookupfield"));
            gotorecordlink.setAttribute("value", event.currentTarget.getAttribute("value"));
            gotorecordlink.addEventListener("click", thiselement.__lookuplinkclick);
            gotorecord.appendChild(gotorecordlink);

            let gotolist = document.createElement('li');
            let gotolistlink = document.createElement('a');
            gotolistlink.innerText = "Go To List";
            gotolistlink.setAttribute("href", "javascript:void(0)");
            gotolistlink.setAttribute("lookupentity", event.currentTarget.getAttribute("lookupentity"));
            gotolistlink.setAttribute("lookupfield", event.currentTarget.getAttribute("lookupfield"));
            gotolistlink.setAttribute("value", event.currentTarget.getAttribute("value"));
            gotolistlink.addEventListener("click", thiselement.__lookuplistlinkclick);
            gotolist.appendChild(gotolistlink);


            contextmenu.appendChild(gotorecord);
            contextmenu.appendChild(gotolist);

            __j(contextmenu).finish().show(400).
                css({
                    top: event.pageY + "px",
                    left: event.pageX + "px"
                });
        };
        let shadowRoot = this.shadowRoot;

        //let style = document.createElement('style');
        //style.innerHTML = "span{width: 15px}";
        //shadowRoot.appendChild(style);

        let style = document.createElement('style');
        style.innerHTML = 'span:before { content: "\\200b"; }';
        shadowRoot.appendChild(style);

        this.spanelement = document.createElement('span');
        shadowRoot.appendChild(this.spanelement);

        this.setLookup();
        //this.setOtherStyles();
        //overflow: hidden; word-wrap: break-word; text-overflow: ellipsis;

        //this.aelement = null;
        //if (this.lookupentity && this.lookupfield) {
        //    this.aelement = document.createElement('a');

        //    this.spanelement.appendChild(this.aelement);
        //}
        //this.load();
        callCreatedHook(this);
    }
    setOtherStyles() {
        if (this.lookupentity && this.lookupfield) {
            this.spanelement.style.textDecoration = "underline";
            this.spanelement.style.cursor = "pointer";
        }
        this.spanelement.style.overflow = "hidden";
        this.spanelement.style.wordWrap = "break-word";
        this.spanelement.style.textOverflow = "ellipsis";
    }
    setLookup() {
        if (this.lookupentity && this.lookupfield) {
            this.spanelement.setAttribute("class", "lookuplink");
            this.addEventListener("contextmenu", this.__lookupcontextmenu, false);
        }
        else {
            this.spanelement.removeAttribute("class", "lookuplink");
            this.removeEventListener("contextmenu", this.__lookupcontextmenu);
        }
        this.setOtherStyles();
    }
    static get observedAttributes() {
        return ['style', 'value', 'lookupentity', 'lookupfield'];
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "style":
                this.spanelement.setAttribute("style", newVal);
                this.setOtherStyles();
                break;
            case "value":
                //this.value = newVal;
                this.setValue(this.value);
                break;
            case "lookupentity":
            case "lookupfield":
                this.setLookup();
            default:
                break;
        }
    }
    get lookupentity() {
        return this.getAttribute("lookupentity");
    }
    get lookupfield() {
        return this.getAttribute("lookupfield");
    }
    //get lookupcriteria() {
    //    return this.getAttribute("lookupcriteria");
    //}
    set value(v) {
        this.setAttribute("value", v);
        //setValue();
    }
    get value() {
        return this.getAttribute("value");
    }
    setValue(value) {
        this.spanelement.innerText = value;
        let newevent = document.createEvent("CustomEvent");
        newevent.initCustomEvent("change", false, false, null);
        this.dispatchEvent(newevent);
    }
}

class AppNumEdit extends AppValueElement {
    constructor() {
        super();
        this.inputelement = document.createElement('input');
        this.inputelement.setAttribute('type', 'number');

        let shadowRoot = this.shadowRoot;
        //this.spanelement.appendChild(this.inputelement);

        shadowRoot.appendChild(this.inputelement);

        let thiselement = this;
        this.inputelement.addEventListener("change", function (event) {
            let newevent = document.createEvent("CustomEvent");
            newevent.initCustomEvent("change", false, false, null);
            thiselement.dispatchEvent(newevent);
        });

        callCreatedHook(this);
    }
    static get observedAttributes() {
        return [
            'style',
            'autofocus',
            'placeholder',
            'readonly',
            'disabled',
            'required',
            'value',
            'step',
            'min',
            'max',
            'decimals'];
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "style":
                this.inputelement.setAttribute("style", newVal);
                break;
            case "value":
                this.value = newVal;
                //this.setValue();
                break;
            case "autofocus":
            case "placeholder":
            case "readonly":
            case "disabled":
            case "required":
            case "step":
            case "max":
            case "min":
                this.inputelement.setAttribute(attrName, newVal);
                break;
            case "decimals":
                this.value = this.getValue(this.inputelement.value);
                if (this.decimals > 0) {
                    let stepstring = ".1";
                    for (let i = 0; i < this.decimals; i++) {
                        stepstring = "0" + stepstring;
                    }
                    this.inputelement.setAttribute("step", stepstring);
                }
                else {
                    this.inputelement.removeAttribute("step");
                }
                break;
            default:
                break;
        }
    }
    getValue(v) {
        let floatvalue = parseFloat(v);
        v = floatvalue.toFixed(this.decimals);
        return v;
    }
    //get lookupcriteria() {
    //    return this.getAttribute("lookupcriteria");
    //}
    set value(v) {
        this.inputelement.value = v;
    }
    get value() {
        return this.getValue(this.inputelement.value);
    }
    get readonly() {
        return this.hasAttribute("readonly");
    }
    get disabled() {
        return this.hasAttribute("disabled");
    }
    get decimals() {
        let decimalstrings = this.getAttribute("decimals");
        return decimalstrings ? parseInt(decimalstrings) : 0;
    }
}

class AppNumDisplay extends AppStringDisplay {
    constructor() {
        super();
        //__j(this.spanelement).css("text-align", "right");
        //let style = document.createElement('style');
        //style.innerHTML = 'span{text-align: right}';
        //this.shadowRoot.appendChild(style);
        callCreatedHook(this);
    }
    static get observedAttributes() {
        return AppStringDisplay.observedAttributes;
    }
    setValue(v) {
        let floatvalue = parseFloat(v);
        v = floatvalue.toFixed(this.decimals);
        //v = floatvalue.toLocaleString();
        super.setValue(Number(floatvalue).toLocaleString());
    }
    get decimals() {
        let decimalstrings = this.getAttribute("decimals");
        return decimalstrings ? parseInt(decimalstrings) : 0;
    }
}

class AppEnumEdit extends AppValueElement {

    constructor() {
        super();
        //this.inputelement = null;
        this.inputelement = document.createElement('select');
        this.emptyenumvalue = null;
        var thiselement = this;
        this.inputelement.addEventListener('change', function (event) {
            let newevent = document.createEvent("CustomEvent");
            newevent.initCustomEvent("change", false, false, null);
            thiselement.dispatchEvent(newevent);
        });
        //this.appendChild(this.inputelement);
        let shadowRoot = this.shadowRoot;
        shadowRoot.appendChild(this.inputelement);

        this.load();

        callCreatedHook(this);
        //this.innerHTML = '<select></select>';
        //document.onload = function () {

        //};
    }
    static get observedAttributes() {
        return ['readonly', 'disabled', 'style', 'value', 'autofocus', 'required', 'enum', 'multiple'];
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "disabled":
                this.disableComponents(this.disabled);
                break;
            case "readonly":
                this.setAttribute("disabled", "disabled");
                break;
            case "style":
                this.inputelement.setAttribute(attrName, newVal);
                break;
            case "value":
                this.value = newVal;
                break;
            case "autofocus":
            case "required":
                this.inputelement.setAttribute(attrName, newVal);
                break;
            case "enum":
                this.load();
                break;
            case "multiple":
                this.inputelement.setAttribute(attrName, newVal);
                break;
            default:
                break;
        }
    }
    get multiple() {
        return this.hasAttribute('multiple');
    }
    set multiple(v) {
        if (v) {
            this.setAttribute('multiple', '');
        }
        else {
            this.removeAttribute('multiple');
        }
    }
    get enum() {
        return this.getAttribute('enum');
    }
    set enum(value) {
        this.setAttribute('enum', value);
    }
    set value(v) {

        let values = [];
        if (this.multiple) {
            values = v.split(',');
            if (values.length > 0) {
                for (let i = 0; i < values.length; i++) {
                    values[i] = values[i].trim();
                }
            }
            else {
                values = [v];
            }
        }
        else {
            values = [v];
        }

        //let value = v;
        let valuefound = false;
        this.inputelement.selectedIndex = -1;
        for (let x = 0; x < values.length; x++) {
            let value = values[x];
            for (let i = 0; i < this.inputelement.options.length; i++) {
                if (this.inputelement.options[i].value == value) {
                    this.inputelement.options[i].selected = true;
                    valuefound = true;
                    break;
                }
            }
            if (!valuefound && typeof value === "number" && value < this.inputelement.options.length) {
                this.inputelement.selectedIndex = value;
                valuefound = true;
            }
        }

        if (!valuefound && this.emptyenumvalue) {
            this.value = this.emptyenumvalue.value;
        }
    }
    get value() {
        let values = this.values;
        if (values.length == 0) {
            return null;
        }
        else {
            let ret = '';
            for (let i = 0; i < values.length; i++) {
                ret += values[i];
                if (i < values.length - 1) {
                    ret += ', ';
                }
            }
            return ret;
        }

        if (this.inputelement.selectedIndex != -1) {
            return this.inputelement.options[this.inputelement.selectedIndex].value;
        }
        else {
            return null;
        }
    }
    set values(values) {
        for (let i = 0; i < this.inputelement.options.length; i++) {
            if (!values.includes(this.inputelement.options[i].value)) {
                this.inputelement.options[i].selected = false;
            }
            else {
                this.inputelement.options[i].selected = true;
            }
        }
    }
    get values() {
        let ret = [];
        for (let i = 0; i < this.inputelement.options.length; i++) {
            if (this.inputelement.options[i].selected) {
                ret.push(this.inputelement.options[i].value);
            }
        }
        return ret;
    }

    get disabled() {
        return this.hasAttribute('disabled');
    }
    get readonly() {
        return this.disabled;
    }
    //set readonly(value) {
    //    this.disabled = value;
    //}
    disableComponents(value) {
        this.inputelement.disabled = value;
    }
    load() {
        let enumvalues = self.top.enumdata[this.enum] ? self.top.enumdata[this.enum] : [];
        var innerhtml = "";
        for (let i = 0; i < enumvalues.length; i++) {
            let selected = enumvalues[i].empty ? "selected=\"selected\"" : "";
            innerhtml += '<option value="' + enumvalues[i].value + '"' + selected + '>' + enumvalues[i].label + '</option>';
            if (enumvalues[i].empty) {
                this.emptyenumvalue = enumvalues[i];
            }
        }
        //el.innerHTML = "<select>" + innerhtml + "</select>";
        this.inputelement.innerHTML = innerhtml;
    }

}

class AppEnumDisplay extends AppStringDisplay {
    constructor() {
        super();
        //this.spanelement = document.createElement('span');
        //let shadowRoot = this.attachShadow({ mode: 'open' });
        //shadowRoot.appendChild(this.spanelement);
        this.enumvalues = [];
        this.emptyenumvalue = null;
        this.load();

        callCreatedHook(this);
    }
    static get observedAttributes() {
        return ['enum'].concat(AppStringDisplay.observedAttributes);
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "enum":
                this.load();
                break;
            default:
                break;
        }
        super.attributeChangedCallback(attrName, oldVal, newVal);
    }
    get enum() {
        return this.getAttribute('enum');
    }
    set enum(value) {
        this.setAttribute('enum', value);
    }
    set value(v) {
        this.spanelement.setAttribute("value", v);
        let valuefound = false;
        for (let i = 0; i < this.enumvalues.length; i++) {
            if (this.enumvalues[i].value == v) {
                this.spanelement.innerText = this.enumvalues[i].label;
                valuefound = true;
                break;
            }
        }
        if (!valuefound && this.emptyenumvalue) {
            this.value = this.emptyenumvalue.value;
        }
        let newevent = document.createEvent("CustomEvent");
        newevent.initCustomEvent("change", false, false, null);
        this.dispatchEvent(newevent);
    }
    get value() {
        //return super.value;// this.spanelement.getAttribute("value");
        return this.spanelement.getAttribute("value");
    }
    load() {
        this.enumvalues = self.top.enumdata[this.enum] ? self.top.enumdata[this.enum] : [];
        var innerhtml = "";
        for (let i = 0; i < this.enumvalues.length; i++) {
            if (this.enumvalues[i].empty) {
                this.emptyenumvalue = this.enumvalues[i];
                this.value = this.emptyenumvalue.value;
                break;
            }
        }
    }
}

class AppTextEdit extends AppValueElement {
    constructor() {
        super();
        this.inputelement = document.createElement('textarea');

        let shadowRoot = this.shadowRoot;
        //this.spanelement.appendChild(this.inputelement);

        shadowRoot.appendChild(this.inputelement);

        let thiselement = this;
        this.inputelement.addEventListener("change", function (event) {
            let newevent = document.createEvent("CustomEvent");
            newevent.initCustomEvent("change", false, false, null);
            thiselement.dispatchEvent(newevent);
        });

        callCreatedHook(this);
    }
    static get observedAttributes() {
        return [
            'style',
            'autofocus',
            'cols',
            'rows',
            'maxlength',
            'placeholder',
            'readonly',
            'disabled',
            'required',
            'wrap',
            'value'];
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "style":
            case "autofocus":
            case "cols":
            case "rows":
            case "maxlength":
            case "placeholder":
            case "readonly":
            case "disabled":
            case "required":
            case "wrap":
                this.inputelement.setAttribute(attrName, newVal);
                break;
            case "value":
                this.value = newVal;
                //this.setValue();
                break;
            default:
                break;
        }
    }
    //get lookupcriteria() {
    //    return this.getAttribute("lookupcriteria");
    //}
    set value(v) {
        this.inputelement.value = v;
        //setValue();
    }
    get value() {
        return this.inputelement.value;
    }
    get disabled() {
        return this.hasAttribute('disabled');
    }
    get readonly() {
        return this.hasAttribute('readonly');
    }
}

class AppTextDisplay extends AppTextEdit {
    constructor() {
        super();
        this.inputelement.setAttribute("disabled", "disabled");

        callCreatedHook(this);
    }
    static get observedAttributes() {
        return AppTextEdit.observedAttributes;
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "disabled":
            case "readonly":
                this.inputelement.setAttribute("disabled", "disabled");
                break;
            default:
                super.attributeChangedCallback(attrName, oldVal, newVal);
                break;
        }
    }
}

class AppDateEdit extends AppValueElement {
    constructor() {
        super();
        this.inputelement = document.createElement('input');
        this.inputelement.setAttribute('type', 'date');

        let shadowRoot = this.shadowRoot;
        //this.spanelement.appendChild(this.inputelement);

        shadowRoot.appendChild(this.inputelement);

        let thiselement = this;
        this.inputelement.addEventListener("change", function (event) {
            let newevent = document.createEvent("CustomEvent");
            newevent.initCustomEvent("change", false, false, null);
            thiselement.dispatchEvent(newevent);
        });

        //var today = Date;
        //var dd = today.getDate();

        this.inputelement.addEventListener("keypress", function (event) {
            if (event.key.toLowerCase() == "d") {
                thiselement.datevalue = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000));
            }
        });

        this.inputelement.addEventListener("keydown", function (event) {
            if (event.key.toLowerCase() == "delete") {
                thiselement.inputelement.value = '';
            }
        });

        callCreatedHook(this);
    }
    //setCurrentDate() {
    //    this.inputelement.value = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    //}
    static getDateStringFromDateTimeString(datestring) {
        if (!datestring) {
            return "";
        }
        return datestring.split('T')[0];
    }

    set datevalue(date) {
        this.value = date.toISOString();
    }
    get datevalue() {
        return new Date(Date.parse(this.inputelement.value));
    }
    static get observedAttributes() {
        return [
            'style',
            'autofocus',
            'placeholder',
            'readonly',
            'required',
            'disabled',
            'value',
            'step',
            'min',
            'max'];
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "style":
                this.inputelement.setAttribute("style", newVal);
                break;
            case "value":
                this.value = newVal;
                //this.setValue();
                break;
            case "autofocus":
            case "placeholder":
            case "step":
            case "max":
            case "min":
            case "required":
                this.inputelement.setAttribute(attrName, newVal);
                break;
            case "disabled":
            case "readonly":
                if (!this.disabled && !this.readonly) {
                    this.inputelement.setAttribute(attrName, attrName);
                }
                else {
                    this.inputelement.removeAttribute(attrName);
                }
                break;
            default:
                break;
        }
    }
    //get lookupcriteria() {
    //    return this.getAttribute("lookupcriteria");
    //}
    set value(v) {
        v = AppDateEdit.getDateStringFromDateTimeString(v);
        this.inputelement.value = v;
    }
    get value() {
        return this.inputelement.value;
    }
    get disabled() {
        return this.hasAttribute("disabled");
    }
    get readonly() {
        return this.hasAttribute("readonly");
    }
}

class AppDateTimeEdit extends AppDateEdit {
    constructor() {
        super();
        this.inputelement.setAttribute('type', 'datetime-local');

        callCreatedHook(this);
    }
    static get observedAttributes() {
        return AppDateEdit.observedAttributes;
    }
    static getDateTimeStringFromDateTimeString(datestring) {
        return datestring.split('.')[0]
    }
    set value(v) {
        v = AppDateTimeEdit.getDateTimeStringFromDateTimeString(v);
        this.inputelement.value = v;
    }
    get value() {
        return this.inputelement.value;
    }
}

class AppTimeEdit extends AppDateEdit {
    constructor() {
        super();
        this.inputelement.setAttribute('type', 'time');

        callCreatedHook(this);
    }
    static get observedAttributes() {
        return AppDateEdit.observedAttributes;
    }
    static getTimeStringFromDateTimeString(datestring) {
        return datestring.split('.')[0].split('T')[1];
    }
    set value(v) {
        v = AppTimeEdit.getTimeStringFromDateTimeString(v);
        this.inputelement.value = v;
    }
    get value() {
        return this.inputelement.value;
    }
}

class AppDateDisplay extends AppDateEdit {
    constructor() {
        super();
        //this.inputelement.setAttribute("readonly", "readonly");
        this.inputelement.setAttribute("disabled", "disabled");

        callCreatedHook(this);
    }
    static get observedAttributes() {
        return AppDateEdit.observedAttributes;
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            //case "readonly":
            case "disabled":
            case "readonly":
                this.inputelement.setAttribute("disabled", "disabled");
                break;
            default:
                super.attributeChangedCallback(attrName, oldVal, newVal);
                break;
        }
    }
}

class AppDateTimeDisplay extends AppDateTimeEdit {
    constructor() {
        super();
        //this.inputelement.setAttribute("readonly", "readonly");
        this.inputelement.setAttribute("disabled", "disabled");

        callCreatedHook(this);
    }
    static get observedAttributes() {
        return AppDateEdit.observedAttributes;
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "disabled":
            case "readonly":
                this.inputelement.setAttribute("disabled", "disabled");
                break;
            default:
                super.attributeChangedCallback(attrName, oldVal, newVal);
                break;
        }
    }
}

class AppTimeDisplay extends AppTimeEdit {
    constructor() {
        super();
        //this.inputelement.setAttribute("readonly", "readonly");
        this.inputelement.setAttribute("disabled", "disabled");

        callCreatedHook(this);
    }
    static get observedAttributes() {
        return AppDateEdit.observedAttributes;
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "disabled":
            case "readonly":
                this.inputelement.setAttribute("disabled", "disabled");
                break;
            default:
                super.attributeChangedCallback(attrName, oldVal, newVal);
                break;
        }
    }
}

class AppBoolEdit extends AppValueElement {
    constructor() {
        super();
        this.inputelement = document.createElement('input');
        this.inputelement.setAttribute('type', 'checkbox');

        let shadowRoot = this.shadowRoot;
        //this.spanelement.appendChild(this.inputelement);

        shadowRoot.appendChild(this.inputelement);

        let thiselement = this;
        this.inputelement.addEventListener("change", function (event) {
            let newevent = document.createEvent("CustomEvent");
            newevent.initCustomEvent("change", false, false, null);
            thiselement.dispatchEvent(newevent);
        });

        callCreatedHook(this);
    }
    static get observedAttributes() {
        return [
            'style',
            'autofocus',
            'placeholder',
            'readonly',
            'disabled',
            'required',
            'value',
            'checked'];
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "style":
                this.inputelement.setAttribute("style", newVal);
                break;
            case "value":
                this.value = newVal;
                //this.setValue();
                break;
            case "autofocus":
            case "placeholder":
            case "required":
            case "checked":
                this.inputelement.setAttribute(attrName, newVal);
                break;
            case "disabled":
            case "readonly":
                if (!this.disabled && !this.readonly) {
                    this.inputelement.setAttribute(attrName, attrName);
                }
                else {
                    this.inputelement.removeAttribute(attrName);
                }
                break;
            default:
                break;
        }
    }
    //get lookupcriteria() {
    //    return this.getAttribute("lookupcriteria");
    //}
    set value(v) {
        if (v) {
            this.inputelement.checked = true;
        }
        else {
            this.inputelement.checked = false;
        }
        //this.inputelement.value = v;
        //setValue();
    }
    get value() {
        return this.inputelement.checked;
    }
    get readonly() {
        return this.hasAttribute("readonly");
    }
    get disabled() {
        return this.hasAttribute("disabled");
    }
}

class AppBoolDisplay extends AppBoolEdit {
    constructor() {
        super();
        this.inputelement.setAttribute("disabled", "disabled");

        callCreatedHook(this);
    }
    static get observedAttributes() {
        return AppBoolEdit.observedAttributes;
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "disabled":
            case "readonly":
                this.inputelement.setAttribute("disabled", "disabled");
                break;
            default:
                super.attributeChangedCallback(attrName, oldVal, newVal);
                break;
        }
    }
}

class AppImage extends AppValueElement {
    constructor() {
        super();
        this.__value = "";
        this.imgelement = document.createElement('img');

        //this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this.imgelement);

        callCreatedHook(this);
    }
    static get observedAttributes() {
        return ['mimetype', 'style', 'fileext', 'alt'];
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "mimetype":
                this.setImgSrc();
                break;
            case "fileext":
                this.setImgSrc();
                break;
            case "style":
                this.imgelement.setAttribute("style", newVal);
                break;
            case "alt":
                this.imgelement.setAttribute("alt", newVal);
                break;
            default:
                super.attributeChangedCallback(attrName, oldVal, newVal);
                break;
        }
    }
    setImgSrc() {
        this.imgelement.setAttribute("src", this.src);
        //if (this.fileext) {
        //    this.aelement.setAttribute("download", "download" + this.fileext);
        //}
        //else {
        //    this.aelement.setAttribute("download", "download");
        //}
    }
    get src() {
        return "data:" + (this.mimetype ? this.mimetype : "application/octet-stream") + ";base64" + "," + this.value;
    }
    get value() {
        return this.__value;
    }
    set value(v) {
        this.__value = v;
        this.setImgSrc();
    }
    get mimetype() {
        return this.getAttribute("mimetype");
    }
    set mimetype(v) {
        this.setAttribute("mimetype", v);
    }
}

class AppFileDisplay extends AppValueElement {
    constructor() {
        super();
        this.__value = "";
        this.aelement = document.createElement('a');
        //this.
        if (this.innerText) {
            this.aelement.innerText = this.innerText;
        }
        else {
            this.aelement.innerText = "Download";
        }
        this.aelement.setAttribute("class", "filedownload");
        //this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this.aelement);

        callCreatedHook(this);
    }
    static get observedAttributes() {
        return ['mimetype', 'style', 'fileext'];
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "mimetype":
                this.setLinkHref();
                break;
            case "fileext":
                this.setLinkHref();
                break;
            case "style":
                this.aelement.setAttribute("style", newVal);
                break;
            default:
                super.attributeChangedCallback(attrName, oldVal, newVal);
                break;
        }
    }
    setLinkHref() {
        if (this.value) {
            let byteCharacters = atob(this.value);

            let byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            var blob = new Blob([byteArray], { type: this.mimetype });

            this.__href = URL.createObjectURL(blob);

            this.aelement.setAttribute("href", this.href);
            if (this.fileext) {
                this.aelement.setAttribute("download", "download" + this.fileext);
            }
            else {
                this.aelement.setAttribute("download", "download");
            }
        }
        else {
            this.aelement.removeAttribute("href");
            this.aelement.removeAttribute("download");
        }
    }
    get href() {
        //return "data:" + (this.mimetype ? this.mimetype : "application/octet-stream") + ";base64" + "," + this.value;
        return this.__href;
    }
    get value() {
        return this.__value;
    }
    set value(v) {
        this.__value = v;

        this.setLinkHref();
    }
    get mimetype() {
        return this.getAttribute("mimetype");
    }
    set mimetype(v) {
        this.setAttribute("mimetype", v);
    }
    get fileext() {
        return this.getAttribute("fileext");
    }
    set fileext(v) {
        this.setAttribute("fileext", v);
    }
    set innerText(v) {
        super.innerText = v;
        this.aelement.innerText = v;
    }
    get innerText() {
        return super.innerText;
    }
    set filename(v) {
        this.__filename = v;
        this.aelement.setAttribute("download", this.__filename);
    }
    get filename() {
        return this.__filename;
    }
}

class AppFileEdit extends AppValueElement {
    constructor() {
        super();
        this.__value = "";
        //data:audio/mp3;base64,
        this.fileelement = document.createElement('input');
        this.fileelement.setAttribute('type', 'file');
        //this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this.fileelement);
        let thiselement = this;
        this.fileelement.addEventListener("change", function (event) {

            if (this.files && this.files.length > 0) {
                pauseWindow();
                var reader = new FileReader();
                reader.readAsDataURL(this.files[0]);
                reader.onload = function () {
                    unpauseWindow();
                    //console.log(reader.result);
                    let resultarray = reader.result.split(',', 2);
                    thiselement.value = resultarray[1];

                    try {
                        let firstpart = resultarray[0];

                        let mimetype = firstpart.split(':')[1].split(';')[0];

                        thiselement.setAttribute("mimetype", mimetype);

                        thiselement.setAttribute("filename", thiselement.fileelement.files[0].name);

                        let splitfilename = thiselement.fileelement.files[0].name.split('.');

                        thiselement.setAttribute("fileext", "." + splitfilename[splitfilename.length - 1]);
                    }
                    catch (error) {//because the parts in the try are not so critical...
                        console.log(error);
                    }

                    let newevent = document.createEvent("CustomEvent");
                    newevent.initCustomEvent("change", false, false, null);
                    thiselement.dispatchEvent(newevent);
                    //alert('file loaded');
                };
                reader.onerror = function (error) {
                    unpauseWindow();
                    alert('Error: ', error);
                };
            }
            else {
                this.value = "";
                this.mimetype = "";
            }
        });

        callCreatedHook(this);
    }
    static get observedAttributes() {
        return ['mimetype', 'fileext', 'style', 'disabled', 'readonly'];
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "mimetype":
                break;
            case "fileext":
                if (this.fileext) {
                    this.fileelement.setAttribute("accept", this.fileext);
                }
                else {
                    this.fileelement.removeAttribute("accept");
                }
                break;
            case "style":
                this.fileelement.setAttribute("style", newVal);
                break;
            case "disabled":
            case "readonly":
                this.fileelement.setAttribute("disabled", "disabled");
                break;
            default:
                super.attributeChangedCallback(attrName, oldVal, newVal);
                break;
        }
    }
    get value() {
        return this.__value;
    }
    set value(v) {
        this.__value = v;
    }

    get mimetype() {
        return this.getAttribute("mimetype");
    }
    set mimetype(v) {
        this.setAttribute("mimetype", v);
    }

    get fileext() {
        return this.getAttribute("fileext");
    }
    set fileext(v) {
        this.setAttribute("fileext", v);
    }
    //static get observedAttributes() {
    //    return [""];
    //}
    //attributeChangedCallback(attrName, oldVal, newVal) {
    //    switch (attrName) {
    //        case "disabled":
    //        case "readonly":
    //            this.inputelement.setAttribute("disabled", "disabled");
    //            break;
    //        default:
    //            super.attributeChangedCallback(attrName, oldVal, newVal);
    //            break;
    //    }
    //}
}

// wale's js -code

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = new Array(slice.length);

        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

function createImageUrl(b64string) {
    var blob = b64toBlob(b64string, 'image/jpeg')
    return URL.createObjectURL(blob);
}


//class AppJoinParameters extends LoadableElement {
//    constructor() {
//        super();

//        this.containerelement = document.createElement('div');
//        this.elementlist = document.createElement('ul');
//        this.containerelement.appendChild(this.elementlist);

//        this.attachShadow({ mode: 'open' });
//        this.shadowRoot.appendChild(this.containerelement);
//    }

//    setJoinParameters(joinparameters) {

//    }
//} 

window.customElements.define('app-file-edit', AppFileEdit);
window.customElements.define('app-file-display', AppFileDisplay);
window.customElements.define('app-string-edit', AppStringEdit);
window.customElements.define('app-string-display', AppStringDisplay);
window.customElements.define('app-text-edit', AppTextEdit);
window.customElements.define('app-text-display', AppTextDisplay);
window.customElements.define('app-enum-edit', AppEnumEdit);
window.customElements.define('app-enum-display', AppEnumDisplay);
window.customElements.define('app-num-edit', AppNumEdit);
window.customElements.define('app-num-display', AppNumDisplay);
window.customElements.define('app-date-edit', AppDateEdit);
window.customElements.define('app-date-time-edit', AppDateTimeEdit);
window.customElements.define('app-time-edit', AppTimeEdit);
window.customElements.define('app-date-display', AppDateDisplay);
window.customElements.define('app-date-time-display', AppDateTimeDisplay);
window.customElements.define('app-time-display', AppTimeDisplay);
window.customElements.define('app-bool-edit', AppBoolEdit);
window.customElements.define('app-bool-display', AppBoolDisplay);
window.customElements.define('app-field-group', AppFieldGroup);
window.customElements.define('app-grid', AppGrid);
window.customElements.define('app-select', AppSelect);
window.customElements.define('app-operations-control', AppOperationsControl);
window.customElements.define('app-image', AppImage);
//window.customElements.define('app-joinparameters', AppJoinParameters);

var appframeworkprepared = false;
prepare();
