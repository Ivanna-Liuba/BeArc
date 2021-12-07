<?php
$name = $_POST['name'];
$phone = $_POST['phone'];
$token = "1941789387:AAGdzxaSemiv04cDUIjsK8LCOHZXNDBv0tY";
$chat_id = "-531958878";
$arr = array(
  'Имя пользователя: ' => $name,
  'Номер пользователя: ' => $phone,
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."";
};

$website="https://api.telegram.org/bot".$token;
  $params=[
      'chat_id'=>$chat_id, 
      'text'=> $txt,
  ];
  $ch = curl_init($website . '/sendMessage');
  curl_setopt($ch, CURLOPT_HEADER, false);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, ($params));
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  $result = curl_exec($ch);
  curl_close($ch);
  echo $result;

?>