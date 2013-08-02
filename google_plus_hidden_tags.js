module = 'google_plus_hidden_tags';
plugin[module] = {
    url: "https://plus.google.com",
    description: 'Google+で指定したタグをストリームから消す',
    interval: 1000,
    batch: function(option) {
        var tags = option.replace(/#/g, '').replace(/[,\s]+/g, ',').split(/[,\s]/);

        var numParent = function(elem, num) {
            var e = elem;
            for (var i=0; i < num; i++) {
                e = $(e).parent();
            }
            return e;
        };

        // 通常の共有
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

        // 再共有
        $('a.ot-hashtag:not(.' + module + ')')
            .each( function() {
                $(this).addClass(module);
            }).filter( function() {
                var tag = $(this).text().replace(/#/, '');
                return (tags.indexOf(tag) > -1)? true: false;
            }).each( function() {
                var elem = numParent(this, 7);
                if (elem[0].id.match(/^update/)) {
                    elem.css('display', 'none');
                } else {
                    numParent(this, 9)
                        .find('div.gv > article')
                        .each( function(i, child) {
                            if (i == 0) {
                                $(child).children().each( function(i) {

                                    if (i > 0) {
                                        $(this).html('');
                                    } else {
                                        var s = '-- Delete by specified tags. --';
                                        $(this).children().eq(1).text(s);
                                    }
                                });
                            }
                        });
                    numParent(this, 9)
                        .find('div.gv')
                        .each( function(i, child) {
                            if (i == 0) {
                                $(child).children().each( function(i) {
                                    if (i == 1) {
                                        var s = '-- Delete by specified tags. --';
                                        $(this).children().eq(1).text(s);
                                    } else if (i > 1) {
                                        $(this).html('');
                                    }
                                });
                            }
                        });
                }
            });
    },
    option: {
        type: 'text',
        value: '',
        caption: 'タグをカンマまたはスペース区切りで指定',
    }
};
