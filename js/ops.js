const sections  = $("section");
const display = $(".maincontent");
const sideMenu  = $(".fixed-menu");
const menuItems = sideMenu.find(".fixed-menu__item");

let inScroll = false;

sections.first().addClass("reactive");

const countSectionPosition = sectionEq => {
  const position = sectionEq * -100;

  if(isNaN(position)) {
    console.error("передано неверное знаение в countSectionPosition");
    return 0;
  }
  return position;
}

const changeMenuThemeForSectio  = sectionEq => {
  const currentSection  = sections.eq(sectionEq);
    const menuTheme = currentSection.attr("data-sidemenu-theme");
    const activeClass = "fixed-menu--shadowed";
    

    if (menuTheme === "black")  {
      sideMenu.addClass(activeClass)
    } else{
      sideMenu.removeClass(activeClass)
    }
}


const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
};

const performTransition = sectionEq =>  {

  if(inScroll) return;
    inScroll = true;

    const transitionOver = 1000;
    const mouseInertiaOver  = 300;

    const position = countSectionPosition(sectionEq);

    //changeMenuThemeForSectio = (sectionEq);

  display.css({
    transform: `translateY(${position}%)`
  });


  resetActiveClassForItem(sections, sectionEq, "reactive")
  //sections.eq(sectionEq).addClass("reactive").siblings().removeClass("reactive");

  


  setTimeout(() => {
    inScroll = false;

    resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active");

    
    
  }, transitionOver + mouseInertiaOver);
}

const viewportScroller = ()  =>  {
  const activeSection = sections.filter(".reactive");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return  {
    next()  {
      if (nextSection.length) {
        performTransition(nextSection.index());
      }
    },
    prev()  {
      if (prevSection.length) {
        performTransition(prevSection.index());
      }
    },

  }
};

$(window).on("wheel", e => {
  const deltaY  = e.originalEvent.deltaY;
  const scroller  = viewportScroller();

  //console.log('wheeeeeel!');

  if (deltaY > 0) {
    scroller.next();
  }
  if(deltaY < 0)  {
    scroller.prev();
  }

  //console.log(deltaY);
});

$(window).on("keydown", e =>  {
  //console.log(e.keyCode);

  const tagName = e.target.tagName.toLowerCase();

  const userTypingInInputs = tagName === "input" || tagName === "textarea";
  const scroller  = viewportScroller();

  if(userTypingInInputs)  return;

    switch (e.keyCode) {
      case 38:
        scroller.prev();
        break;
    
      case 40:
        scroller.next();
        break;
    }
});


$("[data-scroll-to]").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target  = $this.attr("data-scroll-to");
  const reqSection  = $(`[data-section-id=${target}]`);
  

  performTransition(reqSection.index());
});