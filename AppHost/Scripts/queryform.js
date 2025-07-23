//everything in here has been added to iframeprep.js
//registerCreatedHook('app-enum-edit', function (element) {
//    setTimeout(function () {
//        if (element.multiple) {
//            let shadowRoot = element.shadowRoot;
//            let link = document.createElement('link');
//            link.setAttribute('rel', 'stylesheet');
//            link.setAttribute('type', 'text/css');
//            link.setAttribute('href', '/Content/multiple-select.css');
//            shadowRoot.appendChild(link);

//            //debugger;
//            let multipleSelect = $(element.inputelement).multipleSelect();
//            //debugger;
//            let div = shadowRoot.querySelector('div.ms-parent');
//            $(div).css('width', '100%');
//            let button = div.querySelector('button');
//            let dropdownvisible = false;
//            let dropdown = div.querySelector('div.ms-drop');

//            //debugger;
//            //multipleSelect.each(function () {
//            //    //debugger;
//            //    var $this = $(this);
//            //    var data = $this.data('multipleSelect');

//            //});

//            //var observer = new MutationObserver(function (mutations) {
//            //    mutations.forEach(function (mutation) {
//            //        if (mutation.type == "attributes") {
//            //            debugger;
//            //        }
//            //    });
//            //});

//            //observer.observe(dropdown, {
//            //    attributes: true //configure it to listen to attribute changes
//            //});
//            //debugger;
//            var data = $(element.inputelement).data('multipleSelect');

//            var hidedropdownfunction = function (event) {

//                if (!event || (!event.path.includes(button) && !event.path.includes(div))) {
//                    {
//                        $(dropdown).css('display', 'none');
//                        //multipleSelect.open();
//                        data.close();
//                        dropdownvisible = false;
//                        document.removeEventListener('click', hidedropdownfunction);
//                    }
//                }
//            }

//            button.addEventListener('click', function (event) {
//                //debugger;
                
//                if (!dropdownvisible) {
//                    $(dropdown).css('display', 'block');
//                    //multipleSelect.close();
//                    data.open();
//                    dropdownvisible = true;
//                    document.addEventListener('click', hidedropdownfunction);
//                }
//                else {
//                    hidedropdownfunction();
//                }
//            });
//        }
//    });
//})