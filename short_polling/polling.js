
console.log("welcome to polling")

get_data_btn = document.getElementById('getdata')
content_div = document.getElementById('content')

// use ajax --> to contact server --> to get data from it
// lastModified = 0;
function dopolling(lastmodified) {

    $.ajax({
        method: "POST",
        url: 'http://localhost/polling_osad44/short_polling/server.php',
        data:{
            lastModified: lastmodified
        },
        success: function (res) {
            console.log(res)
            data = JSON.parse(res);
            console.log(data) // data contains server time => last modification of file
            content_div.innerHTML += `<h4>${data.body}</h4>`;
            dopolling(data.server_time); // send request
        },
        error: function () {
            console.log('error')
            dopolling(0);
        }


    })
}

dopolling(0);