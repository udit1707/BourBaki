# -*- coding: utf-8 -*-
"""
Created on Tue Nov 17 17:02:39 2020

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
def getPoints(s):
    s=conv(s)
    s=parse_expr(s)
    l=[]
    for points in s:
        l.append(Point(points))
    return l

def areCollinear(s):
    points=getPoints(s)
    if len(points)<3:
        print("Insufficient number of points to decide ")
        return -1
    elif len(points)>=3:
        return Point.is_collinear(*points)

def areaPolynomial(s):
    points=getPoints(s)
    if len(points)<3:
        print("Insufficient number of points to make a polygon")
    else:
        return abs(Polygon(*points).area)

def perimeterPolynomial(s):
    points=getPoints(s)
    if len(points)<3:
        print("Insufficient number of points to make a polygon")
    else:
        return abs(Polygon(*points).perimeter)

def areConcyclic(s):
    points=getPoints(s)
    if len(points)<3:
        print("Insufficient number of points to make a polygon")
    else:
        cpoints=points[1:]
        return points[0].is_concyclic(*cpoints)

def midPoint(s):
    points=getPoints(s)
    if len(points)==2:
        return point1.midpoint(point2)
    else:
        return -1
    
def pointsInfo(s="[(1,2),(4,8),(9,12)]"):
    p=getPoints(s)
    if len(p)==2:
        d={"Points":str(p),"MidPoint":str(midPoint(s))}
    else:
        d={"Points":str(p),"areCollinear":str(areCollinear(s)),"AreaPolynomial":str(areaPolynomial(s)),"PerimeterPolynomial":str(perimeterPolynomial(s)),"areConcyclic":str(areConcyclic(s))}
    return d 