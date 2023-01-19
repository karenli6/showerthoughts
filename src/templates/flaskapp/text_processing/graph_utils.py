# pipeline: clean each text and reduce to main words --> Perform kmeans clustering on list of phrases
# --> re cluster if the node is too large
import csv
from csv import writer
import numpy as np

# to prevent against openmp issue
import os
os.environ['KMP_DUPLICATE_LIB_OK']='True'

from sentence_transformers import SentenceTransformer
from sklearn.cluster import KMeans

# get string data
from .parse_thoughts import get_shower_data


# imports for NLP
from .config import NLTK_DATA_DIR
import nltk
nltk.download('punkt', download_dir=NLTK_DATA_DIR)
nltk.download('stopwords', download_dir=NLTK_DATA_DIR)
nltk.download('wordnet', download_dir=NLTK_DATA_DIR)
nltk.download('omw-1.4', download_dir=NLTK_DATA_DIR)
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from dateutil import parser
import string
import re
import itertools
from collections import Counter


from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation as LDA

embedder = SentenceTransformer('all-MiniLM-L6-v2')
SIZES = {}

#################################################
## TEXT CLEANING HELPER FUNCTIONS

# NLP functions for cleaning text
def remove_punctuation(input):
  return input.translate(str.maketrans('','', string.punctuation))

def remove_whitespaces(input):
  return " ".join(input.split())

def tokenize(input):
  return word_tokenize(input)

def remove_stop_words(input):
  input = word_tokenize(input)
  return [word for word in input if word not in stopwords.words('english')]

def lemmatize(input):
  lemmatizer=WordNetLemmatizer()
  input_str=word_tokenize(input)
  new_words = []
  for word in input_str:
    new_words.append(lemmatizer.lemmatize(word))
  return ' '.join(new_words)

# overall pipeline for cleaning text
def nlp_pipeline(text): 
  return lemmatize(' '.join(remove_stop_words(remove_whitespaces(remove_punctuation(text)))))

# given list of words, finds overarching topic
def find_topics(word_cluster):
    text = ' '.join(word_cluster)
    count_vectorizer = CountVectorizer(stop_words='english')
    count_data = count_vectorizer.fit_transform([text])

    number_of_tags = 1 # number of topics wanted
    lda = LDA(n_components=1, n_jobs=-1)
    lda.fit(count_data)

    words = count_vectorizer.get_feature_names_out()
    # Get topics from model
    topics = [[words[i] for i in topic.argsort()[:-number_of_tags - 1:-1]] for (topic_idx, topic) in enumerate(lda.components_)]

    topics = np.array(topics).ravel()
    return topics

def clean_text(text):
    # remove numbers
    text_nonum = re.sub(" \d+", " ", text)
    # remove punctuations and convert characters to lower case
    text_nopunct = "".join([char.lower() for char in text_nonum if char not in string.punctuation]) 
    # substitute multiple whitespace with single whitespace
    # Also, removes leading and trailing whitespaces
    text_no_doublespace = re.sub('\s+', ' ', text_nopunct).strip()
    return text_no_doublespace

#############
# Perform kmeans clustering on list of phrases
# need to specify number of clusters wanted (k)

# phrase_list dictionary: key = phrase list item, value = original shower thought string
def generate_clusters(num_clusters, 
  phrase_list, 
  phrase_list_dictionary, 
  this_SIZES, 
  this_THOUGHTS_LIST
):
  print("-- IN PROCESS: generating clusters")
  # returns a list of embeddings for each element in phrase_list
  sentence_emb = embedder.encode(phrase_list)

  # returned object that describes cluster: 
  # maps (key = topic) to (value = list of cleaned sentences in this cluster) 
  clusters = {}

  # actual clustering model
  clustering_model = KMeans(n_clusters=num_clusters)
  clustering_model.fit(sentence_emb)
  cluster_assignment = clustering_model.labels_

  # parse through model results
  clustered_sentences = [[] for i in range(num_clusters)]
  original_thoughts = [[] for i in range(num_clusters)]
  for sentence_id, cluster_id in enumerate(cluster_assignment):
    phrase_list_item = phrase_list[sentence_id]
    clustered_sentences[cluster_id].append(phrase_list_item)
    # store original string too
    original_thoughts[cluster_id].append(phrase_list_dictionary[phrase_list_item])

  # thoughts_list: maps (key = topic) to (value = list) of raw shower thoughts associated with this topic
  # i is the corresponding index, used for both original_thoughts and clustered_sentences
  for i, cluster in enumerate(clustered_sentences):
    # cluster = list of words
    # find_topics: given list of words, finds overarching topic
    raw_shower_thoughts_list = original_thoughts[i]
    topic = find_topics(cluster)[0]
    cluster = [i for i in cluster if i]
    clusters[topic] = cluster
    this_SIZES[topic] = len(cluster)
    # store original strings in dictionary according to topic
    this_THOUGHTS_LIST[topic] = raw_shower_thoughts_list

  return clusters, this_SIZES, this_THOUGHTS_LIST


#######################################################
## DATA ANALYSIS + CLUSTER GENERATION

## maps each element in history with the original shower thought string
def get_mapped_data(history_list):
  # list of cleaned text inputs
  cleaned_list = []
  # maps cleaned text input to original string
  mapper = {}

  for cleaned_text, original_string in history_list: 
    new_item = clean_text(cleaned_text)
    cleaned_list.append(new_item)
    mapper[new_item] = original_string
  
  return cleaned_list, mapper

###### ultimate function to create clustered graph: 
def create_graph():
  print("-- IN PROCESS: starting to create graph")
  history = get_shower_data()

  # FINAL OBJECTS TO RETURN
  GRAPH = {}
  SIZES = {}
  THOUGHTS_LIST = {}


  # individual element structure: [cleaned text, original string]
  history = [[nlp_pipeline(h), h] for h in history]
  # individual element structure: (cleaned text, original string)
  history, mapped_history = get_mapped_data(history)
  
  # initial clusters
  roots, SIZES, THOUGHTS_LIST = generate_clusters(10, history, mapped_history, SIZES,THOUGHTS_LIST)
  root_children = {}

  # do BFS to generate child clusters and create tree graph of parent-child edges
  queue = []

  # initialize
  clusters = roots
  THRESHOLD = 10
  NUM_CHILDREN = 3

  # add original parent topics
  for topic in roots.keys():
      GRAPH[topic] = set()
      if SIZES[topic] >= THRESHOLD:
        # add initial queue object
        queue.append([topic, topic, THOUGHTS_LIST[topic]])
        root_children[topic] = 1

  print("root sizes", SIZES)
  # each element of BFS queue shoudl store parent_topic, root_topic, list of associated strings
  #######
  # BFS
  while len(queue) > 0:
    parent_topic, root_topic, associated_strings = queue.pop(0)
    # get cluster info of parent
    parent_cluster = clusters[parent_topic]
    # parent_thoughts_list = THOUGHTS_LIST[parent_topic]
    if len(parent_cluster) >= THRESHOLD and len(set(parent_cluster)) > NUM_CHILDREN:
      # recursively cluster: split into NUM_CHILDREN
      # TODO: ensure that every item in parent_cluster is in mapped_history
      original_cluster_items = []
      new_clusters, SIZES, THOUGHTS_LIST = generate_clusters(
          NUM_CHILDREN, 
          parent_cluster, 
          mapped_history, 
          SIZES, 
          THOUGHTS_LIST
      )

      for child_topic in new_clusters.keys():
        if child_topic not in clusters.keys():
          # print('child', child_topic)
          root_children[root_topic] += 1

          # add links between parent + child to graph
          GRAPH[child_topic] = set()
          GRAPH[child_topic].add(parent_topic)
          GRAPH[parent_topic].add(child_topic)

          new_c = new_clusters[child_topic]
          clusters[child_topic] = new_c
          # confirm that this should already be set
          assert child_topic in list(SIZES.keys())
          assert child_topic in list(THOUGHTS_LIST.keys())
          # SIZES[child_topic] = len(new_c)
          # THOUGHTS_LIST[child_topic] = 

          # add child to queue if we re-cluster again
          if SIZES[child_topic] >= THRESHOLD:
            queue.append([child_topic, root_topic, THOUGHTS_LIST[child_topic]])

  # outside of queue    
  print("root_children", root_children)
  # max_NUM_CHILDREN = max(root_children.values())

  # GETS THE TOPIC with the maximum number of child topics
  max_child_topic = max(root_children, key = root_children.get)
  print(max_child_topic)

  # standardize sizes
  factor = 700/sum(SIZES.values())


  # MISCELLANEOUS
  for k in GRAPH.keys():
    GRAPH[k] = list(GRAPH[k])

    SIZES[k] = factor * SIZES[k]


  for child in GRAPH[max_child_topic]:
    for i in range(len(GRAPH[child])):
      if GRAPH[child][i] == max_child_topic:
          GRAPH[child][i] = 'Miscellaneous'

  root_topics = list(roots.keys())
  print("roots", root_topics)
  # change root topic label
  for i in range(len(root_topics)):
    if root_topics[i] == max_child_topic:
      root_topics[i] = 'Miscellaneous'

  # reset graph, thoughts_list, and sizes label
  GRAPH['Miscellaneous'] = GRAPH[max_child_topic]
  del GRAPH[max_child_topic]
  SIZES['Miscellaneous'] = SIZES[max_child_topic]
  del SIZES[max_child_topic]
  THOUGHTS_LIST['Miscellaneous'] = THOUGHTS_LIST[max_child_topic]
  del THOUGHTS_LIST[max_child_topic]

  print('graph:', GRAPH)
  print("----------")
  print("-----------")
  print("thoughts list:", THOUGHTS_LIST)
  return GRAPH, SIZES, root_topics, THOUGHTS_LIST

#######
## function to write to csv file
def append_to_csv(showerthought):
  # data we want to add as new row
  rowlist = [1,'N/A','N/A', 1, 'N/A',1,'N/A','N/A', 'N/A', showerthought,'N/A' ]

  # append to csv file
  from .config import DATA_CSV_PATH
  with open(DATA_CSV_PATH, 'a') as f_object:  
      writer_object = writer(f_object)
      writer_object.writerow(rowlist)
      f_object.close()
  return True