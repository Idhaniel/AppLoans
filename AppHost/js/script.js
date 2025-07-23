//script for profile drop down
var log = function loggg(){
	//console.log('Script Loaded!');
}

log();

function drop() {
var profileDropDown = document.getElementById("profile-drop-down");
if (profileDropDown.style.display == "none") {
	profileDropDown.style.display = "block";
} else {
		profileDropDown.style.display = "none";
	}
}

//script for notification button
function notification() {
	var notificationAlert = document.getElementById('notification-details');
	if (notificationAlert.style.display == "none") {
		notificationAlert.style.display ="block";
	} else {
		notificationAlert.style.display ="none";
	}
}

//script for hidden notification 
function moreDetails() {
	var checkItems = document.getElementById('checked'); 
	if (checkItems.style.display == "none") {
		checkItems.style.display = "block";
	} else {
		checkItems.style.display = "none";
	}
}

function moreDetails2() {
	var checkItems = document.getElementById('checked2'); 
	if (checkItems.style.display == "none") {
		checkItems.style.display = "block";
	} else {
		checkItems.style.display = "none";
	}
}

function moreDetails3() {
	var checkItems = document.getElementById('checked3'); 
	if (checkItems.style.display == "none") {
		checkItems.style.display = "block";
	} else {
		checkItems.style.display = "none";
	}
}
//script to show company drop down.
function company() {
	var companyList = document.getElementById('company-list');
	if (companyList.style.display == "none") {
		companyList.style.display = "block"; 
	} else {
		companyList.style.display = "none";
	}
}
// script to toggle navigation bar 
function navigation() {
	var contentLeft = document.getElementById('content-left');
	if (contentLeft.style.display == "none") {
		contentLeft.style.display = "block";
	} else {
		contentLeft.style.display = "none";
	}
}

//script for the nav hide and show on click
let addevent = function NavClick(){
	let navdiv = document.getElementById("content-left");
	let navs = navdiv.getElementsByTagName("LI");
	for(let i = 0; i < navs.length; i++){
		navs[i].addEventListener("click", NavClicked);
	}
};
addevent();
function NavClicked(event){
	level(event);
}

function level(event) {
	let children = event.currentTarget.children;
	for(let i = 0; i < children.length; i++){
			let tg = children[i].tagName;
			if(children[i].tagName === "UL"){
				if (children[i].style.display === "none") {
					let element = document.getElementById(children[i].id);
					element.style.display = "block";
					//event.stopImmediatePropagation();
			} else {
				let element = document.getElementById(children[i].id);
				element.style.display = "none";
				//event.stopImmediatePropagation();
			}
		}		
	}
}
// for showing and hidding content from menu dropdown
function toggleDocs(event) {
	debugger;
    if (event.target && event.target.className === 'clickable-heading') {
        var next = event.target.nextElementSibling;
        if (next.style.display === "none") {
            next.style.display = "block";
        } else {
            next.style.display = "none";
        }
    }
}

let menuToggle = function(){
	let menu = document.getElementsByClassName('clickable-heading');
	debugger;
	for(let i = 0; i < menu.length; i++){
		menu[i].addEventListener('click', toggleDocs);
	}
}

// to show manin nav flyout 
function mainNav() {
	var toggleElement = document.getElementsByClassName('nav-flyout');
	for(let i = 0; i < toggleElement.length; i++){
		if (toggleElement[i].style.display === "none"){
			toggleElement[i].style.display = 'block';
		}	
		else {
			toggleElement[i].style.display = 'none';
		}
	}
}

function toggle(elem){	
	if (elem.style.display === "none"){
		elem.style.display = 'block';
	}	
	else {
		elem.style.display = 'none';
	}
}

//to show tab menu items 
var tabButtons=document.querySelectorAll(".tabcontainer .buttoncontainer button");
var tabPanels=document.querySelectorAll(".tabcontainer .tabpanel");
function showPanel(panelIndex,colorCode) {
	tabButtons.forEach(function(node) {
		node.style.backgroundColor="";
	});
	tabButtons[panelIndex].style.backgroundColor=colorCode;
	let displayStatus = tabPanels[panelIndex].style.display;
	tabPanels.forEach(function(node) {
		node.style.display="none";
	});
	if(displayStatus === "block"){
		tabPanels[panelIndex].style.display="none";
	}
	else{
		tabPanels[panelIndex].style.display="block";
	}
	
}

/*let filterToggleEvent = function FilterEventHanler(){
	let navs = document.getElementsByClassName('filterClick');
	console.log('fileter loaded');
	for(let i = 0; i < navs.length; i++){		
		navs[i].addEventListener("click", filtershow);
	}
};
filterToggleEvent();


function filtershow(event) {
	debugger;
	if(event.target !== undefined){
		toggle(event.target.filterMenu);
	}	
}*/