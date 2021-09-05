import document from 'document'
export function numToBinary(myNumber, type, clockDisplay){

    let hour_minutes = type === "hour" && clockDisplay === "24h"  ? [16, 8, 4, 2, 1] 
        : type === "hour" && clockDisplay === "12h" ? [8, 4, 2, 1] 
        :[32, 16, 8, 4, 2, 1]

    for (let i = 0; i < hour_minutes.length;i++){
        if (hour_minutes[i]){
            let element = type === "hour" ? "hCirc": "mCirc"
            element += hour_minutes[i]
            
            let elementToChange = document.getElementById(element)
            if (myNumber - hour_minutes[i] >= 0){
                elementToChange.style.opacity = 1
                myNumber -= hour_minutes[i]
            }else{
                elementToChange.style.opacity = 0.2
            }
        }
    }
}
export let goalSettings = {
  steps: {
    name: 'steps',
    path: 'icons/stat_steps_solid_24px.png',
  },
  distance: {
    name: 'distance',
    path: 'icons/stat_dist_solid_24px.png',
  },
  calories: {
    name: 'calories',
    path: 'icons/stat_cals_solid_24px.png',
  },
  elevationGain: {
    name: 'Elevation gain',
    path: 'icons/stat_elevation_32px_p.png',
  },
  activeZoneMinutes: {
    name: 'Active zone minutes',
    path: 'icons/stat_azm_solid_24px.png',
  },
};

export let week_month_standard = {
    week_day: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
    months: [
      'JANUARY',
      'FEBRUARY',
      'MARCH',
      'APRIL',
      'MAY',
      'JUNE',
      'JULY',
      'AUGUST',
      'SEPTEMBER',
      'OCTOBER',
      'NOVEMBER',
      'DECEMBER',
    ],
    monthsShort: [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec',
    ]
};
export const activities = ["steps" , "distance" , "calories" , "elevationGain" , "activeZoneMinutes"]