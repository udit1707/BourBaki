# -*- coding: utf-8 -*-
"""
Created on Tue Nov 17 17:14:27 2020

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
def checkSlopePoint(s):
    d={"slope":0,'point':""}
    for a in s:
        if type(a)==tuple:
            d['point']=a
        else:
            d['slope']=a
    return d

def createLine(s):
    s=conv(s)
    t=[]
    if s.find("\\frac")==-1:
        if s.find("=")==-1:
            t=parse_expr(s)
            if checkPointNum(t)==1:
                d=checkSlopePoint(t)
                line=Line(Point(d['point']),slope=float(d['slope']))
                return line
            elif checkPointNum(t)==2:
                p1,p2=Point(*t[0]),Point(*t[1])
                line=Line(p1,p2)
                return line    
        else:
            return Line(parse_latex(s))
    else :
        l=s.find("\\frac")
        h=s.find("}",s.find("}")+1,len(s)-1)
        slope=float(parse_latex(s[l:h+1]))
        s.replace(s[l:h+1],"")
        l=s.find("(")
        h=s.find(")")
        point=Point(parse_expr(s[l:h+1]))
        return Line(point,slope=slope)
def getLine(s):
    d={"LineEquation":str(createLine(s).equation())}
    return d
