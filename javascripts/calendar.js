var date = new Date();
var today = new Date();
var $monthHeader = $('.cal h2');
var $calendarDaysGrid = $('.cal-days');
var $navBack = $('.cal-nav-back');
var $navForward = $('.cal-nav-forward');

//add listener for back navigation button
//will change calendar to prev month
$navBack.click(function() {
    var backDate;

    date.setMonth(date.getMonth()-1);
    backDate = date;
    createCalendar(backDate, $monthHeader, $calendarDaysGrid);
});

//add listener for forward navigation button
//will change calendar to next month
$navForward.click(function() {
    var backDate;

    date.setMonth(date.getMonth()+1);
    backDate = date;
    createCalendar(backDate, $monthHeader, $calendarDaysGrid);
});

//add calendar based on today's date.
//the today variable will change based on use of nav buttons
createCalendar(date, $monthHeader, $calendarDaysGrid);


function createCalendar(date, $headerDOM, $calendarGridDOM) {
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

        for(var dayBox=1; dayBox <= 35; dayBox++) {
            if (dayBox >= firstWeekDay &&
                dayBox-firstWeekDay <
                lastDayOfMonth.getDate())
            {
                daysArray.push(createTimeElement(calendarDate, today));
                calendarDate.setDate(calendarDate.getDate() + 1);

            } else {
                daysArray.push($('<time></time>'));
            }
        }

        return daysArray;


        //return an time element wrapped in a jQuery object
        //sets datetime attr to date parameter
        //sets class attr of "today" if date param matches today param
        function createTimeElement(date, today) {
            var attrObj = {}, isToday;

            attrObj['datetime'] = datetimeFormatConverter(date);

            isToday = today.toDateString() === date.toDateString();
            isToday && (attrObj['class'] = 'today');

            return $('<time></time>')
                .attr(attrObj)
                .text(calendarDate.getDate());


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
    };
}









