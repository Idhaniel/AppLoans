function LocalHostWebSocket(connectedCallback, errorHandler) {
    if (!errorHandler) {
        throw "Please specify errorHandler function";
    }
    //var desktopwebsocket = null;
    var isOpen = false;
    var outgoingMessages = [];
    var awaitingFeedback = [];
    var desktopwebsocket = null;

    document.addEventListener('closed', function () {
        //debugger;
        if (desktopwebsocket) {
            try {
                desktopwebsocket.close();
            }
            catch (error) {
                console.log(error);
            }
        }
    });
    //self.frameElement.contentWindow.onbeforeunload = function () {
    //    debugger;

    //}
    //if websocket is non-existent or is either closing or closed state
    if (!desktopwebsocket || desktopwebsocket.readyState === 2 || desktopwebsocket.readyState === 3) {
        connect(connectedCallback);
    }
    else {
        if (connectedCallback) {
            //connectedCallback(desktopwebsocket);
            connectedCallback();
        }
    }

    //if (desktopwebsocket.readyState === 3) {
    //    alert("ERROR from constructor")
    //    console.log("Please ensure you have the desktop plugin running. You can download it at [download_link]")
    //    throw "Please ensure you have the desktop plugin running. You can download it at [download_link]"
    //}
    function pushMessageIntoAwaitingFeedback(msg) {
        //debugger;
        awaitingFeedback.push(msg);
        console.log(msg.id);
        //console.log(awaitingFeedback.length);
    }

    function disconnect() {
        desktopwebsocket.close();
    }

    function runOperation(operation, data, callback) {
        //debugger;

        var sendfunction = function () {
            if (desktopwebsocket.readyState === 3) {
                callback_({ errorMessage: "Please ensure you have the desktop plugin running" });
                return;
            }

            var now = new Date();
            var message = {
                operation: operation,
                data: data,
                callback: callback,
                id: now.getTime()
            };
            sendMessage({ message: message });
        };

        if (desktopwebsocket.readyState != 1) {
            connect(sendfunction);
        }
        else {
            sendfunction();
        }
    }

    function connect(connectedCallback) {
        //debugger;
        desktopwebsocket = new WebSocket("ws:127.0.0.1:18080/");
        desktopwebsocket.onmessage = receiveMessage;
        desktopwebsocket.onopen = function () {
            isOpen = true;
            while (outgoingMessages.length > 0) {
                var msg = outgoingMessages.pop();
                desktopwebsocket.send(JSON.stringify(msg));
                pushMessageIntoAwaitingFeedback(msg);
            }
            if (connectedCallback) {
                //connectedCallback(desktopwebsocket);
                connectedCallback();
            }
        };
        desktopwebsocket.onerror = function (evt) {
            if (desktopwebsocket.readyState == 1) {
                errorHandler('An error occurred. Please restart previous operation ');
            }
            else {
                errorHandler("Please ensure you have the desktop plugin installed and running. You can download it at [download_link]");
            }
        };
    }

    function sendMessage(message) {

        if (desktopwebsocket.readyState === 3) {
            throw "Please ensure you have the desktop plugin running. You can download it at [download_link]";
        }

        //if (!desktopwebsocket || desktopwebsocket.readyState != 1) {
        //    outgoingMessages.push(message);
        //    connect();
        //}
        //else {
        //    desktopwebsocket.send(JSON.stringify(message));
        //    pushMessageIntoAwaitingFeedback(message);
        //}

        desktopwebsocket.send(JSON.stringify(message));
        pushMessageIntoAwaitingFeedback(message);
    }

    function receiveMessage(message) {
        //console.log(message);
        //debugger;
        var serverResponse = JSON.parse(message.data);
        if (serverResponse.message && serverResponse.message.id) {
            console.log(serverResponse.message.id);
            console.log(awaitingFeedback[0].id);

            var msg = awaitingFeedback.find(x => x.message.id == serverResponse.message.id);
            try {
                msg.message.callback(serverResponse.message);
                //switch (serverResponse.operation) {
                //    case "text":
                //        console.log("text file received")
                //        break;
                //    case "image":
                //        var errorMessage = serverResponse.data.errorMessage;

                //        if (!errorMessage) {
                //            var imageObjects = serverResponse.data.images;
                //            var imgUrls = []
                //            for (var i = 0; i < imageObjects.length; i++) {
                //                var imgObj = imageObjects[i]
                //                var url = createImageUrl(imgObj);
                //                imgUrls.push({ url, imgObj })
                //            }
                //            msg.callback(imgUrls)
                //        }
                //        else {
                //            msg.callback({ errorMessage })
                //        }
                //        break;

                //    default:
                //        msg.callback(serverResponse.data)
                //        break;
                //}
            }
            catch (ex) { throw (ex.message + "-- from receive message method"); }
        }
    }

    //function b64toBlob(b64Data, contentType, sliceSize) {
    //    contentType = contentType || '';
    //    sliceSize = sliceSize || 512;
    //    var byteCharacters = atob(b64Data);
    //    var byteArrays = [];

    //    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    //        var slice = byteCharacters.slice(offset, offset + sliceSize);
    //        var byteNumbers = new Array(slice.length);

    //        for (var i = 0; i < slice.length; i++) {
    //            byteNumbers[i] = slice.charCodeAt(i);
    //        }
    //        var byteArray = new Uint8Array(byteNumbers);
    //        byteArrays.push(byteArray);
    //    }
    //    var blob = new Blob(byteArrays, { type: contentType });
    //    return blob;
    //}

    //function createImageUrl(b64string) {
    //    var blob = b64toBlob(b64string, 'image/jpeg')
    //    return URL.createObjectURL(blob);
    //}

    return {
        //start: function () {
        //    //console.log("starting")
        //    //this.send("text", "helloworld")
        //},
        //send: function (operation_, data_, callback_) {
        //    //console.log("sending message")

        //    if (desktopwebsocket.readyState === 3) {
        //        callback_({ errorMessage: "Please ensure you have the desktop plugin running" });
        //        return;
        //    }

        //    var now = new Date()
        //    var message = {
        //        operation: operation_,
        //        data: data_,
        //        callback: callback_,
        //        id: now.getTime()
        //    }
        //    sendMessage(message)
        //},
        run: runOperation
    };
}
