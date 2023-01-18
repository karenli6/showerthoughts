# altneratively we can group sentences together --> 
# --> recursively do this until each cluster of sentences is less than a threshold
# --> concatenate all sentences in each cluster
# --> and then apply LDA afterwards to get one topic
# purpose: can potentially be more accurate


import csv
import numpy as np
# import pandas as pd
# from pandas import read_csv

# to prevent against openmp issue
import os
os.environ['KMP_DUPLICATE_LIB_OK']='True'

from sentence_transformers import SentenceTransformer
from sklearn.cluster import KMeans

# get string data
from parse_thoughts import get_shower_data
import nltk
nltk.download('punkt')

sentenceembedder = SentenceTransformer('all-MiniLM-L6-v2')
sentences = get_shower_data()

embeddings = sentenceembedder.encode(sentences)

#Print the embeddings

for sentence, embedding in zip(sentences, embeddings):
    print("Sentence:", sentence)
    print("Embedding:", embedding)
    print("")

