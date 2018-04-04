var date = new Date();
var today = new Date();
var $monthHeader = $('#calendar-view h2');
var $calendarDaysGrid = $('.cal-days');
var $navBack = $('.cal-nav-back');
var $navForward = $('.cal-nav-forward');
var $eventDays;

//add calendar based on today's date.
//the today variable will change based on use of nav buttons
createCalendar(date, $monthHeader, $calendarDaysGrid);

//add listener for back navigation button
//will change calendar to prev month
$navBack.click(function() {
    var backDate;

    date.setDate(15); //set to the 15th to avoid issue from diff month length
    date.setMonth(date.getMonth()-1);
    backDate = date;
    createCalendar(backDate, $monthHeader, $calendarDaysGrid);
});

//add listener for forward navigation button
//will change calendar to next month
$navForward.click(function() {
    var forwardDate;

    date.setDate(15); //set to the 15th to avoid issue from diff month length
    date.setMonth(date.getMonth()+1);
    forwardDate = date;
    createCalendar(forwardDate, $monthHeader, $calendarDaysGrid);
});


$('#calendar-view').on('click', "time[data-event-count]", function() {
    $('.cal-days').removeClass('toggle-hover');
    $('.modal').css('display', 'block');
    $('.modal-content').append('<span class="close">&times;</span>');
    $('.modal-content').append($(this).children().clone());
});

$('#calendar-view').click(function(event) {
    if (event.target.className === 'modal' || event.target.className === 'close') {
        $('.modal').css('display', 'none');
        $('.modal-content').empty();
        $('.cal-days').addClass('toggle-hover');
    }
});

function createCalendar(date, $headerDOM, $calendarGridDOM) {
    var $eventDays;
//remove existing cal grid if there is one.
    $calendarGridDOM.empty();

//append elements
    $headerDOM.text(getCurrentMonth(date).toUpperCase() + ' ' + date.getFullYear());
    $calendarGridDOM.append(getCalendarGrid(date, today));

//returns the a string of the month based on the parameter's date object
    function getCurrentMonth(date) {
        var months = ['january','february','march','april','may','june','july',
            'august','september','october','november','december'];
        return months[date.getMonth()];
    }

//creates an array of time elements with the datetime attribute set to the
// months of the parameter's date object
    function getCalendarGrid (date, today) {
        var daysArray= [];
        var firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1 );
        var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() +1, 0 );
        var firstWeekDay = firstDayOfMonth.getDay() +1;
        var calendarDate = firstDayOfMonth;
        var currMonthEventData = JSON.parse(sessionStorage.getItem("briteEventsByMonth"))[date.getMonth()];
        var currDayEventData;

        for(var dayBox=1; dayBox <= 35; dayBox++) {
            if (dayBox >= firstWeekDay &&
                dayBox-firstWeekDay <
                lastDayOfMonth.getDate())
            {
                currDayEventData = currMonthEventData.filter(function(event) {
                    return Number(event.start.local.substring(8,10)) === calendarDate.getDate();
                });

                daysArray.push(createTimeElement(calendarDate, today, currDayEventData)
                    .append(createEventDetailsElement(currDayEventData))
                );

                calendarDate.setDate(calendarDate.getDate() + 1);

            } else {
                daysArray.push($('<time></time>'));
            }
        }

        return daysArray;


        //return an time element wrapped in a jQuery object
        //sets datetime attr to date parameter
        //sets class attr of "today" if date param matches today param
        function createTimeElement(date, today, currDayEventData) {
            var attrObj = {};

            attrObj['datetime'] = datetimeFormatConverter(date);

            //if this day has an event add a data-event attribute w event count
            currDayEventData.length > 0
                && (attrObj['data-event-count'] = currDayEventData.length);

            //if the date is today then add a today class
            today.toDateString() === date.toDateString()
                && (attrObj['class'] = 'today');

            return $('<time></time>')
                .attr(attrObj)
                .append($('<div class="date-num">').text(calendarDate.getDate()));

            //HTML datetime attr syntax YYYY-MM-DDThh:mm:ssTZD
            //converts Javascript's Date object format to HTML attr format
            function datetimeFormatConverter(date) {
                var day = date.getDate() < 10?
                    String('0' + date.getDate())
                    :
                    date.getDate();

                var month = date.getMonth() + 1;
                month = month < 10? String('0' + month) : month;

                return date.getFullYear() + '-' + month + '-' + day;
            }
        }

        function createEventDetailsElement(currDayEventData) {
            //get the name of each event (max 40 chars), append them to an li
            //these will be displayed in calendar view
            currDayEventData.sort((function (a, b) {
                var aDate = new Date(a.start.local);
                var bDate = new Date(b.start.local);
                return aDate - bDate;
            }));
            var eventDetails = $('<ul>').append(currDayEventData.map(function(event){
                var time = new Date(event.start.local);
                return $('<li>').attr('data-event-id', event.id)
                                .append(
                                    $('<div class="event-name-short">')
                                        .append('<a href="./event_details.html#' + event.id + '">' +
                                            event.name.text.substring(0,40).concat(
                                                event.name.text.length > 40? ('...'):'')
                                            + '</a>'
                                        ),
                                    $('<div class="event-time">').text(time.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})),
                                    $('<div class="event-name-long">')
                                        .append('<a href="./event_details.html#' + event.id + '">' + event.name.text + '</a>')
                                );
            }));

            return $('<div class="event-details">').append(eventDetails);
        }
    };
}


//var storage = JSON.parse(sessionStorage.getItem("briteEvents"));
//storage.map(function(event) {console.log(event)});


