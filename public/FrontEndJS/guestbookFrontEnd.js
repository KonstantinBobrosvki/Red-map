
console.log("loadded");

document.forms["letterForm"].addEventListener("submit", function (e) {
    e.preventDefault();
    
    const form = document.forms["letterForm"];
    const userName = form.elements["userName"].value;
    const letter = form.elements["letter"].value;
    console.log("OKKK")
    AddLetter(userName, letter);

});

async function AddLetter(userName, letter) {

    const response = await fetch("/guestbook", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
           "userName": userName,
           "letter": letter
        })
    });

    if (response.ok === true) {
        const letter = await response.json();
        reset();
        Add(letter)
    }
}

function reset() {
    const form = document.forms["letterForm"];
    form.reset();
}

function Add(letter) {

    var template = "".concat('<p>', letter.username,' : ', letter.letter,'</p>');

    $("#messages").append(template);
 
}