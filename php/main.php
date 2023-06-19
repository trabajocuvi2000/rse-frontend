<?php

echo 'EL mensaje se einvio exitosamente';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'lib_2/Exception.php';
require 'lib_2/PHPMailer.php';
require 'lib_2/SMTP.php';


//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);


// data:application/pdf;base64

// data:application/pdf;filename=generated.pdf;base64,
    $pdfdoc  = $_POST['fileDataURI'];
    $b64file        = trim(str_replace('data:application/pdf;filename=generated.pdf;base64,', '', $pdfdoc));
    $b64file        = str_replace(' ', '+', $b64file);
    $decoded_pdf    = base64_decode($b64file);

    try {
        //Server settings
        $mail->SMTPDebug = 0;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'juanperezxrl82000@gmail.com';                     //SMTP username
        $mail->Password   = 'jo090825212';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    
        //Recipients
        $mail->setFrom('juanperezxrl82000@gmail.com', 'RSE');
        $mail->addAddress('nikycuvi@gmail.com', 'John Doe');    //Add a recipient
        // $mail->addAddress('ellen@example.com');               //Name is optional
        $mail->addReplyTo('info@example.com', 'Information');
        $mail->addCC('cc@example.com');
        $mail->addBCC('bcc@example.com');
    
        //Attachments
        // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
        // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name
        $mail->addStringAttachment($decoded_pdf, "generated.pdf");
    
        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Here is the subject';
        $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
        // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    
        $mail->send();
        echo 'EL mensaje se einvio exitosamente';
    } catch (Exception $e) {
        echo "Error al enviar el: {$mail->ErrorInfo}";
    }

    // $mail = new PHPMailer;
    // $mail->setFrom('juanperezxrl82000@gmail.com', 'First Last');
    // $mail->addAddress('juanperezxrl82000@gmail.com', 'John Doe');
    // $mail->Subject  = 'Subject';
    // $mail->Body     = 'body text';
    // $mail->addStringAttachment($decoded_pdf, "nalog.pdf");
    // $mail->isHTML(false);
    // $mail->send();
?>