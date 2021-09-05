import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { me as companion } from "companion";

let KEY_COLOR = "tomato";
let HEART_RATE_ZONE = 111;

// Settings have been changed
settingsStorage.addEventListener("change", (evt) => {
    sendValue(evt.key, evt.newValue);
});

// Settings were changed while the companion was not running
if (companion.launchReasons.settingsChanged) {
    // Send the value of the setting
    console.log(JSON.stringify(companion.launchReasons.settingsChanged))
    sendValue(KEY_COLOR, settingsStorage.getItem(KEY_COLOR));
}

function sendValue(key, val) {
    if (val) {
        sendSettingData({
            key: key,
            value: JSON.parse(val)
        });
    }
}
function sendSettingData(data) {
    // If we have a MessageSocket, send the data to the device
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(data);
    } else {
        console.log("No peerSocket connection");
    }
}