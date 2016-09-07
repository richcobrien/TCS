<?php
	//
	// open connection to mysql db
	// example: $connection = mysqli_connect("hostname","username","password","db_employee") or die("Error " . mysqli_error($connection));
	//

	$connection = mysqli_connect("sqlc6.megasqlservers.com", "1sttransac159497", "A08EB60D008079162B98173EC5791629813EC5026E3C40FF701831418892596C", "register_1sttransaction_com") or die(mysqli_error($connection));
	//$connection = mysqli_connect("sqlc6.megasqlservers.com", "1sttransac236614", "A08EB60D008079162B98173EC5791629813EC5026E3C40FF701831418892596C", "phpmy1_1sttransaction_com") or die(mysqli_error($connection));
	$sql = "select * from people";
	$result = mysqli_query($connection, $sql) or die(mysqli_error($connection));

	//
	// prepare results in an array
	//

	$emparray = array();
	while($row =mysqli_fetch_assoc($result))
	{
		$emparray[] = $row;
	}

	//
	// return array json encoded
	//

	echo json_encode($emparray);

  //
  // close the db connection with mysqli
  //

  mysqli_close($connection);

	// end
?>