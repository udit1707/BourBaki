# -*- coding: utf-8 -*-
"""
Created on Tue Nov 17 16:11:40 2020

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
    k=k.replace('\left','')
    k=k.replace('\\right','')
    return k

def solveExpr(s):
    s=conv(s)
    s=parse_latex(s)
    ans=float(sympify(s,evaluate=True))
    d={"ans":ans}
    return d