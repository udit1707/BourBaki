# -*- coding: utf-8 -*-
"""
Created on Thu Nov 19 18:39:18 2020

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

def limitPreprocess(s):
    #s=s.split("\to")
    #s=s[0]+"\\to"+s[1]
    s=conv(s)
    ds=str(parse_latex(s)).split("Limit")
    t=ds[1][1:-1].split(", ")[0]
    sym=symbols(ds[1][1:-1].split(", ")[1])
    lim=int(ds[1][1:-1].split(", ")[2])
    eqn=ds[0]+t
    return eqn,sym,lim

def calLimits(s):
    s,x,a=limitPreprocess(s)
    return limit(sympify(s,evaluate=False),x,a)

def getLimits(s):
    L={"Limits":str(calLimits(s))}
    return L