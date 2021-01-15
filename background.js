function gotoCarInfo(info) {
    const baseURL = 'https://www.car.info/sv-se/license-plate/S/';
    const string = info.selectionText.toUpperCase();
    const url = baseURL + string.toLowerCase();
    window.open(
        url,
        '_blank',
    );
}

const id = chrome.contextMenus.create({
    'title': 'Car.info',
    'contexts':['selection'],
    'visible': false,
    'onclick': gotoCarInfo,
});

chrome.runtime.onMessage.addListener(function(msg) {
    const string = msg.selection.toUpperCase().replace(/\s/g, '');
    const pattern = /(?:[A-HJ-PR-UW-Z]{3})(?:[0-9]{2}([[A-HJ-PR-UW-Z0-9]{1}))/g;
    let opt = {};
    if(string.length > 0) {
        if(string.match(new RegExp(pattern))) {

            opt = {
                'title': 'Car.info - ' + string,
                'visible': true,
            };
        } else {
            opt = {
                'visible': false,
            };
        }
        chrome.contextMenus.update(id, opt);
    }
});