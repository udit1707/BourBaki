# -*- coding: utf-8 -*-
"""
Created on Sat Nov 21 18:09:22 2020

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

def getResult(s):
    s=conv(s)
    s=parse_latex(s)
    d={"GetAnswer":str(s)}
    return d