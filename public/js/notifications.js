function notification(notifications) {
    removeRow();
    if (notifications && (notifications.eventInvit.length != 0 || notifications.friendsInvit.length != 0 || notifications.addfriends.length != 0)) {
        var dropdownMenu = [];
        if (notifications.friendsInvit) {
            var nbNotificationsFriend = notifications.friendsInvit.length;
            for (var i = 0; i < nbNotificationsFriend; i++) {
                dropdownMenu.push('<div class="dropdown-item notif padding">' + notifications.friendsInvit[0].prenom + ' ' + notifications.friendsInvit[0].name + ' demande d\' ami </div>')
            }
        }
        if (notifications.eventInvit) {
            var nbNotificationsEvent = notifications.eventInvit.length;
            for (var i = 0; i < nbNotificationsEvent; i++) {
                dropdownMenu.push('<div class="dropdown-item notif padding">' + notifications.eventInvit[0].prenom + ' ' + notifications.eventInvit[0].name + ' vous à inviter un évènement </div>')
            }
        }

        document.getElementById('notification').innerHTML = dropdownMenu.length;

        document.getElementById('dropdown').innerHTML = dropdownMenu.join('');
    } else {
        document.getElementById('dropdown').innerHTML = 'Vous n\'avez pas de notifications';
    }
}

function removeRow() {
    var myNode = document.getElementById("notification");
    myNode.innerHTML = '';
}
