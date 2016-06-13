function notification(notifications) {
    removeRow();
    if (notifications != undefined && notifications != 0){
      var nbNotifications = notifications;
      var div = document.createElement('div');
      div.innerHTML = notifications;
       document.getElementById('notification').appendChild(div);
    }
}

function removeRow() {
  var myNode = document.getElementById("notification");
  myNode.innerHTML = '';
}
