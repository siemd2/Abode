import pandas as pd
import numpy as np
import random
import math

house_data = pd.read_csv('initial_pass/Final_Updated_Housing.csv')

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


"""
function euclideanDistance(point1, point2) {
    let sum = 0;
    for (let i = 0; i < point1.length; i++) {
        sum += Math.pow(point1[i] - point2[i], 2);
    }
    return Math.sqrt(sum);
}

let distancesList = [];
for (let i = 0; i < analog_df.length; i++) {
    let distance = euclideanDistance(analog_inputs, analog_df[i]);
    distancesList.push(distance);
}
"""