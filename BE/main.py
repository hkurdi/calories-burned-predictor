from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Load the model
model = joblib.load("calories_burned_model.pkl")

class InputData(BaseModel):
    Age: int
    Gender: int
    Height: float
    Weight: float
    Duration: float
    Heart_Rate: float
    Body_Temp: float

# Configure CORS
origins = os.getenv("ALLOWED_ORIGINS").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Calories Burned Predictor API"}

@app.post("/predict")
def predict(input_data: InputData):
    data = [[
        input_data.Age, input_data.Gender, input_data.Height,
        input_data.Weight, input_data.Duration, input_data.Heart_Rate,
        input_data.Body_Temp
    ]]
    prediction = model.predict(data)
    # Convert numpy.float32 to Python float
    prediction_float = float(prediction[0])
    return {"prediction": prediction_float}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
