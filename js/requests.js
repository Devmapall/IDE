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
        function rec(node,values) {
            $.each(values, function(i,item) {
               if($.isNumeric(i)) {
                   $(node).append('<li data-jstree=\'{"type":"file"}\'>'+item+"</li>");
               } else if($.isArray(item)){
                   $(node).append('<li>'+i+'</li>');
                   var parent = $($(node).append("<ul>"));
                   $.each(item,function(i,val) {
                        $(parent).append('<li>'+val+'</li>');
                    });
                    node.append('</ul>');
               } else {
                  var parent = $(node).append('<li>'+i+'</li>');
                  $(parent).append("<ul>");
                  rec(item);
                  node.append('</ul>');
               }
            });
        }
        rec(list,data);
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