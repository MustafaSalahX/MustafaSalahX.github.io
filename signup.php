<?php
// database connection code
// $con = mysqli_connect('localhost', 'database_user', 'database_password','database');

$con = mysqli_connect('localhost', 'root', '','signindb');

// get the post records
$usernameup = $_POST['usernameup'];
$emailup = $_POST['emailup'];
$passwordup = $_POST['passwordup'];

// database insert SQL code
$sql = "INSERT INTO 'signup' ('Id', 'username', 'email', 'pass') VALUES ('0', '$usernameup', '$emailup', '$passwordup')";

// insert in database 
$rs = mysqli_query($con, $sql);

if($rs)
{
	echo "Contact Records Inserted";
}

?>