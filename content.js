let chromeRuntimePort = chrome.runtime.connect();
chromeRuntimePort.onDisconnect.addListener(() => {
    chromeRuntimePort = undefined;
});

document.addEventListener('selectionchange', function() {
    const selection = window.getSelection().toString().trim();
    if(selection.length > 0) {
        chrome.runtime.sendMessage({
            request: 'loadContextMenu',
            selection: selection,
        });
    }
});