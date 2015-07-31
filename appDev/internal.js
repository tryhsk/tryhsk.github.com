document.addEventListener("DOMContentLoaded", function (event) {
	var head = document.getElementsByTagName('head')[0];
	var NewStyles = document.createElement("link");
	NewStyles.rel = "stylesheet";
	NewStyles.type = "text/css";
	NewStyles.href = "public/css/all.css";
	head.appendChild(NewStyles);
});


if(typeof window.jQuery === 'undefined') {
	document.write(
		unescape("%3Cscript src='appDev/vendor/jquery.min.js' type='text/javascript'%3E%3C/script%3E")
	);
}


if(typeof window.jQuery.effect === 'undefined') {
	document.write(
		unescape("%3Cscript src='appDev/vendor/jquery-ui.min.js' type='text/javascript'%3E%3C/script%3E")
	);
}


if(typeof window.angular === 'undefined') {
	document.write(
		unescape("%3Cscript src='appDev/vendor/angular.min.js' type='text/javascript'%3E%3C/script%3E")
	);
}


if(window.location.toString().indexOf('vk.com') + 1) {
	document.write(
		unescape("%3Cscript src='//vk.com/js/api/xd_connection.js?2' type='text/javascript'%3E%3C/script%3E")
	);
}

if (window.VK) {
	VK.init(function () {    // инициализируем Vk API
		var parts = document.location.search.substr(1).split("&");
		var flashVars = {}, curr;
		for (i = 0; i < parts.length; i++) {
			curr = parts[i].split('=');
			flashVars[curr[0]] = curr[1];
		}
		window.vkid = flashVars['viewer_id'];
		window.language = flashVars['language'];
		window.is_app_user = flashVars['is_app_user'];
//			window.vkid = 1000000;   // develop
	});
}

if (window.VK) {
	var height = document.getElementById('tab-control').offsetHeight;
	setInterval(function () {
		if (height !== document.getElementById('tab-control').offsetHeight) {
			height = document.getElementById('tab-control').offsetHeight;
			VK.callMethod('resizeWindow', 1000, height);
		}
	}, 40);
}
