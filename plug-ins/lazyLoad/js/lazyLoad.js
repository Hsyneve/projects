  $.fn.lazyLoad = function() {
        function lazyLoad($imgs) {
            this.$imgs = $imgs;
            this.BindEvent();
        }
        lazyLoad.prototype = {
            isVisible: function($node) {
                var nodeheight = $node.height();
                var top = $(document).scrollTop();
                var tall = $node.offset().top;
                var windowheight = $(window).height();
                if (windowheight + top > tall && top < tall + nodeheight) {
                    return true;
                } else {
                    return false;
                }

            },
            loadimgs: function(obj) {
                var _this = obj;
                _this.$imgs.find('img[flag=0]').each(function() {
                    var $img_node = $(this);
                    if (_this.isVisible($img_node)) {
                        $img_node.attr('src', $img_node.attr('data-src'));
                        $img_node.attr('flag', 1);
                    }
                });
            },
            BindEvent: function() {
                var _this = this;
                _this.$imgs.find('img').attr('flag', 0);
                _this.loadimgs(_this);
                $(document).on('scroll', function() {

                    _this.loadimgs(_this);
                });
            }

        }
        new lazyLoad(this);
    }