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
    k=k.replace('\\left','')
    k=k.replace('\\right','')
    k=k.replace('arrow','\\rightarrow')
    return k

def limitPreprocess(s):
    #s=s.split("\to")
    #s=s[0]+"\\to"+s[1]
    s=conv(s)
    ds=str(parse_latex(s)).split("Limit")[1][1:-1]
    a=ds.split(", ")
    if(len(a)>=3):
        #t=a[0]
        sym=symbols(a[-2])
        if a[-1]=="oo" or a[-1]=="-oo":
            lim=symbols(a[-1])
        else:
            lim=int(a[-1])
        eqn=", ".join(a[:-2])
    elif(len(a)<3):
        sym=symbols("x")
        lim=symbols("oo")
        eqn="x"
    else:
        b=a[:-2]
        eqn=", ".join(b)
        sym=symbols(a[-2])
        if a[-1]=="oo" or a[-1]=="-oo":
            lim=symbols(a[-1])
        else:
            lim=int(a[-1])
    return eqn,sym,lim

def calLimits(s):
    s,x,a=limitPreprocess(s)
    return limit(sympify(s,evaluate=False),x,a)

def getLimits(s):
    L={"Limits":str(calLimits(s))}
    return L