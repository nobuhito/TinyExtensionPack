var module = 'google_plus_notification_icon_change';
plugin[module] = {
    url: [
        "https://plus.google.com",
        "https://mail.google",
    ],
    description: 'Google+の通知ベルのアイコンを稲妻に変更',
    delay: 1000,
    styles: {
        '.gb_aa .gb_X': {
            backgroundImage: "assets/Lightning_black.png",
        },
        ".gb_X": {
            backgroundImage: "assets/Lightning_gray.png",
        },
    },
};
