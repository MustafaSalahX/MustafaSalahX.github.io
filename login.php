<?php
// database connection code
// $con = mysqli_connect('localhost', 'database_user', 'database_password','database');

$con = mysqli_connect('localhost', 'root', '','signindb');

// get the post records
$username = $_POST['usernamelogin'];
//$email = $_POST['email'];
$password = $_POST['passwordlogin'];

// database insert SQL code
$sql = "INSERT INTO 'signin' ('username', 'pass') VALUES ('$username','$password')";

// insert in database 
$rs = mysqli_query($con, $sql);

if($rs)
{
	echo "Contact Records Inserted";
}

?>