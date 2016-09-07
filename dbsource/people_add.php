<?php
	//
	// open connection to mysql db
	// example: $connection = mysqli_connect("hostname","username","password","db_employee") or die("Error " . mysqli_error($connection));
	//

	$connection = mysqli_connect("sqlc6.megasqlservers.com", "1sttransac159497", "A08EB60D008079162B98173EC5791629813EC5026E3C40FF701831418892596C", "register_1sttransaction_com") or die(mysqli_error($connection));

	//
	// use json decoding
	//

	$data = json_decode(file_get_contents('php://input'));

  // loop through the array
  foreach ($data as $row) {

    $user_name      = $row->user_name;
    $user_id        = $row->user_id;
    $avatar_url     = $row->avatar_url;
    if (!$avatar_url) {
      $avatar_url = 'https://secure6.securewebexchange.com/1sttransaction.com/staging/angular/AppleID/dist/default_avatar.jpg';
    }
    $gravatar_id    = $row->gravatar_id;
    $first_name     = mysql_escape_string($row->first_name);
    $last_name      = mysql_escape_string($row->last_name);
    $online_status  = $row->online_status;
    $online_last    = $row->online_last;
    $email_address  = $row->email_address;
    $html_url       = $row->html_url;
    $birth_date     = $row->birth_date;
    $bio_details    = $row->bio_details;
    $user_type      = $row->user_type;
    $site_admin     = $row->site_admin;
    
    $online_status  = 'Available';
    $online_last    = '08/08/2016';    
    $bio_details    = '** bio details are not available **';
    $user_type      = 'User';
    $site_admin     = '0';
		
    
    //echo $email_address;
    $sql = "select * from `people` where `email_address` = '".$email_address."'";
    //echo $sql;
    $result = mysqli_query($connection, $sql) or die(mysqli_error($connection));
    //echo $result;

		//echo "insert into `people` (user_id, user_name, avatar_url, gravatar_id, first_name, last_name, online_status, online_last, email_address, html_url, birth_date, bio_details, user_type, site_admin) VALUES ('".$user_id."', '".$user_name."', '".$avatar_url."', '".$gravatar_id."', '".$first_name."', '".$last_name."', '".$online_status."', '".$online_last."', '".$email_address."', '".$html_url."', '".$birth_date."', '".$bio_details."', '".$user_type."', '".$site_admin."')";
		//exit;
		
		
    if (!mysqli_num_rows($result)) {
      //echo 'HELLO';
      // if no match then insert new person

			//
			// use mysqli_prepare mysql statements
			//
			
			$statement = mysqli_prepare($connection, "insert into `people` (user_name, avatar_url, gravatar_id, first_name, last_name, online_status, online_last, email_address, html_url, birth_date, bio_details, user_type, site_admin) VALUES ('".$user_name."', '".$avatar_url."', '".$gravatar_id."', '".$first_name."', '".$last_name."', '".$online_status."', '".$online_last."', '".$email_address."', '".$html_url."', '".$birth_date."', '".$bio_details."', '".$user_type."', '".$site_admin."')");
			
      //
      // bind the "s" string type to the $statement
      //

      mysqli_stmt_bind_param($statement, "sssssssssssss", $user_name, $avatar_url, $gravatar_id, $first_name, $last_name, $online_status, $online_last, $email_address, $html_url, $birth_date, $bio_details, $user_type, $site_admin);

      //
      // execute the statement with mysqli
      //

      mysqli_stmt_execute($statement);

      $sql = "select * from `people`";
      
      $result = mysqli_query($connection, $sql) or die(mysqli_error($connection));

      //
      // prepare results in an array
      //

      $emparray = array();
      while($row = mysqli_fetch_assoc($result))
      {
        $emparray[] = $row;
      }

      //
      // return array json encoded
      //

      echo json_encode($emparray);
      
    } else {
      
      echo $result;
      
    }

  }

  //
  // close the db connection with mysqli
  //

  mysqli_close($connection);

	// end
?>