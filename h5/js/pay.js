(function($) {
    

    var mainfun = {
        offernum:0,
        jineval:0,
        inputval:"",
        paytype:0,
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
                var jine =  that.inputval - num;
                if(jine>0){
                    $("span.spanjines").text(jine+"元"); 
                } else{
                    $("span.spanjines").text(""); 
                }  
            });
            $("#jine").bind("click",function(){
                $("#keyboardlays").animate({
                    "bottom":0
                },300)
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
                 var type = $(this).attr("_type");
                 mainfun.paytype = type;
                $("#paylays .choosetype").find(".radio").removeClass("hover");
                $(this).find(".radio").addClass("hover");

            });
            $("#pays").bind("click",function(){
                //mainfun.paytype 0储蓄支付 1微信支付
                var money = $("span.spanjines").eq(0).text();
                if(money == ""){
                    alert("请输入金额");
                }
                alert("支付类型："+mainfun.paytype)
                alert("支付金额："+money)
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
            });
            $("#confirm-coupon").bind("click",function(){
                $("#overlays,#couponlays").hide();
            });

            $("#keyboardlays .keyclose").bind("click",function(){
                if(that.inputval.length>0){
                    that.inputval = that.inputval.substring(0,that.inputval.length-1)
                    $("#jine").val(that.inputval);
                }
            });

            $("#keyboardlays .keyfirm").bind("click",function(){
                $("#keyboardlays").animate({
                    "bottom":'-466px'
                },300);

                if(that.inputval.charAt(that.inputval.length - 1)== "."){
                    that.inputval = parseInt(that.inputval);
                    $("#jine").val(that.inputval);
                }
                var jine =  that.inputval - that.offernum;
                if(jine>0){
                    $("span.spanjines").text(jine+"元"); 
                } else{
                    $("span.spanjines").text(""); 
                }   
            });

            $("#keyboardlays .hidekey").bind("click",function(){
                $("#keyboardlays").animate({
                    "bottom":"-466px"
                },300)
            });

            $("#keyboardlays .key").bind("click",function(){
                var val = $(this).text();
                var inputval = that.inputval + val;
                if(val == "." && that.inputval.indexOf(".") == -1 && that.inputval !== ""){
                    that.inputval = that.inputval + val;
                    $("#jine").val(that.inputval);
                }else if(/^\d+(\.\d{1,2})?$/.test(inputval)){
                    that.inputval = inputval;
                    $("#jine").val(inputval);
                }
            });

            $("#bindmember").bind("click",function(){
                alert("绑定会员");
            })
        }
    }

    mainfun.init();

})(jQuery)