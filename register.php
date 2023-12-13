<?php
require 'koneksi.php';

// Mengambil data dari form
$username = $_POST["username"];
$email = $_POST["email"];
$password = $_POST["pass"];


function validateInput($input) {
    $username = trim($input);

    // Username harus diisi
    if (empty($username)) {
        return false;
    }

    // Username harus memiliki panjang minimal 4 karakter
    if (strlen($username) < 4) {
        return false;
    }

    // Username tidak boleh mengandung karakter spesial
    $regex = '/^[a-zA-Z0-9_-]+$/';
    if (!preg_match($regex, $username)) {
        return false;
    }

    // Validasi format email
    if (isset($_POST['email'])) {
        $email = trim($_POST['email']);
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return false;
        }
    }

    // Validasi kekuatan dan panjang kata sandi
    if (isset($_POST['pass'])) {
        $passValue = trim($_POST['pass']);
        if (empty($passValue) || strlen($passValue) < 8) {
            return false;
        }

        // Check for strong password criteria
        $regex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-])(.{8,})$/';
        if (!preg_match($regex, $passValue)) {
            return false;
        }
    }

    // Validasi konfirmasi kata sandi
    if (isset($_POST['repass'])) {
        $repassValue = trim($_POST['repass']);
        $passValue = trim($_POST['pass']);
        if (empty($repassValue) || $repassValue !== $passValue) {
            return false;
        }
    }

    // Validasi input lainnya
    if (!isset($_POST['email']) && !isset($_POST['pass']) && !isset($_POST['repass'])) {
        $inputValue = trim($input);
        if (empty($inputValue)) {
            return false;
        }
    }

    return true; // Input valid
}

// Contoh penggunaan
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputToValidate = $_POST['username']; // Ganti dengan nama input yang sesuai
    if (validateInput($inputToValidate)) {
        $query_sql = "INSERT INTO register (username, email, password) VALUES ('$username', '$email', '$password')";

        if (mysqli_query($conn, $query_sql)) {
            // Registrasi sukses, bisa redirect atau memberikan pesan sukses
            header("Location: sign_in.html");
            exit(); // Penting: Pastikan untuk keluar dari skrip setelah menggunakan header
        }
    } else {
        // Input tidak valid, berikan tanggapan atau umpan balik
        echo '<script>alert("Data tidak valid. Silakan periksa kembali.");</script>';
            return false;
    }
}

?>
