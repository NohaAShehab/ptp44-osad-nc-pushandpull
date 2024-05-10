<?php
//
//var_dump($_POST, $_REQUEST);
//exit;
$clientTime =$_POST['lastModified'];
# track changes on server
$servertime = filemtime('myfile.txt');

while ($clientTime >= $servertime) {
    sleep(1);
    clearstatcache();
    $servertime = filemtime('myfile.txt');

}
//var_dump($data);
$data = file_get_contents('myfile.txt');

$message = [
    'body'=>$data,
    'client_time'=>$clientTime,
    'server_time'=>$servertime
];


echo json_encode($message);