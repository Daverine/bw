(function($, window, document, undefined) {

	"use strict";

	window = (typeof window != "undefined" && window.Math == Math)
		? window
		: (typeof self != "undefined" && self.Math == Math)
			? self
			: Function('return this')()
	;

	$.fn.scrollPin = function(options) {
		this.each(function(index) {
			var 
				$element = $(this),
				props = {style: $element.attr("style")},
				settings = $.extend({}, {
					namespace: "scrollPin",
					className: "pinned",
					sticky: false,
					parentGuide: false,
					topSpacing: 0,
					bottomSpacing: 0,
					pinned: undefined,
					unpinned: undefined
				}, options, strObj4rmDOM($element.data("options")))
			;
			
			// adjust settings
			settings.parentGuide = settings.sticky ? true : settings.parentGuide;
			settings.uniqueId = getUniqueId(settings.namespace);


			// update function
			function update() {
				$element.attr("style", props.style || "");
				settings.lastControl = "";
				
				// needed if pinned element needs to be contained inside the parent element"s boundaries
				if (settings.parentGuide) {
					var $parent = $element.parent(), lastScroll;

			 		// ensure that there would be enough space in element offset to contain both settings.topSpacing and settings.bottomSpacing where needed.
			 		if (settings.topSpacing > parseFloat($parent.css("paddingTop")) + parseFloat($element.css("marginTop"))) {
						$element.css("marginTop", settings.topSpacing + 2 - parseFloat($parent.css("paddingTop")));
					}
					if (settings.bottomSpacing > parseFloat($parent.css("paddingBottom")) + parseFloat($element.css("marginBottom"))) {
						$element.css("marginBottom", settings.bottomSpacing + 2 - parseFloat($parent.css("paddingBottom")));
					}

					lastScroll = $(window).scrollTop();
					props.pHeight = $parent.outerHeight();
					props.pOffset = $parent.offset();
				}

				props.offset = $element.offset();
				props.height = $element.outerHeight();
				props.width = $element.outerWidth();

				// determine if a scrollpin should be independent by element's height
				settings.independent = props.height >= $(window).height();

				// ensure that there would be enough space in element offset to contain settings.topSpacing (not for parent guided elements)
				if (settings.topSpacing > props.offset.top) { $element.css("marginTop", settings.topSpacing + 2); }
				
				props.marginT = parseFloat($element.css("marginTop"));
				props.marginB = parseFloat($element.css("marginBottom"));
				props.marginL = parseFloat($element.css("marginLeft"));
				props.marginV = props.marginT + props.marginB;

				// adjust offset with margins
				props.offset.left -= props.marginL;
				props.offset.top -= props.marginT;

				$element.removeClass(settings.className);

				// off a previously set callback function (if any) and re-on the scroll.settings.uniqueId event
				$(window).off("scroll."+settings.uniqueId).on("scroll."+settings.uniqueId, function() {
					var
						scroll = $(window).scrollTop(),
						$rp = $element.parents().not(function() {return ($(this).css("position") == "static")}).first() // parent that is not static
					;

					$rp = $rp.length ? $rp : $("body");

					if (settings.independent) {
						// pin the element at the bottom
						if ($element.css("position") != "fixed" &&
							scroll >= lastScroll &&
							$element.offset().top + props.height - props.marginT + settings.bottomSpacing <= scroll + $(window).height() &&
							(!settings.parentGuide || props.pOffset.top + props.pHeight - settings.bottomSpacing - parseFloat($parent.css("padding-bottom")) >= scroll + $(window).height())
						) {
							$element.css({
								"top": $(window).height() - settings.bottomSpacing - props.height - props.marginT,
								"left": props.offset.left,
								"position": "fixed"
							}).addClass(settings.className);
							// fix for the use of relative width on the element.
							$element[0].style.setProperty("width", props.width + "px", "important");
							
							if (settings.pinned && typeof settings.pinned == "function") {
								settings.pinned($element);
							}
							settings.lastControl = "pin1";
						}
						// pin the element at the top
						else if ($element.css("position") != "fixed" &&
							lastScroll >= scroll &&
							$element.offset().top + props.marginT - settings.topSpacing >= scroll &&
							scroll >= props.offset.top + settings.topSpacing
						) {
							$element.css({
								"position": "fixed",
								"top": settings.topSpacing - props.marginT,
								"left": props.offset.left
							}).addClass(settings.className);
							// fix for the use of relative width on the element.
							$element[0].style.setProperty("width", props.width + "px", "important");

							if (settings.pinned && typeof settings.pinned == "function") {
								settings.pinned($element);
							}
							settings.lastControl = "pin2";
						}
						// unpin the element (from been pinned by pin1) if is guided by it parent and it as reach it parent limit at the bottom.
						else if (settings.parentGuide && props.pOffset.top + props.pHeight + settings.bottomSpacing - props.marginB - parseFloat($parent.css("padding-bottom")) <= scroll + $(window).height()) {
							$element.css({
								"top": props.pHeight - props.height - props.marginV - parseFloat($parent.css("padding-bottom")),
								"left": props.offset.left - props.pOffset.left,
								"position": "absolute"
							}).removeClass(settings.className);
							// fix for the use of relative width on the element.
							$element[0].style.setProperty("width", props.width + "px", "important");

							if (settings.unpinned && typeof settings.unpinned == "function") {
								settings.unpinned($element);
							}
							settings.lastControl = "";
						}
						// unpin the element if the page scrolls to where the initial offset of the element is visible
						else if (props.offset.top >= scroll) {
							$element.css({
								"position": "absolute",
								"top": props.offset.top - $rp.offset().top,
								"left": props.offset.left - $rp.offset().left
							}).removeClass(settings.className);
							// fix for the use of relative width on the element.
							$element[0].style.setProperty("width", props.width + "px", "important");

							if (settings.unpinned && typeof settings.unpinned == "function") {
								settings.unpinned($element);
							}
							settings.lastControl = "";
						}
						// unpin element if element was pinned by pin1 and the scroll direction for been pinned has change
						else if (settings.lastControl == "pin1" && lastScroll > scroll) {
							$element.css({
								"top": lastScroll + $(window).height() - props.offset.top + props.offset.top - $rp.offset().top - props.height - settings.bottomSpacing,
								"left": props.offset.left - $rp.offset().left,
								"position": "absolute"
							}).removeClass(settings.className);
							// fix for the use of relative width on the element.
							$element[0].style.setProperty("width", props.width + "px", "important");

							if (settings.unpinned && typeof settings.unpinned == "function") {
								settings.unpinned($element);
							}
							settings.lastControl = "";
						}
						// unpin element if element was pinned by pin2 and the scroll direction for been pinned has change
						else if (settings.lastControl == "pin2" && scroll > lastScroll) {
							$element.css({
								"top": lastScroll - $rp.offset().top, // lastScroll - props.pOffset.top + settings.topSpacing,
								"left": props.offset.left - $rp.offset().left,
								"position": "absolute"
							}).removeClass(settings.className);
							// fix for the use of relative width on the element.
							$element[0].style.setProperty("width", props.width + "px", "important");

							if (settings.unpinned && typeof settings.unpinned == "function") {
								settings.unpinned($element);
							}
							settings.lastControl = "";
						}
					}
					else {
						// pin element at the top if element has been scrolled out of page (from top)
						// also if element is guided by parent, the parent must have enough visible area to contain the element and its top spacing
						// and if element is sticky, then the user must be scrolling down \/ and the element must not be recently unpined by unpin2
						if (
							(!settings.sticky || (scroll >= lastScroll && settings.lastControl != "unpin2")) &&
							scroll >= props.offset.top + props.marginT - settings.topSpacing &&
							(!settings.parentGuide || props.pHeight + props.pOffset.top - scroll > props.height + settings.topSpacing + parseFloat($parent.css("padding-bottom"))) &&
							$element.css("position") != "fixed"
						) {
							$element.css({
								"position": "fixed",
								"top": settings.topSpacing - props.marginT,
								"left": props.offset.left
							}).addClass(settings.className);
							// fix for the use of relative width on the element.
							$element[0].style.setProperty("width", props.width + "px", "important");

							if (settings.pinned && typeof settings.pinned == "function") {
								settings.pinned($element);
							}
							settings.lastControl = "pin1";
						}
						// pin element at the bottom if element is sticky
						// and was recently unpined by unpin2
						// and the user is scrolling the page up /\
						// also the parent of sticky has enough space in the viewport to contain the element
						else if (settings.sticky && settings.lastControl == "unpin2" && scroll < lastScroll &&							
							props.pOffset.top + props.pHeight >= scroll + $(window).height() &&
							$element.offset().top + props.height + settings.bottomSpacing >= $(window).height() + scroll &&
							$element.css("position") != "fixed"
						) {
							$element.css({
								"position": "fixed",
								"top": $(window).height() - props.height - settings.bottomSpacing - props.marginT,
								"left": props.offset.left
							}).addClass(settings.className);
							// fix for the use of relative width on the element.
							$element[0].style.setProperty("width", props.width + "px", "important");

							if (settings.pinned && typeof settings.pinned == "function") {
								settings.pinned($element);
							}
							settings.lastControl = "pin2";
						}
						// unpin the element if the page scrolls to where the initial offset of the element is visible
						// but element must not be sticky
						// else element must not be recently pined by pin2
						// else user must be scrolling up /\ and must have scroll to the initial position of the element
						else if (scroll + settings.topSpacing <= props.offset.top + props.marginT &&
							(!settings.sticky || (settings.lastControl != "pin2" || (scroll <= lastScroll && $element.offset().top - props.marginT <= props.offset.top))) &&
							$element.css("position") != "absolute"
						) {
							$element.css({
								"position": "absolute",
								"left": props.offset.left - $rp.offset().left,
								"top": props.offset.top - $rp.offset().top,
							}).removeClass(settings.className);
							// fix for the use of relative width on the element.
							$element[0].style.setProperty("width", props.width + "px", "important");

							if (settings.unpinned && typeof settings.unpinned == "function") {
								settings.unpinned($element);
							}
							settings.lastControl = "unpin1";
						}
						// unpin element and make it stay at the bottom of parent if it is parent guided
						// and the page has scrolled reach or past the parent
						// and if element was recently pined by pin2, the user must be scrolling down \/ the page
						// must have reach or scrolled the parent out of viewport
						else if (
							settings.parentGuide &&
							(scroll >= props.pOffset.top + props.pHeight - props.height - settings.topSpacing - props.marginB - parseFloat($parent.css("padding-bottom")) ||
								(settings.lastControl == "pin2" && scroll > lastScroll && props.pOffset.top + props.pHeight <= scroll + $(window).height())) &&
							$element.css("position") != "absolute"
						) {
							$element.css({
								"position": "absolute", 
								"top": props.pHeight - parseFloat($parent.css("padding-bottom")) - props.height - props.marginV,
								"left": props.offset.left - props.pOffset.left
							}).removeClass(settings.className);
							// fix for the use of relative width on the element.
							$element[0].style.setProperty("width", props.width + "px", "important");

							if (settings.unpinned && typeof settings.unpinned == "function") {
								settings.unpinned($element);
							}
							settings.lastControl = "unpin2";
						}
					}
					lastScroll = scroll;
				});

				// trigger the scroll event so that computations take effect
				$(window).trigger("scroll." + settings.uniqueId); 
			}

			// update elements" position
			update();

			// on window resize update elements" position
			$(window).on("resize", update);
		});
	};

	$(document).ready(function() {
		$(".scroll-pin").scrollPin();
	});
})(jQuery, window, document);