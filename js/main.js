var url ='https://api.darksky.net/forecast/ce0b572bee660ab58fa8396665d3d088/';
var latlon = "37.559326,126.97853337";
var new_url = url + latlon;

function getWeather(){
    $.getJSON(new_url + "?callback=?", function(data) {

        var temp = parseInt((data.currently.temperature - 32) / 1.8);
        var icon_name = '';  // 아이콘 이미지명

        switch (data.currently.icon) {
          case "clear-day": icon_name = "fair"; bg= "#f26549";
                $('.icon').show();
                break;
          case "clear-night": icon_name = "sunny_night"; bg="#85679b";
                $('.icon').show()
                break;
          case "rain": icon_name = "rain"; bg="#b4a699";
                $('.icon').show()
                break;
          case "snow": icon_name = "snow"; bg="#8d9c9f";
                $('.icon').show()
                break;
          case "sleet": icon_name = "snow"; bg="#8d9c9f";
                $('.icon').show()
                break;
          case "fog": icon_name = "cloudy"; bg="#8d9c9f";
                $('.icon').show()
                break;
          case "cloudy": icon_name = "cloudy"; bg="#8d9c9f";
                $('.icon').show()
                break;
          case "partly-cloudy-day": icon_name = "sun_cloudy"; bg="#d870a5";
                $('.icon').show()
                break;
          case "partly-cloudy-night": icon_name = "fog_night.png"; bg="#85679b";
                $('.icon').show()
                break;
          default: $('.icon').hide(); break;
        }

        $('.area').text(data.timezone);
        $('.summary').text(data.currently.summary);
        $('.icon').attr('src', 'images/' + icon_name + '.png');
        $('.temp').html(temp + '&deg;');
        $('#page').css('background', bg);
    }).done(function(){
        $('.fa-spinner').hide();
    })
}

// 현재 내 지도 위치값 가져오기
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos){
          // console.log(pos.coords.latitude + ',' + pos.coords.longitude);
          latlon = pos.coords.latitude + ',' + pos.coords.longitude;
        });
    } else {
      alert("디바이스 또는 브라우저가 위치 정보 기능을 지원하지 않습니다.");
    }
}

$(function(){
  getLocation();  // 현재 내 지도 위치(기본값)
  getWeather();   //

  // 위치 정보 입력
  $('#area').on('change', function(){
    var i = $(this).prop('selectedIndex');
    latlon = $(this).val();
    new_url = url + latlon;
    getWeather();

    $('.area').html($(this).find('option').eq(i).text());
    console.log($(this).find('option').eq(i).text());
  });
})
