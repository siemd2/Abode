import pandas as pd
import numpy as np
import random
import math
from sklearn.preprocessing import StandardScaler, MinMaxScaler

house_data = pd.read_csv('Final_Updated_Housing.csv')

# Random input
inputs = np.array([500000, 2000, 3, 4, 2, 1, 0, 1, 1, 0, 2, 0, 0.5])
filler = []
headers = ['price','area','bedrooms','bathrooms','stories','mainroad',
           'guestroom','basement','hotwaterheating','airconditioning',
           'parking','prefarea','furnishingstatus','fake_address',
           'fake_zip_code'
]

# Cleaned data by getting rid of houses in the dataset that we are obviously not
# interested in
for i in range(len(inputs)):
    if inputs[i] == 0:
        clean_data = np.array(house_data[house_data[headers[i]]>0])

# Deletes columns in the clean_data array that have zeroes in them
for i in range(len(inputs)):
    if inputs[i] == 0:
        zero_cols = np.any(clean_data == 0, axis=0)
        euclidean_data = clean_data[:, ~zero_cols]
#         filler.append('zero')
#     if inputs[i]!= 0:
#         filler.append(inputs[i])
# filler.remove('zero')
# print(filler)
print(euclidean_data)
# Slicing the euclidean_data so that we get rid of the postal codes and addresses
# sliced_euclidean = euclidean_data[:, :6]
# print(inputs2)
# print(sliced_euclidean[0])

# Also cleaning the inputs array


# euclidean_distance to calculate how far away we are from our target house
# def euclidean_distance(point1, point2):
#     point1 = point1
#     point2 = point2
#     return np.linalg.norm(point1 - point2)

# for i in range(sliced_euclidean.shape[0]):
#     distance = euclidean_distance()