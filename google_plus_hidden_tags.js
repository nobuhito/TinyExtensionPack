var module = 'google_plus_hidden_tags';
plugin[module] = {
    url: "https://plus.google.com",
    description: 'Google+で指定したタグをストリームから消す',
    interval: 1000,
    batch: function(option) {
        var tags = option.replace(/[,\s]+/g, ',').split(/[,\s]/);

        var numParent = function(elem, num) {
            var e = elem;
            for (var i=0; i < num; i++) {
                e = $(e).parent();
            }
            return e;
        };

        $('[data-topicid]:not(.' + module + ')')
            .each(function() {
                $(this).addClass(module);
            }).filter( function() {
                var dataTopicid = $(this).attr('data-topicid');
                var tag = dataTopicid.replace(/\/hashtag\//, '');
                return (tags.indexOf(tag) > -1)? true: false;
            }).each( function() {
                numParent(this, 7).css('display', 'none');
            });
    },
    option: {
        type: 'text',
        value: 'cancam',
        caption: 'タグをカンマまたはスペース区切りで指定',
    }
};
