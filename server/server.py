from flask import Flask, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)
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


@app.route("/insert")
def insert():
    medication = {
        "name": "Ibuprofen",

    }
    db["medication"].insert_one(medication)
    return "Success"

@app.route("/get")
def get_all():
    medications = db["medication"].find({})
    print(list(medications))
    return "Success"