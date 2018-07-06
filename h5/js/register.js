(function($) {
    
    /**
     * 电话号码验证
     * @param {String} s
     */
    function checkMobile(s){   
        var regu =/^1[3|4|5|6|7|8]\d{9}$/; 
        var re = new RegExp(regu); 
        if (re.test(s)) { 
          return true; 
        }
        else{ 
          return false; 
        } 
    }

    var mainfun = {
        init:function(){
            var calendar = new LCalendar();
            calendar.init({
                'trigger': '#dates', 
                'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 
                'minDate': '1900-1-1', 
                'maxDate': new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() //最大日期
            });
        },
        handle:function(){
            $("#detail").bind("click",function(){

            });
        }
    }

    mainfun.init();

})(jQuery)