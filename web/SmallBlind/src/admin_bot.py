from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import os

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--enable-javascript")  # Enable JavaScript execution
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")

# Use the updated options in webdriver.Chrome()
driver = webdriver.Chrome(options=chrome_options)
driver.set_page_load_timeout(3)

# Navigate to the login page
try:
    driver.get('http://127.0.0.1/login.php')
except:
    print("Timeout: Login Page took too long to load")

# Wait for the username and password fields to be present and visible
username_field = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, 'username')))
password_field = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, 'password')))
submit_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//input[@type="submit"]')))

# Enter admin credentials and submit the login form
username = "admin"  # Replace with actual admin username
password = "adm11ns3cy0urP4Ssw00rd"  # Replace with actual admin password

username_field.send_keys(username)
password_field.send_keys(password)

submit_button.click()

# Wait for the login process to complete (you might need to adjust the wait time)
time.sleep(2)

# Once logged in as admin, set the secret flag cookie
secret_flag_cookie = {
    'name': 'flag',
    'value': 'Flag{W3ll_Done_H4cker_C0nt4ct_M3_1f_y0ur_comp4ny_is_hiring}',
    'path': '/'
}

driver.add_cookie(secret_flag_cookie)

# Continuously access the page (dashboard.php)
while True:
    # Navigate to the vulnerable page (dashboard.php)
    try:
        driver.get('http://127.0.0.1/dashboard.php')
        print("Request sent to the dashboard page")
    except:
        print("Timeout: dashboard Page took too long to load")
    time.sleep(5)  # Wait for 5 seconds before sending the next request
