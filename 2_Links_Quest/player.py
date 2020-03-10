class Player:
	def __init__(self, name):
		self.name = name

	def prepareRoadMap(self, quests, START, END):
		if START>END:
			return [0, []]

		l = len(quests)

		# dp[i] represents maximum collectable amount starting from ith quest
		dp = [0]*l
		
		maxReward = 0
		roadMap = []

		# sort quest based on start date
		quests.sort(key = lambda x: x.start_date)

		for i in range(l-1, -1, -1):
			
			# quest dates not within bounds
			if quests[i].start_date<START or quests[i].start_date + quests[i].duration>END:
				continue

			for j in range(i, l):
				if i==j:
					dp[i] = quests[i].reward
				elif quests[j].start_date>=quests[i].start_date + quests[i].duration:
					dp[i] = max(dp[i], dp[j] + quests[i].reward)
			
			maxReward = max(maxReward, dp[i])

		cur = maxReward
		# find quests which sum to maxReward
		for i in range(l):
			if cur==0:
				break
			if dp[i]==cur:
				roadMap.append(quests[i])
				cur -= quests[i].reward
			
		return [maxReward, roadMap]