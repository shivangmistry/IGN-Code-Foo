**Programming language:** Python 3

**Dependencies:** pandas, xlrd

**Install dependencies:** pip install pandas xlrd

**Run:** python main.py


**Program Explanation:** The quest related information is stored in .xlsx file. The file is read and the quests are sorted based on the start date. The solution to maximum reward is achieved with help of dynamic programming. The program maintains an array(dp) of size n(n = total number of quests) where dp[i] stores the maximum collectable reward starting from ith quest. The maximum value in dp gives the maximum reward Link can get. This is based on the assumption that Link can complete any quest irrespective of the difficulty. Further, the same array is used to identify which quests Link must venture to gain the maximum reward. The program output prints the maximum reward amount followed by a list of quest names that add to the total reward. This appraoch can run on any map given the start date, end date and quest data. 


**Time Complexity: O(n^2)**

**Space Complexity: O(n)**
