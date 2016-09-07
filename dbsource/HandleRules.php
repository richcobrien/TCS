<?php
    $con = mysqli_connect("sqlc6.megasqlservers.com", "1sttransac159497", "A08EB60D008079162B98173EC5791629813EC5026E3C40FF701831418892596C", "register_1sttransaction_com");

    //$ID = $_POST["ID"];
    //$RuleName = $_POST["RuleName"];
 
    //$ID = $_GET["ID"];
    //$RuleName = $_GET["RuleName"];

    //echo json_encode($ID);
    //echo json_encode($RuleName);
    //echo json_encode($_SERVER['REQUEST_METHOD']);


    $statement = mysqli_prepare($con, "SELECT * FROM HandleRules");
    mysqli_stmt_bind_param($statement, "ss", $ID, $RuleName);
    mysqli_stmt_execute($statement);

    mysqli_stmt_store_result($statement);
    //echo mysqli_stmt_num_rows($statement);
    mysqli_stmt_bind_result($statement, $ID, $RuleName);
    
    $result = array();
    //$response["success"] = false;

    while(mysqli_stmt_fetch($statement)){
        //$result["success"] = true;
        $result["ID"] = $ID;
        $result["RuleName"] = $RuleName;
        //$response = json_encode($result);
        // echo json_encode($result);
        $myresp = $myresp . $result;
    }

    //echo html_entity_decode(json_encode($result));
    //$response = json_encode($result);
    echo json_encode($myresp);

    /*
    $stmt = $mysqli->prepare('SELECT * FROM HandleRules');
    $stmt->bind_param('ss', $ID, $RuleName);
    $stmt->execute();

    $meta = $stmt->result_metadata();

    while ($field = $meta->fetch_field()) {
      $parameters[] = &$row[$field->name];
    }

    call_user_func_array(array($stmt, 'bind_result'), $parameters);

    while ($stmt->fetch()) {
      foreach($row as $key => $val) {
        $x[$key] = $val;
      }
      $results[] = $x;
    }
    echo json_encode($results);
    */
  
?>