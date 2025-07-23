function setColorVariables(colorVariables) {
    if (!colorVariables) {
        colorVariables = self.top.colorVariables;
    }
    var colorVariableKeys = Object.keys(colorVariables);
    for (let i = 0; i < colorVariableKeys.length; i++) {
        let key = colorVariableKeys[i];
        document.querySelector(":root").style.setProperty(key, colorVariables[key]);
    }
}

//function mobilecheck() {
//    var check = false;
//    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
//    return check;
//}
//function closeHamburgerIfMobile() {
//    if (mobilecheck()) {
//        self.top.closeHamburger();
//    }
//}

function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

//function setElementColor(element) {
//    //$(element).css('color', $("body").css('color'));
//    let shadowRoot = element.shadowRoot;
//    let style = document.createElement('style');
//    let color = 'var(--primary-font-color)';
//    //debugger;
//    style.textContent = '*{color: ' + color + '}';
//    shadowRoot.appendChild(style);
//}

//function setTextDisplayBackgroundColor() {
//    let shadowRoot = element.shadowRoot;
//    let style = document.createElement('style');
//    let color = 'var(--primary-font-color)';
//    //debugger;
//    style.textContent = '*{background-color: ' + color + '}';
//    shadowRoot.appendChild(style);
//}

//function modifyLookupButton(element) {
//    //fa fa-search
//    let shadowRoot = element.shadowRoot;
//    let link = document.createElement('link');
//    link.setAttribute('rel', 'stylesheet');
//    link.setAttribute('type', 'text/css');
//    link.setAttribute('href', '/Content/plugin.css');
//    shadowRoot.appendChild(link);
//    element.lookupbuttonelement.innerText = '';
//    //$(element.lookupbuttonelement).css('font', 'normal normal normal 14px/1 FontAwesome;');
//    $(element.lookupbuttonelement).addClass('fa');
//    $(element.lookupbuttonelement).addClass('fa-search');
//}

document.addEventListener("loaded", function () {
    //alert('');
    var closebutton = self.frameElement.closebutton;
    if (closebutton) {
        $(closebutton).addClass("fa");
        $(closebutton).addClass("fa-close");
        closebutton.innerText = '';
        closebutton.setAttribute("title", "Save & Close (Alt + C)");
    }

    var cancelclosebutton = self.frameElement.cancelclosebutton;
    if (cancelclosebutton) {
        $(cancelclosebutton).addClass("fa");
        $(cancelclosebutton).addClass("fa-ban");
        cancelclosebutton.innerText = '';
        cancelclosebutton.setAttribute("title", "Cancel & Close (Alt + Q)");
    }

    var switchbutton = self.frameElement.switchbutton;
    if (switchbutton) {
        $(switchbutton).addClass("fa");
        $(switchbutton).addClass("fa-clone");
        switchbutton.innerText = '';
        switchbutton.setAttribute("title", "Switch");
    }

    var helpbutton = self.frameElement.helpbutton;
    if (helpbutton) {
        $(helpbutton).addClass("fa");
        $(helpbutton).addClass("fa-question");
        helpbutton.innerText = '';
        helpbutton.setAttribute("title", "Help");
    }

    var forminfobutton = self.frameElement.forminfobutton;
    if (forminfobutton) {
        $(forminfobutton).addClass("fa");
        $(forminfobutton).addClass("fa-info");
        forminfobutton.innerText = '';
        forminfobutton.setAttribute("title", "Form Info");
    }

    var dockleftbutton = self.frameElement.dockleftbutton;
    if (dockleftbutton) {
        dockleftbutton.innerText = "";//"◨";
        $(dockleftbutton).addClass("fa");
        $(dockleftbutton).addClass("fa-window-maximize");
        $(dockleftbutton).addClass("fa-rotate-270");
        dockleftbutton.setAttribute("title", "Dock Left (Alt + L)");
    }

    var dockrightbutton = self.frameElement.dockrightbutton;
    if (dockrightbutton) {
        dockrightbutton.innerText = "";//"◧";
        $(dockrightbutton).addClass("fa");
        $(dockrightbutton).addClass("fa-window-maximize");
        $(dockrightbutton).addClass("fa-rotate-90");
        dockrightbutton.setAttribute("title", "Dock Right (Alt + R)");
    }

    var dockcentrebutton = self.frameElement.dockcentrebutton;
    if (dockcentrebutton) {
        dockcentrebutton.innerText = "";//"◼";
        $(dockcentrebutton).addClass("fa");
        $(dockcentrebutton).addClass("fa-square");
        dockcentrebutton.setAttribute("title", "Fill (Alt + F)");
    }

    

    //var setOperationLiHeightFunction = function () {
    //    var elements = self.document.getElementsByTagName("app-operations-control");
    //    for (var i = 0; i < elements.length; i++) {
    //        let operationscontrol = elements[i];
    //        var level1lijqueryobjects = $(operationscontrol.shadowRoot).find(".operations-li[level=\"1\"]:not(.collapsed_operation_li):not([operationid=\"__operation_permissions\"])");
    //        //let selector = "#" + operationscontrol.id + " " + ".operations-li";
    //        //let selected = self.document.querySelectorAll(selector);
    //        //let level1lijqueryobjects = $(selector);
    //        let longestlilength = 0;
    //        for (let i = 0; i < level1lijqueryobjects.length; i++) {
    //            //debugger;
    //            if ($(level1lijqueryobjects.get(i)).height() > longestlilength) {
    //                longestlilength = $(level1lijqueryobjects.get(i)).height();
    //            }
    //        }

    //        //for (let i = 0; i < level1lijqueryobjects.length; i++) {
    //        if (longestlilength > 0) {
    //            level1lijqueryobjects.height(longestlilength);
    //        }
    //        //}
    //    }
    //};

    //setOperationLiHeightFunction();
    //setInterval(function () {
    //    setOperationLiHeightFunction();
    //}, 500);
});

document.addEventListener("loading", function () {
    
    //if (formTypeName == "AppFramework.WebForms.DefaultListForm" && document.body.getAttribute('entitytypename') == "AppFramework.AppClasses.AppEntities.DatabaseLog") {
    //    debugger;
    //    registerCreatedHook('app-text-display', function (element) {
    //        debugger;
    //        element.inputelement.setAttribute('rows', 8);
    //    });
    //}

    let grids = document.getElementsByTagName('app-grid');
//debugger;
    for (var i = 0; i < grids.length; i++) {
        let grid = grids[i];
        if (formTypeName == "AppFramework.WebForms.DefaultListForm" && document.body.getAttribute('entitytypename') == "AppFramework.AppClasses.AppEntities.DatabaseLog") {
            grid.registerHook('createFieldTd', function (td) {
                let element = td.querySelector('app-text-display');
                //debugger;
                if (element) {
                    element.inputelement.setAttribute('rows', 8);
                }
                //let snospan = tr.querySelector('.app_grid_sno_span');
                //sno = parseInt(snospan.innerText);
                //if (sno % 2 == 0) {
                //    $(tr).css('background', 'var(--grey)');
                //}
            });
        }

        grid.registerHook('createFieldTd', function (td) {
            let element = td.querySelector('app-file-display');
            if (element) {
                $(element.aelement).css('color', 'var(--black)');
            }
        });

        grid.registerHook('createFieldTd', function (td) {
            //debugger;
            let displayelement = td.querySelector('app-bool-display');
            if (displayelement) {
                //debugger;
                $(displayelement.parentElement).css("width", "100%");
                $(displayelement.parentElement.parentElement).css("overflow", "unset");
            }
        });

        grid.registerHook('fieldEditMode', function (editorelement) {
            //debugger;
            $(editorelement.inputelement).css('font-size', '1em');
        });
    }
});

//let grids = document.getElementsByTagName('app-grid');

registerCreatedHook('app-grid', function (grid) {
    function sortGrid(column, ascending) {
        let searchths = grid.shadowRoot.querySelectorAll('thead > tr.search > th:not(.radiobuttonheader)');
        
        for (let i = 0; i < searchths.length; i++) {
            let searchth = searchths[i];
            let sortinput = searchth.querySelector('select');
            //debugger;
            if (i != column) {
                if (sortinput) {
                    sortinput.selectedIndex = 0;
                }
            }
            else {
                sortinput.selectedIndex = ascending ? 1 : 2;
            }
        }
        grid.dispatchFilterEvent();
    }
    //console.log(grid);
    grid.addEventListener('click', function (event) {
        let gridordermenus = grid.shadowRoot.querySelectorAll('.grid-order-menu');
        for (let i = 0; i < gridordermenus.length; i++) {
            let gridordermenu = gridordermenus[i];
            //debugger;
            if (!(event.path.length > 0 && event.path[0].getAttribute('menuelement') == gridordermenu.id)) {
                $(gridordermenu).css('display', 'none');
            }
        }
    });
    grid.registerHook('createFields', function () {
        //debugger;
        //console.log(element);
        let ths = grid.headerths;
        //debugger;
        for (let i = 0; i < ths.length; i++) {
            let th = ths[i];
            if (!th.getAttribute('data-field')) {
                continue;
            }
            let div = th.querySelector('div');
            let span = document.createElement('span');
            span.setAttribute('class', 'grid-header-text-span');
            span.innerText = div.innerText;
            div.innerHTML = '';
            div.appendChild(span);

            let sortdiv = document.createElement('div');
            sortdiv.setAttribute('class', 'grid-order');

            let iconspan = document.createElement('span');
            
            let icon = document.createElement('i');
            icon.setAttribute('class', 'menuToggler fa fa-sort-alpha-asc');
            icon.setAttribute('menuelement', 'sort_menu_' + i);
            
            iconspan.appendChild(icon);
            sortdiv.appendChild(iconspan);

            div.appendChild(sortdiv);

            let sortmenudiv = document.createElement('div');
            sortmenudiv.setAttribute('class', 'grid-order-menu');
            sortmenudiv.setAttribute('id', 'sort_menu_' + i);
            $(sortmenudiv).css('display', 'none');

            let sortmenuinnerdiv = document.createElement('div');
            sortmenuinnerdiv.setAttribute('class', 'col1filter');

            let ascendingdiv = document.createElement('div');
            let ascendinglink = document.createElement('a');
            ascendinglink.setAttribute('href', 'javascript:void(0)');
            let ascendingiconspan = document.createElement('span');
            let ascendingicon = document.createElement('i');
            ascendingicon.setAttribute('class', 'fa fa-long-arrow-up');
            let ascendingtextspan = document.createElement('span');
            ascendingtextspan.innerText = 'Ascending';
            ascendingiconspan.appendChild(ascendingicon);
            ascendinglink.appendChild(ascendingiconspan);
            ascendinglink.appendChild(ascendingtextspan);
            ascendingdiv.appendChild(ascendinglink);

            ascendinglink.addEventListener('click', function (event) {
                sortGrid(i, true);
            });

            let descendingdiv = document.createElement('div');
            let descendinglink = document.createElement('a');
            descendinglink.setAttribute('href', 'javascript:void(0)');
            let descendingiconspan = document.createElement('span');
            let descendingicon = document.createElement('i');
            descendingicon.setAttribute('class', 'fa fa-long-arrow-up');
            let descendingtextspan = document.createElement('span');
            descendingtextspan.innerText = 'Descending';
            descendingiconspan.appendChild(descendingicon);
            descendinglink.appendChild(descendingiconspan);
            descendinglink.appendChild(descendingtextspan);
            descendingdiv.appendChild(descendinglink);

            descendinglink.addEventListener('click', function (event) {
                sortGrid(i, false);
            });

            sortmenuinnerdiv.appendChild(ascendingdiv);
            sortmenuinnerdiv.appendChild(descendingdiv);

            sortmenudiv.appendChild(sortmenuinnerdiv);
            div.appendChild(sortmenudiv);

            icon.addEventListener('click', function (event) {
                if ($(sortmenudiv).css('display') == 'block') {
                    $(sortmenudiv).css('display', 'none');
                }
                else {
                    $(sortmenudiv).css('display', 'block');
                }
                //event.stopImmediatePropagation();
            });

            
        }
    });
}, false);

//debugger;
//for (var i = 0; i < grids.length; i++) {
//    let grid = grids[i];
//    grid.registerHook('createRow', function (tr) {
//        //let snospan = tr.querySelector('.app_grid_sno_span');
//        //sno = parseInt(snospan.innerText);
//        //if (sno % 2 == 0) {
//        //    $(tr).css('background', 'var(--grey)');
//        //}
//    });
//}

registerHook("infolog", function () {
    self.top.closeHamburgerIfMobile();
});

//$(function () {
let fieldgroups = document.getElementsByTagName("app-field-group");
for (var i = 0; i < fieldgroups.length; i++) {
    let fieldgroup = fieldgroups[i];
    /*fieldgroup.registerHook("createFields", function (element) {
        //alert('here');
        let fieldgroupcolumns = this.shadowRoot.querySelectorAll(".fieldgroup_column");
        for (var j = 0; j < fieldgroupcolumns.length; j++) {
            let fieldgroupcolumn = fieldgroupcolumns[j];
            $(fieldgroupcolumn).addClass("col-sm-4");
            $(fieldgroupcolumn).addClass("col-xs-12");
        }
    });*/

    fieldgroup.registerHook("createField", function (element) {
        //console.log(element);
        let displayelement = element.querySelector(".field-group-display-element");
        if (displayelement.tagName.toLowerCase() != "app-bool-display") {
            $(displayelement.inputelement).css("width", "100%");
        }
        //if (displayelement.tagName.toLowerCase() == "app-text-display") {
        //    $(displayelement).css("background-color", "unset");
        //}
        if (displayelement.tagName.toLowerCase() != "app-text-display") {
            $(displayelement.inputelement).css("border-style", "none");
        }

        let editorelement = element.querySelector(".field-group-editor-element");

        if (editorelement.tagName.toLowerCase() != "app-bool-edit") {
            $(editorelement.inputelement).css("width", "100%");
        }
        
        //if (editorelement.tagName.toLowerCase() == "app-string-edit") {
        //    $(editorelement.inputelement).css("border-style", "solid");
        //    $(editorelement.inputelement).css("border-width", "1px");
        //    $(editorelement.inputelement).css("outline-color", "var(--primary-font-color)");
        //    $(editorelement.inputelement).css("color", "var(--primary-font-color)");
        //}
        //else
        if (editorelement.tagName.toLowerCase() == "app-string-edit" ||
            editorelement.tagName.toLowerCase() == "app-enum-edit" ||
            editorelement.tagName.toLowerCase() == "app-text-edit" ||
            editorelement.tagName.toLowerCase() == "app-num-edit" ||
            editorelement.tagName.toLowerCase() == "app-date-edit" ||
            editorelement.tagName.toLowerCase() == "app-date-time-edit") {
            //$(editorelement.inputelement).css("border-style", "solid");
            //$(editorelement.inputelement).css("border-width", "1px");
            //$(editorelement.inputelement).css("outline-color", "var(--primary-font-color)");
            //$(editorelement.inputelement).css("color", "var(--primary-font-color)");
        }
        else {
            //$(editorelement).css("border-style", "none");
            //$(editorelement).css("outline-color", "var(--primary-font-color)");
            //$(editorelement).css("color", "var(--primary-font-color)");
        }

    });
}

registerCreatedHook('app-file-edit', function (element) {
    $(element.deletelink).css('color', 'var(--black)');

    let shadowRoot = element.shadowRoot;
    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', '/css/font-awesome.min.css');
    shadowRoot.appendChild(link);
    element.deletelink.setAttribute('title', 'Remove File');
    element.deletelink.innerText = '';
    //$(element.lookupbuttonelement).css('font', 'normal normal normal 14px/1 FontAwesome;');
    $(element.deletelink).addClass('fa');
    $(element.deletelink).addClass('fa-trash');
    $(element.deletelink).css('font-size', '16px');
});

registerCreatedHook('app-file-display', function (element) {
    //debugger;
    $(element.aelement).css('color', 'var(--black)');
});

//debugger;
//registerCreatedHook("app-string-edit", setElementColor);
registerCreatedHook("app-string-edit", function (element) {
    let shadowRoot = element.shadowRoot;
    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', '/css/font-awesome.min.css');
    shadowRoot.appendChild(link);
    element.lookupbuttonelement.innerText = '';
    //$(element.lookupbuttonelement).css('font', 'normal normal normal 14px/1 FontAwesome;');
    $(element.lookupbuttonelement).addClass('fa');
    $(element.lookupbuttonelement).addClass('fa-search');
});
//registerCreatedHook("app-string-display", setElementColor);
////registerCreatedHook("app-num-edit", setElementColor);
//registerCreatedHook("app-num-display", setElementColor);
////registerCreatedHook("app-text-edit", setElementColor);
////registerCreatedHook("app-text-edit", setTextBackgroundColor);
//registerCreatedHook("app-text-display", setElementColor);
////registerCreatedHook("app-text-display", setTextBackgroundColor);
////registerCreatedHook("app-enum-edit", setElementColor);
//registerCreatedHook("app-enum-display", setElementColor);

if (document.body.hasAttribute('formtypename') && document.body.getAttribute('formtypename') == 'AppFramework.WebForms.QueryForm') {
    registerCreatedHook('app-enum-edit', function (element) {
        element.registerHook('connectedCallback', function () {
            if (element.multiple) {
                let style = document.createElement('style');
                style.innerHTML = "button, label {font-size: 0.7em; font-family: 'PT Sans', sans-serif} .ms-choice{line-height: 15px !important; height: 16px !important; border-radius: unset !important;} .ms-choice > div{height: 15px !important; background-position-y: -5px !important;}";
                element.shadowRoot.appendChild(style);
            }
            else {
                if (element.enum != 'AppFramework.AppClasses.JoinType') {
                    $(element.inputelement).css('width', '100%');
                }
                $(element.inputelement).css('font-size', '0.7em');
                $(element.inputelement).css('font-family', "'PT Sans', sans-serif");
            }
        });
        //debugger;
        
    });
    registerCreatedHook('app-string-edit', function (element) {
        $(element.inputelement).css('font-size', '0.7em');
        $(element.inputelement).css('font-family', "'PT Sans', sans-serif");
        $(element.lookupbuttonelement).css('font-size', '0.7em');
    });

    //let subliststyle = document.createElement('style');
    //document.head.appendChild(subliststyle);

    //registerHook('createJoinParameterDisplay', function () {
    //    let hookarguments = arguments;
    //    setTimeout(function () {
    //        debugger;
    //        let joinparameterlistitem = hookarguments[1];
    //        let joinparametersublist = joinparameterlistitem.parentElement;

    //        //debugger;
    //        let entityselect = joinparameterlistitem.querySelector('.joinparametercontainer > .entityselect');
    //        if (entityselect != null) {
    //            entityselect.id = 'entityselect_' + guidGenerator().replace('-', '');

    //            subliststyle.innerHTML += '#' + entityselect.id + ':before{height: ' + (joinparametersublist.offsetTop /*+ ($(joinparametersublist).outerHeight() - $(entityselect).outerHeight())*/ - ($(entityselect).outerHeight() / 2)) + 'px; top: -' + (joinparametersublist.offsetTop /*+ ($(joinparameterlistitem).outerHeight() - $(entityselect).outerHeight())*/ - ($(entityselect).outerHeight())) + 'px}\n';
    //        }

    //        //debugger;

    //    });
    //});

    //registerHook('queryCleared', function () {
    //    subliststyle.innerHTML = '';
    //})
}

registerCreatedHook(["app-string-display", "app-num-display", "app-text-display", "app-enum-display"], function (element) {
    //$(element.inputelement).css("color", "var(--primary-font-color)");
});

registerCreatedHook(["app-string-edit", "app-enum-edit", "app-text-edit", "app-num-edit", "app-date-edit", "app-date-time-edit"], function (element) {
    //console.log(element.tagName);
    //$(element.inputelement).css("border-style", "solid");
    //$(element.inputelement).css("border-width", "1px");
    //$(element.inputelement).css("outline-color", "var(--primary-font-color)");
    //$(element.inputelement).css("color", "var(--primary-font-color)");
    //$(element.inputelement).css("border-color", "var(--primary-font-color)");
});

registerCreatedHook(["app-text-display", "app-date-display", "app-date-time-display", "app-time-display"], function (element) {
    ////$(element.inputelement).css("background-color", "var(--primary-background-color)");
    //$(element.inputelement).css("background-color", "inherit");
    ////$(element.inputelement).css("border-style", "none");
    //$(element.inputelement).css("border-left-style", "solid");
    //$(element.inputelement).css("border-right-style", "solid");
    //$(element.inputelement).css("border-top-style", "solid");
    //$(element.inputelement).css("border-bottom-style", "solid");
    //$(element.inputelement).css("border-width", "1px");
    //$(element.inputelement).css("border-color", "var(--primary-font-color)");
});

document.addEventListener("loaded", function () {
    setColorVariables();
});

document.setColorVariables = setColorVariables;

registerCreatedHook("app-file-display", function (element) {
    //debugger;
    $(element.aelement).css('font-size', '14px');
    $(element.aelement).css('color', 'var(--black)');
});
//});

if (formTypeName == "AppFramework.WebForms.FileDownloadForm" || formTypeName == "AppFramework.WebForms.MicrosoftReportViewerReportRunDownloadForm") {
    //debugger;
    //let filedownload = document.getElementById("filedownload");
    //$(filedownload).css("color", "--primary-font-color");
}

function iosAppGridCreated(element) {
    element.registerHook("createFields", iosAppGridFieldsCreated);
}

function iosAppGridFieldsCreated(element) {
    let fields = element.fieldinfos;
    if (fields.length > 5) {
        fields.splice(5);
        element.createFields(fields);
    }
}

//debugger;
if (iOS) {
    registerCreatedHook("app-grid", iosAppGridCreated);
    let elements = document.getElementsByTagName("app-grid");
    for (let i = 0; i < elements.length; i++) {
        elements[i].registerHook("createFields", iosAppGridFieldsCreated);
    }
}

registerCreatedHook("app-operations-control", function (operationscontrol) {
    //debugger;
    function contains(list, arg) {
        for (let i = 0; i < list.length; i++) {
            if (list[i] === arg) {
                return true;
            }
        }
        return false;
    }

    function toggle(elem, ico) {
        if (elem.style.display === 'none') {
            elem.style.display = 'block';
        }
        else {
            elem.style.display = 'none';
        }

        if (ico) {
            if (elem.style.display === 'none') {
                if (contains(ico.classList, 'fa-caret-down')) {
                    ico.classList.remove('fa-caret-down');
                }
                ico.classList.add('fa-caret-right');
            }
            else {
                if (contains(ico.classList, 'fa-caret-right')) {
                    ico.classList.remove('fa-caret-right');
                }
                ico.classList.add('fa-caret-down');
            }
        }
    }

    function toggleAll(elems) {
        for (let i = 0; i < elems.length; i++) {
            if (elems[i].style.display === 'none') {
                elems[i].style.display = 'block';
            }
            else {
                elems[i].style.display = 'none';
            }
        }
    }

    function active(elem, pinnedState) {
        let elems = operationscontrol.shadowRoot.querySelectorAll('.active');
        let activeState = contains(elem.classList, 'active');

        for (let i = 0; i < elems.length; i++) {
            elems[i].classList.remove('active');
        }
        if (activeState) {
            if (pinnedState !== 'pinned') {
                elem.classList.remove('active');
            }
            else { elem.classList.add('active'); }
        }
        else {
            elem.classList.add('active');
        }
    }

    function hideMenu(elem, ico, topPosition, angledown) {
        if (elem.hasAttribute('hidden')) {
            elem.removeAttribute('hidden');
            if (contains(elem.classList, 'overlayMenu')) {
                elem.classList.remove('overlayMenu');
            }
            elem.style.display = 'block';
            //elem.style.top = `0px`;
            //elem.style.position = 'relative';
        }
        else {
            elem.setAttribute('hidden', true);
            elem.classList.add('overlayMenu');
            topPosition = topPosition <= 72 ? top : 72;
            //elem.style.top = `${topPosition}px`;
            //elem.style.display = 'none';
            //elem.style.position = 'unset';
        }

        //debugger;
        if (ico) {
            //if (elem.hasAttribute('hidden')) {
            //    if (contains(ico.classList, 'fa-angle-up')) {
            //        ico.classList.remove('fa-angle-up');
            //    }
            //    ico.classList.add('fa-angle-down');
            //}
            //else {
            //    if (contains(ico.classList, 'fa-angle-down')) {
            //        ico.classList.remove('fa-angle-down');
            //    }
            //    ico.classList.add('fa-angle-up');
            //}
            if (angledown) {
                $(ico).removeClass('fa-angle-up');
                $(ico).addClass('fa-angle-down');
            }
            else {
                $(ico).removeClass('fa-angle-down');
                $(ico).addClass('fa-angle-up');
            }
        }
    }

    function subMenuTogglerClicked(event) {

        let targetElemId = event.currentTarget.attributes.menuelement.value;
        let targetElem = operationscontrol.shadowRoot.getElementById(targetElemId);
        let targetElemIco = operationscontrol.shadowRoot.getElementById(targetElem.id + '-ico');
        toggle(targetElem, targetElemIco);
        event.stopImmediatePropagation();
    }

    function menuTogglerClicked(event) {
        let targetElemId = event.target.attributes.menuelement.value;
        let targetElem = operationscontrol.shadowRoot.getElementById(targetElemId);

        disposeOverlayMenu(targetElem);

        toggle(targetElem);

        if ($(targetElem).css('display') == 'block' && $(targetElem).css('position') == 'absolute') {
            let buttonwrapper = operationscontrol.shadowRoot.getElementById('content-main-row');
            $(targetElem).css('top', $(buttonwrapper).outerHeight() + 'px');
        }

        if (contains(event.target.classList, 'operationCat')) {
            active(event.target);
        }
        else {
            let elems = operationscontrol.shadowRoot.querySelectorAll('.active');
            for (let i = 0; i < elems.length; i++) {
                elems[i].classList.remove('active');
            }
        }
        if (contains(event.target.classList, 'adjustParentContainerWidth')) {
            adjustParentContainerWidth(targetElem);
        }
        //adjustHeight();
        event.stopImmediatePropagation();
    }

    function removeMenuTogglerActiveState() {
        let togglers = operationscontrol.shadowRoot.querySelectorAll('.menuToggler');
        for (let i = 0; i < togglers.length; i++) {
            if (contains(togglers[i].classList, 'active')) {
                togglers[i].classList.remove('active');
            }
        }
    }

    function menuToggler() {
        let elems = operationscontrol.shadowRoot.querySelectorAll('.menuToggler');
        addEvent(elems, 'click', menuTogglerClicked);
    }

    function subMenuToggler() {
        let elems = operationscontrol.shadowRoot.querySelectorAll('.subMenuToggler');
        addEvent(elems, 'click', subMenuTogglerClicked);
    }

    function disposeMenu(menu) {
        menu.style.display = 'none';
    }

    function removeEvent(elem, event, eventFunction) {
        elem.removeEventListener(event, eventFunction);
    }

    function addEvent(elementList, event, eventAction) {
        for (let i = 0; i < elementList.length; i++) {
            elementList[i].addEventListener(event, eventAction);
        }
    }

    function substituteClass(elem, removeclass, addclass) {
        if (contains(elem.classList, removeclass)) {
            elem.classList.remove(removeclass);
        }
        elem.classList.add(addclass);
    }

    function removePinned(top) {
        let operations = operationscontrol.shadowRoot.querySelectorAll('.operationMenu');
        for (let i = 0; i < operations.length; i++) {
            operations[i].setAttribute('hidden', true);
            operations[i].classList.add('overlayMenu');
            //top = top <= 72 ? top : 72;
            //operations[i].style.top = `${top}px`;
            operations[i].style.display = 'none';
            //operations[i].style.position = 'unset';
        }
    }

    function operationClicked(event) {
        let pinnedState = operationscontrol.shadowRoot.querySelector('.menuHider').attributes.status.value;
        let targetElemId = event.target.attributes.menuelement.value;
        let targetElem = operationscontrol.shadowRoot.getElementById(targetElemId);
        let position = operationscontrol.shadowRoot.querySelector('.buttoncontainer').getBoundingClientRect();
        removePinned();
        disposeOverlayMenu(targetElem);
        active(event.target, pinnedState);
        hideMenu(targetElem, null, position.top - position.height + 2);
    }

    function toggleMenuDropdown(currentstatus, menuelementid, togglerelement, usertoggled) {
        let operations = operationscontrol.shadowRoot.querySelectorAll('.operationCat:not([operationid="__operation_permissions"])');
        let position = operationscontrol.shadowRoot.querySelector('.buttoncontainer').getBoundingClientRect();
        let targetElem = operationscontrol.shadowRoot.getElementById(menuelementid);
        let targetElemIco = operationscontrol.shadowRoot.querySelector('.drop-operations > span > i');
        let targetElemTooltip = operationscontrol.shadowRoot.getElementById('expand-tool-tip-span');

        if (currentstatus === 'pinned') {

            for (let i = 0; i < operations.length; i++) {
                substituteClass(operations[i], 'operation', 'menuToggler');
                operations[i].removeEventListener('click', operationClicked);
                operations[i].addEventListener('click', menuTogglerClicked);
                if (contains(operations[i].classList, 'active')) {
                    operations[i].classList.remove('active');
                }
            }
            disposeOverlayMenu(targetElem);
            hideMenu(targetElem, targetElemIco, position.top - position.height + 2, true);
            removePinned(position.top - position.height + 2);
            targetElemTooltip.innerText = 'Expand';
            togglerelement.attributes.status.value = 'unpinned';
            //targetElem.style.position = 'absolute';
            let panels = operationscontrol.shadowRoot.querySelectorAll('.tabpanel');
            for (i = 0; i < panels.length; i++) {
                let panel = panels[i];
                panel.style.position = 'absolute';
                panel.style.top = 35;
            }
        }
        else {
            for (let i = 0; i < operations.length; i++) {
                substituteClass(operations[i], 'menuToggler', 'operation');
                operations[i].removeEventListener('click', menuTogglerClicked);
                operations[i].addEventListener('click', operationClicked);
            }
            disposeOverlayMenu(targetElem);
            hideMenu(targetElem, targetElemIco, position.top - position.height + 2, false);
            active(operations[0]);
            if (!contains(operations[0].classList, 'active')) {
                operations[0].classList.add('active');
            }
            targetElemTooltip.innerText = 'Collapse';
            togglerelement.attributes.status.value = 'pinned';
            //targetElem.style.position = 'relative';
            let panels = operationscontrol.shadowRoot.querySelectorAll('.tabpanel');
            for (i = 0; i < panels.length; i++) {
                let panel = panels[i];
                panel.style.position = 'relative';
                panel.style.top = 0;
            }
        }
        if (usertoggled) {
            setViewCookie(operationscontrol.id + "_changed_status_from", currentstatus);
        }
    }

    function menuHiderClicked(event) {
        //debugger;
        let status = event.target.attributes.status.value;
        let menuelementid = event.target.attributes.menuelement.value;
        let togglerelement = event.target;

        toggleMenuDropdown(status, menuelementid, togglerelement, true);
        event.stopImmediatePropagation();
    }

    function menuHider() {
        let elems = operationscontrol.shadowRoot.querySelectorAll('.menuHider');
        addEvent(elems, 'click', menuHiderClicked);
    }

    function operation() {
        let elems = operationscontrol.shadowRoot.querySelectorAll('.operation:not([operationid="__operation_permissions"])');
        addEvent(elems, 'click', operationClicked);
    }

    function overlayMenuDispose(event) {
        deepMenuDispose(event.target)
        removeMenuTogglerActiveState();
        //event.stopImmediatePropagation();
    }

    //in overlayMenus, the 'overlayMenu' class should be added first.
    function deepMenuDispose(elem) {
        if (elem && !contains(elem.classList, 'overlayMenu')) {
            let parentElem = elem.parentElement;
            if (parentElem) {
                deepMenuDispose(parentElem);
            }
            else {
                disposeOverlayMenu();
            }
        }
    }

    function disposeOverlayMenu(sourceElem) {
        let elemsOfSameClass = operationscontrol.shadowRoot.querySelectorAll('.overlayMenu');
        for (let i = 0; i < elemsOfSameClass.length; i++) {
            if (!sourceElem || (sourceElem && elemsOfSameClass[i].id !== sourceElem.id)) {
                disposeMenu(elemsOfSameClass[i]);
            }
        }
    }

    function getDefaultChangedStatus() {
        
        //debugger;
        let ret = operationscontrol.hasAttribute('pinned') ? 'unpinned' : '';
        if (!ret) {
            let formtypename = document.body.attributes.formtypename;
            if (formtypename == 'AppFramework.WebForms.DefaultListForm') {
                ret = 'unpinned';
            }
            else {
                if (document.querySelectorAll('app-operations-control').length > 1) {
                    ret = 'pinned';
                }
                else {
                    ret = 'unpinned';
                }
            }
        }
        return ret;
    }

    let container = operationscontrol.shadowRoot.querySelector('.app-operations-container');
    $(container).css('display', 'none');

    let styledcontainer = document.createElement('div');
    styledcontainer.setAttribute('id', 'content-main-row');
    $(styledcontainer).css('z-index', 100000);

    //styledcontainer.innerHTML = "<div class=\"content-main-menu\"> <div class=\"tabcontainer\"> <div class=\"tab-icon-wrapper\"> <div id=\"tab-icon\"> <button class=\"tooltip3\"> <i class=\"fa fa-plus\"></i> <span class=\"tooltiptext first-btn-tooltip\">create new</span> </button> <button class=\"tooltip3\"> <i class=\"fa fa-folder-o\"></i> <span class=\"tooltiptext\">new template</span> </button> <button class=\"tooltip3\"> <i class=\"fa fa-edit\"></i> <span class=\"tooltiptext\">edit</span> </button> <button class=\"tooltip3\"> <i class=\"fa fa-search searchToggler\" menuelement=\"search\"></i> <span class=\"tooltiptext\">search</span> </button> <button class=\"tooltip3\"> <i class=\"fa fa-save\"></i> <span class=\"tooltiptext\">save</span> </button> <button class=\"tooltip3\"> <i class=\"fa fa-file\"></i> <span class=\"tooltiptext\">details</span> </button> <button class=\"tooltip3\"> <i class=\"fa fa-trash\"></i> <span class=\"tooltiptext\">delete</span> </button> </div> </div><!-- tab-icon wrapper ends here --> <!-- <div class=\"all-button-wrapper\"> <div class=\"all-button-scrollable\"> --> <div class=\"mobile-operation-category\"> <div class=\"mobile-operation-category-holder\"> <div id=\"button-wrapper\" class=\"buttoncontainer\"> <button class=\"menuToggler operationCat\" menuelement=\"registration\">registration</button> <button class=\"menuToggler operationCat\" menuelement=\"medical\">medical</button> <button class=\"menuToggler operationCat\" menuelement=\"student\">student</button> <button class=\"menuToggler operationCat\" menuelement=\"others\">others</button> <button class=\"menuToggler operationCat\" menuelement=\"registration\">registration</button> <button class=\"menuToggler operationCat\" menuelement=\"medical\">medical</button> <button class=\"menuToggler operationCat\" menuelement=\"student\">student</button> <button class=\"menuToggler operationCat\" menuelement=\"others\">others</button> <button class=\"menuToggler operationCat\" menuelement=\"others2\">others2</button> </div> <div id=\"registration\" class=\"overlayMenu tabpanel operationMenu\" style=\"display: none; top: 41px;\" hidden=\"\"> <div class=\"tabpanel-scrollable\"> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> </div><!-- end the tabpanel-scrollable tab here --> </div><!-- end registration content --> <div id=\"medical\" class=\"overlayMenu tabpanel operationMenu\" style=\"display: none; top: 41px;\" hidden=\"\"> <div class=\"tabpanel-scrollable\"> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span> Final Course Registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> </div><!-- end tabpanel-scrollable div here --> </div><!-- end medical content here --> <div id=\"student\" class=\"overlayMenu tabpanel operationMenu\" style=\"display: none; top: 41px;\" hidden=\"\"> <div class=\"tabpanel-scrollable\"> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>new course here</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>new course here</a></li> </ul> </div> </div><!-- end tabpanel-scrollable div here --> </div><!-- end student registration div here --> <div id=\"others\" class=\"overlayMenu tabpanel operationMenu\" style=\"display: none; top: 41px;\" hidden=\"\"> <div class=\"tabpanel-scrollable\"> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> </div> </div><!-- end others divs here --> <div id=\"others2\" class=\"overlayMenu tabpanel operationMenu\" style=\"display: none; top: 41px;\" hidden=\"\"> <div class=\"tabpanel-scrollable\"> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> <div class=\"tabpanel-menu\"> <ul> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-wpforms\"></i></span>view course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>approve course registeration</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-gg\"></i></span>late registration application</a></li> <li><a role=\"button\" href=\"#\"><span><i class=\"fa fa-files-o\"></i></span>view course registeration</a></li> </ul> </div> </div> </div><!-- end others2 divs here --> </div><!-- mobile-operation-category-holder --> </div><!-- end mobile-operatio-category --> <div class=\"drop-operations tooltip3\"> <span><i status=\"unpinned\" class=\"fa fa-angle-down fa-lg menuHider\" menuelement=\"registration\"></i></span> <span id=\"registration-tooltip\" class=\"tooltiptext-drop\">Expand</span> </div><!-- drop-operations here --> <!-- </div><-- end all-button-scrollable --> </div><!-- all button-wrapper div --> </div><!-- end tabcontainer here --> ";

    let innerdiv = document.createElement('div');
    innerdiv.setAttribute('class', 'content-main-menu');

    styledcontainer.appendChild(innerdiv);

    let tabcontainer = document.createElement('class', 'tabcontainer');

    innerdiv.appendChild(tabcontainer);

    let defaultentitycontrolswrapperdiv = document.createElement('div');
    defaultentitycontrolswrapperdiv.setAttribute('class', 'tab-icon-wrapper');

    let defaultentitycontrolsdiv = document.createElement('div');
    defaultentitycontrolsdiv.setAttribute('class', 'tab-icon');

    defaultentitycontrolswrapperdiv.appendChild(defaultentitycontrolsdiv);

    let otheroperationswrapperdiv = document.createElement('div');
    otheroperationswrapperdiv.setAttribute('class', 'mobile-operation-category');

    let otheroperationsdiv = document.createElement('div');
    otheroperationsdiv.setAttribute('class', 'mobile-operation-category-holder');

    otheroperationswrapperdiv.appendChild(otheroperationsdiv);

    let level1headersdiv = document.createElement('div');
    level1headersdiv.setAttribute('id', 'button-wrapper');
    level1headersdiv.setAttribute('class', 'buttoncontainer');

    otheroperationsdiv.appendChild(level1headersdiv);
    
    let expandoperationsdiv = document.createElement('div');
    expandoperationsdiv.setAttribute('class', 'drop-operations tooltip3');

    tabcontainer.appendChild(defaultentitycontrolswrapperdiv);
    tabcontainer.appendChild(otheroperationswrapperdiv);
    tabcontainer.appendChild(expandoperationsdiv);

    let expandiconspan = document.createElement('span');
    let expandicon = document.createElement('i');
    expandicon.setAttribute('status', 'unpinned');
    expandicon.setAttribute('class', 'fa fa-angle-down fa-lg menuHider');
    //expandicon.setAttribute('hidden', '');
    //expandicon.setAttribute('menuelement', 'to-be-determined');

    let expandicontextspan = document.createElement('span');
    expandicontextspan.setAttribute('class', 'tooltiptext-drop');
    expandicontextspan.setAttribute('id', 'expand-tool-tip-span');
    expandicontextspan.innerText = 'Collapse';
    
    expandiconspan.appendChild(expandicon);

    expandoperationsdiv.appendChild(expandiconspan);
    expandoperationsdiv.appendChild(expandicontextspan);

    document.addEventListener('click', function (event) {
        overlayMenuDispose(event);
    });

    operationscontrol.shadowRoot.appendChild(styledcontainer);

    let processedoperations = {};

    operationscontrol.registerHook("clear", function () {
        defaultentitycontrolsdiv.innerHTML = '';
        level1headersdiv.innerHTML = '';
        expandicon.setAttribute('menuelement', '');
        var submenus = otheroperationsdiv.querySelectorAll('.tabpanel.operationMenu');
        for (let i = 0; i < submenus.length; i++) {
            submenus[i].remove();
        }
        //debugger;
        //expandicon.setAttribute('status', 'unpinned');
        //expandicon.setAttribute('class', 'fa fa-angle-down fa-lg menuHider');
        //debugger;
    });
    //debugger;
    //operation();
    
    //debugger;
    operationscontrol.registerHook("createOperations", function (ul) {
        //defaultentitycontrolsdiv.innerHTML = '';
        //level1headersdiv.innerHTML = '';
        //var submenus = otheroperationsdiv.querySelectorAll('.overlayMenu.tabpanel.operationMenu');
        //for (var i = 0; i < submenus.length; i++) {
        //    submenus[i].remove();
        //}
        //this should run before we remove the buttons from the list
        let permissionsli = ul.querySelector('li[operationid="__operation_permissions"]');
        if (permissionsli) {
            $(permissionsli).css('border-style', 'none');
            $(permissionsli).css('padding', '0px');
            $(permissionsli).css('height', 'auto');
            $(permissionsli).css('margin', '0px');

            let permissionsbutton = permissionsli.querySelector('button');
            if (permissionsbutton) {
                $(permissionsbutton).addClass('fa');
                $(permissionsbutton).addClass('fa-key');
                $(permissionsbutton).css('font-family', 'FontAwesome');
                permissionsbutton.innerText = '';
            }
        }

        let ingrid = ul.querySelector('li[operationid="__grid_operations"]');
        let defaultoperationid = ingrid ? "__grid_operations" : "__default_operations";
        let endbuttons = [];

        //debugger;
        let defaultoperationbuttons = ul.querySelectorAll('li[operationid="' + defaultoperationid + '"] > ul button');

        for (var i = 0; i < defaultoperationbuttons.length; i++) {
            let button = defaultoperationbuttons[i];
            let gridoperationid = button.getAttribute('operationid');

            //if (!Object.keys(processedoperations).includes(gridoperationid))
            {
                let iconclass = "fa fa-file";
                switch (gridoperationid) {
                    case "inline_edit":
                    case "_details_form_edit":
                        iconclass = "fa fa-edit";
                        break;
                    case "grid_save":
                    case "_details_form_save":
                        iconclass = "fa fa-save";
                        break;
                    case "inline_delete":
                    case "___default_details_form_delete":
                        iconclass = "fa fa-trash";
                        break;
                    case "inline_create":
                        iconclass = "fa fa-plus";
                        break;
                    case "grid_details":
                        iconclass = "fa fa-file";
                        break;
                    case "grid_search":
                        iconclass = "fa fa-search";
                        break;
                    case "inline_create_from_template":
                        iconclass = "fa fa-clone";
                        break;
                    default:
                }

                

                if (gridoperationid == 'View_All_Fields_0' || gridoperationid == 'View_Other_Records_0') {
                    endbuttons.push(button);
                }
                else
                {
                    $(button).addClass('tooltip3');

                    let buttonicon = document.createElement('i');
                    buttonicon.setAttribute('class', iconclass);

                    let buttonspan = document.createElement('span');
                    //buttonspan.setAttribute('class', 'tooltiptext');
                    //buttonspan.innerText = button.innerText;
                    button.setAttribute('title', button.innerText);
                    button.innerText = '';

                    button.appendChild(buttonicon);
                    button.appendChild(buttonspan);
                }
                defaultentitycontrolsdiv.appendChild(button);
            }
        }

        if (defaultentitycontrolsdiv.children.length == 0) {
            //debugger;
            $(defaultentitycontrolsdiv).css('display', 'none');
        }
        else {
            $(defaultentitycontrolsdiv).css('display', 'unset');
        }

        //debugger;

        let otherlevel1operations = ul.querySelectorAll('li[level="1"]:not([operationid="' + defaultoperationid + '"]) > span');
        let otherlevel1operations2 = ul.querySelectorAll('li[level="1"]:not([operationid="' + defaultoperationid + '"]) > button');

        let otherlevel1operationsarray = [];

        for (var i = 0; i < otherlevel1operations.length; i++) {
            otherlevel1operationsarray.push(otherlevel1operations[i]);
        }

        for (var i = 0; i < otherlevel1operations2.length; i++) {
            otherlevel1operationsarray.push(otherlevel1operations2[i]);
        }
        
        for (var i = 0; i < otherlevel1operationsarray.length; i++) {
            
            //debugger;

            let level1operationelement = otherlevel1operationsarray[i];

            let level1sublist = level1operationelement.nextSibling;

            if (level1operationelement.getAttribute('operationid') != '__operation_permissions') {
                $(level1operationelement).addClass('menuToggler');
            }
            $(level1operationelement).addClass('operationCat');

            let operationid = level1operationelement.getAttribute('operationid');

            let menuid = operationid + '_menu';
            level1operationelement.setAttribute('menuelement', menuid);

            if (!expandicon.getAttribute('menuelement') && menuid != '__operation_permissions_menu') {
                expandicon.setAttribute('menuelement', menuid);
            }

            level1headersdiv.appendChild(level1operationelement);

            let submenutopwrapper = document.createElement('div');
            submenutopwrapper.setAttribute('id', menuid);
            submenutopwrapper.setAttribute('class', 'overlayMenu tabpanel operationMenu');
            submenutopwrapper.setAttribute('hidden', '');
            $(submenutopwrapper).css('display', 'none');

            let scrollablepanel = document.createElement('div');
            scrollablepanel.setAttribute('class', 'tabpanel-scrollable');

            

            //debugger;

            //let level1sublist = level1operationelement.querySelector('ul:first-of-type');// ul.querySelector('li[level="1"]:not([operationid="__grid_operations"]) > ul');
            if (level1sublist) {
                let allbuttonsbelow = level1sublist.querySelectorAll('button');

                let menucolumn;
                let menucolumnlist;
                for (var j = 0; j < allbuttonsbelow.length; j++) {
                    if (j % 4 == 0) {
                        menucolumn = document.createElement('div');
                        menucolumn.setAttribute('class', 'tabpanel-menu');

                        menucolumnlist = document.createElement('ul');

                        menucolumn.appendChild(menucolumnlist);

                        scrollablepanel.appendChild(menucolumn);
                    }

                    let button = allbuttonsbelow[j];
                    let li = document.createElement('li');
                    li.appendChild(button);

                    button.setAttribute('title', button.innerText);
                    let buttontext = button.innerText;
                    let buttontextspan = document.createElement('span');
                    buttontextspan.innerText = buttontext;

                    let buttoniconspan = document.createElement('span');
                    let buttoniconspanicon = document.createElement('i');

                    let iconclass = 'fa fa-wpforms';
                    if ($(button).hasClass('form')) {
                        iconclass = 'fa fa-wpforms form';
                    }
                    else if ($(button).hasClass('report')) {
                        iconclass = "fa fa-files-o report";
                    }
                    else if ($(button).hasClass('runnable')) {
                        iconclass = "fa fa-gg runnable";
                    }
                    
                    buttoniconspanicon.setAttribute('class', iconclass);
                    buttoniconspan.appendChild(buttoniconspanicon);

                    button.innerText = '';
                    button.appendChild(buttoniconspan);
                    button.appendChild(buttontextspan);
                    
                    menucolumnlist.appendChild(li);
                }

                //let itemstoadd = 4 - allbuttonsbelow.length;
                //for (var x = 0; x < itemstoadd; x++) {
                //    let emptylistitem = document.createElement('li');
                //    let emptybutton = document.createElement('button');
                //    emptybutton.setAttribute('disabled', '');
                //    $(emptybutton).css('opacity', 0);
                //    emptylistitem.appendChild(emptybutton);
                //    menucolumnlist.appendChild(emptylistitem);
                //}

                if (allbuttonsbelow.length > 0) {
                    submenutopwrapper.appendChild(scrollablepanel);
                    otheroperationsdiv.appendChild(submenutopwrapper);
                }
            }
            else {
                //debugger;
            }
        }

        //debugger;
        for (let i = 0; i < endbuttons.length; i++) {
            $(endbuttons[i]).addClass('endbutton');
            level1headersdiv.appendChild(endbuttons[i]);
        }

        //may be zero because the buttons have been moved in a previous call to operationscontrol.createOperations
        if (endbuttons.length == 0) {
            let oldendbuttons = level1headersdiv.querySelectorAll('.endbutton');
            for (let i = 0; i < oldendbuttons.length; i++) {
                level1headersdiv.appendChild(oldendbuttons[i]);
            }
        }

        menuHider();
        menuToggler();

        //debugger;
        let changedstatus = getViewCookie(operationscontrol.id + "_changed_status_from");

        if (!changedstatus) {
            changedstatus = getDefaultChangedStatus();
        }

        if (changedstatus && expandicon.getAttribute('menuelement') && operationscontrol.shadowRoot.getElementById(expandicon.getAttribute('menuelement'))) {
            //debugger;
            toggleMenuDropdown(changedstatus, expandicon.getAttribute('menuelement'), expandicon, false);

            if (changedstatus == 'unpinned') {
                let overlaymenus = operationscontrol.shadowRoot.querySelectorAll('.overlayMenu');
                for (let i = 0; i < overlaymenus.length; i++) {
                    $(overlaymenus[i]).removeClass('overlayMenu');
                }
            }
        }
    });
}, false);

registerCreatedHook('app-enum-edit', function (element) {
    setTimeout(function () {
        if (element.multiple) {
            let shadowRoot = element.shadowRoot;
            let link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('type', 'text/css');
            link.setAttribute('href', '/Content/multiple-select.css');
            shadowRoot.appendChild(link);

            //debugger;
            let multipleSelect = $(element.inputelement).multipleSelect();
            //debugger;
            let div = shadowRoot.querySelector('div.ms-parent');
            $(div).css('width', '100%');
            let button = div.querySelector('button');
            let dropdownvisible = false;
            let dropdown = div.querySelector('div.ms-drop');
            
            var data = $(element.inputelement).data('multipleSelect');

            var hidedropdownfunction = function (event) {

                if (!event || (!event.path.includes(button) && !event.path.includes(div))) {
                    {
                        $(dropdown).css('display', 'none');
                        //multipleSelect.open();
                        data.close();
                        dropdownvisible = false;
                        document.removeEventListener('click', hidedropdownfunction);
                    }
                }
            }

            button.addEventListener('click', function (event) {
                //debugger;

                if (!dropdownvisible) {
                    $(dropdown).css('display', 'block');
                    //multipleSelect.close();
                    data.open();
                    dropdownvisible = true;
                    document.addEventListener('click', hidedropdownfunction);
                }
                else {
                    hidedropdownfunction();
                }
            });
        }
    });
});


/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @version 1.2.1
 *
 * http://wenzhixin.net.cn/p/multiple-select/
 */

(function ($) {

    'use strict';

    // it only does '%s', and return '' when arguments are undefined
    var sprintf = function (str) {
        var args = arguments,
            flag = true,
            i = 1;

        str = str.replace(/%s/g, function () {
            var arg = args[i++];

            if (typeof arg === 'undefined') {
                flag = false;
                return '';
            }
            return arg;
        });
        return flag ? str : '';
    };

    var removeDiacritics = function (str) {
        var defaultDiacriticsRemovalMap = [
            { 'base': 'A', 'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g },
            { 'base': 'AA', 'letters': /[\uA732]/g },
            { 'base': 'AE', 'letters': /[\u00C6\u01FC\u01E2]/g },
            { 'base': 'AO', 'letters': /[\uA734]/g },
            { 'base': 'AU', 'letters': /[\uA736]/g },
            { 'base': 'AV', 'letters': /[\uA738\uA73A]/g },
            { 'base': 'AY', 'letters': /[\uA73C]/g },
            { 'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g },
            { 'base': 'C', 'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g },
            { 'base': 'D', 'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g },
            { 'base': 'DZ', 'letters': /[\u01F1\u01C4]/g },
            { 'base': 'Dz', 'letters': /[\u01F2\u01C5]/g },
            { 'base': 'E', 'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g },
            { 'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g },
            { 'base': 'G', 'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g },
            { 'base': 'H', 'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g },
            { 'base': 'I', 'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g },
            { 'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g },
            { 'base': 'K', 'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g },
            { 'base': 'L', 'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g },
            { 'base': 'LJ', 'letters': /[\u01C7]/g },
            { 'base': 'Lj', 'letters': /[\u01C8]/g },
            { 'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g },
            { 'base': 'N', 'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g },
            { 'base': 'NJ', 'letters': /[\u01CA]/g },
            { 'base': 'Nj', 'letters': /[\u01CB]/g },
            { 'base': 'O', 'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g },
            { 'base': 'OI', 'letters': /[\u01A2]/g },
            { 'base': 'OO', 'letters': /[\uA74E]/g },
            { 'base': 'OU', 'letters': /[\u0222]/g },
            { 'base': 'P', 'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g },
            { 'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g },
            { 'base': 'R', 'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g },
            { 'base': 'S', 'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g },
            { 'base': 'T', 'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g },
            { 'base': 'TZ', 'letters': /[\uA728]/g },
            { 'base': 'U', 'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g },
            { 'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g },
            { 'base': 'VY', 'letters': /[\uA760]/g },
            { 'base': 'W', 'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g },
            { 'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g },
            { 'base': 'Y', 'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g },
            { 'base': 'Z', 'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g },
            { 'base': 'a', 'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g },
            { 'base': 'aa', 'letters': /[\uA733]/g },
            { 'base': 'ae', 'letters': /[\u00E6\u01FD\u01E3]/g },
            { 'base': 'ao', 'letters': /[\uA735]/g },
            { 'base': 'au', 'letters': /[\uA737]/g },
            { 'base': 'av', 'letters': /[\uA739\uA73B]/g },
            { 'base': 'ay', 'letters': /[\uA73D]/g },
            { 'base': 'b', 'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g },
            { 'base': 'c', 'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g },
            { 'base': 'd', 'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g },
            { 'base': 'dz', 'letters': /[\u01F3\u01C6]/g },
            { 'base': 'e', 'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g },
            { 'base': 'f', 'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g },
            { 'base': 'g', 'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g },
            { 'base': 'h', 'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g },
            { 'base': 'hv', 'letters': /[\u0195]/g },
            { 'base': 'i', 'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g },
            { 'base': 'j', 'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g },
            { 'base': 'k', 'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g },
            { 'base': 'l', 'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g },
            { 'base': 'lj', 'letters': /[\u01C9]/g },
            { 'base': 'm', 'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g },
            { 'base': 'n', 'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g },
            { 'base': 'nj', 'letters': /[\u01CC]/g },
            { 'base': 'o', 'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g },
            { 'base': 'oi', 'letters': /[\u01A3]/g },
            { 'base': 'ou', 'letters': /[\u0223]/g },
            { 'base': 'oo', 'letters': /[\uA74F]/g },
            { 'base': 'p', 'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g },
            { 'base': 'q', 'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g },
            { 'base': 'r', 'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g },
            { 'base': 's', 'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g },
            { 'base': 't', 'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g },
            { 'base': 'tz', 'letters': /[\uA729]/g },
            { 'base': 'u', 'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g },
            { 'base': 'v', 'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g },
            { 'base': 'vy', 'letters': /[\uA761]/g },
            { 'base': 'w', 'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g },
            { 'base': 'x', 'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g },
            { 'base': 'y', 'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g },
            { 'base': 'z', 'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }
        ];

        for (var i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
            str = str.replace(defaultDiacriticsRemovalMap[i].letters, defaultDiacriticsRemovalMap[i].base);
        }

        return str;

    };

    function MultipleSelect($el, options) {
        var that = this,
            name = $el.attr('name') || options.name || '';

        this.options = options;

        // hide select element
        this.$el = $el.hide();

        // label element
        this.$label = this.$el.closest('label');
        if (this.$label.length === 0 && this.$el.attr('id')) {
            this.$label = $(sprintf('label[for="%s"]', this.$el.attr('id').replace(/:/g, '\\:')));
        }

        // restore class and title from select element
        this.$parent = $(sprintf(
            '<div class="ms-parent %s" %s/>',
            $el.attr('class') || '',
            sprintf('title="%s"', $el.attr('title'))));

        // add placeholder to choice button
        this.$choice = $(sprintf([
            '<button type="button" class="ms-choice">',
            '<span class="placeholder">%s</span>',
            '<div></div>',
            '</button>'
        ].join(''),
            this.options.placeholder));

        // default position is bottom
        this.$drop = $(sprintf('<div class="ms-drop %s"%s></div>',
            this.options.position,
            sprintf(' style="width: %s"', this.options.dropWidth)));

        this.$el.after(this.$parent);
        this.$parent.append(this.$choice);
        this.$parent.append(this.$drop);

        if (this.$el.prop('disabled')) {
            this.$choice.addClass('disabled');
        }
        this.$parent.css('width',
            this.options.width ||
            this.$el.css('width') ||
            this.$el.outerWidth() + 20);

        this.selectAllName = 'data-name="selectAll' + name + '"';
        this.selectGroupName = 'data-name="selectGroup' + name + '"';
        this.selectItemName = 'data-name="selectItem' + name + '"';

        //if (!this.options.keepOpen) {
        //    $(document).click(function (e) {
        //        if ($(e.target)[0] === that.$choice[0] ||
        //            $(e.target).parents('.ms-choice')[0] === that.$choice[0]) {
        //            return;
        //        }
        //        if (($(e.target)[0] === that.$drop[0] ||
        //            $(e.target).parents('.ms-drop')[0] !== that.$drop[0] && e.target !== $el[0]) &&
        //            that.options.isOpen) {
        //            that.close();
        //        }
        //    });
        //}
    }

    MultipleSelect.prototype = {
        constructor: MultipleSelect,

        init: function () {
            //debugger;
            var that = this,
                $ul = $('<ul></ul>');

            this.$drop.html('');

            if (this.options.filter) {
                this.$drop.append([
                    '<div class="ms-search">',
                    '<input type="text" autocomplete="off" autocorrect="off" autocapitilize="off" spellcheck="false">',
                    '</div>'].join('')
                );
            }

            if (this.options.selectAll && !this.options.single) {
                $ul.append([
                    '<li class="ms-select-all">',
                    '<label>',
                    sprintf('<input type="checkbox" %s /> ', this.selectAllName),
                    this.options.selectAllDelimiter[0],
                    this.options.selectAllText,
                    this.options.selectAllDelimiter[1],
                    '</label>',
                    '</li>'
                ].join(''));
            }

            $.each(this.$el.children(), function (i, elm) {
                $ul.append(that.optionToHtml(i, elm));
            });
            $ul.append(sprintf('<li class="ms-no-results">%s</li>', this.options.noMatchesFound));
            this.$drop.append($ul);

            this.$drop.find('ul').css('max-height', this.options.maxHeight + 'px');
            this.$drop.find('.multiple').css('width', this.options.multipleWidth + 'px');

            this.$searchInput = this.$drop.find('.ms-search input');
            this.$selectAll = this.$drop.find('input[' + this.selectAllName + ']');
            this.$selectGroups = this.$drop.find('input[' + this.selectGroupName + ']');
            this.$selectItems = this.$drop.find('input[' + this.selectItemName + ']:enabled');
            this.$disableItems = this.$drop.find('input[' + this.selectItemName + ']:disabled');
            this.$noResults = this.$drop.find('.ms-no-results');

            this.events();
            this.updateSelectAll(true);
            this.update(true);

            if (this.options.isOpen) {
                this.open();
            }
        },

        optionToHtml: function (i, elm, group, groupDisabled) {
            var that = this,
                $elm = $(elm),
                classes = $elm.attr('class') || '',
                title = sprintf('title="%s"', $elm.attr('title')),
                multiple = this.options.multiple ? 'multiple' : '',
                disabled,
                type = this.options.single ? 'radio' : 'checkbox';

            if ($elm.is('option')) {
                var value = $elm.val(),
                    text = that.options.textTemplate($elm),
                    selected = $elm.prop('selected'),
                    style = sprintf('style="%s"', this.options.styler(value)),
                    $el;

                disabled = groupDisabled || $elm.prop('disabled');

                $el = $([
                    sprintf('<li class="%s %s" %s %s>', multiple, classes, title, style),
                    sprintf('<label class="%s">', disabled ? 'disabled' : ''),
                    sprintf('<input type="%s" %s%s%s%s>',
                        type, this.selectItemName,
                        selected ? ' checked="checked"' : '',
                        disabled ? ' disabled="disabled"' : '',
                        sprintf(' data-group="%s"', group)),
                    sprintf('<span>%s</span>', text),
                    '</label>',
                    '</li>'
                ].join(''));
                $el.find('input').val(value);
                return $el;
            }
            if ($elm.is('optgroup')) {
                var label = that.options.labelTemplate($elm),
                    $group = $('<div/>');

                group = 'group_' + i;
                disabled = $elm.prop('disabled');

                $group.append([
                    '<li class="group">',
                    sprintf('<label class="optgroup %s" data-group="%s">', disabled ? 'disabled' : '', group),
                    this.options.hideOptgroupCheckboxes || this.options.single ? '' :
                        sprintf('<input type="checkbox" %s %s>',
                            this.selectGroupName, disabled ? 'disabled="disabled"' : ''),
                    label,
                    '</label>',
                    '</li>'
                ].join(''));

                $.each($elm.children(), function (i, elm) {
                    $group.append(that.optionToHtml(i, elm, group, disabled));
                });
                return $group.html();
            }
        },

        events: function () {
            var that = this,
                toggleOpen = function (e) {
                    e.preventDefault();
                    that[that.options.isOpen ? 'close' : 'open']();
                };

            if (this.$label) {
                this.$label.off('click').on('click', function (e) {
                    if (e.target.nodeName.toLowerCase() !== 'label' || e.target !== this) {
                        return;
                    }
                    toggleOpen(e);
                    if (!that.options.filter || !that.options.isOpen) {
                        that.focus();
                    }
                    e.stopPropagation(); // Causes lost focus otherwise
                });
            }

            this.$choice.off('click').on('click', toggleOpen)
                .off('focus').on('focus', this.options.onFocus)
                .off('blur').on('blur', this.options.onBlur);

            this.$parent.off('keydown').on('keydown', function (e) {
                switch (e.which) {
                    case 27: // esc key
                        that.close();
                        that.$choice.focus();
                        break;
                }
            });

            this.$searchInput.off('keydown').on('keydown', function (e) {
                // Ensure shift-tab causes lost focus from filter as with clicking away
                if (e.keyCode === 9 && e.shiftKey) {
                    that.close();
                }
            }).off('keyup').on('keyup', function (e) {
                // enter or space
                // Avoid selecting/deselecting if no choices made
                if (that.options.filterAcceptOnEnter && (e.which === 13 || e.which == 32) && that.$searchInput.val()) {
                    that.$selectAll.click();
                    that.close();
                    that.focus();
                    return;
                }
                that.filter();
            });

            this.$selectAll.off('click').on('click', function () {
                var checked = $(this).prop('checked'),
                    $items = that.$selectItems.filter(':visible');

                if ($items.length === that.$selectItems.length) {
                    that[checked ? 'checkAll' : 'uncheckAll']();
                } else { // when the filter option is true
                    that.$selectGroups.prop('checked', checked);
                    $items.prop('checked', checked);
                    that.options[checked ? 'onCheckAll' : 'onUncheckAll']();
                    that.update();
                }
            });
            this.$selectGroups.off('click').on('click', function () {
                var group = $(this).parent().attr('data-group'),
                    $items = that.$selectItems.filter(':visible'),
                    $children = $items.filter(sprintf('[data-group="%s"]', group)),
                    checked = $children.length !== $children.filter(':checked').length;

                $children.prop('checked', checked);
                that.updateSelectAll();
                that.update();
                that.options.onOptgroupClick({
                    label: $(this).parent().text(),
                    checked: checked,
                    children: $children.get(),
                    instance: that
                });
            });
            this.$selectItems.off('click').on('click', function () {
                that.updateSelectAll();
                that.update();
                that.updateOptGroupSelect();
                that.options.onClick({
                    label: $(this).parent().text(),
                    value: $(this).val(),
                    checked: $(this).prop('checked'),
                    instance: that
                });

                if (that.options.single && that.options.isOpen && !that.options.keepOpen) {
                    that.close();
                }

                if (that.options.single) {
                    var clickedVal = $(this).val();
                    that.$selectItems.filter(function () {
                        return $(this).val() !== clickedVal;
                    }).each(function () {
                        $(this).prop('checked', false);
                    });
                    that.update();
                }
            });
        },

        open: function () {
            if (this.$choice.hasClass('disabled')) {
                return;
            }
            this.options.isOpen = true;
            this.$choice.find('>div').addClass('open');
            this.$drop[this.animateMethod('show')]();

            // fix filter bug: no results show
            this.$selectAll.parent().show();
            this.$noResults.hide();

            // Fix #77: 'All selected' when no options
            if (!this.$el.children().length) {
                this.$selectAll.parent().hide();
                this.$noResults.show();
            }

            if (this.options.container) {
                var offset = this.$drop.offset();
                this.$drop.appendTo($(this.options.container));
                this.$drop.offset({
                    top: offset.top,
                    left: offset.left
                });
            }

            if (this.options.filter) {
                this.$searchInput.val('');
                this.$searchInput.focus();
                this.filter();
            }
            this.options.onOpen();
        },

        close: function () {
            this.options.isOpen = false;
            this.$choice.find('>div').removeClass('open');
            this.$drop[this.animateMethod('hide')]();
            if (this.options.container) {
                this.$parent.append(this.$drop);
                this.$drop.css({
                    'top': 'auto',
                    'left': 'auto'
                });
            }
            this.options.onClose();
        },

        animateMethod: function (method) {
            var methods = {
                show: {
                    fade: 'fadeIn',
                    slide: 'slideDown'
                },
                hide: {
                    fade: 'fadeOut',
                    slide: 'slideUp'
                }
            };

            return methods[method][this.options.animate] || method;
        },

        update: function (isInit) {
            var selects = this.options.displayValues ? this.getSelects() : this.getSelects('text'),
                $span = this.$choice.find('>span'),
                sl = selects.length;

            if (sl === 0) {
                $span.addClass('placeholder').html(this.options.placeholder);
            } else if (this.options.allSelected && sl === this.$selectItems.length + this.$disableItems.length) {
                $span.removeClass('placeholder').html(this.options.allSelected);
            } else if (this.options.ellipsis && sl > this.options.minimumCountSelected) {
                $span.removeClass('placeholder').text(selects.slice(0, this.options.minimumCountSelected)
                    .join(this.options.delimiter) + '...');
            } else if (this.options.countSelected && sl > this.options.minimumCountSelected) {
                $span.removeClass('placeholder').html(this.options.countSelected
                    .replace('#', selects.length)
                    .replace('%', this.$selectItems.length + this.$disableItems.length));
            } else {
                $span.removeClass('placeholder').text(selects.join(this.options.delimiter));
            }

            if (this.options.addTitle) {
                $span.prop('title', this.getSelects('text'));
            }

            // set selects to select
            this.$el.val(this.getSelects()).trigger('change');

            // add selected class to selected li
            this.$drop.find('li').removeClass('selected');
            this.$drop.find('input:checked').each(function () {
                $(this).parents('li').first().addClass('selected');
            });

            // trigger <select> change event
            if (!isInit) {
                this.$el.trigger('change');
            }
        },

        updateSelectAll: function (isInit) {
            var $items = this.$selectItems;

            if (!isInit) {
                $items = $items.filter(':visible');
            }
            this.$selectAll.prop('checked', $items.length &&
                $items.length === $items.filter(':checked').length);
            if (!isInit && this.$selectAll.prop('checked')) {
                this.options.onCheckAll();
            }
        },

        updateOptGroupSelect: function () {
            var $items = this.$selectItems.filter(':visible');
            $.each(this.$selectGroups, function (i, val) {
                var group = $(val).parent().attr('data-group'),
                    $children = $items.filter(sprintf('[data-group="%s"]', group));
                $(val).prop('checked', $children.length &&
                    $children.length === $children.filter(':checked').length);
            });
        },

        //value or text, default: 'value'
        getSelects: function (type) {
            var that = this,
                texts = [],
                values = [];
            this.$drop.find(sprintf('input[%s]:checked', this.selectItemName)).each(function () {
                texts.push($(this).parents('li').first().text());
                values.push($(this).val());
            });

            if (type === 'text' && this.$selectGroups.length) {
                texts = [];
                this.$selectGroups.each(function () {
                    var html = [],
                        text = $.trim($(this).parent().text()),
                        group = $(this).parent().data('group'),
                        $children = that.$drop.find(sprintf('[%s][data-group="%s"]', that.selectItemName, group)),
                        $selected = $children.filter(':checked');

                    if (!$selected.length) {
                        return;
                    }

                    html.push('[');
                    html.push(text);
                    if ($children.length > $selected.length) {
                        var list = [];
                        $selected.each(function () {
                            list.push($(this).parent().text());
                        });
                        html.push(': ' + list.join(', '));
                    }
                    html.push(']');
                    texts.push(html.join(''));
                });
            }
            return type === 'text' ? texts : values;
        },

        setSelects: function (values) {
            var that = this;
            this.$selectItems.prop('checked', false);
            this.$disableItems.prop('checked', false);
            $.each(values, function (i, value) {
                that.$selectItems.filter(sprintf('[value="%s"]', value)).prop('checked', true);
                that.$disableItems.filter(sprintf('[value="%s"]', value)).prop('checked', true);
            });
            this.$selectAll.prop('checked', this.$selectItems.length ===
                this.$selectItems.filter(':checked').length + this.$disableItems.filter(':checked').length);

            $.each(that.$selectGroups, function (i, val) {
                var group = $(val).parent().attr('data-group'),
                    $children = that.$selectItems.filter('[data-group="' + group + '"]');
                $(val).prop('checked', $children.length &&
                    $children.length === $children.filter(':checked').length);
            });

            this.update();
        },

        enable: function () {
            this.$choice.removeClass('disabled');
        },

        disable: function () {
            this.$choice.addClass('disabled');
        },

        checkAll: function () {
            this.$selectItems.prop('checked', true);
            this.$selectGroups.prop('checked', true);
            this.$selectAll.prop('checked', true);
            this.update();
            this.options.onCheckAll();
        },

        uncheckAll: function () {
            this.$selectItems.prop('checked', false);
            this.$selectGroups.prop('checked', false);
            this.$selectAll.prop('checked', false);
            this.update();
            this.options.onUncheckAll();
        },

        focus: function () {
            this.$choice.focus();
            this.options.onFocus();
        },

        blur: function () {
            this.$choice.blur();
            this.options.onBlur();
        },

        refresh: function () {
            this.init();
        },

        destroy: function () {
            this.$el.show();
            this.$parent.remove();
            this.$el.data('multipleSelect', null);
        },

        filter: function () {
            var that = this,
                text = $.trim(this.$searchInput.val()).toLowerCase();

            if (text.length === 0) {
                this.$selectAll.parent().show();
                this.$selectItems.parent().show();
                this.$disableItems.parent().show();
                this.$selectGroups.parent().show();
                this.$noResults.hide();
            } else {
                this.$selectItems.each(function () {
                    var $parent = $(this).parent();
                    $parent[removeDiacritics($parent.text().toLowerCase()).indexOf(removeDiacritics(text)) < 0 ? 'hide' : 'show']();
                });
                this.$disableItems.parent().hide();
                this.$selectGroups.each(function () {
                    var $parent = $(this).parent();
                    var group = $parent.attr('data-group'),
                        $items = that.$selectItems.filter(':visible');
                    $parent[$items.filter(sprintf('[data-group="%s"]', group)).length ? 'show' : 'hide']();
                });

                //Check if no matches found
                if (this.$selectItems.parent().filter(':visible').length) {
                    this.$selectAll.parent().show();
                    this.$noResults.hide();
                } else {
                    this.$selectAll.parent().hide();
                    this.$noResults.show();
                }
            }
            this.updateOptGroupSelect();
            this.updateSelectAll();
            this.options.onFilter(text);
        }
    };

    $.fn.multipleSelect = function () {
        //debugger;
        var option = arguments[0],
            args = arguments,

            value,
            allowedMethods = [
                'getSelects', 'setSelects',
                'enable', 'disable',
                'open', 'close',
                'checkAll', 'uncheckAll',
                'focus', 'blur',
                'refresh', 'destroy'
            ];

        this.each(function () {
            //debugger;
            var $this = $(this),
                data = $this.data('multipleSelect'),
                options = $.extend({}, $.fn.multipleSelect.defaults,
                    $this.data(), typeof option === 'object' && option);

            if (!data) {
                data = new MultipleSelect($this, options);
                $this.data('multipleSelect', data);
            }

            if (typeof option === 'string') {
                if ($.inArray(option, allowedMethods) < 0) {
                    throw 'Unknown method: ' + option;
                }
                value = data[option](args[1]);
            } else {
                data.init();
                if (args[1]) {
                    value = data[args[1]].apply(data, [].slice.call(args, 2));
                }
            }
        });

        var ret = typeof value !== 'undefined' ? value : this;
        //return ret;
        //debugger;
        //return this;
    };

    $.fn.multipleSelect.defaults = {
        name: '',
        isOpen: false,
        placeholder: '',
        selectAll: true,
        selectAllDelimiter: ['[', ']'],
        minimumCountSelected: 3,
        ellipsis: false,
        multiple: false,
        multipleWidth: 80,
        single: false,
        filter: false,
        width: undefined,
        dropWidth: undefined,
        maxHeight: 250,
        container: null,
        position: 'bottom',
        keepOpen: false,
        animate: 'none', // 'none', 'fade', 'slide'
        displayValues: false,
        delimiter: ', ',
        addTitle: false,
        filterAcceptOnEnter: false,
        hideOptgroupCheckboxes: false,

        selectAllText: 'Select all',
        allSelected: 'All selected',
        countSelected: '# of % selected',
        noMatchesFound: 'No matches found',

        styler: function () {
            return false;
        },
        textTemplate: function ($elm) {
            return $elm.html();
        },
        labelTemplate: function ($elm) {
            return $elm.attr('label');
        },

        onOpen: function () {
            return false;
        },
        onClose: function () {
            return false;
        },
        onCheckAll: function () {
            return false;
        },
        onUncheckAll: function () {
            return false;
        },
        onFocus: function () {
            return false;
        },
        onBlur: function () {
            return false;
        },
        onOptgroupClick: function () {
            return false;
        },
        onClick: function () {
            return false;
        },
        onFilter: function () {
            return false;
        }
    };
})(jQuery);

