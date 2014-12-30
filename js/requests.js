function getProjects() {
    $.ajax({
        url: "http://ide.mykey.to:8080/index.hh",
        type: "POST",
        data: {
            action: "getProjects"
        },
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    }).done(function(data) {
        data.each(function(i,item) {
            $("#openProjectsDialog > ul").append("<li>"+item+"</li>");
            $("#openProjectsDialog").dialog("open");
        });
    });
}