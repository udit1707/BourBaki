# -*- coding: utf-8 -*-
"""
Created on Wed Nov 18 01:14:51 2020

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


def defpreProcess(s):
    s=conv(s)
    s=str(parse_latex(r"{}".format(s))).split("Integral")[1][1:-1]
    res = re.findall(r'\(.*?\)', s)
    x=s.find(",")
    a=[]
    a.append(s[:x])
    a.append(s[x+1:])
    l=[]
    for ss in res:
        ss=ss[1:-1]
        ss=ss.split(", ")
        if len(ss)==3:
            sym=symbols(ss[0])
            if ss[1]=="oo" or ss[1]=="-oo":
                llim=symbols(ss[1])
            else:
                llim=int(ss[1])
            if ss[2]=="oo" or ss[2]=="-oo":
                hlim=symbols(ss[2])
            else:
                hlim=int(ss[2])
            l.append((sym,llim,hlim))
    return a[0],l

def defIntegrals(s):
    s,p=defpreProcess(s)
    return integrate(sympify(s,evaluate=False),*p)

def getDefIntegrals(s):
    DI=defIntegrals(s)
    d={"DefiniteIntegrals":str(DI)}
    return d