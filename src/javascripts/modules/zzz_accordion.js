(function accordionModule(){
  var Accordion = function() {
  
    const openAllTarget = document.getElementById('accordionOpenAllSpan');
    const closeAllTarget = document.getElementById('accordionCloseAllSpan');
    const arrayOfAccordionContent = document.querySelectorAll('.accordion__itemContent');

    var toggleItems;
    var items;
    
    var _init = function() {
      toggleItems     = document.querySelectorAll('.accordion__itemTitleWrap');
      toggleItems     = Array.prototype.slice.call(toggleItems);
      items           = document.querySelectorAll('.accordion__item');
      items           = Array.prototype.slice.call(items);
      
      _addEventHandlers();
      //TweenMax.set(items, {visibility:'visible'});
      //TweenMax.staggerFrom(items, 0.9,{opacity:0, x:-100, ease:Power2.easeOut}, 0.3)
    }
    
    var _addEventHandlers = function() {
      toggleItems.forEach(function(element, index) {
        element.addEventListener('click', _toggleItem, false);
      });
    }

    
    
    var _toggleItem = function() {
      var parent = this.parentNode;
      var content = parent.children[1];
      const allAccordionItems = document.querySelectorAll('.accordion__item');
      if(!parent.classList.contains('is-active')) {
        parent.classList.add('is-active');
        TweenMax.set(content, {height:'auto'})
        TweenMax.from(content, 0.4, {height: 0, immediateRender:false, ease: Back.easeOut})
        
      } else {
        parent.classList.remove('is-active');
        TweenMax.to(content, 0.2, {height: 0, immediateRender:false, ease: Power1.easeOut})
      }



      function openAllAccordions(){
        for(let i = 0; i < allAccordionItems.length; i++){
          allAccordionItems[i].classList.add('is-active');
          let thisItemContent = arrayOfAccordionContent[i];
          TweenMax.set(thisItemContent, {height:'auto'});
          TweenMax.from(thisItemContent, 0.1, {height: 0, immediateRender:false, ease: Back.easeOut})
        }

      }



      function closeAllAccordions(){
        for(let i = 0; i < allAccordionItems.length; i++){
          allAccordionItems[i].classList.remove('is-active');
          let thisItemContent = arrayOfAccordionContent[i];
          TweenMax.to(thisItemContent, 0.1, {height: 0, immediateRender:false, ease: Power1.easeOut});

        }
        
        

      }

      openAllTarget.addEventListener('click', openAllAccordions, false);
      closeAllTarget.addEventListener('click', closeAllAccordions ,false);


    }
    
    return {
      init: _init
    }
    
  }();

  Accordion.init();

})();