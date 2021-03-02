
document.forms["letterForm"].addEventListener("submit", function (e) {
    e.preventDefault();
    
    const form = document.forms["letterForm"];
    const userName = form.elements["userName"].value;
    const letter = form.elements["letter"].value;
    if (userName.length >= 30 || letter.length >= 200) {
        alert("Името не трябва да надвишава 30 символа и отзива 200")
        return;
    }
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
    var template = "".concat('<blockquote class="blockquote col-sm-6">',
        '<p class= "mb-0" >', letter.letter ,'</p >',
        '<footer class="blockquote-footer">', letter.username,'</footer>',
       ' </blockquote >')
    $("#messages").append(template);
 
}