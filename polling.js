
console.log("welcome to polling")

get_data_btn = document.getElementById('getdata')
content_div = document.getElementById('content')

// use ajax --> to contact server --> to get data from it
get_data_btn.addEventListener('click', function() {

    $.ajax({
        method: "GET",
        url: 'http://localhost/polling_osad44/server.php',
        success: function (res) {
            console.log(res)
            data = JSON.parse(res);
            console.log(data)
            content_div.innerHTML +=`<h4>${data.message}</h4>`;
        },
        error: function () {
            console.log('error')
        }


    })

})