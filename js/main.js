$(function(){
   $(".js-input input").on("focus",function(){
        $(this).addClass("focus");
   });
   $(".js-input input").on("blur",function(){
       if($(this).val()==""){
            $(this).removeClass("focus");
       }
    });
    $(".js-caption h4").on("mouseover",function(){
        $(".fix-icon .list").show();
     });
     $(".js-changebox").each(function(){
        $(this).find(".img").soChange({
            thumbObj:$(this).find("ul li")
         })
     })
    
     $(".js-homebar").unslider({
        infinite: true,
        autoplay:true,
        arrows:{
            // prev: '<div class="prev js-prev"></div>',
			// next: '<div class="next js-next"></div>'
        },
        selectors: {
            container: '.imgs',
            slides: 'a'
        },
        nav:false
     })
	var prevScrollTop=0;
    var fixedIcon=function(){
        var scrollTop=$(document).scrollTop();
		if(prevScrollTop!=scrollTop){
			prevScrollTop=scrollTop
			var winHeight=window.innerHeight;
			var icon=$(".js-fix-icon .list");
			var parent=icon.parent();
			var iconOffset=icon.offset();
			var cap=$(".js-caption");
			var capOffset=cap.offset();
			if(scrollTop-capOffset.top>-600){
				icon.show().animate({
					top:winHeight/2+scrollTop-icon.height()/2
				},100,function(){
					
				});
			}else{
				icon.hide();
			}
		}
        setTimeout(() => {
            fixedIcon();
        }, 200);
    };
    fixedIcon();
})