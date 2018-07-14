from flask import Flask
from flask import render_template, request, jsonify, json, jsonify
from barcode import  generate
import barcode
from barcode.writer import ImageWriter
from tinydb import TinyDB, Query

app = Flask(__name__)

db = TinyDB('db.json')
User = Query()

#TODO
#set up swagger

'''
def processtext():
    #data = request.get_json()
    #source = data["source"]
    #destination = data["destination"]
    #userId = data["userId"]
    #dateTime = data["dateTime"]
    #generate barcode
    generate_barcode('KAN', 'AND', 'DEV', '1530989812')
    return
'''

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    userId = data["username"]
    password = data["password"]
    #DB
    login_success = isValid_User(userId, password)
    response_data = {}
    response_data['loginSuccess'] = login_success
    reponse = create_response(response_data)
    #json response
    return reponse


@app.route('/register', methods=['POST'])
def register():
    #check if userId exist only then add else send response "already exist"
    data = request.get_json()
    key = insert_in_db(data)
    response_data = {}
    if(key == None):
        response_data['status'] = 'failure'
    response_data['status'] = 'success'
    response = create_response(response_data)
    return response

def create_response(body):
    response = jsonify(body)
    response.status_code = 200
    return response

def isValid_User(username, password):
    userInformatin = get_from_db_uniqueId(username)
    print(userInformatin)
    if(userInformatin == None):
        return 'false'
    if(userInformatin[0]['password'] != password):
        return 'false'
    return 'true'

def get_from_db_uniqueId(uniqueId):
    entry = db.search(User.username == uniqueId)
    return entry

def get_from_db_ticek_code(ticketcode):
    return


def insert_in_db(userDetailsDict):
    sucess = db.insert(userDetailsDict)
    return sucess
'''
def generate_barcode(source, destination, userId, dateTime):
    code = source+dateTime+destination+userId
    print(code)
    barcodeGenerated = generate('code128', code, output='barcode_svg')
    test = barcode.get_barcode_class('code128')
    generatedCode = test(code, writer=ImageWriter())
    generatedCode.save(filename='test1')
    return
'''

if __name__ == "__main__":
    app.run(debug=True)