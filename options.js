document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get('config', function(data) { build(data) });
});

function build(data) {
    var html = '';

    for (var i in data.config) {
        var config = data.config;
        var p = data.config[i];

        var item = $('<div />').addClass('item');

        var check = $('<input />', {
            id: i,
            type: 'checkbox',
            checked: ((p.use)? 'checked': undefined)
        }).bind('change', function() {
            if ($("#" + this.id).is(':checked')) {
                config[this.id].use = true;
            } else {
                config[this.id].use = undefined;
            }
            chrome.storage.sync.set({config: config});
        }).appendTo(item);

        var label = $('<label />', {
            class: 'title',
            for: i,
            text: i,
        }).appendTo(item);

        var link = $('<div />', {
            class: 'url',
            html: '<a href="' + p.url + '">' + p.url + '</a>'
        }).appendTo(item);

        var discription = $('<div/>', {
            class: 'description',
            text: p.description
        }).appendTo(item);

        var option = $('<div />').addClass('option');
        if (p.option != undefined) {
            $('<div />')
                .css('float', 'left')
                .text(p.option.caption + ': ')
                .appendTo(option);
            var o = {};
            if (p.option.type == 'text') {
                o.type = 'text';
                o.size = '300px';
            }
            else if (p.option.type == 'color') {
                o.type = 'color';
            }

            $('<input type="' + o.type + '" />')
                .attr('id', "option_" + i)
                .css('width', ((o.size)? o.size: undefined))
                .attr('value', p.option.value)
                .bind('change', function() {
                    var i = this.id.replace(/^option_/, '');
                    config[i].option.value = $("#" + this.id).val();
                    chrome.storage.sync.set({config: config});
                })
                .appendTo(option)
                $(option).appendTo(item);
        }

        $('#list').append(item);
    }
}
