  $.fn.datePick = function() {
            function datePick($node) {
                var date_today = new Date();
                this.inputtext = $node;
                this.real_year = date_today.getFullYear();
                this.real_month = date_today.getMonth();
                this.real_date = date_today.getDate();
                this.cur_year = this.real_year;
                this.cur_month = this.real_month;
                this.cur_date = this.real_date;

                this.bindEvent();
            }
            datePick.prototype = {
                bindEvent: function() {

                    var _this = this;
                    _this.createDatePick();
                    _this.inputtext.on('focus', function() {
                        _this.datepick_window.fadeIn();
                    });
                    _this.datepick_window.find(".real-date .months").on('click', 'span', function(e) {
                        var tar = $(e.target);
                        _this.cur_month = parseInt(tar.html().substr(0, tar.html().length - 1)) - 1;
                        _this.datepick_window.find('.months').fadeOut(function() {
                            _this.datepick_window.find('.days').fadeIn();
                        });

                        _this.getDayRender.call(_this);

                    });
                    _this.datepick_window.find(".real-date .years").on('click', 'span', function(e) {

                        var tar = $(e.target);
                        _this.cur_year = parseInt(tar.html());
                        _this.datepick_window.find('.years').fadeOut(function() {
                            _this.datepick_window.find('.months').fadeIn();
                        });

                        _this.datepick_window.find("#date-select").html(_this.cur_year + "年");
                    });
                    _this.datepick_window.find(".real-date .days").on('click', 'span', function(e) {
                        var tar = $(e.target);
                        tar.addClass('choose').siblings().removeClass('choose');
                        _this.cur_date = parseInt(tar.html());

                    });
                    _this.datepick_window.find("#date-select").on('click', function() {
                        var day_con = _this.datepick_window.find(".days");

                        if (day_con.is(":visible")) {

                            day_con.fadeOut(function() {
                                _this.datepick_window.find('.months').fadeIn();
                            });

                            _this.datepick_window.find("#date-select").html(_this.cur_year + "年");
                        } else {
                            if (_this.datepick_window.find('.months').is(":visible")) {
                                _this.datepick_window.find('.months').fadeOut(function() {
                                    _this.datepick_window.find('.years').fadeIn();
                                });

                                _this.datepick_window.find("#date-select").html(_this.cur_year + "-" + (_this.cur_year + 11) + "年");

                            }
                        }

                    });
                    _this.datepick_window.find(".left").on('click', function() {
                        if (_this.datepick_window.find('.years').is(":visible")) {
                            _this.cur_year = _this.cur_year - 12;
                            _this.getYearRender(_this, "left");
                        } else if (_this.datepick_window.find('.months').is(":visible")) {
                            _this.cur_year -= 1;
                            _this.datepick_window.find("#date-select").html(_this.cur_year + "年");
                        } else {
                            if (_this.cur_month > 0) {
                                _this.cur_month -= 1;
                            } else {
                                _this.cur_year -= 1;
                                _this.cur_month = 11;
                            }
                            _this.getDayRender.call(_this, "left");
                        }
                        _this.datepick_window.find('#date-frame').animate({
                            left: "0px"
                        }, 500, function() {
                            _this.datepick_window.find(".real-date .days").html(_this.datepick_window.find(".real-date-left .days").html());
                            _this.datepick_window.find(".real-date .months").html(_this.datepick_window.find(".real-date-left .months").html());
                            _this.datepick_window.find(".real-date .years").html(_this.datepick_window.find(".real-date-left .years").html());
                            _this.datepick_window.find('#date-frame').css({
                                left: "-350px"
                            });
                        });
                    });
                    _this.datepick_window.find('#sure').on('click', function() {
                        var show_year = parseInt(_this.cur_year);
                        var show_month = parseInt(_this.cur_month);
                        if (_this.datepick_window.find(".choose").hasClass('hid')) {
                            if (_this.cur_month == 0) {
                                show_year -= 1;
                                show_month = 11;
                            } else {
                                show_month -= 1;
                            }
                        }
                        _this.inputtext.val(show_year + "-" + (show_month > 8 ? (show_month + 1) : "0" + (show_month + 1)) + "-" + (_this.cur_date > 9 ? _this.cur_date : ("0" + _this.cur_date)));
                        _this.datepick_window.fadeOut();

                    });
                    _this.datepick_window.find(".right").on('click', function() {

                        if (_this.datepick_window.find('.years').is(":visible")) {
                            _this.cur_year = _this.cur_year + 12;
                            _this.getYearRender.call(_this, "right");

                        } else if (_this.datepick_window.find('.months').is(":visible")) {
                            _this.cur_year += 1;
                            _this.datepick_window.find("#date-select").html(_this.cur_year + "年");

                        } else {
                            if (_this.cur_month < 11) {
                                _this.cur_month += 1;
                            } else {
                                _this.cur_year += 1;
                                _this.cur_month = 0;
                            }
                            _this.getDayRender.call(_this, "right");
                        }
                        _this.datepick_window.find('#date-frame').animate({
                            left: "-700px"
                        }, 500, function() {
                            _this.datepick_window.find(".real-date .days").html($(".real-date-right .days").html());
                            _this.datepick_window.find(".real-date .months").html($(".real-date-right .months").html());
                            _this.datepick_window.find(".real-date .years").html($(".real-date-right .years").html());
                            _this.datepick_window.find('#date-frame').css({
                                left: "-350px"
                            });
                        });

                    });
                    _this.datepick_window.find("#current").on('click', function() {
                        _this.cur_year = _this.real_year;
                        _this.cur_month = _this.real_month;
                        _this.getDayRender.call(_this);
                        _this.datepick_window.find('.months').hide();
                        _this.datepick_window.find('.years').hide();
                        _this.datepick_window.find('.days').show();

                    });
                    this.getstars('.star1', 80);
                    this.getstars('.star2', 30);
                    this.getstars('.star3', 15);
                    this.getMonthRender();

                    this.getYearRender();
                    this.getDayRender();
                },
                createDatePick: function() {

                    this.datepick_window = $('<div class="datepick"><div class="star1"></div><div class="star2"></div><div class="star3"></div><div class="title"><a href="#"class="left iconfont">&#xe61e;</a><a href="#"id="date-select"></a><a href="#"class="right iconfont">&#xe671;</a><div class="week"><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div></div><div id="date-bg"><div id="date-frame"><div class="real-date-left"><div class="days"></div><div class="months"style="display: none;"></div><div class="years"style="display: none;"></div></div><div class="real-date"><div class="days"></div><div class="months"style="display: none;"></div><div class="years"style="display: none;"></div></div><div class="real-date-right"><div class="days"></div><div class="months"style="display: none;"></div><div class="years"style="display: none;"></div></div></div></div><a href="#"id="current">今天</a><a href="#"id="sure">确定</a></div>');

                    $('body').append(this.datepick_window);
                },
                GetRandomNum: function(Min, Max) {
                    var Range = Max - Min;
                    var Rand = Math.random();
                    return (Min + Math.floor(Rand * Range));
                },
                getstars: function(className, count) {

                    var shadowdata = "";
                    for (var i = 0; i <= count; i++) {

                        shadowdata += ", " + this.GetRandomNum(1, 350) + "px " + this.GetRandomNum(1, 400) + "px #fff";
                    }
                    var star = $(className);

                    var star_af = className + ":after"
                    star.append("<style>" + className + "{box-shadow:" + shadowdata.substr(1) + "}" + star_af + "{box-shadow:" + shadowdata.substr(1) + "}</style>");

                },
                getMonthRender: function(dir) {
                    var ele_mon = "";
                    for (var i = 0; i < 12; i++) {
                        ele_mon += "<span>" + (i + 1) + "月</span>";
                    }
                    this.datepick_window.find(".months").append($(ele_mon));
                },

                getYearRender: function(dir) {
                    var ele_year = "";
                    for (var i = 0; i < 12; i++) {
                        ele_year += "<span>" + (this.cur_year + i) + "</span>";
                    }
                    if (dir == "right") {
                        //向右边翻页
                        this.datepick_window.find(".real-date-right .years").html("");
                        this.datepick_window.find(".real-date-right .years").append($(ele_year));
                    } else
                    if (dir == "left") {
                        //向左边翻页
                        this.datepick_window.find(".real-date-left .years").html("");
                        this.datepick_window.find(".real-date-left .years").append($(ele_year));
                    } else {
                        this.datepick_window.find(".years").append($(ele_year));
                    }
                    this.datepick_window.find("#date-select").html(this.cur_year + "-" + (this.cur_year + 11) + "年");
                },

                getDayRender: function(dir) {
                    this.datepick_window.find("#date-select").html(this.cur_year + "年" + (this.cur_month + 1) + "月");
                    var lastmonth_end = this.getLastDay(this.cur_year, this.cur_month);
                    var days = this.getDaysInOneMonth(this.cur_year, this.cur_month);

                    var last_date = lastmonth_end.getDate();
                    var last_day = lastmonth_end.getDay();
                    var ele_day = "";
                    if (last_day != 6) {
                        for (var i = last_day + 1; i > 0; i--) {
                            ele_day += '<span class="hid">' + (last_date - i + 1) + '</span>';
                        }
                    }

                    for (var i = 0; i < days; i++) {
                        ele_day += "<span>" + (i + 1) + "</span>";
                    }
                    var day_con = "";
                    if (dir == "right") {
                        //向右边翻页
                        day_con = this.datepick_window.find(".real-date-right .days");
                    } else
                    if (dir == "left") {
                        //向左边翻页
                        day_con = this.datepick_window.find(".real-date-left .days");

                    } else {
                        day_con = this.datepick_window.find(".real-date .days");
                    }
                    day_con.html("");
                    day_con.append($(ele_day));
                    if (this.cur_year == this.real_year && this.cur_month == this.real_month) {
                        var day_index = this.real_date + last_day % 6 - 1;

                        day_con.find("span:eq(" + day_index + ")").addClass('choose').siblings().removeClass('choose');
                    }

                },

                getDaysInOneMonth: function(year, month) {
                    month = parseInt(month + 1, 10);
                    var d = new Date(year, month, 0);
                    return d.getDate();
                },

                getLastDay: function(year, month) {
                    month = parseInt(month, 10);
                    var d = new Date(year, month, 0);
                    return d;
                }
            }
            var d1 = new datePick(this);
        }