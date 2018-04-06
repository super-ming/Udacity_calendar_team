

let neighborhoodFilter = $(".filter-title");
neighborhoodFilter.click(function() {
    $(this).next().toggle();
});

let $toggler = $("#toggleButton");

//Add event listener for click to toggle either calendar or list view
$toggler.click(function(){
    toggleView();
});

function toggleView(){
    let calView = $('#calendar-view');
    let listView = $('#listView');
    if (calView.css("display") === "none"){
        calView.attr("style", "display:inline-block");
        listView.hide();
    } else {
        calView.hide();
        listView.attr("style", "display:inline-block");
    }
};

//if screen is smaller than 992px wide then remove style attr
//added by the toggle so that only the list view displayed
//in all non-desktop views
$( window ).resize(function() {
    if($(window).width() < 992) {
        $('#calendar-view').removeAttr('style');
        $('#listView').removeAttr('style');
    }
});

//Vanilla javascript version
/*document.getElementById('toggleButton').addEventListener('click', function () {
    toggleView();
});

function toggleView(){
    let calView = document.getElementById("calendarView");
    let listView = document.getElementById("listView");
    if (calView.style.display === "none") {
        calView.style.display = "inline-block";
        listView.style.display = "none";
    } else {
        calView.style.display = "none";
        listView.style.display = "inline-block";
    }
};*/

/* click listener for small nav icon to display nav list
*  Also to remove nav list
* */
$('.global-nav').click(function(event) {
    $target = $(event.target);

    if ($target.hasClass('small-nav-open-icon')) {
        $('#navigation').toggleClass('view-small-nav');
    }
    else if ($target.hasClass('small-nav-close-icon')) {
        $('#navigation').toggleClass('view-small-nav');
    }
    else if ($target.is('a')) {
        $('#navigation').toggleClass('view-small-nav');
    }
});

$('#filters').click(function(event) {
    $target = $(event.target);

    if($target.hasClass('filter-link')) {
        $('.filter-container').toggleClass('toggle-display-small-view');
    }
});

// Connect to the Eventbrite API
$(document).ready(function() {

    let token = 'XRO476MORTABZO23QCXJ';
    let $events = $("#events");
    let $listSection = $("#listView");
    let $calendarSection = $("#calendar-view");
    let $loader = $('.loader');
    let filters;

    $.get('https://www.eventbriteapi.com/v3/events/search/?token='+token+'&location.address=seattle&start_date.keyword=&q=HTML_CSS&sort_by=date', function(res) {
        if(res.events.length) {
            let s = "<ul class='eventList'>";
            //create an array of event by month
            //store those event in the local storage
            sessionStorage.setItem('briteEventsByMonth', JSON.stringify(briteEventByMonthObject(res.events)));
            sessionStorage.setItem('briteEvents', JSON.stringify(res.events));
            $loader.css('display','none');
            createCalendar(date, $monthHeader, $calendarDaysGrid);

            for(let i=0;i<res.events.length;i++) {
                let event = res.events[i];
                let eventStartDT = new Date(res.events[i].start.local);
                let eventEndDT = new Date(res.events[i].end.local);

                console.dir(event);
                s += "<li><em><b><sup class=\'uppercase\''>"+event.status+"</sup></b></em>  <a id=\'event-name\'' href='" + event.url + "' target = \'_blank \' >" + event.name.text + "</a> ("+eventStartDT.toLocaleDateString()+", "+eventStartDT.toLocaleTimeString()+" ~ "+eventEndDT.toLocaleDateString()+", "+ eventEndDT.toLocaleTimeString() + ")</li>"; 
            }
            s += "</ul>";
            $events.html(s);
        } else {
            $loader.css('display','none');
            $calendarSection.html("<h1>Sorry, there are no upcoming events matching your filters...</h1>");
            $listSection.html("<h1>Sorry, there are no upcoming events matching your filters...</h1>");
            
        }
    });



});

//gets events and returns an object with events organized by month
//is zero based just like Date object's getMonth() method.
//january is index 0
function briteEventByMonthObject(events) {
    let byMonth = [];

    for(let month =0; month < 12; month++) {
        byMonth.push(events.filter(function(event) {
            return Number(event.start.local.substring(5,7))-1 === month;
        }));
    }

    return byMonth;
}


