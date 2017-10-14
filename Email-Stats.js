function countEmails() {
  var current = new Date();
  var week= new Array(); 
    // Starting Monday not Sunday
    current.setDate(current.getDate());
    for (var i = 0; i < 7; i++) {
        week.push(
            new Date(current)
        ); 
        current.setDate(current.getDate() -1);
    }
  for (var i = 0; i < week.length; i++){
    Logger.log(week[i])
  }
  var threads = GmailApp.search("newer_than:7d");
  var user = Session.getActiveUser().getEmail();
  var sentEmails = 0;
  var receivedEmails = 0;
  var numThreads = threads.length;
  for (var i = 0; i < numThreads; i++){
    var messages = threads[i].getMessages();
    var numMessages = messages.length;
    for (var j = 0; j < numMessages; j++){
      var from = messages[j].getFrom();
      var delimited = from.split(" ");
      var sentFrom = delimited[delimited.length-1]
      sentFrom = sentFrom.substring(1, sentFrom.length-1);
      var dateSent = messages[j].getDate();
      if (dateSent < week[0] && dateSent > week[6]){
        if (user === sentFrom){
          sentEmails += 1;
        } else {
          receivedEmails += 1;
        }
      }
    }
  }
  var startingMonth = (week[6].getMonth()+1).toString();
  var startingDay = (week[6].getDate()).toString();
  var endingMonth = (week[0].getMonth()+1).toString();
  var endingDay = (week[0].getDate()).toString();
  GmailApp.sendEmail(user, "Gmail Statistics for the time period of: "+startingMonth + "/" + startingDay + " --" + endingMonth + "/" + endingDay, 
            "This week you received " + receivedEmails.toString() + " emails and sent " + sentEmails.toString() + " emails this week.");