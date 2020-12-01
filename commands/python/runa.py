from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import requests
import sys


CHROMEDRIVER_PATH = "C:\\Users\\Vinicius\\Documents\\Selenium2\\chromedriver.exe"
WINDOW_SIZE = "1920,1080"

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--window-size=%s" % WINDOW_SIZE)

driver = webdriver.Chrome(executable_path=CHROMEDRIVER_PATH,
                          options=chrome_options)


#BS4   
source = requests.get(f"https://app.mobalytics.gg/lol/champions/{sys.argv[1]}/build").text

soup = BeautifulSoup(source, 'lxml')

numRuna = 0
runas = soup.find('div', class_= 'build-selectorstyles__SelectedHeaderStyledWrapper-sc-1gy3p2e-1 kqJvOE')
for runa in soup.find_all('div', class_= 'build-selectorstyles__SelectedHeaderStyledWrapper-sc-1gy3p2e-1 kqJvOE'):
    numRuna += 1

if numRuna > 1:
    numRuna -= 2

#SELENIUM
driver.get(f"https://app.mobalytics.gg/lol/champions/{sys.argv[1]}/build")

driver.find_element_by_xpath('//*[@id="root"]/div[1]/div[3]/div[2]/div/div/div/button').click()
                              
driver.execute_script("window.scrollTo(0, 200)")
driver.get_screenshot_as_file("runa0.png")


if numRuna >= 1:
    cont = 1
    for gay in range(numRuna):
        driver.find_element_by_xpath('//*[@id="root"]/div[1]/div[1]/div[4]/div[2]/div[1]/div[3]/div[1]/div/div[2]').click()
        driver.find_element_by_xpath(f'//*[@id="root"]/div[1]/div[1]/div[4]/div[2]/div[1]/div[3]/div[1]/div/div[2]/div/div[2]/div/div[1]/div[{cont}]').click()
        driver.execute_script("window.scrollTo(0, 200)")
        driver.get_screenshot_as_file(f"runa{cont}.png")
        cont += 1


print(numRuna + 1)

driver.close()
driver.quit()