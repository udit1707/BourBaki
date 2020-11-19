from flask import Flask, jsonify, request, render_template, redirect, url_for, send_file 
from flask_api import FlaskAPI, status, exceptions
from PIL import Image
from werkzeug.utils import secure_filename
import os
import json 
import EquationSolver
import ComplexNumbers
import ArithemeticExpr
import PointsCoordinate
import LinesCoordinate
import CoordinateCircle
import EllipseCoordinate
import CalculusDerivative
import CalculusIndefIntegrals
import CalculusDefiniteIntegral
import CalculusDoubleIntegral
import CalculusTripleIntegral
import CalculusLimits
import CalculusLDE
import BinomialAnyIndex
app = Flask(__name__)


@app.route('/') 
def index(): 
	return "Flask server" 

 
@app.route('/postComplex', methods = ['POST']) 
def postComplex():
    req_data = request.get_json()
    text= req_data["text"]
    result=ComplexNumbers.complexInfo(text)
    result=json.dumps(result)    
    return jsonify({'msg': 'success','data_result':result})

@app.route('/postBodmas', methods = ['POST']) 
def postBodmas():
    req_data = request.get_json()
    text= req_data["text"]
    result=ArithemeticExpr.solveExpr(text)
    result=json.dumps(result)
    
    return jsonify({'msg': 'success','data_result':result})

@app.route('/postEqSolve', methods = ['POST']) 
def postEqSolve():
    req_data = request.get_json()
    text= req_data["text"]
    result=EquationSolver.solveEqn(text)
    result=json.dumps(result)
    
    return jsonify({'msg': 'success','data_result':result})

@app.route('/postCoordinate', methods = ['POST']) 
def postCoordinate():
    req_data = request.get_json()
    text= req_data["text"]
    text=str(text)
    print(text)
    result=PointsCoordinate.pointsInfo(text)
    print(result)
    result=json.dumps(result)    
    return jsonify({'msg': 'success','data_result':result})

@app.route('/postLinesCoordinate', methods = ['POST']) 
def postLinesCoordinate():
    req_data = request.get_json()
    text= req_data["text"]
    print(text)
    result=LinesCoordinate.getLine(text)
    result=json.dumps(result)
    
    return jsonify({'msg': 'success','data_result':result})

@app.route('/postCircleCoordinate', methods = ['POST']) 
def circleCoordinate():
    req_data = request.get_json()
    text= req_data["text"]
    print(text)
    result=CoordinateCircle.getCircle(text)
    print(result)
    result=json.dumps(result)
    return jsonify({'msg': 'success','data_result':result})

@app.route('/postEllipseCoordinate', methods = ['POST']) 
def ellipseCoordinate():
    req_data = request.get_json()
    text= req_data["text"]
    print(text)
    result=EllipseCoordinate.getEllipse(text)
    print(result)
    result=json.dumps(result)
    return jsonify({'msg': 'success','data_result':result})

@app.route('/postCalculusDerivative', methods = ['POST']) 
def calculusDerivative():
    req_data = request.get_json()
    text= req_data["text"]
    print(text)
    result=CalculusDerivative.getDerivative(text)
    print(result)
    result=json.dumps(result)
    return jsonify({'msg': 'success','data_result':result})

@app.route('/postIndefIntegrals', methods = ['POST']) 
def indefIntegrals():
    req_data = request.get_json()
    text= req_data["text"]
    print(text)
    result=CalculusIndefIntegrals.getIndefIntegrals(text)
    print(result)
    result=json.dumps(result)
    return jsonify({'msg': 'success','data_result':result})

@app.route('/postDefIntegrals', methods = ['POST']) 
def defIntegrals():
    req_data = request.get_json()
    text= req_data["text"]
    print(text)
    result=CalculusDefiniteIntegral.getDefIntegrals(text)
    print(result)
    result=json.dumps(result)
    return jsonify({'msg': 'success','data_result':result})

@app.route('/postDoubleIntegrals', methods = ['POST']) 
def doubleIntegrals():
    req_data = request.get_json()
    text= req_data["text"]
    print(text)
    result=CalculusDoubleIntegral.getDoubleDefIntegrals(text)
    print(result)
    result=json.dumps(result)
    return jsonify({'msg': 'success','data_result':result})

@app.route('/postTripleIntegrals', methods = ['POST']) 
def tripleIntegrals():
    req_data = request.get_json()
    text= req_data["text"]
    print(text)
    result=CalculusTripleIntegral.getTripleDefIntegrals(text)
    print(result)
    result=json.dumps(result)
    return jsonify({'msg': 'success','data_result':result})

@app.route('/postCalculusLimits', methods = ['POST']) 
def calculusLimits():
    req_data = request.get_json()
    text= req_data["text"]
    print(text)
    result=CalculusLimits.getLimits(text)
    print(result)
    result=json.dumps(result)
    return jsonify({'msg': 'success','data_result':result})

@app.route('/postCalculusLDE', methods = ['POST']) 
def calculusLDE():
    req_data = request.get_json()
    text= req_data["text"]
    print(text)
    result=CalculusLDE.getLde(text)
    print(result)
    result=json.dumps(result)
    return jsonify({'msg': 'success','data_result':result})

@app.route('/postBinomialAny', methods = ['POST']) 
def binomialAny():
    req_data = request.get_json()
    text= req_data["text"]
    print(text)
    result=BinomialAnyIndex.getBinomialEquation(text)
    print(result)
    result=json.dumps(result)
    return jsonify({'msg': 'success','data_result':result})


if __name__ == "__main__": 
	app.run(threaded=True, port = int(os.environ.get('PORT', 5000))) 
