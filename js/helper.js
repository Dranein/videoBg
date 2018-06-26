var helper = {
  // 表单验证 --姓名
  testInfo_username: function(username){
    var result = {'status': 1,'msg':''};
    var nameTest = /^[a-zA-Z\u4e00-\u9fa5]+$/;
    if(username==""){
      result = {'status': 0,'msg':'姓名不能为空'};
    }else if(!nameTest.test(username)){
      result = {'status': 0,'msg':'请输入正确的姓名格式'};
    }
    return result;
  },
  // 表单验证 --电话
  testInfo_phone: function(phone){
    var result = {'status': 1,'msg':''};
    var phoneTest = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if(phone==""){
      result = {'status': 0,'msg':'手机号不能为空'};
    }else if(!phoneTest.test(phone)){
      result = {'status': 0,'msg':'请输入正确的手机号'};
    }
    return result;
  },
  testInfo_wx(wxId) {
    var result = {'status': 1,'msg':''};
    var wx1 = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/;//微信号带字母的 6-20
    var wx2 = /^1[34578]\d{9}$/;  //qq号或者手机号 11
    var wx3 =/^\d{5,10}$/;
    var emailverify = /^([a-z0-9A-Z]+[-|.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?.)+[a-zA-Z]{2,}$/;//验证邮箱号
    if (wxId === "") {
      result = {'status': 0,'msg':'微信号不能为空'};
    } else if (!wx1.test(wxId) && !wx2.test(wxId)&&!wx3.test(wxId)&& !emailverify.test(wxId)) {
      result = {'status': 0,'msg':'请输入正确的微信号'};
    }
    return result;
  },
  // 表单验证 --选项
  testInfo_radio: function(calssName){
    var result = {'status': 1,'msg':''};
    var calssNameStr = calssName + '';
    var len = $(calssNameStr).length;
    var answer = [];
    for(var i = 0;i<len;i++){
        answer[i] = $(calssNameStr).eq(i).find('input:radio:checked').val();
        if(answer[i]==undefined){
          result = {'status': 1,'msg':'请完成题目再提交'};
        }
    }
    return result;
  },
  // 获取选中内容 --选项
  getRadio: function(calssName){
    var answer = [];
    var len = $(calssNameStr).length;
    for(var i = 0;i<len;i++){
      answer[i] = $(calssNameStr).eq(i).find('input:radio:checked').val();
    }
    return answer.join("、");
  },
  rest: function(parms,success,error){
    $.ajax({
      url:'https://isite.baidu.com/feedflow/form/submit',
      data:parms,
      dataType:'jsonp',
      jsonp:'callback',
      jsonpCallback:'callback_method',
      success:function (res) {
        if (res.status == 0) {
          if(success) success(res);
        }
        else {
          if(error) error(res);
        }
      }
    });
  },
  message: function() {
    //默认设置
    var options = {
      msg: "提示信息",
      postion: "top",
      time: 3000
    };
    //参数处理
    if (arguments.length > 0) {
      options.msg = arguments[0];
      if (/(top|bottom)/i.test(arguments[1])) {
          options.postion = arguments[1];
      }
      if (parseInt(arguments[2])) {
          options.time = arguments[2];
      }
    }
    if ($('.messageBox').length > 0) {
      $('.messageBox').remove();
    }
    $('<div/>').addClass('messageBox').appendTo($('body'));

    var $toast = $('.messageBox');
    $toast.html(options.msg);
    $toast.show(400);

    setTimeout(function() {
      $toast.remove();
    }, options.time);
  }
}