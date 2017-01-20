// angular.module('example', ['angular-p5'])
myApp.factory('drawFactory', ['p5','$http', function(p5, $http, $scope) {
  return function(p) {
    var theta = 0;
    var radius = 127;
    var step = .2;
    var speed = 3;
    var x = 0;
    var y = 0;
    var h = 250;
    var k = 250;
    var fr = 30;
    var drawToggle = false;
    var circleVisible = true;
    var radiusVisible = false;
    var pointArray = [];
    var lineColor = [100,100,100];
    var bgColor = [250,250,250];
    var currentImages = []
    // var resetclick;

    

    p.setup = function() {
        p.createCanvas(500, 500);

        p.frameRate(fr);
    };

    p.draw = function() {
        //Change Background color
        p.background(bgColor);

        p.refreshSwatch() 

        drawCircle(radius, step, h , k);  
    };

      p.refreshSwatch = function() {
          radius = $( "#radius" ).slider( "value" );
          step = $( "#step" ).slider( "value" );
          speed = $( "#speed" ).slider( "value" );
          // h = $( "#xslide" ).slider( "value" );
          // k = $( "#yslide" ).slider( "value" );
          circleVisible = $("#circleVisible")[0].checked;
          drawToggle = $("#toggleDraw")[0].checked;
          radiusVisible = $("#radiusVisible")[0].checked;
          // lineColor = $("#linecolor").css("background-color")
          // bgColor = $("#bgcolor").css("background-color")
          // soundToggle = $("#soundReactive")[0].checked;
          // console.log($("#linecolor").css("background-color"))
      }

      function drawCircle(r,step, h, k){
      //h = x coordinate of circle center
      //k = y coordinate of circle center

      //THIS NEEDS TO BE FIXED, ITS CAUSING THE LINE TO BACKTRACK
      //Last time I looked at this I set it to 3.14*1000 that will get us past the buffer limit, but I think it will still happen

        // if (theta + step >= 8){theta = ((step-(8-theta))+0)}
        // if (theta + step >= Math.PI*2){theta = (theta+step)-(Math.PI*2)}
        if (theta + step >= Math.PI*1000){theta = 0}
       // repeat until theta >= 360;
      //  x = h + r*cos(theta)
        x = parseInt(h + r*Math.cos(theta))
      //  y = k + r*sin(theta)
        y = parseInt(k + r*Math.sin(theta))
      //  add step to theta
        theta += step;
      //  draw circle



        if (circleVisible){p.ellipse(x,y,24,24);};

        drawLine(x,y);

        if(radiusVisible){p.line(h,k,x,y);};

        fr = speed / step; //this reduces the speed as steps decrease

        p.frameRate(fr)
        // p.text(fr,20,20)
        // p.text(p.frameCount,20,40)
        if (p.frameCount == 1 ){ drawToggle = true}
    }

    function drawLine(x,y){
        if (drawToggle){      //if drawToggle is true write to line array
            pointArray.push([x,y])
        } else {
        if (pointArray[pointArray.length-1] != false){
            // To create separate lines we write false to the point array
            pointArray.push(false)
        }
      }
      
      if (pointArray.length > 3000) { //To prevent the code from running slowly
        pointArray.shift()      // shift off the oldest value
      }
      if (pointArray.length>1){
        for (var myline = 0; myline < pointArray.length-1; myline++){
          //if the next value or current value is false dont write
          if (pointArray[myline+1] == false || pointArray[myline] == false){
            continue
          } 
          var x1 = pointArray[myline][0];
          var y1 = pointArray[myline][1];
          var x2 = pointArray[myline+1][0];
          var y2 = pointArray[myline+1][1];
          p.stroke(lineColor);
          p.line(x1,y1,x2,y2);

        }

      }

    }


    document.getElementById("capture").addEventListener("click", function() {
      var canvas = document.getElementById("defaultCanvas0");
      // var ctx = canvas.getContext("2d");
      var img = canvas.toDataURL().toString();
      img = img.replace('data:image/png;base64,','');
      img = img.replace(' ','+');
      document.getElementById("capture").disabled = true;
      document.getElementById("capture").style.color = "#EEEEEE"
      document.getElementById("capture").style.backgroundColor = "#888888"

      var success;

      $http.post('/draw/create', {data: img}).then(function(returned_data){
        console.log(returned_data.data);
        success = returned_data.data ? true : false;
        // currentImages.push(returned_data.data.url)
        // var card = "  <div class=\"card\"><img ng-src=\"assets"+returned_data.data.url+"\"></div>"
        // document.getElementById("drawGallery").innerHTML = card

      });
      console.log("Start the timer!!");

      setTimeout(function(){
        console.log("We are done");
        document.getElementById("capture").disabled = false;
        if (success){
          console.log("Success");
          document.getElementById("capture").style.color = "green";
          document.getElementById("capture").style.backgroundColor = "#DEFACE";
        } else {
          console.log("Failure");
          document.getElementById("capture").style.color = "red";
          document.getElementById("capture").style.backgroundColor = "#E57A7E";
        }

        setTimeout(function(){
          console.log("Returned to normal");
          document.getElementById("capture").style.color = "black";
          document.getElementById("capture").style.backgroundColor = "white";
        }, 1000);
      }, 5000);

    });

    document.getElementById("reset").addEventListener("click", function(){
      pointArray = [];
    });


    // function alertmsg(keypressed){
    //   alert(keypressed)
    // }
    // document.getElementById("controlpanel").onkeypress=alertmsg(event)
    // document.getElementById("controlpanel").onkeydown = function(e){
    //     var key = e.keyCode;
    //     if ( key == "32" ){
    //       // if (worldSense(pacman.x-1,pacman.y) != "wall"){
    //         // pacman.x--;
    //         // eater();
    //         alert(key)
    //       }
    //     console.log(e.keyCode)
    //   }
  };
}]);
