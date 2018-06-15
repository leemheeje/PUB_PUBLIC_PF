(function() {
    var Helpers;
    Helpers = (function() {
        function Helpers() {}
        Helpers.prototype.createDiv = function(o) {
            var $cont, $el;
            if(o == null) {
                o = {};
            }
            $el = $('<div />');
            (o["class"] != null) && $el.addClass(o["class"]);
            $cont = (o != null ? o.container : void 0) || $(document.body);
            $cont.append($el);
            return $el;
        };
        Helpers.prototype.cloneBits = function($proto, cnt, $container) {
            var $cont, $new, circles, i, _i;
            if(cnt == null) {
                cnt = 20;
            }
            circles = [];
            for(i = _i = 0; 0 <= cnt ? _i < cnt : _i > cnt; i = 0 <= cnt ? ++_i : --_i) {
                $new = $proto.clone();
                $cont = $container || $(document.body);
                $cont.append($new);
                circles.push($new);
            }
            return circles;
        };
        Helpers.prototype.rand = function(min, max) {
            return Math.floor((Math.random() * ((max + 1) - min)) + min);
        };
        return Helpers;
    })();
    window.helpers = new Helpers;
    $.easing.quake = function(t) {
        var b;
        b = Math.exp(-t * 10) * Math.cos(Math.PI * 2 * t * 10);
        if(t >= 1) {
            return 1;
        }
        return 1 - b;
    };
    $.easing.elasticOut = function(t) {
        var a, p, s;
        s = void 0;
        a = 0.1;
        p = 0.4;
        if(t === 0) {
            return 0;
        }
        if(t === 1) {
            return 1;
        }
        if(!a || a < 1) {
            a = 1;
            s = p / 4;
        } else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
    };
}).call(this);
(function() {
    var Spark;
    Spark = (function() {
        function Spark(o) {
            this.o = o != null ? o : {};
            this.vars();
            this.init();
        }
        Spark.prototype.vars = function() {};
        Spark.prototype.init = function() {
            var $proto, $spark, i, size, _i, _len, _ref, _results;
            $proto = helpers.createDiv({
                "class": 'spark'
            });
            this.sparks = helpers.cloneBits($proto, this.o.cnt || helpers.rand(10, 20));
            size = this.o.size || 2;
            _ref = this.sparks;
            _results = [];
            for(i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
                $spark = _ref[i];
                _results.push($spark.css({
                    width: size + helpers.rand(0, size),
                    height: size + helpers.rand(0, size),
                    left: this.o.left || '50%',
                    top: "" + (this.o.top || 50) + "%",
                    marginTop: this.o.shiftY,
                    marginLeft: this.o.shiftX
                }));
            }
            return _results;
        };
        Spark.prototype.run = function() {
            var $spark, blowSize, i, top, _i, _len, _ref, _results;
            _ref = this.sparks;
            _results = [];
            for(i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
                $spark = _ref[i];
                blowSize = this.o.blowSize || 100;
                top = 2 * this.o.top || 100;
                if(top < 100) {
                    top = 100;
                }
                _results.push($spark.velocity({
                    translateX: helpers.rand(-blowSize, blowSize),
                    translateY: helpers.rand(-blowSize, blowSize),
                    opacity: 1
                }, {
                    duration: 500 + blowSize,
                    easing: 'easeInOutQuad',
                    delay: (this.o.delay || 0) + helpers.rand(0, 100)
                }).velocity({
                    top: "" + top + "%",
                    translateY: 0,
                    marginTop: 0,
                    opacity: -2
                }, {
                    duration: this.o.duration || 2500,
                    easing: 'easeInOutExp'
                }));
            }
            return _results;
        };
        return Spark;
    })();
    window.Spark = Spark;
}).call(this);
(function() {
    var Bubbles;
    Bubbles = (function() {
        function Bubbles(o) {
            this.o = o != null ? o : {};
            this.vars();
            this.init();
        }
        Bubbles.prototype.vars = function() {
            this.$el = helpers.createDiv({
                "class": "bubbles"
            });
            return this.$proto = $('<div class="bubble" />');
        };
        Bubbles.prototype.init = function() {
            var $bit, i, size, _i, _len, _ref, _results;
            this.bits = helpers.cloneBits(this.$proto, 30, this.$el);
            _ref = this.bits;
            _results = [];
            for(i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
                $bit = _ref[i];
                size = helpers.rand(12, 24);
                _results.push($bit.css({
                    width: size,
                    height: size,
                    borderWidth: size / 2
                }));
            }
            return _results;
        };
        Bubbles.prototype.run = function(delay) {
            var $bit, i, _i, _len, _ref;
            _ref = this.bits;
            for(i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
                $bit = _ref[i];
                $bit.velocity({
                    top: '-10%',
                    borderWidth: 0,
                    translateX: helpers.rand(-120, 120),
                    translateY: helpers.rand(0, 300),
                    opacity: 100
                }, {
                    duration: 1400,
                    delay: helpers.rand(i * 25, i * 25 + 1000) + delay
                });
            }
            return this.$el.velocity({
                marginTop: 0
            }, {
                duration: 1000,
                delay: delay
            });
        };
        return Bubbles;
    })();
    window.Bubbles = Bubbles;
}).call(this);
(function() {
    var Drop;
    Drop = (function() {
        function Drop(o) {
            this.o = o != null ? o : {};
            this.vars();
            this.init();
        }
        Drop.prototype.vars = function() {
            return this.$proto = $('<div class="circle c-green-g drop" />');
        };
        Drop.prototype.init = function() {
            this.radius = this.o.radius;
            if(this.radius == null) {
                this.radius = 200;
            }
            this.cnt = this.radius / 10;
            return this.$els = helpers.cloneBits(this.$proto, this.cnt, this.o.$container);
        };
        Drop.prototype.run = function() {
            var $el, angle, centerX, centerY, coef, delay, delayStep, i, left, left2, step, stepCalc, top, top2, _i, _j, _k, _len, _ref, _results;
            step = (2 * Math.PI) / this.cnt;
            angle = 0;
            centerX = 0;
            centerY = 0;
            _ref = this.$els;
            _results = [];
            for(i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
                $el = _ref[i];
                left = parseInt(centerX + (Math.cos(angle) * (this.radius / 1.25)), 10);
                top = parseInt(centerY + (Math.sin(angle) * (this.radius / 1.25)), 10);
                $el.css({
                    marginLeft: left,
                    marginTop: top
                });
                left2 = parseInt(centerY + (Math.cos(angle) * (1.1 * this.radius)), 10);
                top2 = parseInt(centerY + (Math.sin(angle) * (1.1 * this.radius)), 10);
                left2 -= left;
                top2 -= top;
                $el.velocity({
                    translateX: left2,
                    translateY: top2,
                    opacity: 1
                }, {
                    delay: this.o.i * 15,
                    easing: 'easeOutElastic',
                    duration: 1500
                });
                coef = 1;
                if(left >= 0) {
                    delayStep = 100 * coef;
                    stepCalc = 50;
                    for(i = _j = 0; _j <= 1200; i = _j += stepCalc) {
                        if((top >= i) && (top <= i + stepCalc)) {
                            delay = (i / stepCalc) * delayStep;
                        }
                    }
                    delayStep = 20 * coef;
                    for(i = _k = 0; _k <= 1200; i = _k += stepCalc) {
                        if((top <= -i) && (top >= -i - stepCalc)) {
                            delay = (i / stepCalc) * delayStep;
                        }
                    }
                    if(delay == null) {
                        delay = 100 * coef;
                    }
                    $el.velocity({
                        translateX: -helpers.rand(20, 400),
                        translateY: helpers.rand(-600, 600),
                        left: 0
                    }, {
                        delay: ((10 - this.o.i) * 50 * coef) + delay + helpers.rand(0, delayStep) + 3350,
                        duration: 1000 * coef
                    });
                }
                _results.push(angle += step);
            }
            return _results;
        };
        return Drop;
    })();
    window.Drop = Drop;
}).call(this);
(function() {
    var Cloud, CloudBit;
    Cloud = (function() {
        function Cloud(o) {
            var timeout;
            this.o = o != null ? o : {};
            this.vars();
            this.init();
            timeout = setTimeout((function(_this) {
                return function() {
                    clearTimeout(timeout);
                    return _this.hide();
                };
            })(this), this.o.hideDelay);
        }
        Cloud.prototype.vars = function() {
            this.$el = helpers.createDiv({
                "class": 'center c-green-g'
            });
            return window.$cloud = this.$el;
        };
        Cloud.prototype.init = function() {
            var className;
            className = 'inherit-bg circle center';
            this.bits = [];
            this.bits.push(new CloudBit({
                width: 90,
                height: 120,
                deg: 5,
                "class": className,
                container: this.$el,
                delay: this.o.delay,
                hideDelay: this.o.hideDelay
            }));
            this.bits.push(new CloudBit({
                width: 80,
                height: 90,
                deg: 45,
                "class": className,
                shiftY: 40,
                shiftX: -5,
                container: this.$el,
                delay: this.o.delay,
                hideDelay: this.o.hideDelay
            }));
            this.bits.push(new CloudBit({
                width: 80,
                height: 100,
                deg: -35,
                "class": className,
                shiftY: 20,
                shiftX: -90,
                container: this.$el,
                delay: this.o.delay,
                hideDelay: this.o.hideDelay
            }));
            this.bits.push(new CloudBit({
                width: 60,
                height: 60,
                deg: 0,
                "class": className,
                shiftY: 30,
                shiftX: -40,
                container: this.$el,
                delay: this.o.delay,
                hideDelay: this.o.hideDelay
            }));
            this.bits.push(new CloudBit({
                width: 70,
                height: 70,
                deg: 10,
                "class": className,
                shiftX: 55,
                shiftY: 40,
                container: this.$el,
                delay: this.o.delay,
                hideDelay: this.o.hideDelay
            }));
            this.bits.push(new CloudBit({
                width: 60,
                height: 30,
                deg: 0,
                "class": className,
                shiftX: 75,
                shiftY: 60,
                container: this.$el,
                delay: this.o.delay,
                hideDelay: this.o.hideDelay
            }));
            this.bits.push(new CloudBit({
                width: 70,
                height: 30,
                deg: 0,
                "class": className,
                shiftX: -100,
                shiftY: 60,
                container: this.$el,
                delay: this.o.delay,
                hideDelay: this.o.hideDelay
            }));
            this.bits.push(new CloudBit({
                width: 80,
                height: 50,
                deg: 0,
                "class": className,
                shiftX: -60,
                shiftY: 55,
                container: this.$el,
                delay: this.o.delay,
                hideDelay: this.o.hideDelay
            }));
            this.bits.push(new CloudBit({
                width: 40,
                height: 30,
                deg: 0,
                "class": className,
                shiftX: 25,
                shiftY: 55,
                container: this.$el,
                delay: this.o.delay,
                hideDelay: this.o.hideDelay
            }));
            this.bits.push(new CloudBit({
                width: 10,
                height: 10,
                deg: 0,
                "class": className,
                shiftX: 103,
                shiftY: 65,
                container: this.$el,
                delay: this.o.delay,
                hideDelay: this.o.hideDelay
            }));
            this.bits.push(new CloudBit({
                width: 5,
                height: 5,
                deg: 0,
                "class": className,
                shiftX: 110,
                shiftY: 66,
                container: this.$el,
                delay: this.o.delay,
                hideDelay: this.o.hideDelay
            }));
            this.bits.push(new CloudBit({
                width: 10,
                height: 10,
                deg: 0,
                "class": className,
                shiftX: -128,
                shiftY: 65,
                container: this.$el,
                delay: this.o.delay,
                hideDelay: this.o.hideDelay
            }));
            return this.bits.push(new CloudBit({
                width: 8,
                height: 5,
                deg: 0,
                "class": className,
                shiftX: -135,
                shiftY: 65,
                container: this.$el,
                delay: this.o.delay,
                hideDelay: this.o.hideDelay
            }));
        };
        Cloud.prototype.hide = function() {
            var bit, i, _i, _len, _ref, _results;
            _ref = this.bits;
            _results = [];
            for(i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
                bit = _ref[i];
                _results.push(bit.hide());
            }
            return _results;
        };
        return Cloud;
    })();
    CloudBit = (function() {
        function CloudBit(o) {
            this.o = o != null ? o : {};
            this.vars();
            this.$el = helpers.createDiv({
                "class": this.o["class"],
                container: this.o.container
            });
            this.setAttrs();
            this.loop();
            this.show();
        }
        CloudBit.prototype.vars = function() {
            this.scale = 0;
            return this.opacity = 0;
        };
        CloudBit.prototype.setAttrs = function() {
            var _base, _base1;
            return this.$el.css({
                width: this.o.width,
                height: this.o.height,
                marginLeft: (-this.o.width / 2) + ((_base = this.o).shiftX != null ? _base.shiftX : _base.shiftX = 0),
                marginTop: (-this.o.height / 2) + ((_base1 = this.o).shiftY != null ? _base1.shiftY : _base1.shiftY = 0),
                'opacity': 0
            }).velocity({
                scale: 0
            }, {
                duration: 0
            });
        };
        CloudBit.prototype.show = function() {
            return this.$el.velocity({
                opacity: 100,
                scale: 1
            }, {
                easing: 'easeOutElastic',
                delay: this.o.delay + helpers.rand(0, 100),
                duration: 1200
            });
        };
        CloudBit.prototype.loop = function() {
            return this.$el.velocity({
                scaleX: .9,
                scaleY: 1,
                translateX: this.o.width / 20,
                translateY: 0,
                rotateZ: this.o.deg
            }, {
                duration: 500
            }).velocity({
                scaleY: .9,
                scaleX: 1,
                translateX: 0,
                translateY: this.o.height / 20,
                rotateZ: this.o.deg,
                complete: (function(_this) {
                    return function() {
                        return !_this.disallowAnimation && _this.loop();
                    };
                })(this)
            }, {
                duration: 500
            });
        };
        CloudBit.prototype.destroy = function() {
            return this.disallowAnimation = true;
        };
        CloudBit.prototype.hide = function() {
            this.destroy();
            return this.$el.velocity({
                scale: 0,
                translateX: -500
            }, {
                duration: 750
            });
        };
        return CloudBit;
    })();
    window.Cloud = Cloud;
}).call(this);
(function() {
    var Thunder;
    Thunder = (function() {
        function Thunder(o) {
            this.o = o != null ? o : {};
            this.vars();
            this.init();
        }
        Thunder.prototype.vars = function() {
            this.$background = $('#js-thunder-bg');
            this.$robust = $('#js-robust');
            this.$robustScreen = $('#js-robust-screen');
            this.$robustScreen2 = $('#js-robust-screen2');
            return this.boomCnt = 0;
        };
        Thunder.prototype.init = function() {
            this.spark1 = new Spark({
                shiftY: -140,
                shiftX: -120,
                top: 100,
                blowSize: 50
            });
            this.spark2 = new Spark({
                shiftY: -80,
                shiftX: -210,
                top: 100,
                blowSize: 50
            });
            this.spark3 = new Spark({
                shiftY: -100,
                shiftX: 50,
                top: 100,
                blowSize: 75
            });
            this.spark4 = new Spark({
                shiftY: -120,
                shiftX: -190,
                top: 100
            });
            this.$bit = helpers.createDiv({
                "class": 'c-grey-g center circle'
            });
            this.$bit.css({
                width: 2,
                height: 0,
                marginLeft: -1,
                'transform-origin': 'top center'
            });
            return this.thunder = helpers.cloneBits(this.$bit, 20);
        };
        Thunder.prototype.run = function() {
            return setTimeout((function(_this) {
                return function() {
                    _this.makeBoom(_this.thunder, _this.$bit);
                    return setTimeout(function() {
                        return _this.makeBoom(_this.thunder, _this.$bit);
                    }, 320);
                };
            })(this), this.o.delay);
        };
        Thunder.prototype.makeBoom = function(thunder, $bit) {
            var $bit1, $prevBit, i, jump, sign, size, _fn, _i, _len;
            this.boomCnt++;
            this.prevAngle = 100;
            $prevBit = $bit;
            $bit.css({
                'z-index': 9
            });
            $cloud.addClass('c-grey-g').removeClass('c-green-g');
            this.$robust.css('color', '#383838');
            this.$background.velocity({
                'opacity': 1
            }, {
                duration: 40
            }).velocity({
                'opacity': 0
            }, {
                delay: 200,
                duration: 40,
                complete: (function(_this) {
                    return function() {
                        $cloud.removeClass('c-grey-g').addClass('c-green-g');
                        return _this.$robust.css('color', '#00FFC6');
                    };
                })(this)
            });
            _fn = function(i) {
                return $bit1.velocity({
                    height: size.height,
                    rotateZ: size.angle,
                    opacity: 1,
                    width: 4,
                    marginLeft: -2
                }, {
                    duration: 200
                }).velocity({
                    width: 0,
                    marginLeft: 0
                }, {
                    duration: 50
                });
            };
            for(i = _i = 0, _len = thunder.length; _i < _len; i = ++_i) {
                $bit1 = thunder[i];
                $bit1.css({
                    top: '100%',
                    opacity: 0
                });
                $prevBit.append($bit1);
                size = this.calcSize(i);
                _fn(i);
                $prevBit = $bit1;
            }
            this.s = 1;
            if(this.boomCnt === 1) {
                this.$robust.css({
                    'transform-origin': 'center bottom'
                });
                sign = helpers.rand(-1, 1);
                (sign === 0) && (sign = 1);
                this.$robust.velocity({
                    rotateZ: helpers.rand(15, 25) * sign
                }, {
                    duration: 100 * this.s,
                    delay: 160 * this.s
                }).velocity({
                    rotateZ: 0
                }, {
                    duration: 500 * this.s,
                    easing: 'easeOutBounce'
                });
                jump = 100;
                this.$robustScreen.velocity({
                    marginTop: -jump
                }, {
                    duration: 50 * this.s,
                    delay: 160 * this.s
                });
                this.$robustScreen2.velocity({
                    marginTop: jump
                }, {
                    duration: 900 * this.s,
                    delay: 150 * this.s,
                    easing: 'easeOutBounce'
                });
            }
            if(this.boomCnt === 1) {
                this.spark1.run();
                setTimeout((function(_this) {
                    return function() {
                        return _this.spark3.run();
                    };
                })(this), 100);
            }
            if(this.boomCnt === 2) {
                this.spark2.run();
                return setTimeout((function(_this) {
                    return function() {
                        return _this.spark4.run();
                    };
                })(this), 50);
            }
        };
        Thunder.prototype.calcSize = function(i) {
            var angle, height;
            angle = 0;
            if(i === 0) {
                angle = helpers.rand(15, 25);
                height = 50;
            } else {
                if(i % 2 === 0) {
                    angle = -this.prevAngle + helpers.rand(0, 10);
                    this.prevAngle = angle;
                    height = helpers.rand(40, 150);
                } else {
                    angle = -this.prevAngle + helpers.rand(0, 20);
                    height = helpers.rand(10, 40);
                    this.prevAngle = angle;
                }
            }
            return {
                angle: angle,
                height: height
            };
        };
        return Thunder;
    })();
    window.Thunder = Thunder;
}).call(this);
(function() {}).call(this);
(function() {
    var Main;
    Main = (function() {
        function Main(o) {
            this.o = o != null ? o : {};
            this.vars();
            this.init();
        }
        Main.prototype.vars = function() {
            var $lineProto, i;
            this.$fast = $('#js-fast');
            this.$car1 = $('#js-car1');
            this.$car2 = $('#js-car2');
            this.$arrow1 = $('#js-arrow1');
            this.$arrow2 = $('#js-arrow2');
            this.$arrow3 = $('#js-arrow3');
            this.$arrow4 = $('#js-arrow4');
            this.$arrowWrap = $('#js-arrow-wrap');
            this.$robust = $('#js-robust');
            this.$robustShade1 = this.$robust.find('#js-robust-shade1');
            this.$robustShade2 = this.$robust.find('#js-robust-shade2');
            this.$easy = $('#js-easy');
            this.$easyWrapper = $('#js-easy-wrapper');
            this.$easyText = $('#js-easy-text');
            this.$easyScreen = $('#js-easy-screen');
            this.$screen1 = $('#js-screen1');
            this.$screen2 = $('#js-screen2');
            this.$logosScreen = $('#js-logos-screen');
            this.$restart = $('#js-restart');
            this.$github = $('#js-github');
            this.$lego = $('#js-lego');
            this.$easyLine1 = $('#js-easy-line1');
            this.$easyLine2 = $('#js-easy-line2');
            this.$restart.on('click', function() {
                return location.href = location.href;
            });
            this.$velocity = $('#js-velocity');
            this.$line = $('#js-line');
            $lineProto = this.$line.clone();
            $lineProto.css({
                top: '100%',
                transform: "none"
            });
            this.lines = helpers.cloneBits($lineProto, 20, this.$screen1);
            this.thunder = new Thunder;
            this.drops = (function() {
                var _i, _results;
                _results = [];
                for(i = _i = 0; _i < 10; i = ++_i) {
                    _results.push(new Drop({
                        radius: i * 50,
                        i: i,
                        $container: this.$screen2
                    }));
                }
                return _results;
            }).call(this);
            return this.bubbles = new Bubbles;
        };
        Main.prototype.init = function() {
            this.s = 1;
            this.car1(0);
            this.car2(700);
            this.arrows();
            this.throwFA(2200);
            this.shiftRobustArrow(3400);
            this.fallRobust(3800);
            this.showCloud(3200 * this.s);
            this.showThunder(5200 * this.s);
            this.waterDrop(7400 * this.s);
            this.showBubbles(8800 * this.s);
            this.shiftScreen(10900 * this.s);
            this.blow(12100 * this.s);
            return this.showLogos(14000 * this.s);
        };
        Main.prototype.showLogos = function(delay) {
            return this.$logosScreen.velocity({
                opacity: 1
            }, {
                delay: delay,
                complete: (function(_this) {
                    return function() {
                        var amount;
                        _this.$logosScreen.show();
                        amount = 15;
                        _this.$github.velocity({
                            translateY: -amount
                        }, {
                            duration: 1
                        }).velocity({
                            translateY: 0,
                            opacity: 1
                        }, {
                            easing: 'easeInOutQuad',
                            duration: 1500 * _this.s,
                            delay: 0 * _this.s
                        });
                        _this.$lego.velocity({
                            translateY: amount
                        }, {
                            duration: 1
                        }).velocity({
                            translateY: 0,
                            opacity: 1
                        }, {
                            easing: 'easeInOutQuad',
                            duration: 1500 * _this.s,
                            delay: 0 * _this.s
                        });
                        return _this.$restart.velocity({
                            translateY: -amount
                        }, {
                            duration: 1
                        }).velocity({
                            opacity: 1,
                            translateY: 0
                        }, {
                            easing: 'easeInOutQuad',
                            duration: 1500 * _this.s,
                            delay: 0 * _this.s
                        });
                    };
                })(this)
            });
        };
        Main.prototype.blow = function(delay) {
            var $child, childs, coef, i, _i, _ref;
            coef = 1;
            childs = this.$velocity.children();
            for(i = _i = _ref = childs.length - 1; _ref <= 0 ? _i <= 0 : _i >= 0; i = _ref <= 0 ? ++_i : --_i) {
                $child = $(childs[i]);
                $child.velocity({
                    translateX: -2000,
                    translateY: -200 - helpers.rand(0, 400),
                    rotateZ: helpers.rand(-500, 500)
                }, {
                    delay: delay + ((childs.length - i) * 75),
                    duration: 2000 * this.s * coef
                });
            }
            return setTimeout((function(_this) {
                return function() {
                    var $line, _j, _len, _ref1, _results;
                    _ref1 = _this.lines;
                    _results = [];
                    for(i = _j = 0, _len = _ref1.length; _j < _len; i = ++_j) {
                        $line = _ref1[i];
                        _results.push((function(i) {
                            return $line.velocity({
                                rotateZ: -90
                            }, {
                                duration: 600 * _this.s * coef,
                                delay: 450 + ((_this.lines.length - i) * 100 * coef),
                                easing: 'easeOutBounce',
                                complete: function() {
                                    return $(this).css({
                                        'display': 'none'
                                    });
                                }
                            });
                        })(i));
                    }
                    return _results;
                };
            })(this), delay);
        };
        Main.prototype.shiftScreen = function(delay) {
            var dur;
            dur = 1400 * this.s;
            this.$screen1.velocity({
                translateX: -2000
            }, {
                delay: delay,
                duration: dur
            });
            this.$screen2.velocity({
                left: '-50%'
            }, {
                delay: delay,
                duration: dur
            });
            return this.$velocity.velocity({
                translateX: -1500
            }, {
                delay: delay,
                duration: dur
            });
        };
        Main.prototype.showBubbles = function(delay) {
            this.bubbles.run(delay);
            return setTimeout((function(_this) {
                return function() {
                    var $line, h, i, y, _i, _len, _ref, _results;
                    _this.$easyText.css({
                        height: 240,
                        width: 240
                    }).velocity({
                        translateX: -120,
                        translateY: -120
                    }, {
                        duration: 1400 * _this.s,
                        delay: 115 * _this.s
                    });
                    _this.$easy.velocity({
                        width: 0,
                        height: 0
                    }, {
                        duration: 1400 * _this.s
                    });
                    _this.$line.velocity({
                        height: 200,
                        translateY: -200
                    }, {
                        delay: 1000 * _this.s,
                        duration: 700 * _this.s
                    }).velocity({
                        top: '100%'
                    }, {
                        easing: 'easeInExpo',
                        duration: 500 * _this.s
                    }).velocity({
                        rotateZ: 20
                    }, {
                        duration: 1
                    }).velocity({
                        rotateZ: 0
                    }, {
                        easing: 'quake',
                        duration: 1500 * _this.s
                    });
                    _ref = _this.lines;
                    _results = [];
                    for(i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
                        $line = _ref[i];
                        y = (i + 1) % 5 === 0 ? -200 : -100;
                        h = (i + 1) % 5 === 0 ? 200 : 100;
                        $line.css({
                            height: h,
                            marginLeft: "" + (-1 + ((i + 1) * 100)) + "px",
                            transform: "rotate(20deg)"
                        });
                        _results.push($line.velocity({
                            translateY: y
                        }, {
                            delay: 2250 + (i * 50),
                            duration: 100 * _this.s
                        }));
                    }
                    return _results;
                };
            })(this), delay);
        };
        Main.prototype.waterDrop = function(delay) {
            return setTimeout((function(_this) {
                return function() {
                    _this.$easy.velocity({
                        width: 240,
                        height: 240
                    }, {
                        easing: 'easeOutElastic',
                        duration: 1500 * _this.s
                    });
                    _this.$easyWrapper.velocity({
                        rotateZ: -30
                    }, {
                        duration: 1
                    }).velocity({
                        rotateZ: 0
                    }, {
                        easing: 'quake',
                        duration: 6000 * _this.s
                    });
                    return setTimeout(function() {
                        var drop, _i, _len, _ref;
                        _ref = _this.drops;
                        for(_i = 0, _len = _ref.length; _i < _len; _i++) {
                            drop = _ref[_i];
                            drop.run();
                        }
                        return _this.$robust.velocity({
                            top: '100%',
                            marginTop: 0
                        });
                    }, 100);
                };
            })(this), delay);
        };
        Main.prototype.showThunder = function(delay) {
            return setTimeout((function(_this) {
                return function() {
                    return _this.thunder.run();
                };
            })(this), delay);
        };
        Main.prototype.showCloud = function(delay) {
            return this.cloud = new Cloud({
                delay: delay,
                hideDelay: 6000 * this.s
            });
        };
        Main.prototype.car1 = function(delay) {
            var $child, child, i, _i, _len, _ref, _results;
            this.$car1.velocity({
                right: '-40%',
                opacity: 2
            }, {
                duration: 400 * this.s,
                delay: delay * this.s
            });
            this.fastChilds = this.$fast.children();
            _ref = this.fastChilds;
            _results = [];
            for(i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
                child = _ref[i];
                $child = $(child);
                $child = $child.find('#js-bit-inner');
                _results.push($child.velocity({
                    rotateZ: 40
                }, {
                    delay: (delay + 160 + (i * 15)) * this.s,
                    duration: 100 * this.s
                }).velocity({
                    rotateZ: 0
                }, {
                    delay: (60 + (i * 15)) * this.s,
                    duration: 5000 * this.s,
                    easing: 'quake'
                }));
            }
            return _results;
        };
        Main.prototype.car2 = function(delay) {
            var $child, child, i, _i, _len, _ref, _results;
            this.$car2.velocity({
                left: '-40%',
                opacity: 1
            }, {
                delay: delay * this.s,
                duration: 400 * this.s
            });
            _ref = this.fastChilds;
            _results = [];
            for(i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
                child = _ref[i];
                $child = $(child);
                $child = $child.find('#js-span');
                $child.css({
                    'transform-origin': 'center top'
                });
                _results.push($child.velocity({
                    rotateZ: 40
                }, {
                    delay: (delay + 160 + (this.fastChilds.length - i) * 15) * this.s,
                    duration: 100 * this.s
                }).velocity({
                    rotateZ: 0
                }, {
                    delay: (60 + (this.fastChilds.length - i) * 15) * this.s,
                    duration: 5000 * this.s,
                    easing: 'quake'
                }));
            }
            return _results;
        };
        Main.prototype.fallRobust = function(delay) {
            var $arrow, arrows, i, _i, _len;
            this.$robust.velocity({
                top: '100%',
                rotateZ: -50,
                marginTop: -55
            }, {
                delay: delay * this.s,
                easing: 'easeInQuad',
                duration: 300 * this.s
            }).velocity({
                rotateZ: 0
            }, {
                duration: 500 * this.s,
                easing: 'easeOutBounce'
            });
            arrows = [this.$arrow1, this.$arrow2, this.$arrow3];
            for(i = _i = 0, _len = arrows.length; _i < _len; i = ++_i) {
                $arrow = arrows[i];
                $arrow.velocity({
                    'top': '100%',
                    marginTop: 0,
                    rotateZ: 60 + helpers.rand(0, 20)
                }, {
                    easing: 'easeInQuad'
                }).velocity({
                    rotateZ: 90
                }, {
                    easing: 'easeOutBounce',
                    duration: 400 * this.s,
                    complete: function() {
                        return $(this).hide();
                    }
                });
            }
            return this.$arrow4.velocity({
                'top': '100%',
                marginTop: 0,
                rotateZ: 60 + helpers.rand(0, 20)
            }, {
                easing: 'easeInQuad'
            }).velocity({
                rotateZ: 90
            }, {
                easing: 'easeOutBounce',
                duration: 400 * this.s,
                complete: function() {
                    return $(this).hide();
                }
            });
        };
        Main.prototype.shiftRobustArrow = function(delay) {
            this.$arrowWrap.velocity({
                translateX: -208
            }, {
                delay: delay * this.s
            });
            return this.$robustShade1.velocity({
                marginLeft: -208
            }, {
                delay: delay * this.s,
                complete: (function(_this) {
                    return function() {
                        _this.$robustShade2.hide();
                        return _this.$fast.hide();
                    };
                })(this)
            });
        };
        Main.prototype.throwFA = function(delay) {
            var $child, angle, attrs2, i, _i, _results;
            _results = [];
            for(i = _i = 0; _i <= 1; i = ++_i) {
                $child = $(this.fastChilds[i]);
                $child.css({
                    'transform-origin': 'center center',
                    'position': 'absolute'
                });
                if(i === 1) {
                    angle = 280;
                    _results.push($child.velocity({
                        rotateZ: angle / 5,
                        left: '45%',
                        top: '55%'
                    }, {
                        duration: 50 * this.s,
                        easing: 'linear',
                        delay: delay * this.s
                    }).velocity({
                        rotateZ: angle,
                        left: '-10%',
                        top: '110%'
                    }, {
                        duration: 1000 * this.s,
                        easing: 'linear'
                    }));
                } else {
                    angle = 600;
                    attrs2 = {
                        rotateZ: angle + helpers.rand(0, 40),
                        left: '-10%',
                        top: '20%'
                    };
                    _results.push($child.velocity({
                        rotateZ: angle / 10,
                        left: '50%',
                        top: '50%'
                    }, {
                        duration: 50 * this.s,
                        easing: 'linear',
                        delay: delay * this.s
                    }).velocity(attrs2, {
                        duration: 1000 * this.s,
                        easing: 'linear'
                    }));
                }
            }
            return _results;
        };
        Main.prototype.arrows = function() {
            var angle, arrowAngle, delay, duration;
            arrowAngle = 20;
            delay = 1400;
            duration = 2000;
            angle = arrowAngle + helpers.rand(0, arrowAngle);
            this.$arrow1.velocity({
                rotateZ: 90,
                left: '150%'
            }, {
                duration: 1,
                delay: delay * this.s
            }).velocity({
                left: '70%',
                top: '50%',
                rotateZ: angle
            }, {
                duration: 400 * this.s
            }).velocity({
                rotateZ: 1.5 * angle
            }, {
                duration: 1
            }).velocity({
                rotateZ: angle
            }, {
                duration: duration * this.s,
                easing: 'quake'
            });
            angle = arrowAngle + helpers.rand(0, arrowAngle);
            this.$arrow2.velocity({
                rotateZ: 90,
                left: '150%'
            }, {
                duration: 1,
                delay: (delay + 200) * this.s
            }).velocity({
                left: '10%',
                top: '50%',
                rotateZ: angle
            }, {
                duration: 400 * this.s
            }).velocity({
                rotateZ: 1.5 * angle
            }, {
                duration: 1
            }).velocity({
                rotateZ: angle
            }, {
                duration: duration * this.s,
                easing: 'quake'
            });
            angle = arrowAngle + helpers.rand(0, arrowAngle);
            this.$arrow3.velocity({
                rotateZ: 90,
                left: '150%'
            }, {
                duration: 1,
                delay: (delay + 250) * this.s
            }).velocity({
                left: '20%',
                top: '50%',
                rotateZ: angle
            }, {
                duration: 400 * this.s
            }).velocity({
                rotateZ: 1.5 * angle
            }, {
                duration: 1
            }).velocity({
                rotateZ: angle
            }, {
                duration: duration * this.s,
                easing: 'quake'
            });
            angle = 20;
            return this.$arrow4.velocity({
                rotateZ: 90,
                left: '150%'
            }, {
                duration: 1,
                delay: (delay + 400) * this.s
            }).velocity({
                left: '50%',
                top: '50%',
                rotateZ: angle
            }, {
                duration: 400 * this.s
            }).velocity({
                rotateZ: 1.5 * angle
            }, {
                duration: 1
            }).velocity({
                rotateZ: angle
            }, {
                duration: duration * this.s,
                easing: 'quake'
            });
        };
        return Main;
    })();
    setTimeout(function() {
        return new Main;
    }, 1000);
}).call(this);
