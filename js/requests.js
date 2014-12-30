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
        $("#openProjectDialog > ul").find("li").remove();
        $.each(data.projects, function(i, item) {
            $("#openProjectDialog > ul").append("<li class='ui-widget-content'>" + item.project + "</li>");
        });
        $("#openProjectList").selectable();
        $("#openProjectDialog").dialog("open");
    });
}

function getProject(project) {
    $.ajax({
        url: "http://ide.mykey.to:8080/index.hh",
        type: "POST",
        data: {
            action: "getProject",
            project: project
        },
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    }).done(function(data) {
        var list = $("#tree > ul");
        $.each(data, function(i,item) {
           if($.isNumeric(i)) {
               $(list).append("<li>"+item+"</li>");
           }
        });
    });
}