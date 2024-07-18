import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
import ssl
import argparse
import os
from datetime import datetime

# Set up argument parser
parser = argparse.ArgumentParser(description="Send an email with attachment")
parser.add_argument('--to', type=str, required=True, help="Comma-separated list of recipient email addresses")
parser.add_argument('--subject', type=str, required=True, help="Subject of the email")
parser.add_argument('--html_content', type=str, required=True, help="Path to the HTML file containing the body of the email")

args = parser.parse_args()

# Example variables
subject = args.subject
sender_email = "your_email@example.com"
recipient_email = args.to
html_file_path = args.html_content
current_date = datetime.now().strftime("%Y-%m-%d")
path_to_file = f"/tmp/cractivity_{current_date}.xlsx"
smtp_server = "smtp.example.com"
smtp_port = 587
sender_password = "your_password"

# Read the HTML content from the file
with open(html_file_path, 'r') as file:
    html_content = file.read()

# Create the email
message = MIMEMultipart()
message['Subject'] = subject
message['From'] = sender_email
message['To'] = recipient_email
body_part = MIMEText(html_content, "html")
message.attach(body_part)

# Attach the file if it exists
if os.path.exists(path_to_file):
    with open(path_to_file, 'rb') as file:
        part = MIMEApplication(file.read(), Name=f"cractivity_{current_date}.xlsx")
        part['Content-Disposition'] = f'attachment; filename="cractivity_{current_date}.xlsx"'
        message.attach(part)
else:
    print(f"The file {path_to_file} does not exist")

# Convert the recipient email string to a list
recipient_list = recipient_email.split(',')

# Send the email
context = ssl.create_default_context()
with smtplib.SMTP(smtp_server, smtp_port) as server:
    server.ehlo()
    server.starttls(context=context)
    server.ehlo()
    server.login(sender_email, sender_password)
    server.sendmail(sender_email, recipient_list, message.as_string())
    print("Email sent to:", recipient_list)
