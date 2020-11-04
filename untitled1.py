# -*- coding: utf-8 -*-
"""
Created on Tue Nov  3 15:29:03 2020

@author: saksh
"""


# -*- coding: utf-8 -*-
"""
Created on Tue Nov  3 15:12:56 2020

@author: saksh
"""


from flask import Flask, jsonify, request, render_template, redirect, url_for, send_file 
from flask_api import FlaskAPI, status, exceptions
from PIL import Image
import os
app = Flask(__name__)
app.config["IMAGE_UPL"]="/static/client/img"
...
@app.route("/upload-image", methods=["GET", "POST"])
def upload_image():
    if request.method == "POST":
        if request.files:
            image = request.files["photo"]
            filename=(image.filename)
            print(filename)
            image.save(os.path.join(app.config["IMAGE_UPL"],filename))
            return jsonify({"accept":True})
    if request.method == "GET":
        print('happy')                                          
        return app.send_file(app.config["IMAGE_UPL"],'ll.jpg')
    return 
app.run();