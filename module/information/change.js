export default function () {
    window.setInterval(() => {
        change()
    }, 1000)
}

function change() {
    const date = new Date()
    document.querySelector('#date').innerHTML = toDateString(date)
    document.querySelector('#time').innerHTML = toTimeString(date)
}

function toTimeString(date) {
    return `${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`
}

function toDateString(date) {
    return `${toDayString(date)}, ${date.getDate()}. ${toMonthString(date)}; ${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}`
}

function toDayString(date) {
    let day = ''
    switch (date.getDay()) {
        case 0:
            day += 'Sunday'
            break
        case 1:
            day += 'Monday'
            break
        case 2:
            day += 'Tuesday'
            break
        case 3:
            day += 'Wednesday'
            break
        case 4:
            day += 'Thursday'
            break
        case 5:
            day += 'Friday'
            break
        case 6:
            day += 'Saturday'
            break
    }
    return day
}

function toMonthString(date) {
    let month = ''
    switch (date.getMonth()) {
        case 1:
            month = 'January'
            break
        case 2:
            month = 'February'
            break
        case 3:
            month = 'March'
            break
        case 4:
            month = 'April'
            break
        case 5:
            month = 'May'
            break
        case 6:
            month = 'June'
            break
        case 7:
            month = 'July'
            break
        case 8:
            month = 'August'
            break
        case 9:
            month = 'September'
            break
        case 10:
            month = 'October'
            break
        case 11:
            month = 'November'
            break
        case 12:
            month = 'December'
            break
    }
    return month
}

function padZero(number) {
    let string = '0' + number.toString()
    return string.slice(-2)
}