if (!window.TinyExtensionPack) TinyExtensionPack = {};
(function() {
    function Tep(module, url) {
        this.module = module;
        this.url = url;
        this.interval = 0;     // 0はワンショット
        this.delay = 500;      // 一回目の処理を遅らせる
        this.is_debug_mode = false; // コンソールにログを吐く
        this.init = undefined;
        this.batch = undefined;
    }

    TinyExtensionPack.Tep = Tep;

    Tep.prototype.debug = function(message) {
        if (this.is_debug_mode) {
            if (typeof message == 'string' || typeof message == 'number') {
                console.log(this.module + ': ' + message);
            } else {
                console.log(this.module + ' >');
	              console.log(message);
            }
        }
    }

    Tep.prototype.set_interval = function(val) {
        this.interval = val;
    }

    Tep.prototype.start = function() {
        this.debug('tep start');
        var o = this;
        $(document).ready( function() {
            o.debug('tep loaded...');
            if (location.href.indexOf(o.url) > -1) {

                if (o.init) {
                    o.debug('init start');
                    o.init();
                    o.debug('init end');
                }

                if (o.batch) {

                    setTimeout( function() {
                        o.debug('batch start');
                        o.batch();
                        o.debug('batch end');
                    }, o.delay);

                    if (o.interval > 0) {
                        setInterval( function() {
                            o.debug('batch start');
                            o.batch();
                            o.debug('batch end');
                        }, o.interval);
                    }
                }
            }
        });
    }
})();
