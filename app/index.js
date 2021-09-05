import document from 'document';
import { numToBinary, goalSettings, week_month_standard, activities } from './utils/util';
import { preferences } from "user-settings";
import { colors } from './utils/colors';
import { goals, today, primaryGoal } from 'user-activity';
import clock from "clock";
import * as messaging from "messaging";
import { HeartRateSensor } from 'heart-rate';
import { gettext } from 'i18n';
import { display } from "display";
import { me as device } from "device";

if (!device.screen) device.screen = { width: 348, height: 250 };


let clockDisplay = preferences.clockDisplay;
let hCirc16 = document.getElementById("hCirc16");
let text16 = document.getElementById("text16");
let heart_beat = document.getElementById('heart_beat');
let heart_arc = document.getElementById('heart_arc');
let goal_icon = document.getElementById('goal_icon');
let goal_text = document.getElementById('goal_text');
let secundary_goal_icon = document.getElementById('secundary_goal_icon');
let secundary_text = document.getElementById('secundary_text');
let primary_arc = document.getElementById('primary_arc');
let secundary_arc = document.getElementById('secundary_arc');
let date_text = document.getElementById('date_text');

if (device.screen.height !== device.screen.width){
    let arc_stats = document.getElementsByClassName("arc_stats");
    arc_stats.forEach((arc) => {
        arc.width = device.screen.height * 15 / 100;
        arc.height = device.screen.height * 15 / 100;
        arc.arcWidth = device.screen.height * 8 / 300;
        arc.y = device.screen.height * 40 / 100;
    });
    let img_stats = document.getElementsByClassName("img_stats");
    img_stats.forEach((img) => {
        img.width = device.screen.height * 7 / 100;
        img.height = device.screen.height * 7 / 100;
        img.x = device.screen.width * 55 / 100;
        img.y = device.screen.width * 32 / 100;
    });
    let stats_container = document.getElementsByClassName("stats_container");
    let space = 5 / 100
    stats_container.forEach((container) => {
        container.y = device.screen.width * space;
        space += 16 / 100
    });
}else{
    let arc_stats = document.getElementsByClassName("arc_stats");
    arc_stats.forEach((arc) => {
        
    });
    let img_stats = document.getElementsByClassName("img_stats");
    img_stats.forEach((img) => {
        
    });
    let stats_container = document.getElementsByClassName("stats_container");
    let space = 5 / 100
    stats_container.forEach((container) => {
        container.y = device.screen.width * space;
        space += 21.5 / 100
    });
}
text16.text = clockDisplay === "24h" ? "16" : "";
hCirc16.style.visibility = clockDisplay === "24h" ? "visible" : "hidden";
clock.granularity = "minutes";
clock.ontick = (evt) => {
    let date = new Date()
    let week_day = week_month_standard.week_day[date.getDay()];
    let month = week_month_standard.monthsShort[date.getMonth()];
    let hours = evt.date.getHours();
    let minutes = evt.date.getMinutes();
    let am_pm = document.getElementById("am_pm");
    am_pm.text = hours > 12 && clockDisplay === "12h" ? "pm" 
    : hours <= 12 && clockDisplay === "12h" ? "am" 
    : "";
    if(clockDisplay ==="12h" && hours > 12 ){
        hours -= 12
    };
    numToBinary(hours, "hour", clockDisplay);
    numToBinary(minutes, "minutes", clockDisplay);

    date_text.text = `${gettext(week_day)}, ${gettext(
      month
    )} ${date.getDate()}`;

    
};
let myElement = document.getElementById("root");
let textHour = document.getElementById("text_hour");
let textMinutes = document.getElementById("text_minutes");
messaging.peerSocket.addEventListener("message", (evt) => {
    if (evt && evt.data && evt.data.key === "color_theme") {
        myElement.style.fill = evt.data.value;
        for( let i = 0; i < colors.length; i++){
            if (evt.data.value === colors[i].color){
                textHour.style.fill = colors[i].secundary
                textMinutes.style.fill = colors[i].secundary
            };
        };
    };
    if (evt && evt.data && evt.data.key === "heart_rate_zone_il" || evt.data.key === "heart_rate_zone_sl") {
        let first_arc = document.getElementById("first_arc") 
        let second_arc = document.getElementById("second_arc") 
        let iLimit = evt.data.key === "heart_rate_zone_il" ? evt.data.value.name -50 : 61
        let sLimit = evt.data.key === "heart_rate_zone_sl" ? evt.data.value.name -50 : 89
        first_arc.sweepAngle = (iLimit ) / 170 * 320
        second_arc.startAngle = 200 + (iLimit) / 170 * 320
        second_arc.sweepAngle = (sLimit - iLimit) / 170 * 320
    };
});
let test = 0
if (HeartRateSensor) {
    const hrm = new HeartRateSensor({ frequency: 1, batch: 10 });
    hrm.addEventListener("reading", () => {
        heart_beat.text = `${hrm.heartRate} BPM`;
        heart_arc.sweepAngle = hrm.heartRate - 50 < 0 ? 5 : ((hrm.heartRate - 50) / 170) * 320;
    });
    hrm.start();
} else {
    console.log("This device does NOT have a HeartRateSensor!");
}
setInterval(() => {
     let idx = 2
    if (primaryGoal === activities[idx]){
        idx = 0
    }
        goal_text.text =
          primaryGoal === 'activeZoneMinutes'
            ? today.local[primaryGoal].total
            : !(today.local[primaryGoal])
            ? "-"
            : today.local[primaryGoal];
        goal_icon.href = goalSettings[primaryGoal].path
        primary_arc.sweepAngle =
          primaryGoal === 'activeZoneMinutes'
            ? 360
            : (today.local[activities[idx]] / goals[activities[idx]]) * 360;

        secundary_arc.sweepAngle = (today.local[activities[ idx]] / goals[activities[idx]]) * 360
 
        secundary_text.text = today.local[activities[idx]]
        secundary_goal_icon.href = goalSettings[activities[idx]].path
}, 1781);

display.addEventListener("change", (evt) => {
    let animation_in = document.getElementById("animation_in")
    // let animation_out = document.getElementById("animation_out")
    if (display.on) {
        animation_in.animate("load")
        // animation_in.final = "restore"
    } else {
        // animation_out.animate("enable")
        let time_container = document.getElementById('time_container');
        time_container.style.visibility = "visible"
        time_container.style.opacity = .8;
    }
});