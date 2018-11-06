;
(function($) {
    //$.__CLSFORMAT('.asdf .asdf .asdf')
    //return asdf asdf asdf
    //$.__ARRAY_SHUFFLE([1, 2, 3, 4, 5, 6, 7, 8])
    //return 8
    //$.__ARRAY_SHUFFLE([1, 2, 3, 4, 5, 6, 7, 8])
    //$.__RANDOM(6,8)
    //6이상8미만의 실수;
    //$.__GETPARAMS('tnna')
    //url = absc.com?tnna=123 ==> return 123;
    var utills = '__';
    var utills_array = utills + 'ARRAY_';
    $[utills_array + 'SHUFFLE'] = function(a) {
        var va = a;
        var j, x, i;
        for(i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = va[i];
            va[i] = va[j];
            va[j] = x;
        }
        return va;
    }
    $[utills + 'CLSFORMAT'] = function(s) {
        return s.replace(/\./g, '');
    };
    $[utills_array + 'LAST'] = function(a) {
        return a[a.length - 1];
    };
    $[utills_array + 'MAX'] = function(a) {
        return Math.max.apply(null, a);
    };
    $[utills_array + 'MIN'] = function(a) {
        return Math.min.apply(null, a);
    };
    $[utills + 'RANDOM'] = function(min, max) {
        return Math.random() * (max - min) + min;
    };
    $[utills + 'GETPARAMS'] = function(param, str, amp, url) {
        var url = url ? url : location.search;
        if(url) {
            var arry = url.split(str ? str : '?');
            var amp = amp ? amp : '&';
            var result = null;
            var arryDp = arry[1].split(amp);
            for(var i = 0; i < arryDp.length; i++) {
                var resArry = arryDp[i].split('=');
                for(var j = 0; j < resArry.length; j++) {
                    if(resArry[0] == param) {
                        result = resArry[1];
                    }
                }
            }
            return result;
        }
    };
    $[utills + 'SCROLL'] = function(b, t, fnc) {
        var t = t ? t : window;
        var events = 'scroll wheel mousemove touchmove';
        if(b) {
            $(t).on(events, function(e) {
                if(typeof fnc === 'function') fnc($(this));
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        } else {
            $(t).off(events);
        }
    };
    $[utills + 'GET_IP'] = null;
    $[utills + 'GET_IP_FUNC'] = (function() {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        window.getIP = function(json) {
            $[utills + 'GET_IP'] = json.ip;
            head.removeChild(script);
        };
        script.type = 'text/javascript';
        script.src = 'https://api.ipify.org?format=jsonp&callback=getIP';
        head.appendChild(script);
    })();
})(jQuery);






























