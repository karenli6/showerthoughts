from sentence_transformers import SentenceTransformer
model = SentenceTransformer('all-MiniLM-L6-v2')
from parse_thoughts import get_shower_data

#Our sentences we like to encode
sentences = get_shower_data()
sentences = sentences[:21]

#Sentences are encoded by calling model.encode()
embeddings = model.encode(sentences)

# store in data
total_data = {'text': [], 
'emb': []}
for sentence, embedding in zip(sentences, embeddings):
  total_data['text'].append(sentence)
  total_data['emb'].append(embedding)


#### next step: kmeans clustering
import nltk
from nltk.cluster import KMeansClusterer
# import nltk

def clustering_question(data,NUM_CLUSTERS = 10):

    sentences = data['text']

    X = data['emb']

    kclusterer = KMeansClusterer(
        NUM_CLUSTERS, distance=nltk.cluster.util.cosine_distance,
        repeats=25,avoid_empty_clusters=True)

    assigned_clusters = kclusterer.cluster(X, assign_clusters=True)

    # data['cluster'] = pd.Series(assigned_clusters, index=data.index)
    # data['centroid'] = data['cluster'].apply(lambda x: kclusterer.means()[x])
    data['cluster'] = assigned_clusters
    return data
    # return data, assigned_clusters

newdata = clustering_question(total_data)

print(len(newdata['text']), len(newdata['emb']), len(newdata['cluster']))
index = len(newdata['text'])
for i in range(index):
  print(newdata['text'][i], newdata['cluster'][i])