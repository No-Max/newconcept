<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['firstname'])) {$firstname = $_POST['firstname'];}
    if (isset($_POST['lastname'])) {$lastname = $_POST['lastname'];}
    if (isset($_POST['email'])) {$email = $_POST['email'];}
    if (isset($_POST['phone'])) {$phone = $_POST['phone'];}
    if (isset($_POST['mess'])) {$mess = $_POST['mess'];}
    $formData="Новое сообщение на вашем сайте!";

    $to = "malyavko.max@gmail.com"; /*адрес, на который приходит письмо*/
    
    $sendfrom   = $firstname; /*адрес, с которого будет приходить письмо*/
    $headers  = "From: " . strip_tags($sendfrom) . "\r\n";
    $headers .= "Reply-To: ". strip_tags($sendfrom) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html;charset=utf-8 \r\n";
    $subject = "$formData";
    $message = "<b>$formData</b> <br><br>
      <b>Имя:</b> $firstname <br><br>
      <b>Фамилия:</b> $lastname <br><br>
      <b>Email:</b> $email <br><br>
      <b>Телефон:</b> $phone <br><br>
      <b>Сообщение:</b> $mess <br><br>";
    $send = mail ($to, $subject, $message, $headers);
    if ($send == 'true'){
      echo 'Сообщение отправлено, в ближайшее время наш специалист с вами свяжется!';
    } else {
      echo 'Сообщение не отправлено! Попробуйте еще раз.';
    }
} else {
    http_response_code(403);
    echo "Попробуйте еще раз";
}
?>