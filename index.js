var moment = require('moment');
var uuid = require('uuid');

function Pamadara() {
  this.timers = [];

  this.timerRes = 1000;
}

/*
  Start a timer with an optional cb to be run after the timer is complete
*/
Pamadara.prototype.startTimer = function(cb) {
  // Generate a unique ID
  var id = uuid.v4();

  var startTime = moment();
  var endTime = startTime.add(25, 'minutes');

  var timer = {
    _id: id,
    startTime: startTime,
    endTime: endTime,
    onEnd: cb
  }

  this.timers.push(timer);

  return timer._id;
};

/*
  Handle the ending of a timer
*/
Pamadara.prototype.handleTimerEnd = function(timer) {
  // Emit an event saying the timer has been finished
  var evt = {
    timerId: timer._id
  }

  // Run the timer callback
  timer.onEnd && timer.onEnd();
};


/*
  Look for timers about to run out
*/
Pamadara.prototype.startWatch = function() {
  var self = this;

  (function checkForEndedTimers() {
    setTimeout(checkForEndedTimers, self.timerRes);

    // Abort if no timers exist
    if (self.timers.length === 0) return;

    // check the timers
    var now = moment();

    // Timers should be sorted by start/end time
    while (now.isAfter(self.timers[0].endTime)) {
      // Handle the finished timer
      self.handleTimerEnd(self.timers[0]);

      // Remove the finished timer
      self.timers.shift();

      // If no more timers exit
      if (self.timers.length === 0) {
        break;
      }
    }
  })();
};

module.exports = Pamadara;
