(function() {
    var module = 'instagram_3column';
    var url = 'http://instagram.com';

    var tep = new TinyExtensionPack.Tep(module, url);
    // tep.set_interval(10000);
    // tep.is_debug_mode = true;

    tep.batch = function() {
        var ss = '';
        ss += '.timelineItem { width: 33%; float:left } ';
        ss += '.timelineComment { display: none} ';
        ss += '.timelineCommentsViewport { max-height: 0px } ';
        ss += '.timelineCenter { margin-left: 0px } ';
        ss += '.timelineSidebar { z-index: 100; width: 100% } ';
        ss += '.timelineBookmark { z-index: 100; opacity: 0.8; background-color: #E0E1E2 } ';

        $('<style type="text/css">' + ss + '</style>').appendTo('head');

        $('.timelineFirst').removeClass('timelineFirst');

    };

    tep.start();
})();
