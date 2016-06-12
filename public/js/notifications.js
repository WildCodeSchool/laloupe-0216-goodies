function notification(notifications) {
    if (notifications != undefined){
      var nbNotifications = notifications;
      var div = document.createElement('div');
      div.innerHTML = notifications;
      removeRow();
       document.getElementById('notification').appendChild(div);
    }
}

function removeRow(input) {
  var myNode = document.getElementById("notification");
  myNode.innerHTML = '';
}
