var activeProject;
var activeFile;

function getParents(child) {
    var string = "";
    $(child).parents().each(function(i,item) {
        if($(item).is("li")) {
            string = $(item).find("> a").text()+"/"+string;
        }
    });
    return string;
}

function jsTree() {
    $("#tree").on('changed.jstree',function(e,data) {
        var file = $("#"+data.selected[0]);       
        if($(file).text().indexOf(".") >= 0) {
            var path = getParents(file);
            var full_path = "/var/www/hack/"+ activeProject + "/" + path + $(file).text();

            if($("textarea[path='"+full_path+"']").length <= 0) {

                $.ajax({
                    url: "http://ide.mykey.to:8080/index.hh",
                    type: "POST",
                    data: {
                        action: "getFile",
                        file: full_path
                    },
                    dataType: 'json',
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true
                }).done(function(data) {
                    var splits = data.path.split("/");
                    var file = splits[splits.length-1];
                    var tab = $('<li><a href="#"><img src="images/Close_Box_Red.png"></a><span>'+file+'</span><span class="path" style="display:none;">'+data.path+'</span></li>');
                    $("#tabs > ul").append(tab);
                    var texta = $("<textarea path='"+data.path+"' class='file'>"+data.content+"</textarea>");
                    $("#files").append(texta);
                    apply();
                    $(tab).click();
                });
            } else {
                $("#tabs > ul > li > .path").each(function(i,item) {
                    if($(item).text() === full_path) {
                        $(item).click();
                        editor.moveCursorTo(0,0);
                        editor.clearSelection();
                    }
                });
            }
        }
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
            $("#openProjectDialog > ul").append("<li class='ui-widget-content'>" + item + "</li>");
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
        activeProject = project;
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

function newMessageBlink() {
    if($("#newMessageToken").length > 0) {
        if($("#rightAnimation").css("background-color") == "rgb(0, 128, 0)") {
            $("#rightAnimation").css("background-color","rgb(255, 0, 0)");
        } else {
            $("#rightAnimation").css("background-color","rgb(0, 128, 0)");
        }
    } else {
        $("#rightAnimation").css("background-color","rgb(0, 128, 0)");
    }
    setTimeout(newMessageBlink,1000);
}