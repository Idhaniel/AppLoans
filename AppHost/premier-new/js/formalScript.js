let parentContainerWidth = 0;
let parentContainerHeight = 0;

function toggle(elem, ico){
	if(elem.style.display === 'none'){
		elem.style.display = 'block';
	}
	else{
		elem.style.display = 'none';
	}
	
	if(ico){
		if(elem.style.display === 'none'){
			if(contains(ico.classList, 'fa-caret-down')){
				ico.classList.remove('fa-caret-down');
			}			
			ico.classList.add('fa-caret-right');
		}
		else{
			if(contains(ico.classList,'fa-caret-right')){
				ico.classList.remove('fa-caret-right');
			}
			ico.classList.add('fa-caret-down');
		}
	}
}

function toggleAll(elems){
	for(let i = 0; i < elems.length; i++){
		if(elems[i].style.display === 'none'){
			elems[i].style.display = 'block';
		}
		else{
			elems[i].style.display = 'none';
		}
	}
}

function contains(list, arg){
	for(let i = 0; i < list.length; i++){
		if(list[i] === arg){
			return true;
		}
	}
	return false;
}

function addEvent(elementList, event, eventAction){
	for(let i = 0; i < elementList.length; i++){
		elementList[i].addEventListener(event, eventAction);
	}
}

function searchTogglerClicked(event){
	let searchClass = event.target.attributes.menuelement.value;
	let searchBoxes = document.querySelectorAll(`.${searchClass}`);
	toggleAll(searchBoxes);
}

function disposeMenu(menu){
	menu.style.display = 'none';		
}

function subMenuTogglerClicked(event){
	
	let targetElemId = event.currentTarget.attributes.menuelement.value;
	let targetElem = document.getElementById(targetElemId);
    let targetElemIco = document.getElementById(targetElem.id + '-ico');
	toggle(targetElem, targetElemIco);
	event.stopImmediatePropagation();
}

function active(elem, pinnedState){
	let elems = document.querySelectorAll('.active');
	let activeState = contains(elem.classList, 'active');
	
	for(let i = 0; i < elems.length; i++){
		elems[i].classList.remove('active');
	}
	if(activeState){
		if(pinnedState !== 'pinned'){
			elem.classList.remove('active');
		}
		else{ elem.classList.add('active');}		
	}
	else{
		elem.classList.add('active');
	}
}

function menuTogglerClicked(event){
	let targetElemId = event.target.attributes.menuelement.value;
	let targetElem = document.getElementById(targetElemId);
	
	disposeOverlayMenu(targetElem);

	toggle(targetElem);
	if(contains(event.target.classList, 'operationCat')){
		active(event.target);
	}
	else{
		let elems = document.querySelectorAll('.active');
		for(let i = 0; i < elems.length; i++){
			elems[i].classList.remove('active');
		}
	}	
	if(contains(event.target.classList, 'adjustParentContainerWidth')){
		adjustParentContainerWidth(targetElem);
	}
	adjustHeight();
	event.stopImmediatePropagation();
}

function removeMenuTogglerActiveState(){
	let togglers = document.querySelectorAll('.menuToggler');
	for(let i = 0; i < togglers.length; i++){
		if(contains(togglers[i].classList, 'active')){
			togglers[i].classList.remove('active');
		}
	}
}

function overlayMenuDispose(event){
	deepMenuDispose(event.target)
	removeMenuTogglerActiveState();
	event.stopImmediatePropagation();
}

//in overlayMenus, the 'overlayMenu' class should be added first.
function deepMenuDispose(elem){
	if(elem && !contains(elem.classList,'overlayMenu')){
		let parentElem = elem.parentElement;
		if(parentElem){
			deepMenuDispose(parentElem);
		}
		else{
			disposeOverlayMenu()
		}
	}	
}

function disposeOverlayMenu(sourceElem){
	let elemsOfSameClass = document.querySelectorAll('.overlayMenu');
	for(let i = 0; i < elemsOfSameClass.length; i++){
		if(!sourceElem || (sourceElem && elemsOfSameClass[i].id !== sourceElem.id)){
			disposeMenu(elemsOfSameClass[i]);
		}
	}	
}

function menuToggler(){
	let elems = document.getElementsByClassName('menuToggler');
	addEvent(elems, 'click', menuTogglerClicked);
}

function subMenuToggler() {
	let elems = document.getElementsByClassName('subMenuToggler');
	addEvent(elems, 'click', subMenuTogglerClicked);
}

(function(){
	document.addEventListener('click', overlayMenuDispose);
})();

function menuHider(){
	let elems = document.getElementsByClassName('menuHider');
	addEvent(elems, 'click', menuHiderClicked);
}

function operation(){
	let elems = document.getElementsByClassName('operation');
	addEvent(elems, 'click', operationClicked);
}

function searchToggler(){
	let elems = document.querySelectorAll('.searchToggler');
	addEvent(elems, 'click', searchTogglerClicked);
}

function hideMenu(elem, ico, topPosition){
	if(elem.hasAttribute('hidden')){
		elem.removeAttribute('hidden');
		if(contains(elem.classList,'overlayMenu')){
			elem.classList.remove('overlayMenu');
		}
		elem.style.display = 'block';
		elem.style.top = `0px`;
		elem.style.position = 'relative';
	}	
	else{
		elem.setAttribute('hidden', true);
		elem.classList.add('overlayMenu');
		topPosition = topPosition <= 72 ? top : 72;
		elem.style.top = `${topPosition}px`;
		elem.style.display = 'none';
		elem.style.position = 'absolute';
	}

	if(ico){
		if(elem.hasAttribute('hidden')){
			if(contains(ico.classList, 'fa-angle-up')){
				ico.classList.remove('fa-angle-up');
			}			
			ico.classList.add('fa-angle-down');
		}
		else{
			if(contains(ico.classList,'fa-angle-down')){
				ico.classList.remove('fa-angle-down');
			}
			ico.classList.add('fa-angle-up');
		}
	}
}

function removeEvent(elem, event, eventFunction){
	elem.removeEventListener(event, eventFunction);
}

function substituteClass(elem, removeclass, addclass){		
	if(contains(elem.classList, removeclass)){
		elem.classList.remove(removeclass);
	}		
	elem.classList.add(addclass);	
}

function removePinned(top){
	let operations = document.querySelectorAll('.operationMenu');
	for(let i = 0; i < operations.length; i++){
		operations[i].setAttribute('hidden', true);
		operations[i].classList.add('overlayMenu');
		top = top <= 72 ? top : 72;
		operations[i].style.top = `${top}px`;
		operations[i].style.display = 'none';
		operations[i].style.position = 'absolute';
	}
}

function operationClicked(event){
	let pinnedState = document.querySelector('.menuHider').attributes.status.value;
	let targetElemId = event.target.attributes.menuelement.value;
	let targetElem = document.getElementById(targetElemId);
	let position = document.querySelector('.buttoncontainer').getBoundingClientRect();
	removePinned();
	disposeOverlayMenu(targetElem);
	active(event.target, pinnedState);
	hideMenu(targetElem, null,position.top - position.height + 2);	
}

function menuHiderClicked(event){
	let status = event.target.attributes.status.value;
	let operations = document.querySelectorAll('.operationCat');
	let position = document.querySelector('.buttoncontainer').getBoundingClientRect();
	let targetElem = document.getElementById(event.target.attributes.menuelement.value);
	let targetElemIco = document.getElementById(`${targetElem.id}-ico`);
	let targetElemTooltip = document.getElementById(`${targetElem.id}-tooltip`);

	if(status === 'pinned'){

		for(let i = 0; i < operations.length; i++){
			substituteClass(operations[i], 'operation', 'menuToggler');
			operations[i].removeEventListener('click', operationClicked);
			operations[i].addEventListener('click', menuTogglerClicked);
			if(contains(operations[i].classList, 'active')){
				operations[i].classList.remove('active');
			}
		}
		disposeOverlayMenu(targetElem);
		hideMenu(targetElem, targetElemIco, position.top - position.height +2);
		removePinned(position.top - position.height + 2);
		targetElemTooltip.innerText = 'Expand';
		event.target.attributes.status.value = 'unpinned';
		event.stopImmediatePropagation();
	}
	else{
		for(let i = 0; i < operations.length; i++){
			substituteClass(operations[i], 'menuToggler', 'operation');
			operations[i].removeEventListener('click', menuTogglerClicked);
			operations[i].addEventListener('click', operationClicked);
		}
		disposeOverlayMenu(targetElem);
		hideMenu(targetElem, targetElemIco, position.top - position.height +2);
		active(operations[0]);
		if(!contains(operations[0].classList, 'active')){
			operations[0].classList.add('active');
		}
		targetElemTooltip.innerText = 'Collapse';
		event.target.attributes.status.value = 'pinned';
		event.stopImmediatePropagation();
	}	
}

//
(function setSideBarWidth(){
	//let test = document.querySelector('.content-right').style.width;
	let pContainer = document.querySelector('.content-right').getBoundingClientRect();
	parentContainerWidth = pContainer.width;
	parentContainerHeight = pContainer.height;
})();

function adjustParentContainerWidth(sideBar){
	let parentContainer = document.querySelector('.content-right');
	if(sideBar.style.display === 'none'){
		parentContainer.style.width = '100%';
	}
	else{
        parentContainer.style.width = 'calc(82.3% - 300px)';
	}
}

function parentContainerWidthAdjustEvent(){
	let toggler = document.querySelector('.adjustParentContainerWidth');
	addEvent(toggler, 'click', adjustParentContainerWidth);
}

function adjustMenuPosition(){
	let status = document.querySelector('.menuHider');
	if(status){
		status.attributes.status.value;
		if(status != 'pinned'){
			let position = document.querySelector('.buttoncontainer').getBoundingClientRect();
			let top = position.top - position.height + 2;
		
			let activeElem = document.querySelector('.active');
			if(activeElem){
				top = top <= 72 ? top : 72;
				activeElem.style.top = `${top}px`;
			}
			else{
				let operations = document.querySelectorAll('.operationMenu');
				for(let i = 0; i < operations.length; i++){
					top = top <= 72 ? top : 72;
		 			operations[i].style.top = `${top}px`;
				}
			}	
		}
	}	
	adjustHeight();	
}

window.addEventListener('resize', adjustMenuPosition);

function adjustHeight(){
	var winHeight = window.innerHeight;
	let heights = [];
    let elems = document.querySelectorAll("#content-left, .nav-flyout, .content-right");
    for(let i = 0; i < elems.length; i++){
    	heights.push(elems[i].getBoundingClientRect().height);
      	elems[i].style.minHeight = winHeight + "px";
    }
    let maxHeight = heights.sort()[heights.length - 1];
    
    for(let i = 0; i < elems.length; i++){
      	elems[i].style.minHeight = maxHeight > winHeight ? maxHeight + "px" : winHeight + "px";
    }

    let cRight = document.querySelector('.nav-flyout');
    if(cRight.style.display === 'none'){
    	for(let i = 0; i < elems.length; i++){
      	elems[i].style.minHeight = parentContainerHeight > winHeight ? parentContainerHeight + "px" : winHeight + "px";
    }
    }
    // let contentLeft = document.querySelector("#content-left");
    // let contentLeftSize = contentLeft.getBoundingClientRect();
    // let nav =  document.querySelector(".content-right");
    // let navSize = nav.getBoundingClientRect();
    // if(parseInt(contentLeftSize.height) < parseInt(navSize.height)){
    // 	contentLeft.style.height = navSize.height + "px";
    // }
}

function contextMenuHandler(event){
	//let contextMenuID = event.target.attributes.menuelement.value;
	menuTogglerClicked(event);
}

//EventListener Registration
(function(){
	let elems = document.querySelectorAll('.contextMenu');
	for(let i = 0; i < elems.length; i++){
		elems[i].addEventListener('contextmenu', contextMenuHandler, false);
	}
})();

// script to allow select option show and hide 
var expanded = false;
    function showCheckboxes() {
      var checkboxes = document.getElementById("checkboxes");
      if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
      } else {
        checkboxes.style.display = "none";
        expanded = false;
      }
    }
    
(function(){
	operation();
	menuHider();
	menuToggler();
	searchToggler();
	subMenuToggler();
	adjustHeight();	
	//parentContainerWidthAdjustEvent();
})();

/**** to make the content left height equal to the browser window ***********/
// function resize() {
//                 var heights = window.innerHeight;
//                 let elems = document.querySelectorAll("#content-left, .nav-flyout");
//                 for(let i = 0; i < elems.length; i++){
//                 	elems[i].style.height = heights + "px";
//                 }
                
//             }
//             resize();
//             window.onresize = function() {
//                 resize();
//             };

/**** to make the nav-flyout height equal to the browser window ***********/
// function resize2()
//             {
//                 var heights = window.innerHeight;
//                 document.getElementsByClassName("nav-flyout").style.height = heights - 50 + "px";
//             }
//             resize();
//             window.onresize = function() {
//                 resize();
//             };