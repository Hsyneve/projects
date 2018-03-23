        $.fn.datePick = function() {
            function datePick($node) {
                this.inputtext = $node;
                this.bindEvent();
            }
            datePick.prototype = {
                bindEvent: function() {

                    var _this = this;
                    _this.createDatePick();
                    _this.setVue();
                    _this.getstars('.star1', 80);
                    _this.getstars('.star2', 30);
                    _this.getstars('.star3', 15);
                    _this.inputtext.on('focus', function() {
                        _this.datepick_window.fadeIn();
                    });
                    _this.datepick_window.find('#sure').on('click', function() {
                        _this.inputtext.val(_this.vueframe.dateinput);
                        _this.datepick_window.fadeOut();
                    });
                },
                setVue: function() {
                    this.vueframe = new Vue({
                        el: '#app',
                        data: {
                            dateselect: '',
                            day_set: true,
                            month_set: false,
                            year_set: false,
                            real_year: 0,
                            real_month: 0,
                            real_date: 0,
                            cur_year: 0,
                            cur_month: 0,
                            cur_date: 0,
                            day_data: [],
                            month_data: [],
                            year_data: [],
                            day_data_left: [],
                            year_data_left: [],
                            day_data_right: [],
                            year_data_right: [],
                            cho: false,
                            hid: false,
                            dateinput: '',
                            curindex: 0
                        },
                        created: function() {
                            var date_today = new Date();

                            this.real_year = date_today.getFullYear();
                            this.real_month = date_today.getMonth();
                            this.real_date = date_today.getDate();
                            this.cur_year = this.real_year;
                            this.cur_month = this.real_month;
                            this.cur_date = this.real_date;
                            this.dateinput = this.cur_year + "-" + (this.cur_month > 8 ? (this.cur_month + 1) : "0" + (this.cur_month + 1)) + "-" + (this.cur_date > 9 ? this.cur_date : ("0" + this.cur_date));

                            this.getMonthRender();

                            this.getYearRender();
                            this.getDayRender();
                        },
                        methods: {

                            changedate: function() {

                                if (this.day_set) {

                                    this.day_set = false;
                                    this.month_set = true;
                                    this.dateselect = this.cur_year + "年";

                                } else {
                                    if (this.month_set) {
                                        this.month_set = false;
                                        this.year_set = true;
                                        this.dateselect = this.cur_year + "-" + (this.cur_year + 11) + "年";
                                        this.getYearRender();

                                    }
                                }
                            },


                            getMonthRender: function(dir) {
                                this.month_data = [];
                                for (var i = 0; i < 12; i++) {
                                    this.month_data.push({
                                        mes: (i + 1) + "月"
                                    });
                                }

                            },

                            getYearRender: function(dir) {
                                var ele_year = [];
                                for (var i = 0; i < 12; i++) {
                                    ele_year.push({
                                        mes: (this.cur_year + i)
                                    });

                                }
                                if (dir == "right") {
                                    //向右边翻页
                                    this.year_data_right = ele_year;

                                } else
                                if (dir == "left") {
                                    //向左边翻页
                                    this.year_data_left = ele_year;
                                } else {
                                    this.year_data = ele_year;
                                }
                                this.dateselect = this.cur_year + "-" + (this.cur_year + 11) + "年";
                            },

                            getDayRender: function(dir) {
                                this.dateselect = this.cur_year + "年" + (this.cur_month + 1) + "月";
                                var lastmonth_end = this.getLastDay(this.cur_year, this.cur_month);
                                var days = this.getDaysInOneMonth(this.cur_year, this.cur_month);

                                var last_date = lastmonth_end.getDate();
                                var last_day = lastmonth_end.getDay();
                                var ele_day = [];
                                if (last_day != 6) {
                                    for (var i = last_day; i > 0; i--) {
                                        ele_day.push({
                                            mes: (last_date - i + 1),
                                            hid: true,
                                            cho: false
                                        });

                                    }
                                }

                                for (var i = 0; i < days; i++) {
                                    ele_day.push({
                                        mes: (i + 1),
                                        hid: false,
                                        cho: false
                                    });
                                }

                                if (dir == "right") {
                                    //向右边翻页
                                    this.day_data_right = ele_day;
                                } else
                                if (dir == "left") {
                                    //向左边翻页
                                    this.day_data_left = ele_day;

                                } else {
                                    this.day_data = ele_day;
                                }

                                if (this.cur_year == this.real_year && this.cur_month == this.real_month) {
                                    var day_index = this.real_date + last_day % 6 - 1;

                                    for (var i = 0; i < this.day_data.length; i++) {
                                        this.day_data[i].cho = false;
                                    }
                                    this.day_data[day_index].cho = true;
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
                            },
                            monthclick: function(e) {
                                var tar = $(e.target);
                                this.cur_month = parseInt(tar.html().substr(0, tar.html().length - 1)) - 1;
                                this.month_set = false;
                                this.day_set = true;

                                this.getDayRender();
                            },
                            dayclick: function(e) {
                                var tar = $(e.target);
                                this.curindex = tar.index();
                                for (var i = 0; i < this.day_data.length; i++) {
                                    this.day_data[i].cho = false;
                                }
                                this.day_data[this.curindex].cho = true;
                                this.cur_date = this.day_data[this.curindex].mes;
                                //日期具体值
                                var show_year = parseInt(this.cur_year);
                                var show_month = parseInt(this.cur_month);
                                if (this.day_data[this.curindex].hid == true) {
                                    if (this.cur_month == 0) {
                                        show_year -= 1;
                                        show_month = 11;
                                    } else {
                                        show_month -= 1;
                                    }
                                }
                                this.dateinput = (show_year + "-" + (show_month > 8 ? (show_month + 1) : "0" + (show_month + 1)) + "-" + (this.cur_date > 9 ? this.cur_date : ("0" + this.cur_date)));
                            },
                            yearclick: function(e) {
                                var tar = $(e.target);
                                this.cur_year = parseInt(tar.html());
                                this.year_set = false;
                                this.month_set = true;


                                this.dateselect = this.cur_year + "年";
                            },
                            curclick: function() {
                                this.cur_year = this.real_year;
                                this.cur_month = this.real_month;
                                this.getDayRender();
                                this.year_set = false;
                                this.month_set = false;
                                this.day_set = true;
                            },
                            leftclick: function() {
                                if (this.year_set == true) {
                                    this.cur_year = this.cur_year - 12;
                                    this.getYearRender("left");
                                } else if (this.month_set == true) {
                                    this.cur_year -= 1;
                                    this.dateselect = this.cur_year + "年";
                                } else {
                                    if (this.cur_month > 0) {
                                        this.cur_month -= 1;
                                    } else {
                                        this.cur_year -= 1;
                                        this.cur_month = 11;
                                    }
                                    this.getDayRender("left");
                                }
                                var _this = this;
                                $('#date-frame').animate({
                                    left: "0px"
                                }, 500, function() {
                                    _this.day_data = _this.day_data_left;

                                    _this.year_data = _this.year_data_left;

                                    $('#date-frame').css({
                                        left: "-350px"
                                    });
                                });
                            },
                            rightclick: function() {
                                if (this.year_set == true) {
                                    this.cur_year = this.cur_year + 12;
                                    this.getYearRender("right");

                                } else if (this.month_set == true) {
                                    this.cur_year += 1;
                                    this.dateselect = this.cur_year + "年";

                                } else {
                                    if (this.cur_month < 11) {
                                        this.cur_month += 1;
                                    } else {
                                        this.cur_year += 1;
                                        this.cur_month = 0;
                                    }
                                    this.getDayRender("right");
                                }
                                var _this = this;
                                $('#date-frame').animate({
                                    left: "-700px"
                                }, 500, function() {
                                    _this.day_data = _this.day_data_right;

                                    _this.year_data = _this.year_data_right;
                                    $('#date-frame').css({
                                        left: "-350px"
                                    });
                                });
                            }

                        }
                    });
                },
                createDatePick: function() {

                    this.datepick_window = $('<div class="datepick"><div id="app"><div class="star1"></div><div class="star2"></div><div class="star3"></div><div class="title"><a href="#"class="left iconfont"v-on:click="leftclick">&#xe61e;</a><a href="#"id="date-select"v-on:click="changedate">{{dateselect}}</a><a href="#"class="right iconfont"v-on:click="rightclick">&#xe671;</a><div class="week"><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div></div><div id="date-bg"><div id="date-frame"><div class="real-date-left"><div class="days"v-if="day_set"><span v-for="item in day_data_left"v-bind:class="{ choose: item.cho, hid: item.hid }">{{item.mes}}</span></div><div class="months"v-if="month_set"><span v-for="item in month_data">{{item.mes}}</span></div><div class="years"v-if="year_set"><span v-for="item in year_data_left">{{item.mes}}</span></div></div><div class="real-date"><transition name="fade"><div class="days"v-if="day_set"><span v-for="item in day_data"v-bind:class="{ choose: item.cho, hid: item.hid }"v-on:click.stop="dayclick">{{item.mes}}</span></div></transition><transition name="fade"><div class="months"v-if="month_set"v-on:click.stop="monthclick"><span v-for="item in month_data">{{item.mes}}</span></div></transition><transition name="fade"><div class="years"v-if="year_set"><span v-for="item in year_data"v-on:click.stop="yearclick">{{item.mes}}</span></div></transition></div><div class="real-date-right"><div class="days"v-if="day_set"><span v-for="item in day_data_right"v-bind:class="{ choose: item.cho, hid: item.hid }">{{item.mes}}</span></div><div class="months"v-if="month_set"><span v-for="item in month_data">{{item.mes}}</span></div><div class="years"v-if="year_set"><span v-for="item in year_data_right">{{item.mes}}</span></div></div></div></div><a href="#"id="current"v-on:click="curclick">今天</a><a href="#"id="sure">确定</a></div></div>');
                    $('body').append(this.datepick_window);


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

                GetRandomNum: function(Min, Max) {
                    var Range = Max - Min;
                    var Rand = Math.random();
                    return (Min + Math.floor(Rand * Range));
                }

            }
            var d1 = new datePick(this);
        }