# -*- coding: utf-8 -*-
"""
Created on Thu Nov 19 19:17:10 2020

@author: Arsh
"""

from sympy.parsing.sympy_parser import parse_expr
from sympy.parsing.latex import parse_latex
from sympy import *

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

def bionomialSolver(s):
    s=conv(s)
    expr=parse_latex(s)
    x=str(expr).find("**")
    y=str(expr).find("**(")
    z=str(expr).find("*")
    var=symbols(str(s[z+2]))
    s=str(expr)
    if x!=-1 and y==-1:
        power=float(s[x+len("**"):])
        frac=int(power)
        if power-frac==0:
            return expr.series(var,0,frac+1)
        else:
            return expr.series(var,0,11)
    elif x!=-1 and y!=-1:
        power=float(s[x+len("**("):-1])
        return expr.series(var,0,11)

def getBinomialEquation(s):
    bS={"Series":str(bionomialSolver(s))}
    return bS
    