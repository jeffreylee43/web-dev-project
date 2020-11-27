$(function () {
    function byName(list) {}

    function byPrice(list) {}

    function byRate(list) {}

    $('#sortForm').submit( (event) => {
        event.preventDefault();

        const allCompanies = await companies.getAllCompanies();

        let sort = $('#sort').val();

        switch(sort) {
            case 'name': 
                allCompanies = byName(allCompanies);
                break;
            case 'price':
                allCompanies = byPrice(allCompanies);
                break;
            case "rate":
                allCompanies = byRate(allCompanies);
                break;
        }

        $('#sortForm').trigger('reset');
        $('#sort').focus();
    })
});
