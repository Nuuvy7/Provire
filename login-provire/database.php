<?php
$hostname = "localhost";
$username = "root";
$password = "";
$database_name = "login_sc";

$db = mysql_connect($hostname, $username ,$password, $database_name);

if ($db -> Connect_error) {
    echo "koneksi terputus";
    die ("mati!");
}
echo "koneksi berhasil";

?>