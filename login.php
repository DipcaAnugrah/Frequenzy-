<?php
require 'koneksi.php';
$username = $_POST["username"];
$email = $_POST["username"];
$password = $_POST["pass"];

$query_sql = "SELECT * FROM register WHERE (username = '$username' OR email = '$email') AND password = '$password'";

$result = mysqli_query($conn, $query_sql);

if (mysqli_num_rows($result) > 0) {
    header("Location: index.html");
} else {
    echo "<center><h1>Email atau Password anda salah. silahkan coba login kembali.</h1>
    <button><strong><a href = 'sign_in.html'>Login</a></strong></button></center>";
}