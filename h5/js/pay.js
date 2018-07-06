(function($) {
    

    var mainfun = {
        offernum:0,
        jineval:0,
        paytext:"",
        init:function(){
            this.handle();
        },
        handle:function(){
            var that = this;
            $("#offers-ul li").bind("click",function(){
                $("#offers-ul li").find(".radio").removeClass("hover");
                $(this).find(".radio").addClass("hover");
                var num =  $(this).find(".num").attr("_num");
                that.offernum = num;
                var jine =  that.jineval - num;
                if(jine>0){
                    $("span.spanjines").text(jine+"元"); 
                } else{
                    $("span.spanjines").text(""); 
                }  
            });
            $("#jine").on("input",function(){
                var jine = $(this).val();
                that.jineval = jine;
                jine =  jine - that.offernum;
                if(jine>0){
                    $("span.spanjines").text(jine+"元"); 
                } else{
                    $("span.spanjines").text(""); 
                }    
            });
            $("#addRemarks").bind("click",function(){
                $("#overlays,#remarklays").fadeIn();
            })
            $("#cancel").bind("click",function(){
                $("#overlays,#remarklays").hide();
            });
            $("#confirm").bind("click",function(){
                $("#overlays,#remarklays").hide();
            });
            $("#submit").bind("click",function(){
                $("#overlays,#paylays").fadeIn();
            });

            $("#paylays .title span").bind("click",function(){
                $("#overlays,#paylays").hide();
            });

            $("#paylays .choosetype").bind("click",function(){
                $("#paylays .choosetype").find(".radio").removeClass("hover");
                $(this).find(".radio").addClass("hover");
            });
            $("#pays").bind("click",function(){

            });
            $("#nav p").bind("click",function(){
                var index = $(this).index();
                $(".coupon-box").removeClass("select");
                $("#nav p").removeClass("hover");
                $(this).addClass("hover");
                $(".coupon-box").eq(index).addClass("select");
            });
            $("#couponlays .list").bind("click",function(){
                $("#couponlays .list").find("div.radio").removeClass("hover");
                $(this).find("div.radio").addClass("hover");
            });
            $("#choosecoupon").bind("click",function(){
                $("#overlays,#couponlays").fadeIn();
            })
            $("#confirm-coupon").bind("click",function(){
                $("#overlays,#couponlays").hide();
            })
        }
    }

    mainfun.init();

})(jQuery)