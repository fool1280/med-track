import re
from flask import Flask, Response, request, abort
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import Regex, json_util
from pymongo import TEXT

app = Flask(__name__)
CORS(app)
mongodb_client = PyMongo(app, uri = "mongodb+srv://anguyen:Thieulam10@cluster0.qaxvq.mongodb.net/tamu-hack-2023")
db = mongodb_client.db
db["medication"].create_index([("name", TEXT), ("desc", TEXT), ("symptoms", TEXT)])

@app.route("/")
def hello_world():
    return "<h1>Home</h1>"


@app.route("/insert-a-medicine")
def insert_a_medicine():
    # Database: medicine database
    # name
    # max__per_day
    # desc
    # symptoms = []
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
    if query == "all" or query == "":
        medications = db["medication"].find({})
        return Response(
            json_util.dumps(medications),
            mimetype='application/json'
        )
    medication = db["medication"].find({"$text": { "$search": query }})
    return Response(
        json_util.dumps(medication),
        mimetype='application/json'
    )

@app.route("/add-medicine", methods = ["POST"])
def add_medicine():
    # Database: record
    # username
    # medicine
    # times_of_day
    # stopped_date: unix timestamp

    data = request.get_json()
    if "record" in data:
        data = data["record"]
    else:
        return Response(status=404)
    if "username" in data and "medicine" in data and "times_of_day" in data and "stopped_date" in data:
        record = {
            "username": data["username"],
            "medicine": data["medicine"], 
            "times_of_day": data["times_of_day"],
            "stopped_date": data["stopped_date"], 
        }
        print(record)
        found = db["medication"].find_one({"name": re.compile('^' + re.escape(data["medicine"]) + '$', re.IGNORECASE)})
        if found is None:
            return Response(status=404)
        name = found["name"]
        print(name)
        db["record"].insert_one({
            "username": data["username"],
            "medicine": name,
            "times_of_day": data["times_of_day"],
            "stopped_date": data["stopped_date"], 
        })
        return Response(
            json_util.dumps(record),
            mimetype='application/json'
        )
    else:
        return Response(status=404)

@app.route("/get-record")
def get_record():
    query = request.args.get('query')
    if query == "":
        abort(404)

    found = list(db["record"].find({"username": re.compile('^' + re.escape(query) + '$', re.IGNORECASE)}))
    if len(found) == 0:
            return Response(status=404)
    return Response(
        json_util.dumps(found),
        mimetype='application/json'
    )
    
if __name__ == '__main__':
    app.run(host="localhost", port=8000)