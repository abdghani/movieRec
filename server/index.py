from flask import Flask,Markup
from pymongo import MongoClient
import json
from bson import ObjectId
from flask import request
import jsonify
from collections import Counter
from utils import makeResponse,check
from flask_cors import CORS
client = MongoClient('localhost', 27017)
db = client['movies']
app = Flask(__name__)
CORS(app)

#basic testing

@app.route('/')
def hello_world():
    basic.hello_worldss();
    return 'Hello World'


@app.route('/searchbyId',methods=['POST'])
def searchbyId():
	body =json.loads(request.data)
	doc = db.movie.find_one({"id":body['id']},{"_id":False})
	return makeResponse({"result":doc})


@app.route('/searchbyQuery',methods=['POST'])
def searchbyQuery():
	table = db.movie
	body =json.loads(request.data.decode('utf-8'))
	print(body['query'])
	doc =[]
	for s in table.find({body['field']:{"$regex": body["query"],"$options":"i"}},{"_id":False}).limit(12):
		doc.append(s)
	return  makeResponse({"result":doc})



@app.route('/search',methods=['POST'])
def search():
	table = db.movie
	doc=[]
	for s in table.find({},{"_id":False,"production_companies":True}):
		for t in s["production_companies"]:
			doc.append(t)
	doc = Counter(doc)
	print(type(doc))
	return  makeResponse({"result":doc})


@app.route('/genres')
def genres():
    with open("./data/genres.json", "r") as f:
    	content = json.load(f)
    return makeResponse(content)

@app.route('/production_companies')
def production_companies():
    with open("./data/production_companies.json", "r") as f:
    	content = json.load(f)
    return makeResponse(content)


@app.route('/searchbyPage',methods=['POST'])
def searchbyPage():
	table = db.movie
	body =json.loads(request.data.decode('utf-8'))
	doc = []
	p = body['page']
	l = body['limit']
	totalData = table.count()
	if p*l > totalData or p ==0:
		doc.append({"result":"page is not present"})

	elif "filter" not in body or len(body["filter"])==0:
		for s in table.find({},{"_id":False}).limit(l).skip(l*(p-1)):
			doc.append(s)
	else:
		for s in table.find({},check(body['filter'])).limit(l).skip(l*(p-1)):
			doc.append(s)

	return  makeResponse(doc)
	
@app.route('/searchbyCharacter',methods=['POST'])		
def searchbyCharacter():		
	table = db.movie		
	body =json.loads(request.data.decode('utf-8'))		
	condition ={"name":{"$regex": '^'+body['query'] , '$options' : 'i'}}		
	doc =[]		
	if "filter" not in body or len(body["filter"])==0:		
		for s in table.find(condition,{"_id":False}).limit(12):		
			doc.append(s)		
		
	else:		
		for s in table.find(condition,check(body['filter'])).limit(12):		
			doc.append(s)		
	return  makeResponse(doc)

@app.route('/searchbyPageQuery',methods=['POST'])
def searchbyPageGenres():
	table = db.movie
	body =json.loads(request.data.decode('utf-8'))
	p = body['page']
	l = body['limit']
	totalData = table.count()
	condition={body['field']:{"$regex": body['query'],"$options":"i"}}
	doc = []
	if p*l > totalData or p ==0:
		doc.append({"result":"page is not present"})

	elif "filter" not in body or len(body["filter"])==0:
		for s in table.find(condition,{"_id":False}).limit(l).skip(l*(p-1)):
			doc.append(s)
	else:
		if len(body["filter"])>0:
			for s in table.find(condition,check(body['filter'])).limit(l).skip(l*(p-1)):
				doc.append(s)

	return  makeResponse(doc)



if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3010,debug=True)
