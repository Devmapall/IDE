function getProjects() {
    $.ajax({
        url: "http://ide.mykey.to:8080/index.hh",
        type: "POST",
        data: {
            action: "getProjects"
        }
    })
}