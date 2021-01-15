let chromeRuntimePort = chrome.runtime.connect();
chromeRuntimePort.onDisconnect.addListener(() => {
    chromeRuntimePort = undefined;
});

document.addEventListener('selectionchange', function() {
    var selection = window.getSelection().toString().trim();
    chrome.runtime.sendMessage({
        request: 'loadContextMenu',
        selection: selection,
    });
});

chromeRuntimePort.postMessage('Hey, finally no errors');