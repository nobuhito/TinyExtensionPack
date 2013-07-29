var module = 'google_plus_hidden_plusone';
plugin[module] = {
    url: "https://plus.google.com",
    description: 'Google+で他人が+1したものをストリームから消す',
    interval: 1000,
    batch: function() {
        $('div.tE9bQe:not(.' + module + ')').each(function() {
            $(this).addClass(module);
            var parent = $(this).parent().parent();
            $('#' + parent.attr('id'))
                .css('display', 'none');
        });
    },
};