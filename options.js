function $(id) {
    return document.getElementById(id);
}

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get('config', function(data) { build(data) });
});

function build(data) {
    var html = '';

    for (var i in data.config) {
        var p = data.config[i];
        var checked = (p.use)? ' checked="checked"': '';

        html += '<div class="item">';
        html += '<input type="checkbox" id="' + i + '"' + checked + '">';
        html += '<label class="title" for="' + i +'">' + i + '</label>';
        html += '<div class="url"><a href="' + p.url + '">';
        html +=  p.url;
        html += '</a></div>';
        html += '<div class="description">' + p.description + '</div>';
        if (p.option != undefined && p.option.type == 'color') {
            html += '<div class="option">';
            html += '<div style="float:left">' + p.option.caption + ': </div>';
            html += '<input type="color"';
            html +=       ' id="option_' + i + '"';
            html +=       ' value="' + p.option.value + '">';
            html += '</div>';
        }
        html = html + '</div>';
    }
    $('list').innerHTML = html;

    for (var i in data.config) {
        var config = data.config;

        if (config[i].option != undefined && config[i].option.type == 'color') {
            var id = i;
            $('option_' + i).addEventListener('change', function() {
                config[id].option.value = $(this.id).value;
                chrome.storage.sync.set({config: config});
            });
        }


        $(i).addEventListener('click', function() {
            config[this.id].use = ($(this.id).checked)? true: undefined;
            chrome.storage.sync.set({config: config});
        }, false);
    }
}
