from flask import Flask, jsonify, request, render_template, redirect, url_for, send_file 
from flask_api import FlaskAPI, status, exceptions
from PIL import Image
from werkzeug.utils import secure_filename
import os
import json 
import BinomialSolver
app = Flask(__name__)


@app.route('/') 
def index(): 
	return "Flask server" 
 
@app.route('/postdata', methods = ['POST']) 
def postdata():
    req_data = request.get_json()
    text= req_data["text"]
    print(text)

    result=BinomialSolver.binomialCalculate(str(text))

   

    return jsonify({'msg': 'success','data':result})

if __name__ == "__main__": 
	app.run(port=5005) 
