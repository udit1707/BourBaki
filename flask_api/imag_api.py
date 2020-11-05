from flask import Flask, jsonify, request, render_template, redirect, url_for, send_file 
from flask_api import FlaskAPI, status, exceptions
from PIL import Image
from werkzeug.utils import secure_filename
import os
import json 
app = Flask(__name__)


@app.route('/') 
def index(): 
	return "Flask server" 
 
@app.route('/postdata', methods = ['POST']) 
def postdata(): 
    
    file = request.files['image']
    # Read the image via file.stream
    print(request.headers)

    file.save(os.path.join(secure_filename(file.filename)))
    img = Image.open(file.stream)

    return jsonify({'msg': 'success', 'size': [img.width, img.height]})

if __name__ == "__main__": 
	app.run(port=5005) 
