const id = chrome.contextMenus.create({
    'title': 'Car.info',
    'contexts':['selection'],
});

chrome.runtime.onMessage.addListener(function(msg) {
    const baseURL = 'https://www.car.info/sv-se/license-plate/S/';
    const string = msg.selection.toUpperCase().replace(/\s/g, '');
    const pattern = /(?:[A-HJ-PR-UW-Z]{3})(?:[0-9]{2}([[A-HJ-PR-UW-Z0-9]{1}))/g;
    if(string.length > 0) {
        if(string.match(new RegExp(pattern))) {
            chrome.contextMenus.update(id, {
                'title': 'Car.info - ' + string,
                'visible': true,
                'onclick': () => {
                    const url = baseURL + string.toLowerCase();
                    console.log(url);
                    window.open(
                        url,
                        '_blank',
                    );
                },
            });
        } else {
            chrome.contextMenus.update(id, {
                'visible': false,
            });
        }
    }
});