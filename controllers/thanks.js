const fs = require('fs');

function CreateThanks(request, response) {

    var head = fs.readFileSync('./views/partials/SpecifyHeadTags/thanksHeadTags.hbs');

        response.render("thanks",
        {
                pageHeadTags: head
        });

}

module.exports = {
    CreateThanks
}