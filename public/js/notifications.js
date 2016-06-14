function notification(notifications) {
    removeRow();
    if (notifications){
      var nbNotifications = notifications.length;
       document.getElementById('notification').innerHTML = nbNotifications;
      var dropdownMenu = [];
      for ( var i = 0 ; i < nbNotifications ; i++){
        if (notifications[i].friends){
          dropdownMenu.push('<div class="dropdown-item">'+notifications[i].friends.friendUserName+' '+notifications[i].friends.friendUserSurname+' demande d\' ami </div>')
        }
        if(notifications[i].events){
          dropdownMenu.push('<div class="dropdown-item">'+notifications[i].events.eventUserName+' '+notifications[i].events.eventUserSurname+' vous à inviter un évènement </div>')
        }
      }
      console.log(dropdownMenu);
      document.getElementById('dropdown').innerHTML = dropdownMenu.join('');
    }

}

function removeRow() {
  var myNode = document.getElementById("notification");
  myNode.innerHTML = '';
}
