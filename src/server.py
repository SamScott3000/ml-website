from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from train_model import Network
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model
model = Network()
model.load_state_dict(torch.load('mnist_model.pth'))
model.eval()

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    grid_array = np.array(data['grid']).astype(np.float32).reshape(1, 1, 28, 28)
    grid_tensor = torch.tensor(grid_array)
    
    with torch.no_grad():
        output = model(grid_tensor)
        prediction = output.argmax(1).item()
    
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
