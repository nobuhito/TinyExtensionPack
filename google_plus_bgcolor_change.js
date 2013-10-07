plugin['google_plus_bgcolor_change'] = {
    url: "https://plus.google.com",
    description: 'GooglePlusの背景色を変更する',
    styles: {
        '.ge': {
            'borderTopWidth': '1px',
        },
        '.RTa': {
            'backgroundColor': '$option$',
        }
    },
    option: {
        type: 'color',
        value: '#ffffff',
        caption: '背景色を指定',
    }
};
