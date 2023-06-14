
function getRandomDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);

    const randomTimestamp = Math.random() * (nextYear.getTime() - tomorrow.getTime()) + tomorrow.getTime();
    const randomDate = new Date(randomTimestamp);

    const month = randomDate.getMonth() + 1;
    const day = randomDate.getDate();
    const year = randomDate.getFullYear();

    return `${month}/${day}/${year}`;
}

// Helper function to generate a random time between 5:00 PM and 10:00 PM
function getRandomTime() {
    const randomHour = (Math.floor(Math.random() * 5) + 17) - 12; // Random hour between 17 (5 PM) and 22 (10 PM)
    const randomMinutes = Math.floor(Math.random() * 60); // Random minutes between 0 and 59

    const hourString = String(randomHour).padStart(2, '0');
    const minuteString = String(randomMinutes).padStart(2, '0');

    return `${hourString}:${minuteString}PM`;
}

console.log(getRandomTime())

function plusXHours(time, hoursToAdd) {
    const [hour, minute] = time.split(':');

    let hourNum = Number(hour);
    hourNum += hoursToAdd;

    // Adjust the hour and handle overflow
    hourNum = hourNum % 12 || 12;

    const hourString = String(hourNum).padStart(2, '0');
    let minuteString = minute;

    if (hourString.startsWith('12') || hourString.startsWith('01') || hourString.startsWith('02') || hourString.startsWith('03')) {
        const timeSuffix = minuteString.endsWith('PM') ? 'AM' : 'PM';
        minuteString = minuteString.substring(0, 2) + timeSuffix;
    }

    return `${hourString}:${minuteString}`;
}

function generateRandomHours() {
    const minHours = 2;
    const maxHours = 5;
    return Math.floor(Math.random() * (maxHours - minHours + 1)) + minHours
}

function isDateBeforeToday(dateString) {
    const dateParts = dateString.split(' '); // Split the string into date and time parts
    const date = dateParts[0];
    const time = dateParts[1];

    const [month, day, year] = date.split('/');
    const [hour, minute] = time.split(':');
    const min = minute.substring(0, 2)
    // Convert to 24-hour format if it's PM
    let hour24 = Number(hour);

    if (time.endsWith('PM') && hour < 12) {
        hour24 += 12;
    }

    const bookingDateTime = new Date(Number(year), Number(month) - 1, Number(day), hour24, Number(min));

    return bookingDateTime < new Date();
}

function getNextDay(dateString) {
    const dateParts = dateString.split(' '); // Split the string into date and time parts
    const date = dateParts[0];

    const [month, day, year] = date.split('/');

    return `${Number(month)}/${Number(day) + 1}/${Number(year)}`;
}


module.exports = {
    getRandomDate,
    getRandomTime,
    isDateBeforeToday,
    plusXHours,
    generateRandomHours,
    getNextDay
}