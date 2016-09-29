(function($) {
	var $window = $(window);
	//Events to catch:
	// resize window
	// scroll

	$.fn.fixedFixed = function(opts) {
		var $this = $(this);
		var settings = $.extend({
			'topOffset': 15,
			'percentWidth': true
		}, opts);
		
		var startPos = $this.offset().top;
		var startRelative = $this.position().top;
		var fixedToggle = false;
		
		$window.on('scroll',function(eo) {
			if (!fixedToggle && (($window.scrollTop() + settings.topOffset) > startPos)) {
				fixedToggle = true;
				$this.css({
					'position': 'fixed',
					'top': settings.topOffset + 'px'
				});
			}
			if (fixedToggle && (($window.scrollTop() + settings.topOffset) < startPos)) {
				$this.css({
					'position': 'relative',
					'top': '0px'
				});
				fixedToggle = false;
			}
		});
		
		if (settings.percentWidth) {
			var percentWidth = $this.width() / $this.parent().width();
			
			var setWidth = function() {
				$this.css({
					'width': ($this.parent().width() * percentWidth) + 'px'
				});
			};
			setWidth();
			$window.on('resize', setWidth);
		}
	};
})(jQuery);