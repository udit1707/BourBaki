# -*- coding: utf-8 -*-
"""
Created on Thu Nov 12 10:11:45 2020

@author: Arsh
"""
from sympy import *
from sympy.parsing.latex import parse_latex

def preProcess(s):
    return parse_latex(r"{}".format(s))
def returnReal(s):
    s1=str(preProcess(s))
    return str(re(sympify(s1,evaluate=False)))
def returnImg(s):
    s1=str(preProcess(s))
    return str(im(sympify(s1,evaluate=False)))
def absComplex(s):
    s1=str(preProcess(s))
    return str(Abs(sympify(s1,evaluate=False)))
def argComplex(s):
    s1=str(preProcess(s))
    return str(arg(sympify(s1,evaluate=False)))
def conjugateComplex(s):
    s1=str(preProcess(s))
    return str(conjugate(sympify(s1,evaluate=False)))
def complexInfo(s):
    c={"real":"",'img':'',"abs":"","arg":"","conjugate":""}
    c["real"]=returnReal(s)
    c["img"]=returnImg(s)
    c["abs"]=absComplex(s)
    c["arg"]=argComplex(s)
    c['conjugate']=conjugateComplex(s)
    return c