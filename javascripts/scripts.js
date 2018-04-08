

var neighborhoodFilter = $(".filter-title");
let $toggler = $("#toggleButton");
let $success = $(".success-modal");
let $send = $("button[type='submit']");
let $ok = $(".ok");
let loggedIn = false;

$send.click(function(e){
    e.preventDefault();
    let id = $(this).closest(".submit-container").find(".success-modal").attr("id");
    alert("Thanks for signing up!");
    /*switch() {
        case signupSuccess:
            alert("Thanks for signing up!");
            break;


    }
    if (id == "signupSuccess"){
        alert("Thanks for signing up!");
    } else if (id == "loginSquccess"){
        alert("You're logged in!");
    } else (id == "submitSuccess"){
        alert("Your event has been added!");
    }*/

    if ($success.css("display") === "none"){
        $success.attr("style", "display:flex");
    }
});

$(".ok,.signup-close").click(function(){
    loggedIn = true;
    $(location).attr('href','./index.html');
});

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

neighborhoodFilter.click(function() {
    $(this).next().toggle();
});

// Connect to the Eventful API
$(document).ready(function() {
    if (loggedIn){
        $login.attr("style","display:inline-block");
    }

    var token = 'XRO476MORTABZO23QCXJ';
    var $events = $("#events");

    $.get('https://www.eventbriteapi.com/v3/events/search/?token='+token+'&location.address=Seattle&q=Technology&date_modified.keyword=this_week&sort_by=date', function(res) {
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
event.logo_id;
$(document).ready(function eventImage() {

    var token = 'XRO476MORTABZO23QCXJ';
    var $events = $("#events");

    $.get('https://www.eventbriteapi.com/v3/events/search/?token='+token+'&location.address=Seattle&q=Technology&date_modified.keyword=this_week', function(res) {
        var eventImage = event.logo_id;

        $('#event-image').setAttribute('src',eventImage);
        $('#event-image').setAttribute('alt',event.name.text);

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
    if (loggedIn === "true"){
        $login.attr("style","display:inline-block");
    }
});

// Load header
$(function() {
    $(".global-header").load("./header.html");
  });
