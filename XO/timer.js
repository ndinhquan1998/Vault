var Stopwatch =
  (function() {
    function Stopwatch(display, results) {
      this.running = false;
      this.display = display;
      this.results = results;
      this.laps = [];
      this.reset();
      this.print(this.times);
    }

    var _proto = Stopwatch.prototype;

    _proto.reset = function reset() {
      this.times = [0, 0, 0];
    };

    _proto.start = function start() {
      if (!this.time) this.time = performance.now();

      if (!this.running) {
        this.running = true;
        requestAnimationFrame(this.step.bind(this));
      }
    };

    _proto.lap = function lap() {
      var times = this.times;
      var x = document.createTextNode("Thinking Time: "+_proto.format(times));
        
      document.getElementById("statisticList").appendChild(x);
      
    };    
      _proto.lap2 = function lap2() {
      var times = this.times;
      var y = document.createElement("li");
      var t02 = document.createTextNode(_proto.format(times));
      y.appendChild(t02);
      document.getElementById("matchEndAt").appendChild(y);
      
    };      
      _proto.lap3 = function lap3() {
      var times = this.times;
      
      var z = document.createTextNode(" - At "+_proto.format(times));
      document.getElementById("statisticList").appendChild(z);
    };

    _proto.stop = function stop() {
      this.running = false;
      this.time = null;
    };

    _proto.restart = function restart() {
      if (!this.time) this.time = performance.now();

      if (!this.running) {
        this.running = true;
        requestAnimationFrame(this.step.bind(this));
      }

      this.reset();
    };

/*    _proto.clear = function clear() {
      clearChildren(this.results);
    };*/

    _proto.step = function step(timestamp) {
      if (!this.running) return;
      this.calculate(timestamp);
      this.time = timestamp;
      this.print();
      requestAnimationFrame(this.step.bind(this));
    };

    _proto.calculate = function calculate(timestamp) {
      var diff = timestamp - this.time; // Hundredths of a second are 100 ms

      this.times[2] += diff / 10; // Seconds are 100 hundredths of a second

      if (this.times[2] >= 100) {
        this.times[1] += 1;
        this.times[2] -= 100;
      } // Minutes are 60 seconds

      if (this.times[1] >= 60) {
        this.times[0] += 1;
        this.times[1] -= 60;
      }
    };

    _proto.print = function print() {
      this.display.innerText = this.format(this.times);
    };

    _proto.format = function format(times) {
      return (
        pad0(times[0], 2) +
        ":" +
        pad0(times[1], 2));
/*
        return ( pad0(times[0], 2) + ":" + pad0(times[1], 2) + ":" + pad0(Math.floor(times[2]), 2));
*/
    };

    return Stopwatch;
  })();

function pad0(value, count) {
  var result = value.toString();

  for (; result.length < count; --count) {
    result = "0" + result;
  }

  return result;
}

/*function clearChildren(node) {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
}*/

var stopwatch = new Stopwatch(
  document.querySelector(".stopwatch"),
  document.querySelector(".results")
);
var stopwatch2 = new Stopwatch(
  document.querySelector(".stopwatch2"),
  document.querySelector(".results")
);





/**/


/*
var clock = new Vue({
    el: '#clock',
    data: {
        time: '',
        date: ''
    }
});

var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
var timerID = setInterval(updateTime, 1000);
updateTime();
function updateTime() {
    var cd = new Date();
    clock.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
    clock.date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth()+1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
};

function zeroPadding(num, digit) {
    var zero = '';
    for(var i = 0; i < digit; i++) {
        zero += '0';
    }
    return (zero + num).slice(-digit);
}
*/
