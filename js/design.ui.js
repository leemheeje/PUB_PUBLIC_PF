;
(function($) {
	$.fn.extend({
		"cmmDataParse": function(url, callback) {
			var $this = $(this);
			$.getJSON(url, function(data) {
				if (typeof callback === "function") {
					callback(data);
				}
			}).fail(function() {
				console.log('dataParseError');
			});
			return $this;
		},
		"cmmAsideLst": function(obj) {
			var $this = $(this);

			function AsideList(defaultss) {
				this.obj = $.extend(true, defaultss, obj);
				this.totallen = 0;
			};
			AsideList.prototype = {
				init: function() {
					console.log(this.obj.list)
					this.set();
					this.bind();
				},
				set: function() {
					var html = '';
					for (var i = 0; i < this.obj.list.length; i++) {
						html += '<ul class="lnb_list">';
						html += '<li class="lst lst01">';
						html += '<a href="javascript:;" class="mn lnbLink" data-list-num="' + i + '">';
						html += '<span class="txt">' + this.obj.list[i].name + '</span>';
						html += '<i class="num">' + this.obj.list[i].data.length + '</i>';
						html += '</a>';
						html += '</li>';
						html += '</ul>';
						$this.append(html);
						html = '';
					}
				},
				ext: function(oj) {
					return $.extend(this.obj, oj);
				},
				bind: function() {
					var _this = this;
					$('.lnbLink').off().on({
						'click': function() {
							var listCnt = $(this).data('listNum');
							$('.lnbLink').closest('li').removeClass('active');
							$(this).closest('li').addClass('active');
							_this.ext({
								crrtListCnt: listCnt,
								crrtTit: _this.obj.list[listCnt].name
							});
							_this.asideListGet($(this).data('listNum'));
							$('.ssideHdTit').text(_this.obj.crrtTit);
						}
					});
					$('[data-list-num=0]').click();
				},
				tagSpecFun: function(specmode) {
					var mak = '';
					var mode = specmode.split(',');
					for (var i = 0; i < mode.length; i++) {
						var cls = '';
						var nm = '';
						switch (mode[i]) {
							case 'js':
								cls = 'js';
								nm = '자체제작JS';
								break;
							case 'res':
								cls = 'res';
								nm = '반응형';
								break;
							case 'cms':
								cls = 'cms';
								nm = 'CMS';
								break;
							case 'hyb':
								cls = 'hyb';
								nm = '하이브리드앱';
								break;
						}
						cls ? mak += '<span class="s_label ' + cls + '">' + nm + '</span>' : '';
					}
					return mak;
				},
				asideListGet: function(cn) {
					var _this = this;
					var html = '';
					$.each(_this.obj.list[cn].data, function(i, item) {
						html += '<div class="lst">';
						html += '<a href="javascript:;" class="item lnbsLink" data-list-snum="' + i + '">';
						html += '<div class="item_bx">';
						html += '<div class="img_area">';
						html += '<i class="dot"></i>';
						html += '<span class="img">';
						html += ' <img src="' + item.img + '" alt="" /> ';
						html += '</span>';
						html += '</div>';
						html += '<dl class="txt_list">';
						html += '<dt>' + item.tit + '</dt>';
						html += '<dd>';
						if (item.subj) {
							html += '<span class="txt">' + item.subj + '</span>';
						} else {
							html += '<span class="txt">입력되지 않았습니다.</span>';
						}
						html += '<div class="s_spec">';
						html += _this.tagSpecFun(item.mode);
						html += '</div>';
						html += '</dd>';
						html += '</dl>';
						html += '</div>';
						html += '</a>';
						html += '</div>';
					});
					$('.sSideList').html(html);
					html = '';
					/*시컨스 인터벌 효과*/
					_this.secInterval($('.container .lnbsLink[data-list-snum]').closest('.lst'), { 'margin-left': 0 }, { 'margin-right': -17 });
					/* 스크롤바 호출*/
					$('.subSideScrFun').customScrollBar();
					_this.sbind();
				},
				secInterval: function($tar, to, from, timer) {
					var loop = null;
					var timer = timer ? timer : 100;
					var lit = $tar.length;
					var cnt = 0;
					loop = setInterval(function() {
						if (cnt > lit) {
							clearInterval(loop);
						}
						$('.container .lnbsLink[data-list-snum="'+cnt+'"]').closest('.lst').css(to);
						cnt++;
					}, timer);
				},
				sbind: function() {
					var _this = this;
					$('.lnbsLink').off().on({
						'click': function() {
							var $this = $(this);
							var $data = $this.data('listSnum');
							$('.lnbsLink').closest('.lst,li').removeClass('active');
							$this.closest('.lst,li').addClass('active');
							_this.ext({
								crrtSlistNum: $data,
								crrtItems: _this.obj.list[_this.obj.crrtListCnt].data[$data]
							});
							_this.sbindCallb();
						}
					});
					$('[data-list-snum=0]').click();
				},
				sbindCallb: function() {
					var html = '';
					if (this.obj.crrtItems.subImgs) {
						for (var i = 0; i < this.obj.crrtItems.subImgs.length; i++) {
							html += '<div class="msg_bx selfie">';
							html += '<div class="msg_in">';
							html += '<div class="msg_img">';
							html += '<span class="img">';
							html += '<img src="" data-params-project-thumb="true" alt="" />';
							html += '</span>';
							html += '<div class="nm" data-params-project-tit="true">{{pfCurrt.tit}}</div>';
							html += '</div>';
							html += '<div class="msg_area">';
							html += '<div class="thumb">';
							html += '<span class="img">';
							html += '<img src="' + this.obj.crrtItems.subImgs[i] + '" alt="" />';
							html += '</span>';
							html += '</div>';
							html += '</div>';
							html += '</div>';
							html += '</div>';
						}
					}
					$('[data-params-project-subImgs="true"]').html(html);
					$('[data-params-project-tit="true"]').text(this.obj.crrtItems.tit);
					$('[data-params-project-stit="true"]').text(this.obj.crrtItems.subj);
					$('[data-params-project-chat="true"]').text(this.obj.crrtItems.chat);
					$('[data-params-project-thumb="true"]').attr('src', this.obj.crrtItems.img);
					$('[data-params-project-spec="true"]').html(this.tagSpecFun(this.obj.crrtItems.mode));
					$('[data-params-project-href="true"]').attr('href', this.obj.crrtItems.href);
					if (this.obj.crrtItems.githref) {
						$('[data-params-project-githref="true"]').attr('href', this.obj.crrtItems.githref);
					} else {
						$('[data-params-project-githref="true"]').hide();
					}

					setTimeout(function() { $('.contentScrFun').customScrollBar() }, 100);

				}
			};
			var asidelist = new AsideList({
				list: null
			});
			asidelist.init();
			return $this;
		},
		"cmmMobGnb": function(data) {

			var $this = $(this);
			var html = '';
			html += '<ul class="mgn_dp01">';
			for (var i = 0; i < data.length; i++) {
				html += '<li class="tp">';
				html += '<a href="javascript:;" class="tit lnbLink" data-list-num="' + i + '">' + data[i].name;
				html += '<span class="num">' + data[i].data.length + '</span>';
				html += '</a>';
				html += '<ul class="mgn_dp02">';
				for (var j = 0; j < data[i].data.length; j++) {
					html += '<li class="tp">';
					html += '<a href="javascript:;" class="txt lnbsLink" data-list-snum="' + j + '">' + data[i].data[j].tit + '</a>';
					html += '</li>';
				}
				html += '</ul>';
				html += '</li>';
			}
			html += '</ul>';
			$('.mobGnb').html(html);
			html = '';
			$('.menu_btn').click(function() {
				$('.gnb').toggleClass('active');
			});
			return $this;
		}
	});
})(jQuery);