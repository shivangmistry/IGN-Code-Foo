import sys
from pandas import read_excel
from player import Player
from quest import Quest

def readDataFromFile(file_name):
	try:
		sheet = read_excel(file_name, sheet_name="Sheet1")
		quests = []
		for index, row in sheet.iterrows():
			quests.append(Quest(row))
		return quests
	except:
		print("Error reading file.")
		sys.exit()

if __name__=="__main__":
	FILENAME = "quests_for_question.xlsx"
	START_DATE = 1
	END_DATE = 31

	quests = readDataFromFile(FILENAME)

	Link = Player("Link")
	maxReward, questsTODO =  Link.prepareRoadMap(quests, START_DATE, END_DATE)
	
	print("Maximum collectable amount: {}".format(maxReward))
	
	print("Quests to embark:")
	for i in questsTODO:
		print(i)
