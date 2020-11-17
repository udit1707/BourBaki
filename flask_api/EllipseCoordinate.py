# -*- coding: utf-8 -*-
"""
Created on Tue Nov 17 21:50:28 2020

@author: Arsh
"""

from sympy import *
from sympy.geometry import *
from sympy.parsing.sympy_parser import parse_expr
from sympy.parsing.latex import parse_latex

def conv(strng):
    k=strng
    k=k.replace('\a','\\a')
    k=k.replace('\b','\\b')
    k=k.replace('\f','\\f')
    k=k.replace('\n','\\n')
    k=k.replace('\r','\\r')
    k=k.replace('\t','\\t')
    k=k.replace('\v','\\v')
    k=k.replace('\left','')
    k=k.replace('\\right','')
    return k
    
def ellipseCreator(s):
    s=conv(s)
    s=parse_expr(s)
    s=ellipseDict(s)
    a=list(s.keys())
    if len(s)==3:
        if (a[2])=="eccentricity":
            return Ellipse(Point(s["center"]),hradius=s["hradius"],eccentricity=Rational(s["eccentricity"]))
        elif (a[2])=="vradius":
            return Ellipse(Point(s["center"]),hradius=s["hradius"],vradius=s['vradius'])
        else:
            return -1

def ellipseDict(s):
    if len(s)==3:
        d={"center":s[0],"hradius":float(s[1]),"eccentricity":float(s[2])}
        return d
    elif len(s)==2:
        d={"center":s[0],"hradius":float(s[1][0]),"vradius":float(s[1][1])}
        return d
    else:
        return -1
    

def areaOfEllipse(e):
    return e.area
def ellipseAuxCircle(e):
    return e.auxiliary_circle()
def elllipseCircumference(e):
    return e.circumference
def ellipseDirectorCircle(e):
    return e.director_circle()
def getEllipse(s):
    e=ellipseCreator(s)
    d={"areaEllipse":str(areaOfEllipse(e)),"ellipseAuxcircle":str(ellipseAuxCircle(e).equation()),"ellipsecircumference":str(elllipseCircumference(e)),"ellipseDirectorCircle":str(ellipseDirectorCircle(e).equation()),"ellipseEqn":str(e.equation())}
    return d