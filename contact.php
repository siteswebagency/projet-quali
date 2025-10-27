<?php
// Fichier : save_contact.php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "efmadech_db";

// Connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Erreur de connexion : " . $conn->connect_error);
}

// Vérifier si le formulaire a été soumis via POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST['name'] ?? '';
    $company = $_POST['company'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';

    $stmt = $conn->prepare("INSERT INTO contacts (name, company, email, phone, subject, message) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $name, $company, $email, $phone, $subject, $message);

    if ($stmt->execute()) {
        echo "<script>alert('Message envoyé avec succès !'); window.location.href='contact.html';</script>";
    } else {
        echo "Erreur : " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Méthode non autorisée.";
}

$conn->close();
?>
