const Employee = require("./employee");

function getGithubURL(id) {
    var queryURL = "https://api.github.com/users/" + id;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        return response.url
    })
}

class Engineer extends Employee {
    constructor(githubURL) {
        this.github = getGithubURL(githubURL);
        
        super(name, id, title);
        this.name = name;
        this.id = id;
        this.id = title;
    }
}
