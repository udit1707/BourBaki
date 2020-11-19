# -*- coding: utf-8 -*-
"""
Created on Thu Nov 19 18:50:50 2020

@author: Arsh
"""

from sympy import *
from sympy.parsing.latex import parse_latex
import re

def conv(strng):
    k=strng
    k=k.replace('\a','\\a')
    k=k.replace('\b','\\b')
    k=k.replace('\f','\\f')
    k=k.replace('\n','\\n')
    k=k.replace('\r','\\r')
    k=k.replace('\t','\\t')
    k=k.replace('\v','\\v')
    return k

def ldePreprocess(s):
    s=conv(s)
    expr1=parse_latex(s)
    expr=str(expr1)
    x=expr.find("Derivative")
    x=x+len('Derivative')
    s=expr[x:x+9][1:-1].split(", ")
    func=symbols(s[0][0],cls=Function)
    x=symbols(s[1])
    return expr1,func,x

def ldeSolve(s):
    expr,func,x=ldePreprocess(s)
    return dsolve(expr,func(x))

def getLde(s):
    lde={"LDE":str(ldeSolve(s))}
    return lde