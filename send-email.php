<?php
// Enable error reporting for debugging (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Set response header
header('Content-Type: application/json');

// Configuration
define('ADMIN_EMAIL', 'sathish90.india@gmail.com'); // Change this to your email
define('COMPANY_NAME', 'Sri Kaliamman Textiles');
define('COMPANY_ADDRESS', 'Rayanur, Karur – 639003, Tamil Nadu, India');
define('COMPANY_PHONE', '+91 98765 43210');
// Response array
$response = [
    'success' => false,
    'message' => '',
    'errors' => []
];

try {
    // Check if request is POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method');
    }

    // Sanitize and validate inputs
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $product = isset($_POST['product']) ? trim($_POST['product']) : '';
    $quantity = isset($_POST['quantity']) ? trim($_POST['quantity']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    // Validation
    $errors = [];

    // Validate Name
    if (empty($name)) {
        $errors['name'] = 'Full name is required';
    } elseif (strlen($name) < 2) {
        $errors['name'] = 'Name must be at least 2 characters';
    } elseif (strlen($name) > 100) {
        $errors['name'] = 'Name is too long';
    } elseif (!preg_match("/^[a-zA-Z\s.'-]+$/", $name)) {
        $errors['name'] = 'Name contains invalid characters';
    }

    // Validate Phone
    if (empty($phone)) {
        $errors['phone'] = 'Phone number is required';
    } elseif (!preg_match("/^[+]?[0-9\s\-()]{10,20}$/", $phone)) {
        $errors['phone'] = 'Please enter a valid phone number';
    }

    // Validate Email
    if (empty($email)) {
        $errors['email'] = 'Email address is required';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Please enter a valid email address';
    } elseif (strlen($email) > 255) {
        $errors['email'] = 'Email address is too long';
    }

    // Validate Product
    $valid_products = ['towels', 'bedsheets', 'terry', 'mats', 'pillows', 'custom'];
    if (empty($product)) {
        $errors['product'] = 'Please select a product';
    } elseif (!in_array($product, $valid_products)) {
        $errors['product'] = 'Invalid product selection';
    }

    // Validate Quantity (optional)
    if (!empty($quantity) && strlen($quantity) > 100) {
        $errors['quantity'] = 'Quantity description is too long';
    }

    // Validate Message (optional)
    if (!empty($message) && strlen($message) > 1000) {
        $errors['message'] = 'Message is too long (max 1000 characters)';
    }

    // If there are validation errors, return them
    if (!empty($errors)) {
        $response['errors'] = $errors;
        $response['message'] = 'Please correct the errors in the form';
        echo json_encode($response);
        exit;
    }

    // Sanitize data for email
    $name_clean = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $phone_clean = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
    $email_clean = filter_var($email, FILTER_SANITIZE_EMAIL);
    $product_clean = htmlspecialchars($product, ENT_QUOTES, 'UTF-8');
    $quantity_clean = htmlspecialchars($quantity, ENT_QUOTES, 'UTF-8');
    $message_clean = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

    // Product names mapping
    $product_names = [
        'towels' => 'Towels',
        'bedsheets' => 'Bedsheets',
        'terry' => 'Terry Products',
        'mats' => 'Mats & Napkins',
        'pillows' => 'Pillow Covers',
        'custom' => 'Custom Orders'
    ];
    $product_name = $product_names[$product_clean] ?? $product_clean;

    // Create email subject
    $subject = "New Enquiry from $name_clean - $product_name";

    // Create HTML email body for admin
    $email_body = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #8B4513; margin-bottom: 5px; }
            .value { background: white; padding: 10px; border-left: 3px solid #8B4513; }
            .footer { background: #333; color: white; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>🔔 New Enquiry Received</h2>
                <p>" . COMPANY_NAME . "</p>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>👤 Full Name:</div>
                    <div class='value'>$name_clean</div>
                </div>
                <div class='field'>
                    <div class='label'>📞 Phone Number:</div>
                    <div class='value'><a href='tel:$phone_clean'>$phone_clean</a></div>
                </div>
                <div class='field'>
                    <div class='label'>📧 Email Address:</div>
                    <div class='value'><a href='mailto:$email_clean'>$email_clean</a></div>
                </div>
                <div class='field'>
                    <div class='label'>🛍️ Product Interested In:</div>
                    <div class='value'>$product_name</div>
                </div>";
    
    if (!empty($quantity_clean)) {
        $email_body .= "
                <div class='field'>
                    <div class='label'>📦 Estimated Quantity:</div>
                    <div class='value'>$quantity_clean</div>
                </div>";
    }
    
    if (!empty($message_clean)) {
        $email_body .= "
                <div class='field'>
                    <div class='label'>💬 Message:</div>
                    <div class='value'>" . nl2br($message_clean) . "</div>
                </div>";
    }
    
    $email_body .= "
                <div class='field'>
                    <div class='label'>🕐 Received At:</div>
                    <div class='value'>" . date('F j, Y, g:i a') . "</div>
                </div>
            </div>
            <div class='footer'>
                <p>" . COMPANY_NAME . "</p>
                <p>" . COMPANY_ADDRESS . "</p>
                <p>Phone: " . COMPANY_PHONE . "</p>
            </div>
        </div>
    </body>
    </html>";

    // Email headers for admin
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: " . COMPANY_NAME . " <noreply@srikaliammantextiles.com>\r\n";
    $headers .= "Reply-To: $email_clean\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send email to admin
    $mail_sent = mail(ADMIN_EMAIL, $subject, $email_body, $headers);

    if (!$mail_sent) {
        throw new Exception('Failed to send email. Please try again later.');
    }

    // Send auto-reply to customer
    $customer_subject = "Thank you for your enquiry - " . COMPANY_NAME;
    $customer_body = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
            .highlight { background: white; padding: 15px; border-left: 4px solid #8B4513; margin: 20px 0; }
            .footer { background: #333; color: white; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #8B4513; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>✅ Thank You!</h1>
                <p>We've received your enquiry</p>
            </div>
            <div class='content'>
                <p>Dear <strong>$name_clean</strong>,</p>
                <p>Thank you for your interest in our <strong>$product_name</strong>. We have received your enquiry and our team will get back to you within 24 hours.</p>
                
                <div class='highlight'>
                    <h3>📋 Your Enquiry Details:</h3>
                    <p><strong>Product:</strong> $product_name</p>";
    
    if (!empty($quantity_clean)) {
        $customer_body .= "<p><strong>Quantity:</strong> $quantity_clean</p>";
    }
    
    $customer_body .= "
                    <p><strong>Submitted:</strong> " . date('F j, Y, g:i a') . "</p>
                </div>
                
                <p>In the meantime, feel free to:</p>
                <ul>
                    <li>📞 Call us at <a href='tel:" . COMPANY_PHONE . "'>" . COMPANY_PHONE . "</a></li>
                    <li>💬 WhatsApp us for instant response</li>
                    <li>🌐 Visit our website for more products</li>
                </ul>
                
                <center>
                    <a href='https://wa.me/919876543210?text=Hi,%20I%20submitted%20an%20enquiry%20for%20$product_name' class='button'>Continue on WhatsApp</a>
                </center>
                
                <p style='margin-top: 30px;'>Best regards,<br><strong>" . COMPANY_NAME . " Team</strong></p>
            </div>
            <div class='footer'>
                <p><strong>" . COMPANY_NAME . "</strong></p>
                <p>" . COMPANY_ADDRESS . "</p>
                <p>Phone: " . COMPANY_PHONE . " | Email: " . ADMIN_EMAIL . "</p>
                <p style='margin-top: 10px; font-size: 11px;'>This is an automated message. Please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>";

    $customer_headers = "MIME-Version: 1.0\r\n";
    $customer_headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $customer_headers .= "From: " . COMPANY_NAME . " <noreply@srikaliammantextiles.com>\r\n";
    $customer_headers .= "Reply-To: " . ADMIN_EMAIL . "\r\n";
    $customer_headers .= "X-Mailer: PHP/" . phpversion();

    // Send auto-reply (don't fail if this doesn't work)
    @mail($email_clean, $customer_subject, $customer_body, $customer_headers);

    // Success response
    $response['success'] = true;
    $response['message'] = 'Thank you! Your enquiry has been submitted successfully. We will get back to you shortly.';

} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = $e->getMessage();
}

// Return JSON response
echo json_encode($response);
exit;
?>
