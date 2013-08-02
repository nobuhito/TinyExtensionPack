var module = 'google_plus_mark_for_public';
plugin[module] = {
    url: "https://plus.google.com",
    description: 'Google+の一般投稿コメント入力欄の色とキャプションを変更する',
    interval: 10000,
    batch: function(option) {
        var target = $(".B5:not(." + module + ")");
        target
	          .addClass(module)
	          .closest("div[id]").find(".Kj,.bI").each( function() {
	              $(this).css('backgroundColor', option).text('Public...');
	          });
    },
    option: {
        type: 'color',
        value: '#F8F8F8',
        caption: 'コメント入力欄の色を指定',
    }
};
　
