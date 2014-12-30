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
                   $(this).append('<li data-jstree=\'{"type":"file"}\'>'+item+"</li>");
               } else if($.isArray(item)){
                   var node = $(this).append('<li>'+i+'</li><ul>');
                   $.each(item,function(i,val) {
                        $(this).append('<li>'+val+'</li>');
                    });
                    node.append('</ul>');
               } else {
                  var node = $(this).append('<li>'+i+'</li><ul>');
                  rec(item);
                  node.append('</ul>');
               }
            });
        }
        rec(data);
        /*$("#tree").jstree({
            "types": {
                "file": {
                    "icon" : "jstree-file"
                }
            },
            "plugins":["types"]
        });*/
    });
}