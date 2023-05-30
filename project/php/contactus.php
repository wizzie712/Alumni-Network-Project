<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $body = $_POST["body"];

    // Set up email parameters
    $to = "anushka.salvi@spit.ac.in"; // Replace with your email address
    $subject = "New Form Submission";
    $headers = "From: $name <$email>\r\n";
    $headers .= "Content-type: text/html\r\n";
  
    // Compose the email body
    $body = "<h2>New Form Submission</h2>";
    $body .= "<p><strong>Name:</strong> $name</p>";
    $body .= "<p><strong>Email:</strong> $email</p>";
    $body .= "<p><strong>Message:</strong> $subject</p>";
    $body .= "<p><strong>Message:</strong> $body</p>";


    // Send the email
    $success = mail($to, $subject, $body, $headers);
  
    // Check if the email was sent successfully
    if ($success) {
      echo "Email sent successfully.";
    } else {
      echo "An error occurred while sending the email.";
    }
  }
  

?>