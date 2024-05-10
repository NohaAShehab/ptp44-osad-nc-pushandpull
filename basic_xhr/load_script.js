

console.log("script loaded")


get_data_btn = document.getElementById('getdata')
content_div = document.getElementById('content')

console.log(get_data_btn, content_div)
myxhr= new XMLHttpRequest();

console.log(myxhr);
// read file content without reloading the page 

// send request to the server -- using xmlhttprequest object 

//1- create object 


get_data_btn.addEventListener('click', function(){
    console.log("button clicked");

    // 1- open connection between me and the server 
    myxhr.open('GET', 'students.txt'); 

    // console.log(myxhr);
    // 2- send request to the server 
    myxhr.send();


    // 3- display response in the html 
    // console.log(myxhr.responseText);
    console.log(myxhr);

    console.log(myxhr.readyState)
    /// when to display data ?? 
    // make sure the request received ?? 
    // status --> request ===200  --> property in the object 

    // track changes 
    myxhr.onreadystatechange= function(){
        console.log("state changed, ", this.readyState)
        if(myxhr.status===200 && myxhr.readyState===4){
            console.log('data', myxhr.responseText)
            data = myxhr.responseText
            content_div.innerHTML += `<pre>${data} </pre>`;
        }else if(myxhr.status===404 && myxhr.readyState===4){
            content_div.innerHTML += `<h4 style='color:red'>Connection failed</h1>`;
        }
    }
   





});


