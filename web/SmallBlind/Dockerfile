# Use PHP Apache base image
FROM php:7.4-apache

# Install necessary packages for PHP, SQLite, Python, and Selenium
RUN apt-get update && \
    apt-get install -y libsqlite3-dev python3 python3-pip curl gnupg ca-certificates unzip && \
    pip3 install selenium

# Adding trusting keys to apt for repositories
RUN curl -fsSL https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -

# Adding Google Chrome to the repositories
RUN echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list

RUN apt-get -y update

# Install Google Chrome
RUN apt-get install -y google-chrome-stable

# Download the ChromeDriver
RUN wget -O /tmp/chromedriver.zip https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/120.0.6099.71/linux64/chromedriver-linux64.zip && \
    unzip /tmp/chromedriver.zip -d /usr/local/bin/ && \
    rm /tmp/chromedriver.zip

# Install SQLite extension for PHP
RUN docker-php-ext-install pdo pdo_sqlite

# Copy your PHP files to the container
COPY ./src/ /var/www/html/

# Create a directory for admin_bot.py and restrict web access
RUN mkdir /app && mv /var/www/html/admin_bot.py /app/admin_bot.py && chmod 700 /app

# Run setup_db98568x1.php to set up the database
RUN php /var/www/html/setup_db98568x1.php

RUN chmod 777 /var/www/html/my_database.sqlite

# Expose port 80
EXPOSE 80

CMD service apache2 start && python3 /app/admin_bot.py