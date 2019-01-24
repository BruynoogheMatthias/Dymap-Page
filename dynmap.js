$(document).ready(function() {
	var maps = {
		survival: {
			name: "Survival",
			url: "http://minecraft.matthiasbruynooghe.be:8123"
		},

		creative: {
			name: "Creative",
			url: "http://minecraft.matthiasbruynooghe.be:8124"
		},
		

		factions: {
			name: "Factions",
			url: "http://minecraft.matthiasbruynooghe.be:8125"
		}
	
	};
	var current;
	var mapCount = 0;
	var server = getURLParameter("server");
	console.log("Initial server: "+server);
	var first = true;
	if(server === undefined || maps[server] === undefined) {
		$.each(maps, function(key, map) {
			if(first) {
				first = false;
				server = key;
			}
		});
	}
	$.each(maps, function(key, map) {
		mapCount++;
		$(".menu").append("<li class='"+key+"'>"+map.name+"</li>");
		if(key === server) {
			current = key;
			$(".map").attr("src", map.url);
			$(".menu li."+key).toggleClass("active", true);
		}
		$(".menu li."+key).click(function() {
			if(current != key) {
				current = key;
				$(".map").attr("src", map.url);
				$(".menu li").toggleClass("active", false);
				$(".menu li."+key).toggleClass("active", true);
			}
			updateUrl();
		});
	});
	$(".menu li").css("width", (100/mapCount)+"%");
	updateUrl();

	function getURLParameter(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
	}
	function getCurrentLink() {
		var result = window.location.href.split("?")[0]+"?server="+current;
		return result;
	}
	function updateUrl() {
		if (window.history) {
			window.history.replaceState(null, null, getCurrentLink());
		} else {
			window.location.href = getCurrentLink();
		}
	}
});