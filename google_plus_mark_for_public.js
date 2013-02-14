(function() {
    var module = 'google_plus_mark_for_public';
    var url = 'https://plus.google.com';

    var tep = new TinyExtensionPack.Tep(module, url);
    tep.set_interval(10000);
    // tep.is_debug_mode = true;

    tep.batch = function() {
        var target = $(".B5:not(." + module + ")");
        tep.debug('target is ' + target.length);
        target
	          .addClass(module)
	          .closest("div[id]").find(".bI").each( function() {
	              $(this).css('backgroundColor', '#F8F8F8');
	          });
    };

    tep.start();
})();
