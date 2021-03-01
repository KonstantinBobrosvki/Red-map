const fs = require('fs');
const GuestbookDB = require('../Data/GuestbookDB.js');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: true });
 
function CreateGuestBook(request, response) {

    var head = fs.readFileSync('./views/partials/SpecifyHeadTags/guestBookHeadTags.hbs');
 
        GuestbookDB.getLetters((result) => {
            response.render("guestbook",
                {
                    allComments: result,
                    pageHeadTags: head
                });
        })


}

function AddLetter(request, response) {
   
    if (!request.body)
        return response.sendStatus(400);
    const userName = request.body.userName;
    const letter = request.body.letter;
    if (!userName || !letter) {
        response.sendStatus(400);
        console.log(Object.values(request.body));

        console.log("nulls")
        return;
    }
    if (userName.length >= 30 || letter.length >= 200) {
        response.sendStatus(400);
        return;
    }

   

    GuestbookDB.insertLetter(userName, letter, (res) => {
        response.send(res);
    });

}



module.exports = {
    CreateGuestBook,
    AddLetter
}