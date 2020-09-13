var findBlockbyAlias = alias => {
  return $(".reviews__item").filter((ndx, item) =>{

    return $(item).attr("data-linked-with") == alias;
  });
};
$(".interactive-avatar").click((e) => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-open");
  const itemToShow = findBlockbyAlias(target);
  const curItem = $this.closest(".interactive-avatar");

  itemToShow.addClass("active").siblings().removeClass("active");
  curItem.addClass("interactive-avatar--active").siblings().removeClass("interactive-avatar--active");
});
  