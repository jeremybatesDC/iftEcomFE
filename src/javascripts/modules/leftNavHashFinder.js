var currentPathName = window.location.pathname;
var leftNavLinkElements = document.querySelectorAll('.sidebar__submenu-link');
var hashArray = [];
for(var i = 0; i < leftNavLinkElements.length; i++){
	hashArray.push(leftNavLinkElements[i].pathname);
};
hashArray.find(function(paths){
	if (paths == currentPathName){
		document.querySelector('[href="'+currentPathName+'"]').classList += ' selected';
	};
});