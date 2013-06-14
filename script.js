var is_debug_mode = false;
var def_delay = 100;
var def_interval = 0;
var id = 'fapddagdnlblaoikdknipiadkmiihjam';

function log(message) {
    if (is_debug_mode) {
        console.log(message);
    }
}

function addStyles(p) {
    var style = $('<style>');
    var str = '';

    for (var i in p.styles) {
        str += i + "{";
        for (var j in p.styles[i]) {
            var key = j.replace(/([A-Z])/g, "-$1").toLowerCase();
            var re = /^assets(.*)$/;
            var val = p.styles[i][j].replace(re, function(str, p1) {
                console.log(p1);
                return ["url('chrome-extension://",  id,
                        "/assets",
                        "/" + p.name + p1 + "')"].join('');
            });
            str += "  " + key + ": " + val + ";";
        }
        str += "}";
    }

    if (p.option != undefined && p.option.value != undefined) {
        var str = str.replace(/\$option\$/g, p.option.value);
    }

    log(str);
    style.html(str);

    setTimeout(function() {
        style.appendTo($('head'));
    }, (p.delay || def_delay));
}

$(document).ready( function() {
    chrome.storage.sync.get('config', function(data) {
        for (var i in data.config) {

            var p = data.config[i];
            p.name = i;

            var option =(p.option && p.option.value)? p.option.value: '';

            if (!p.url) { continue };
            if (typeof p.url == 'string') {
                if (location.href.indexOf(p.url) == -1) { continue };
            } else {
                var inTarget = false;
                for (var j in p.url) {
                    if (location.href.indexOf(p.url[j]) > -1) {
                        inTarget = true;
                    }
                }
                if (inTarget == false) { continue };
            }

            if (p.use) {

                log(i + ' start');
                log('loaded...');

                if (p.styles) {
                    log('addStyle start');
                    addStyles(p);
                    log('addStyle end');
                }

                if (p.init) {
                    log('init start');
                    plugin[i].init(option);
                    log('init end');
                }

                if (p.batch) {
                    setTimeout( function(target) {
                        log('batch start');
                        target.batch(option);
                        log('batch end');
                    }, (p.delay || def_delay), plugin[i]);

                    if (p.interval > 0) {
                        setInterval( function(target) {
                            log('batch start');
                            target.batch(option);
                            log('batch end');
                        }, (p.interval || interval), plugin[i]);
                    }
                }

            }
        }
    });
});
