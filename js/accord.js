const mesureWidth = item  =>  {
  let reqItemWidth  = 0;

  const screenWidth = $(window).width();
  const container = item.closest(".accordeon__list");
  const titlesBlocks  = container.find(".accordeon__trigger");
  const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

  const textContainer = item.find(".accordeon__content");
  const paddingLeft = parseInt(textContainer.css("padding-left"));
  const paddingRight = parseInt(textContainer.css("padding-right"));

  const isMobile  = window.matchMedia("(max-width: 768px").matches;

  if(isMobile){
    reqItemWidth = screenWidth - titlesWidth
  } else  {
    reqItemWidth = 600;
  }

  return {
    container:  reqItemWidth,
    textContainer:  reqItemWidth - paddingLeft - paddingRight

  }
};

const closeEveryItemInContainer = (container) =>  {
  const items = container.find(".accordeon__item");
  const content = container.find(".accordeon__wrapper");

  items.removeClass("open");
  content.width(0);
};

const open_acc_Item  = (item)  =>  {
  const hiddenContent = item.find(".accordeon__wrapper");
  const reqWidth = mesureWidth(item);
  const textBlock = item.find(".accordeon__content");


  item.addClass("open");

  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
};

$(".accordeon__trigger").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item  = $this.closest(".accordeon__item");
  const itemOpened  = item.hasClass("open");
  const container = $this.closest(".accordeon__list");

  if(itemOpened){
    closeEveryItemInContainer(container)
  } else{
    closeEveryItemInContainer(container)
    open_acc_Item(item);
  }
});

$(".close").on("click", e =>  {
  e.preventDefault();

  closeEveryItemInContainer($(".accordeon__list"));

});