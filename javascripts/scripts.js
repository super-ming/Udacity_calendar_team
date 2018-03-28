

var neighborhoodFilter = $(".filter-title");

neighborhoodFilter.click(function() {
    $(this).next().toggle();
});

// Connect to the Eventful API
$(document).ready(function() {

    var token = 'XRO476MORTABZO23QCXJ';
    var $events = $("#events");

    $.get('https://www.eventbriteapi.com/v3/events/search/?token='+token+'&location.address=Seattle&q=Technology&date_modified.keyword=this_week', function(res) {
        if(res.events.length) {
            var s = "<ul class='eventList'>";
            for(var i=0;i<res.events.length;i++) {
                var event = res.events[i];
                console.dir(event);
                s += "<li><a href='" + event.url + "'>" + event.name.text + "</a> - " + "</li>";
            }
            s += "</ul>";
            $events.html(s);
        } else {
            $events.html("<p>Sorry, there are no upcoming events.</p>");
        }
    });


});