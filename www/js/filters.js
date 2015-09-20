angular.module('wpIonic.filters', [])

.filter('html_filters', function ($sce) {

	return function(text) {

		var htmlObject = document.createElement('div');
		htmlObject.innerHTML = text;

		var links = htmlObject.getElementsByTagName('a');

		for (var i = 0; i < links.length; i++) {

		    var link = links[i].getAttribute('href');

		    links[i].removeAttribute('href');
		    links[i].setAttribute('onclick', 'window.open("'+ link +'", "_blank", "location=no,enableViewportScale=yes")');
		}

		return $sce.trustAsHtml(htmlObject.outerHTML);

	}

})