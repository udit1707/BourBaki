# -*- coding: utf-8 -*-
"""
Created on Tue Nov 17 17:31:45 2020

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
def checkPointNum(s):
    count=0
    for a in s:
        if type(a)==tuple:
            count=count+1
    return count  

def checkRadiusPoint(s):
    d={"radius":0,'point':""}
    for a in s:
        if type(a)==tuple:
            d['point']=a
        else:
            d['radius']=a
    return d
def circleCreator(s):
    s=conv(s)
    t=[]
    if s.find("\\frac")==-1:
        if s.find("=")==-1:
            t=parse_expr(s)
            if checkPointNum(t)==1:
                d=checkRadiusPoint(t)
                c=Circle(Point(d['point']),float(d['radius']))
                return c
            elif checkPointNum(t)==3:
                return Circle(*t)
        else:
            return Circle(parse_latex(s))
    else :
        l=s.find("\\frac")
        h=s.find("}",s.find("}")+1,len(s)-1)
        radius=float(parse_latex(s[l:h+1]))
        s.replace(s[l:h+1],"")
        l=s.find("(")
        h=s.find(")")
        point=Point(parse_expr(s[l:h+1]))
        return Circle(point,radius)

def circleCircumference(C):
    return C.circumference
def circleRadius(C):
    return C.radius
def circleArea(C):
    return C.area
def getCircle(s):
    c=circleCreator(s)
    d={"Circle":str(c.equation()),"Circumference":str(circleCircumference(c)),"Area":str(circleArea(c)),"Radius":str(circleRadius(c))}
    return d