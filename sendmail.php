<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = htmlspecialchars($_POST["nom"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    $to = "webnova83@gmail.com"; // <-- ton email pro
    $subject = "Nouveau message depuis WebNova";
    $body = "Nom: $nom\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $body, $headers)) {
        echo "<p>Merci $nom, votre message a bien été envoyé !</p>";
    } else {
        echo "<p>Erreur lors de l'envoi. Veuillez réessayer plus tard.</p>";
    }
}
?>

