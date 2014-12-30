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
        function rec(values) {
            $.each(values, function(i,item) {
               if($.isNumeric(i)) {
                   $(list).append('<li data-jstree=\'{"type":"file"}\'>'+item+"</li>");
               } else if($.isArray(item)){
                   $(list).append('<li>'+i+'</li>').append('<ul>');
                   item.each(function(i,val) {
                        $(list).append('<li>'+val+'</li>');
                    });
                    $(list).append('</ul>');
               } else {
                  
                   //rec(item);
               }
            });
        }
        rec(data);
        $("#tree").jstree({
            "types": {
                "file": {
                    "icon" : "jstree-file"
                }
            },
            "plugins":["types"]
        });
    });
}