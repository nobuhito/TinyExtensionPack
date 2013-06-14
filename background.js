function setConfig() {

    var config = {};
    for (var i in plugin) {
        //
        var p = plugin[i];
        var c = {};
        for (var j in p) {
            c[j] = p[j];
        }
        config[i] = c;
    }

    try {

        chrome.storage.sync.get('config', function(data) {
            for (var i in plugin) {

                if (data.config && data.config[i]) {
                    var d = data.config[i];

                    if (d.use) {
                        config[i].use = d.use;
                    }

                    if (d.option  && d.option.value && config[i].option) {
                        config[i].option.value = d.option.value;
                    }

                }
            }

            chrome.storage.sync.set({'config': config});
        });
    } catch(e) {

        chrome.storage.sync.set({'config': config});
    }
}

chrome.runtime.onInstalled.addListener(
    function() {
        setConfig();
    }
);

chrome.runtime.onUpdateAvailable.addListener(
    function() {
        setConfig();
    }
);
