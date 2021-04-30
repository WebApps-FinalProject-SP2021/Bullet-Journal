//This script is for testing loginController and should not be included in full build

console.log("JavaScript is working.");

function create() {
    const csrfToken = document.getElementById("csrfToken").value;
    const jsonBody = JSON.stringify({
        username: "mcartwri",
        password: "cat"
    });
    fetch("/createUser", { 
        method: "POST",
        headers: {"Content-Type": "application/json", 'Csrf-Token': csrfToken},
        body: jsonBody
    }).then(res => res.json()).then(data => {
        if(data !== undefined)
            console.log("Create Got: " + data);
        else
            console.log("Create failed");
    });
}
function login() {
    const csrfToken = document.getElementById("csrfToken").value;
    const jsonBody = JSON.stringify({
        username: "mcartwri",
        password: "cat"
    });
    fetch("/validateUser", { 
        method: "POST",
        headers: {"Content-Type": "application/json", 'Csrf-Token': csrfToken},
        body: jsonBody
    }).then(res => res.json()).then(data => {
        if(data !== undefined)
            console.log("Login Got: " + data);
        else
            console.log("Login failed");
    });
}