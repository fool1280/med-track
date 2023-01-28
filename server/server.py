from flask import Flask, Response, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import json_util

app = Flask(__name__)
CORS(app)
mongodb_client = PyMongo(app, uri = "mongodb+srv://anguyen:Thieulam10@cluster0.qaxvq.mongodb.net/tamu-hack-2023")
db = mongodb_client.db

# Database: medicine database
# name
# max_amount_per_day
# description
# symptoms

# Database: record
# username
# medicine_name
# times_of_day
# stopped_date

@app.route("/")
def hello_world():
    return "<h1>Home</h1>"


@app.route("/insert-a-medicine")
def insert_a_medicine():
    medication = {
        "name": "Ibuprofen",
        "desc": "", 
        "max_per_day": "",
        "symptom": ["a", "b"],
    }
    db["medication"].insert_one(medication)
    return "Success"

@app.route("/get-all-medicines")
def get_all_medicines():
    medications = db["medication"].find({})
    return Response(
        json_util.dumps(medications),
        mimetype='application/json'
    )

@app.route("/search-a-medicine")
def search_a_medicine():
    query = request.args.get('query')
    print(query)
    return Response(
        json_util.dumps("Success"),
        mimetype='application/json'
    )

