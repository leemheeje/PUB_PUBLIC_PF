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
					$this.find('.lnbLink').off().on({
						'click': function() {
							var listCnt = $(this).data('listNum');
							$this.find('.lnbLink').closest('li').removeClass('active');
							$(this).closest('li').addClass('active');
							_this.ext({
								crrtListCnt: listCnt,
								crrtTit: _this.obj.list[listCnt].name
							});
							_this.asideListGet($(this).data('listNum'));
							$('.ssideHdTit').text(_this.obj.crrtTit);
						}
					});
				},
				asideListGet: function(cn) {
					var _this = this;
					var html = '';
					$.each(_this.obj.list[cn].data, function(i, item) {
						var mode = item.mode.split(',');
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
							cls ? html += '<span class="s_label ' + cls + '">' + nm + '</span>' : '';
						}
						html += '</div>';
						html += '</dd>';
						html += '</dl>';
						html += '</div>';
						html += '</a>';
						html += '</div>';
					});
					$('.sSideList').html(html);
					html = '';
					/* 스크롤바 호출*/
					$('.subSideScrFun').customScrollBar();
					_this.sbind();
				},
				sbind: function() {
					var _this = this;
					$('.lnbsLink').off().on({
						'click': function() {
							var $this = $(this);
							var $data = $this.data('listSnum');
							$('.lnbsLink').closest('.lst').removeClass('active');
							$this.closest('.lst').addClass('active');
							_this.ext({
								crrtSlistNum: $data,
								crrtItems: _this.obj.list[_this.obj.crrtListCnt].data[$data]
							});
							_this.sbindCallb();
						}
					});
				},
				sbindCallb: function() {
					console.log(this.obj.crrtItems)
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
					$('[data-params-project-href="true"]').attr('href', this.obj.crrtItems.href);
					$('[data-params-project-thumb="true"]').attr('src', this.obj.crrtItems.img);
					setTimeout(function(){$('.contentScrFun').customScrollBar()},100)
					
				}
			};
			var asidelist = new AsideList({
				list: null
			});
			asidelist.init();
			return $this;
		}
	});
})(jQuery);