<?php
	//
	// open connection to mysql db
	//
	// example: $connection = mysqli_connect("hostname","username","password","db_employee") or die("Error " . mysqli_error($connection));
	$connection = mysqli_connect("sqlc6.megasqlservers.com", "1sttransac159497", "A08EB60D008079162B98173EC5791629813EC5026E3C40FF701831418892596C", "register_1sttransaction_com") or die(mysqli_error($connection));

	$data = json_decode(file_get_contents('php://input'));
	$id = $data->ruleId;
	$rulename = $data->upRule;

	//echo $data->ruleId;
	//exit;

	$statement = mysqli_prepare($connection, "UPDATE `HandleRules` SET `RuleName`='$rulename' WHERE (`ID`='$id')");
	mysqli_stmt_bind_param($statement, "is", $id, $rulename);  

	mysqli_stmt_execute($statement);
	
	//$result = $RuleName . " | " . mysqli_stmt_execute($statement) or die($RuleName . " | " . mysqli_error($connection));

	//echo $result;

	$sql = "select * from HandleRules";
	$result = mysqli_query($connection, $sql) or die(mysqli_error($connection));

	//
	// create an array
	//
	$emparray = array();
	while($row =mysqli_fetch_assoc($result))
	{
		$emparray[] = $row;
	}
	echo json_encode($emparray);

  //
  //close the db connection
  //
  mysqli_close($connection);

?>