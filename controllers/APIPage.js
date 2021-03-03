const fs = require('fs');

function CreateApiPage(request, response) {

    var head = fs.readFileSync('./views/partials/SpecifyHeadTags/apiPageHeadTags.hbs');

    response.render("APIPage",
        {
            pageHeadTags: head
        });

}

module.exports = {
    CreateApiPage
}