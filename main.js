//dom elements
const eventName = document.querySelector('[name=event-name]');
const organizerName = document.querySelector('[name=Organizer-name]');
const day = document.querySelector('[name=day]');
const month = document.querySelector('[name=month]');
const year = document.querySelector('[name=year]');
const hour = document.querySelector('[name=hour]');
const minute = document.querySelector('[name=minute]');
const seconds = document.querySelector('[name=seconds]');
const button = document.querySelector("#start-timer");
const contentDiv = document.getElementById('content');
const timeHolder = document.getElementById('timer-holder');
const dayDiv = document.querySelector('.days');
const hrDiv = document.querySelector('.hour');
const minDiv = document.querySelector('.minute');
const secDiv = document.querySelector('.secs');
const infoDiv = document.querySelector('.info');
const buttonDiv = document.getElementById('button-holder')

contentDiv.removeChild(timeHolder)
    //options to select
var yearOptions = [];
var monthOptions = [];
var daysOption = [];
var hoursOptions = [];
var secondsAndMinsOption = [];

var currentYear = new Date().getFullYear();
for (var i = currentYear; i <= currentYear + 20; i++) {
    yearOptions.push({ title: i, value: i })
}


for (var i = 1; i <= 12; i++) {
    let monthObject = {
        1: 'January',
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    };
    monthOptions.push({ title: monthObject[i], value: i })
}

//number of months
for (var i = 1; i <= 31; i++) {
    daysOption.push({ title: i, value: i })
}

//time in hours
for (var i = 0; i <= 24; i++) {
    if (i === 0) {
        hoursOptions.push({ title: "Midnight", value: i })
    } else if (i === 12) {
        hoursOptions.push({ title: i + " Noon", value: i })
    } else if (i < 12) {
        hoursOptions.push({ title: i + "am", value: i })
    } else {
        hoursOptions.push({ title: i - 12 + "pm", value: i })
    }
}

//seconds and minutes
for (var i = 0; i <= 59; i++) {
    secondsAndMinsOption.push({ title: i, value: i })
}

//populate options 
function setUpOptions(selectElement, optionsArray) {
    optionsArray.forEach(function(option) {
        let options = document.createElement('option')
        options.value = option.value;
        options.text = option.title;
        selectElement.add(options, null);
    })
}
setUpOptions(day, daysOption);
setUpOptions(year, yearOptions);
setUpOptions(month, monthOptions);
setUpOptions(minute, secondsAndMinsOption);
setUpOptions(seconds, secondsAndMinsOption);
setUpOptions(hour, hoursOptions);

//countdown function
function countDown() {
    contentDiv.appendChild(timeHolder)
    var end = new Date(year.value,
        (+month.value - 1), day.value, hour.value, minute.value, seconds.value);
    var myVar = setInterval(function() {
        var endTime = new Date(end).getTime();
        console.log(endTime)
        var currentTime = new Date().getTime();
        var difference = end - currentTime;
        if (difference <= 0 || eventName.value == "") {
            alert("Fill in the event Name or check your date");
            clearInterval(myVar);
            eventName.removeAttribute("disabled", '');
        } else {
            var dayConversion = 1000 * 60 * 60 * 24;
            var hrConversion = 60 * 60 * 1000
            var minConversion = 60 * 1000;
            var secConversion = 1000
            var days = Math.floor(difference / dayConversion);
            var hrs = Math.floor((difference % (dayConversion)) / (hrConversion))
            var mins = Math.floor((difference % (hrConversion)) / (minConversion))
            var secs = Math.floor((difference % (minConversion)) / (secConversion))
            infoDiv.innerHTML = eventName.value
            dayDiv.innerHTML = `${days}. `
            hrDiv.innerHTML = `${hrs}. `
            minDiv.innerHTML = `${mins}. `
            secDiv.innerHTML = `${secs}`
        }
    }, 1000)
}

button.addEventListener('click', (e) => {
    e.preventDefault();
    countDown();
    eventName.setAttribute('disabled', '');
    button.setAttribute('disabled', '');
});