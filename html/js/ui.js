var UiCommPackage = null;;
(function($) {
    UiCommPackage = {
        wind: {
            defaults: {
                target: '',
                leng: 1,
                speed: 5,
                dir: [2, 3], //1.좌상 2.우상 3.좌하 4.우하
                easing: 'swing',
            },
            init: function(obj) {
                var _this = this;
                this.obj = $.extend(true, this.defaults, obj);
                this.cmmobj = {
                    cmmInner: '.cmmWind',
                    smartobject: '.cw',
                    dir: 0,
                    targetwh: function() {
                        return {
                            w: $(_this.obj.target).width(),
                            h: $(_this.obj.target).height()
                        }
                    }
                };
                if(this.obj.target) {
                    this.append(this.obj.target);
                    this.dirset();
                    this.draw();
                } else {
                    console.log('null');
                }
            },
            append: function(tar) {
                var html = '<div class="' + UiCommPackage.clsFormat(this.cmmobj.cmmInner) + '">';
                for(var i = 0; i < this.obj.leng; i++) {
                    html += '<div class="' + UiCommPackage.clsFormat(this.cmmobj.smartobject) + '" data-target-index="' + i + '"></div>';
                }
                html += '</div>';
                $(tar).append(html);
            },
            draw: function() {
                var _this = this;
                $.each($(this.cmmobj.smartobject), function(i, el) {
                    console.log(UiCommPackage.randomFun(), UiCommPackage.randomFun());
                    _this.tarnsform(this, _this.position(UiCommPackage.randomFun()));
                });
            },
            dirset: function() {
                var s = this.obj.dir[0];
                var e = this.obj.dir[1];
                var dir = 0;
                if(s == 1 && e == 2) {
                    dir = 1;
                } else if(s == 1 && e == 3) {
                    dir = 2;
                } else if(s == 1 && e == 4) {
                    dir = 3;
                } else if(s == 2 && e == 1) {
                    dir = 4;
                } else if(s == 2 && e == 3) {
                    dir = 5;
                } else if(s == 2 && e == 4) {
                    dir = 6;
                } else if(s == 3 && e == 1) {
                    dir = 7;
                } else if(s == 3 && e == 2) {
                    dir = 8;
                } else if(s == 3 && e == 4) {
                    dir = 9;
                } else if(s == 4 && e == 1) {
                    dir = 10;
                } else if(s == 4 && e == 3) {
                    dir = 11;
                } else if(s == 4 && e == 4) {
                    dir = 12;
                }
                this.cmmobj.dir = dir;
            },
            position: function(args) {
                try {
                    return {
                        x: vx,
                        y: vy,
                        z: vz,
                        rx: vrx,
                        ry: vry,
                    }
                } catch(e) {
                    console.log('position error');
                }
            },
            tarnsform: function(tar, args) {
                if(args) {
                    $(tar).css({
                        'tarnsform': 'translateX(' + args.x + 'px) translateY(' + args.y + 'px) rotateX(' + args.ry + 'deg) rotateY( ' + args.rx + 'deg)'
                    });
                }
            }
        },
        randomFun: function(per) {
            return per ? Math.random() * per : Math.random() * 10;
        },
        clsFormat: function(nm, gubun) {
            var gu = gubun ? gubun : '.';
            return nm.replace(gu, '');
        }
    };
})(jQuery);
