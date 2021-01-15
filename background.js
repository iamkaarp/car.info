function gotoCarInfo(a) {
    const baseURL = 'https://www.car.info/sv-se/license-plate/S/';
    const url = baseURL + a.toLowerCase();
    window.open(
        url,
        '_blank',
    );
}

const id = chrome.contextMenus.create({
    'title': 'Car.info',
    'contexts':['selection'],
    'visible': false,
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
                'onclick': gotoCarInfo(string),
            };
        } else {
            opt = {
                'visible': false,
            };
        }
        chrome.contextMenus.update(id, opt);
    }
});