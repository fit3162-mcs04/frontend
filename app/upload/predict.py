from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import pandas as pd

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

# Get current file's directory (i.e., /app/upload)
base_dir = os.path.dirname(__file__)

# Build full path to the model
model_path = os.path.join(base_dir, '..', 'model', 'svm.joblib')

# Load model
svm = joblib.load(model_path)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Read the CSV file into pandas
        df = pd.read_csv(file)

        # Extract first row as a list of values (feature vector)
        features = df.iloc[0].tolist()

        # Make prediction
        prediction = svm.predict([features])  # Assuming SVM is already trained

        return jsonify({'prediction': prediction[0]})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)