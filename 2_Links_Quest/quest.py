class Quest:
	def __init__(self, questData):
		self.quest = questData.quest
		self.start_date = int(questData.start_date)
		self.duration = int(questData.duration)
		self.reward = int(questData.reward)
		self.difficulty = questData.difficulty
		self.location = questData.location
		self.quest_giver = questData.quest_giver

	def __str__(self):
		# return "{} - {} - {} - {}".format(self.start_date, self.duration, self.reward, self.quest)
		return self.quest