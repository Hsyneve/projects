  $.fn.Carousel_slide = function() {
      function Carousel_slide($item) {
          var imgul = $item.find('.imgs');
          var imgsli = $item.find('.imgs').find('li');
          var nowli = $item.find('.icons').find('li');
          var left = $item.find('.left');
          var right = $item.find('.right');
          var li_len = nowli.length;
          var width = imgsli.eq(0).width();

          this.statuscollection = {

              width: width,
              imgul: imgul,
              imgsli: imgsli,
              nowli: nowli,
              li_len: li_len,
              rollFlag: false,
              now_index: 0,
              new_index: 0,
              left: left,
              right: right,
              setTime: -1

          };
          this.bindEvent();
      }
      Carousel_slide.prototype = {
          gotonext: function(len) {

              var rollstatus = this.statuscollection;

              rollstatus.new_index = (rollstatus.now_index + len) % rollstatus.li_len;
              rollstatus.nowli.eq(rollstatus.new_index).addClass('bg').siblings().removeClass('bg');
              rollstatus.imgul.animate({
                  left: '-=' + rollstatus.width * len
              }, 1000, function() {
                  if (rollstatus.new_index == 0) {

                      rollstatus.imgul.css('left', (-1) * rollstatus.width);

                  }
                  rollstatus.now_index = rollstatus.new_index;
                  rollstatus.rollFlag = false;
              });
          },
          goback: function(len) {

              var rollstatus = this.statuscollection;
              rollstatus.new_index = (rollstatus.now_index - len + rollstatus.li_len) % rollstatus.li_len;
              rollstatus.nowli.eq(rollstatus.new_index).addClass('bg').siblings().removeClass('bg');
              rollstatus.imgul.animate({
                  left: '+=' + rollstatus.width * len
              }, 1000, function() {
                  if (rollstatus.new_index == rollstatus.li_len - 1) {
                      rollstatus.imgul.css('left', rollstatus.width * rollstatus.li_len * (-1));

                  }
                  rollstatus.now_index = rollstatus.new_index;
                  rollstatus.rollFlag = false;
              });

          },
          rollStart: function() {
             var _this = this;
              this.statuscollection.setTime = setInterval(function() {
                _this.gotonext(1);
            }, 3000);

          },
          bindEvent: function() {
              var $thisroll = this;
              var rollstatus = this.statuscollection;
              var last_li = rollstatus.imgsli.eq(0).clone();
              var first_li = rollstatus.imgsli.eq(rollstatus.li_len - 1).clone();
              rollstatus.imgul.prepend(first_li);
              rollstatus.imgul.append(last_li);
              rollstatus.imgul.css('left', (-1) * rollstatus.width);
              rollstatus.imgul.css('width', rollstatus.width * (rollstatus.li_len + 2));

              rollstatus.nowli.on('click', function() {

                  var $this = $(this);
                  var $index = $this.index();

                  if (rollstatus.rollFlag) {
                      return;
                  }

                  rollstatus.rollFlag = true;
                  clearInterval(rollstatus.setTime);
                  if ($index > rollstatus.now_index) {
                      $thisroll.gotonext($index - rollstatus.now_index);
                  }
                  if ($index < rollstatus.now_index) {
                      $thisroll.goback(rollstatus.now_index - $index);
                  }
                  $thisroll.rollStart();
              });

              rollstatus.right.on('click', function() {

                  if (rollstatus.rollFlag) {
                      return;
                  }
                  rollstatus.rollFlag = true;

                  clearInterval(rollstatus.setTime);


                  $thisroll.gotonext(1);
                  $thisroll.rollStart();

              });
              rollstatus.left.on('click', function() {

                  if (rollstatus.rollFlag) {
                      return;
                  }
                  rollstatus.rollFlag = true;
                  clearInterval(rollstatus.setTime);


                  $thisroll.goback(1);
                  $thisroll.rollStart();
              });
              $thisroll.rollStart();
          }
      };
      this.each(function(){
         new Carousel_slide($(this));

      });
  };
