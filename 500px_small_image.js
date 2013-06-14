plugin['500px_small_image'] = {
	  url: 'http://500px.com',
	  description: '500pxの画像を小さく表示する',
    batch: function() {
        $('img').each( function() {
            var src = $(this).attr('src');
            if (src.match(/.*4\.[a-z]{3,4}$/)) {
                var link = src.replace(/(.*)4(\.[a-z]{3,4})$/, "$13$2");
                $(this)
                    .attr('src', link)
                    .attr('data-src', link);
            }
        });
    },
};
