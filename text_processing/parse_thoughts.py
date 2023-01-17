
import csv
import numpy as np

# TODO note: may need to remove inappropriate topics
def get_shower_data():
  # print("hello")
  thishist = []
  with open('shower_thoughts.csv', 'r') as csvfile:
    datareader = csv.reader(csvfile)
    for row in datareader:
        thishist.append(row[9])
  finalhist = thishist[2:]
  return finalhist