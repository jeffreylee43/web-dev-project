$(function () {
    $('#sortForm').submit( (event) => {
        event.preventDefault();

        let sort = $('#sort').val();

        switch(sort) {
            case 'name': 
                allCompanies = await movieCollection
                .find({})
                .sort({ name: 1 })
                .toArray();
                break;
            case 'price':
                allCompanies = await movieCollection
                .find({})
                .sort({ price: 1 })
                .toArray();
                break;
            case "rate":
                allCompanies = await movieCollection
                .find({})
                .sort({ averageRating: 1 })
                .toArray();
                break;
        }

        $('#sortForm').trigger('reset');
        $('#sort').focus();
    })
});
