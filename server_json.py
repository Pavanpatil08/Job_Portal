from flask import Flask
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import request
import hashlib 
import os
import uuid
import json
import jwt
import math       
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
if __name__ == "__main__":
    app.run()

app.config["MONGO_URI"] = "mongodb://localhost:27017/Evalution_3"
mongo = PyMongo(app)


#Create Company
@app.route('/create_company', methods = ['POST'])   
def create_company():
    user = {}
    comapny_name = request.json["comapny_name"]
    location = request.json["location"]
    user["comapny_name"] = comapny_name
    user["location"] = location
    mongo.db.company.insert_one(user)   
    return {"message": " company created"}

@app.route('/read/company')
def read1():
    users = mongo.db.company.find({})
    return dumps(users)

#create job
@app.route('/create_job', methods = ['POST'])  
def create_city():
    user = {}
    job_opening = request.json["job_opening"]
    salary = request.json["salary"]
    job_title = request.json["job_title"]
    comapny_name = request.json["comapny_name"]
    location = request.json["location"]
    user["comapny_name"] = comapny_name
    user["salary"] = salary
    user["location"] = location
    user["job_title"] = job_title
    user["job_opening"] = job_opening
    job_id = str(uuid.uuid1().int)[:6]
    user["job_id"] = job_id
    mongo.db.Job_opening.insert(user)
    return {"message": "job Created"}

# pagination
def pagination(page):
    user_count = mongo.db.Job_opening.find({}).count()
    users = mongo.db.Job_opening.find({})
    items = []
    for item in users:
        items.append({"job_id":item["job_id"],"comapny_name":item["comapny_name"],"location":item["location"],"job_opening":item["job_opening"],"salary":item["salary"],"job_title":item["job_title"]})
    total_pages = user_count//5 + 1
    total_users = user_count
    return {
    "total_pages": total_pages,
    "total_users": total_users,
    "page": page,
    "data": items[(page*5)-5: page*5],
    "per_page": 5
    } 
#reac data
@app.route('/read_job')
def read_blog():
    page = request.args.get("page", default = 1, type = int)
    return pagination(page)

#delete Data
@app.route('/delete-job/<job_id>', methods = ['DELETE'])
def deleteBlog(job_id):
    mongo.db.Job_opening.remove({"job_id": job_id})
    return json.dumps({"Response":200})

#update data
@app.route('/update/<job_id>', methods=['POST'])
def update_blog(job_id):
    job_opening = request.json["job_opening"]
    salary = request.json["salary"]
    job_title = request.json["job_title"]
    location = request.json["location"]
    mongo.db.Job_opening.update_one({"job_id": job_id }, {"$set": {'salary' : salary, 'job_opening':job_opening, 'job_title' : job_title,"location":location}})
    return {"updated ": "updated"}

# @app.route('/read_job1')
# def read2():
#     users = mongo.db.Job_opening.find({})
#     return dumps(users)

@app.route('/read/job')
def readbyjob():
    users = mongo.db.Job_opening.find({})
    return dumps(users)

#sortBy Company
@app.route('/Sortbycompany', methods = ["POST"])
def Sortbycompany():
    comapny_name = request.json["comapny_name"]
    users = mongo.db.Job_opening.find({"comapny_name":comapny_name})
    return dumps(users)
#sort By location
@app.route('/Sortbylocation', methods = ["POST"])
def sortBylocation():
    location = request.json["location"]
    users = mongo.db.Job_opening.find({"location":location})
    return dumps(users)

# pegination with  skip and limit
def pegination_new(page):
    per_page = 5
    value = ''
    users = mongo.db.Job_opening.find()
    users_count = users.count()
    total_page = math.ceil(int(users_count)/per_page)
    comapny_show =  users.skip(int((page-1)) * per_page).limit(per_page)
    value = {"page":page,"per_page":per_page,"total_page":total_page,"total":users_count,"result":comapny_show}
    return dumps (value)

# read data 
@app.route('/read/job_vcancy',methods = ["POST"])
def read_vacancy():
    page = request.args.get("page",default = 1,type = int)
    return(pegination_new(page))

# sort by opnening
@app.route('/Sortbyopening')
def sort():
    users = mongo.db.Job_opening.find().sort("job_opening",-1)
    return dumps(users)

#sort By sarary
@app.route('/Sortbysalary')
def sortBysalary():
    users = mongo.db.Job_opening.find().sort("salary",1)
    return dumps(users)

# @app.route('/sum/total_vacancy')
# def total_vacancy():
#     users = mongo.db.Job_opening.aggregate([
#    {
#      "$project": {
#        "salary_total": {"$sum": "$salary"}
#      }
#    }
# ])

    # return dumps (users)
    

if __name__ == "__main__":
    app.run()

