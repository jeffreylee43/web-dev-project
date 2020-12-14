$(document).ready(() => {
    $('#newsSubmit').submit((e) => {
        e.preventDefault();
        if($('#newsTerm').val().trim()){
            $.ajax({
                
                url: `https://newsapi.org/v2/top-headlines?language=en&q=${$('#newsTerm').val()}&apiKey=aaaaad37e47549f694b2d4f9940c4e09`,
                method: 'GET',
                dataType: 'json'
            }).then((data) => {
                console.log(data)
            })
        }
    })
})