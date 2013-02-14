(function() {
    var module = '500px_small_image';
    var url = 'http://500px.com';
    var description = "500pxの画像を小さく表示する";

    var tep = new TinyExtensionPack.Tep(module, url);
    // tiny.is_debug_mode = true;

    tep.batch = function() {
        $('img').each( function() {
            var src = $(this).attr('src');
            if (src.match(/.*4\.[a-z]{3,4}$/)) {
                var link = src.replace(/(.*)4(\.[a-z]{3,4})$/, "$13$2");
                $(this)
                    .attr('src', link)
                    .attr('data-src', link);
            }
        });
    }

    tep.start();
})();