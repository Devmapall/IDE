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
        console.log(data.projects);
        $.each(data.projects, function(i,item) {
            $("#openProjectDialog > ul").append("<li>"+item.project+"</li>");
        });
        $("#openProjectList").selectable();
        $("#openProjectDialog").dialog("open");
    });
    
}