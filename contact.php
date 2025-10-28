<?php
	$name = $_POST['name'];
	$company = $_POST['company'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$subject = $_POST['subject'];
	$other_subject = $_POST['other_subject'];
    $message = $_POST['message'];

	// Database connection
	$conn = new mysqli('localhost','root','','efmadech_db');
	if($conn->connect_error){
		echo "$conn->connect_error";
		die("Connection Failed : ". $conn->connect_error);
	} else {
		$stmt = $conn->prepare("insert into messages_contact(name, company, email, phone, subject, other_subject, message) values(?, ?, ?, ?, ?, ?, ?)");
		$stmt->bind_param("sssssss", $name, $company, $email, $phone, $subject, $other_subject, $message);
		$stmt->execute();
		echo "Registration successfully...";
		$stmt->close();
		$conn->close();
	}
?>