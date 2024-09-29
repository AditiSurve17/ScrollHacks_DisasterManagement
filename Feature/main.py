import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import joblib
import requests
import time

# Load the dataset
data = pd.read_csv('data.csv')

# Display the first few rows of the dataset
print(data.head())

# Visualize the relationship between Rainfall and Flood
sns.scatterplot(x='rainfall_percentage', y='flood_prediction', data=data)
plt.title('Rainfall vs Flood')
plt.xlabel('Rainfall Percentage (%)')
plt.ylabel('Flood Prediction (1 = Yes, 0 = No)')
plt.show()

# Split the dataset into features and target variable
X = data[['rainfall_percentage']]  # Features
y = data['flood_prediction']       # Target variable

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a logistic regression model
model = LogisticRegression()
model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy:.2f}')

# Display the confusion matrix and classification report
print('Confusion Matrix:')
print(confusion_matrix(y_test, y_pred))
print('Classification Report:')
print(classification_report(y_test, y_pred))

# Save the model to a file
joblib.dump(model, 'flood_prediction_model.pkl')

# Function to predict flood based on rainfall input
def predict_flood(rainfall):
    prediction = model.predict([[rainfall]])
    return prediction[0]  # Return 0 or 1

# Function to get rainfall data from wttr.in API
def get_rainfall_percentage_from_wttr(city_name):
    retries = 3  # Number of retries
    for i in range(retries):
        try:
            # Get weather data from wttr.in API
            weather_url = f"https://wttr.in/{city_name}?format=j1"
            print(f"Requesting URL: {weather_url}")  # Debugging line
            response = requests.get(weather_url)

            # Check if the response is successful
            if response.status_code != 200:
                print(f"Error: Received status code {response.status_code}")
                return None

            weather_data = response.json()
            print(f"Weather data: {weather_data}")  # Debugging line

            # Extract today's rainfall percentage (example from the API)
            today_weather = weather_data['weather'][0]
            rainfall_percentage = float(today_weather['hourly'][0]['precipMM'])  # Extract rainfall data in mm
            print(f"Today's Rainfall Percentage in {city_name}: {rainfall_percentage} mm")
            return rainfall_percentage
        except requests.exceptions.RequestException as e:
            print(f"Attempt {i + 1} failed: {e}")
            time.sleep(2)  # Wait before retrying
        except ValueError as ve:
            print(f"JSON Decode Error: {ve}")
            return None

    print("All attempts to connect to the API failed.")
    return None

# Get user input for city name
city = input("Enter the city name to check rainfall: ")

# Get rainfall percentage from wttr.in API
rainfall_percentage = get_rainfall_percentage_from_wttr(city)

if rainfall_percentage is not None:
    # Predict flood based on rainfall percentage
    flood_prediction_result = predict_flood(rainfall_percentage)
    
    # Show user the rainfall information
    print(f"\nRainfall Percentage for {city}: {rainfall_percentage} mm")

    if flood_prediction_result == 1:
        print("Flood expected.")
    else:
        print("No flood expected.")

    # Optionally, display the graph for user understanding
    plt.figure(figsize=(10, 6))
    sns.scatterplot(x='rainfall_percentage', y='flood_prediction', data=data)
    plt.title('Rainfall vs Flood')
    plt.xlabel('Rainfall Percentage (mm)')
    plt.ylabel('Flood Prediction (1 = Yes, 0 = No)')
    plt.axvline(x=rainfall_percentage, color='red', linestyle='--', label=f'Predicted Rainfall: {rainfall_percentage} mm')
    plt.legend()
    plt.show()
else:
    print("Could not retrieve rainfall data.")
