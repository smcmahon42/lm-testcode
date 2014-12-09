<?php
	//https://localmotors.com/api/v1/content/?order_by=-updated&limit=10&offset=10
	$params = "";
	if($_GET['params']){
		$params .= "/?" . $_GET['params'];
	}

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://localmotors.com/api/v1/" . $_GET['request'] . $params );
    $output = curl_exec($ch);
    curl_close($ch);
    json_decode($output);
?>