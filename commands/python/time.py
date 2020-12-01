from bs4 import BeautifulSoup
import requests
from random import randint

source = requests.get('https://br.leagueoflegends.com/pt-br/champions/').text
soup = BeautifulSoup(source, 'lxml')

champs = soup.find('section')

names = []
for champion in champs.find_all('span', class_='style__Text-sc-12h96bu-3 gPUACV'):
    #print(champion.text)
    names.append(champion.text)

print(f'TOP: {names[randint(0, (len(names)-1))]}')
print(f'JG: {names[randint(0, (len(names)-1))]}')
print(f'MID: {names[randint(0, (len(names)-1))]}')
print(f'ADC: {names[randint(0, (len(names)-1))]}')
print(f'SUP: {names[randint(0, (len(names)-1))]}')
