

var neighborhoodFilter = $(".filter-title");
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


// Connect to the Eventful API
$(document).ready(function() {

    var token = 'XRO476MORTABZO23QCXJ';
    var $events = $("#events");

    $.get('https://www.eventbriteapi.com/v3/events/search/?token='+token+'&location.address=Seattle&q=Technology&date_modified.keyword=this_week', function(res) {
        if(res.events.length) {
            var s = "<ul class='eventList'>";
            //create an array of event by month
            //store those event in the local storage
            sessionStorage.setItem('briteEvents', JSON.stringify(briteEventByMonthObject(res.events)));

            for(var i=0;i<res.events.length;i++) {
                var event = res.events[i];
                console.dir(event);
                s += "<li><a href='" + event.url + "'>" + event.name.text + "</a>" + "</li>";
            }
            s += "</ul>";
            $events.html(s);
        } else {
            $events.html("<p>Sorry, there are no upcoming events.</p>");
        }
    });



});

//gets events and returns an object with events organized by month
//is zero based just like Date object's getMonth() method.
//january is index 0
function briteEventByMonthObject(events) {
    var byMonth = [];

    for(var month =0; month < 12; month++) {
        byMonth.push(events.filter(function(event) {
            return Number(event.start.local.substring(5,7))-1 === month;
        }));
    }

    return byMonth;
}

// Load event's image
// event.logo_id;
// $(document).ready(function eventImage() {

//     var token = 'XRO476MORTABZO23QCXJ';
//     var $events = $("#events");

//     $.get('https://www.eventbriteapi.com/v3/events/search/?token='+token+'&location.address=Seattle&q=Technology&date_modified.keyword=this_week', function(res) {
//         var eventImage = event.logo_id;

//         $('#event-image').setAttribute('src',eventImage);
//         $('#event-image').setAttribute('alt',event.name.text);    
    
//     if(res.events.length) {
//             var s = "<ul class='eventList'>";
//             //create an array of event by month
//             //store those event in the local storage
//             sessionStorage.setItem('briteEvents', JSON.stringify(briteEventByMonthObject(res.events)));

//             for(var i=0;i<res.events.length;i++) {
//                 var event = res.events[i];
//                 console.dir(event);
//                 s += "<li><a href='" + event.url + "'>" + event.name.text + "</a>" + "</li>";
//             }
//             s += "</ul>";
//             $events.html(s);
//         } else {
//             $events.html("<p>Sorry, there are no upcoming events.</p>");
//         }
//     });




// });



// Load header
// $(function() {
//     $(".global-header").load("./header.html");
//   });