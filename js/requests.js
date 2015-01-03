function jsTree() {
    $("#tree").on('changed.jstree',function(e,data) {
       console.log(data.instance.get_node(data.selected[0]));
       console.log($("#"+data.selected[0]));
       console.log($($("#j1_5").parent().parent().children()[1]).text());
    }).jstree({
        "core": {
            "check_callback": true
        },
        "types": {
            "file": {
                "icon" : "jstree-file"
            }
        },
        "plugins":["types"]
    });
}

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
                   node.append('<li data-jstree=\'{"type":"file"}\'>'+item+"</li>");
               } else if($.isArray(item)){
                   var li = $('<li>'+i+'</li>');
                   var ul = $("<ul></ul>");
                   node.append(ul);
                   $.each(item,function(i,val) {
                        ul.append('<li data-jstree=\'{"type":"file"}\'>'+val+'</li>');
                    });
                    li.append(ul);
                    node.append(li);
               } else {
                  var li = $('<li>'+i+'</li>');
                  var ul = $("<ul></ul>");
                  li.append(ul);
                  rec(ul,item);
                  node.append(li);
               }
            });
        }
        rec(list,data);
        jsTree();
    });
}