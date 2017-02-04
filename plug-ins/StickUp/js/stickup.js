 $.fn.stickUp = function() {
            function stickUp($node) {

                this.$node = $node;
                this.real_top = this.$node.offset().top;
                this.real_left = this.$node.offset().left;

                this.old_width = this.$node.width();
                this.old_height = this.$node.height();
                this.newnav = this.$node.clone();
                this.setnew = false;
                this.removenew = false;
                this.BindEvent();
            };
            stickUp.prototype = {
                BindEvent: function() {
                    var _this = this;
                    $(document).on('scroll', function() {
                        var realheight = $(document).scrollTop();
                        if (realheight > _this.real_top) {
                            if (_this.setnew) {
                                return;
                            }

                            _this.newnav.data('new', true);
                            _this.newnav.css({
                                position: 'fixed',
                                width: _this.old_width,
                                height: _this.old_height,
                                left: _this.real_left,
                                top: '0px'
                            });
                            $('body').append(_this.newnav);
                            _this.setnew = true;
                            _this.removenew = false;
                        } else {
                            if (_this.removenew) {
                                return;
                            }


                            if (_this.$node.data('new') == true) {
                                _this.$node.remove();
                            }
                            if (_this.newnav.data('new') == true) {
                                _this.newnav.remove();
                            }

                            _this.removenew = true;
                            _this.setnew = false;
                        }
                    });
                }
            }
            new stickUp(this);
        }