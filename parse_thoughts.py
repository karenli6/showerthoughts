
import csv
import numpy as np

# note: may need to remove inappropriate topics
def shower_data():
  print("hello")
  thishist = []
  with open('shower_thoughts.csv', 'r') as csvfile:
    datareader = csv.reader(csvfile)
    for row in datareader:
        # prints normalized term
        thishist.append(row[9])
  finalhist = thishist[2:]
  print(finalhist[2])
  print("final length:", len(finalhist))

shower_data()