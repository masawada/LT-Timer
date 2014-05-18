// LT Timer app.js

while((input = window.prompt("何分?")).length === 0){}
var minutes = Number(input);

(function($, minutes){
var endtime = 0, interval;

var format_display = function(milliseconds){
  var min = Math.floor(milliseconds / 60000);
  var sec = Math.floor(milliseconds % 60000 / 1000);
  var msec = Math.floor(milliseconds % 60000 % 1000 / 10);
  return ("00"+min).slice(-2) + ':' + ("00"+sec).slice(-2) + ':' + ("00"+msec).slice(-2);
};

var start = function(){
  init();
  clearInterval(interval);
  endtime = Date.now() + minutes * 60000;
  interval = setInterval(refresh_display, 10);
};

var finish = function(){
  $('#message').text('ありがとうございました！');
  $('#timer').text(format_display(0));
  clearInterval(interval);
};

var refresh_display = function(){
  var remain = endtime - Date.now();
  if(remain < 0){
    finish();
    return;
  };

  $('#timer').text(format_display(Math.floor(remain)));

  var remain_rate = remain / minutes / 60000;
  if(0.1 < remain_rate && remain_rate < 0.5){
    $('body').css('background-color', '#FFE44F');
  }else if(remain_rate <= 0.1){
    $('body').css('background-color', '#FFB7B7');
  }
};

var init = function(){
  $('#timer').text(format_display(minutes * 60000));
  $('body').css('background-color', '#FFFFFF');
  $('#message').text('');
};

$(init);

$(window).on('keydown', function(e){
  if(e.keyCode === 32){start();}
  else if(e.keyCode === 82){finish(); init();}
});

})(jQuery, minutes);
