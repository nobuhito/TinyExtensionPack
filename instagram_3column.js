plugin['instagram_3column'] = {
	  url: "http://instagram.com",
	  description: 'Instagramのページを3列表示にする',
    styles: {
	      '.timelineItem': {
	          'width': '33%',
	          'float': 'left',
	      },
	      '.timelineComment': {
	          'display': 'none',
	      },
	      '.timelineCommentsViewport': {
	          'max-height': '0px',
	      },
	      '.timelineCenter': {
	          'margin-left': '0px',
	      },
	      '.timelineSidebar': {
	          'z-index': '100',
	          'width': '100%',
	      },
	      '.timelineBookmark': {
	          'z-index': '100',
	          'opacity': '0.8',
	          'background-color': '#E0E1E2',
	      },
    },
    batch: function() {
	      $('.timelineFirst').removeClass('timelineFirst');
    }
};
