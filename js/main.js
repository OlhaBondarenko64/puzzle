$(document).ready(function() {
    

	var puzzle = $(".puzzle-frame"),
		orginal = [0, 1, 2, 3, 4, 5, 6, 7, 8],
		temp = orginal,
		x = [],
		date1,date2,
		mm = 0,
		ss = 0,
		images = "./img/img.jpg";




	$('.puzzle-img').css({"background-image" : 'url('+images+')'});

	$(".start").click(function() {
        $(".start").hide();
        $(".reset").show();
		$(".full").hide();
		$(".pre_img").addClass("prevent_click");
		
		date1 = new Date();
		Start();
		return;
	});

	function Start() {
		randomTile();
		changeBG();
		var count = 0,
			a,
			b;
		$(".puzzle-img").click(function() {
			count++;
			if (count == 1) {
				a = $(this).attr("data-bid");
				$('.puzzle-img_'+a).css({"opacity": ".65"});
			} else {
				b = $(this).attr("data-bid");	
				$('.puzzle-img_'+a).css({"opacity": "1"});
				if (a != b) {
					$(".puzzle-img_" + a)
						.addClass("puzzle-img_" + b)
						.removeClass("puzzle-img_" + a);
					$(this)
						.addClass("puzzle-img_" + a)
						.removeClass("puzzle-img_" + b);
					$(".puzzle-img_" + a).attr("data-bid", a);
					$(".puzzle-img_" + b).attr("data-bid", b);
				}
				swapping(a, b);
				checkCorrect(a);
				checkCorrect(b);
				a = b = count = 0;
			}
			if (arraysEqual(x)) { 
				date2 = new Date();
				timeDifference();
				showScore();
				return;
			}
		});
		return;
	}

	function randomTile() {
		var i;
		for (i = orginal.length-1; i >= 0; i--) {
			var flag = getRandom(0, i);
			x[i] = temp[flag];
			temp[flag] = temp[i];
			temp[i] = x[i];
		}
		for (i = 0; i < orginal.length; i++) {
			puzzle.append(
				'<div  class="puzzle-img puzzle-img_' + x[i] + ' tile" data-bid="' + x[i] + '"></div>'
			);
			if ((i + 1) % 3 == 0) puzzle.append("<br>");
		}
		
		return ;
	}

	function arraysEqual(arr) {
		var i;
		for (i = orginal.length - 1; i >= 0; i--) {
			if (arr[i] != i) return false;
		}
		return true;
	}

	function checkCorrect(N1) {
        var pos = x.indexOf(parseInt(N1, 10));
        console.log(pos);
		if (pos != N1) {
			return;
		}
		$(".puzzle-img_" + N1).addClass("correct , prevent_click ");
		return;
	}

	function swapping(N1, N2) {
		var first = x.indexOf(parseInt(N1, 10)),
			second = x.indexOf(parseInt(N2, 10));
		x[first] = parseInt(N2, 10);
		x[second] = parseInt(N1, 10);
		return;
	}
	
	function getRandom(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	
	function timeDifference(){
		var diff = date2 - date1;
		hh = Math.floor(diff / 1000 / 60 / 60);
		diff -= hh * 1000 * 60 * 60;
	 	mm = Math.floor(diff / 1000 / 60); 
		diff -= mm * 1000 * 60;
		ss = Math.floor(diff / 1000);	
		diff -= ss * 1000;
		return;
	}


	function changeBG(){	
        $('.puzzle-img').css({
            "background-image" : "url("+images+")"
        });
        return;
	}

	
	function showScore(){
		$('.min').html(mm);
		$('.sec').html(ss);
		setTimeout(function(){
		    $('.cover').slideDown(350);
		},1050);
		return;
	}

	$('.OK').click(function(){
		$('.cover').slideUp(350);
	});

	$('.reset').click(function(){
		$(".tile").remove();
		$("br").remove();
		$(".full").show();
        $(".start").show();
        $(".reset").hide();
		$(".pre_img").removeClass("prevent_click");
		
		temp = orginal;
		x = [];
		moves =  ss = mm = 0;
		return;
	});

	
});

