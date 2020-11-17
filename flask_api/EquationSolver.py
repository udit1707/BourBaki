# -*- coding: utf-8 -*-
"""
Created on Tue Nov 17 16:29:11 2020

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

def make_tree(data):
    items = re.findall(r"\(|\)|\w+", data)

    def req(index):
        result = []
        item = items[index]
        while item != ")":
            if item == "(":
                subtree, index = req(index + 1)
                result.append(subtree)
            else:
                result.append(item)
            index += 1
            item = items[index]
        return result, index

    return req(1)[0]

def eqnPreProcess(s):
    s=conv(s)
    expr=parse_latex(s)
    s1=str(expr)
    s1=make_tree(s1[2:])
    l=[]
    for i in s1:
        if type(i)==list:
            l.append(str(i))
    if(len(l)!=0):
        var=l[0].split(", ")[-1].split("'")[1]
    else:
        for a in s1:
            if type(a)==str:
                if a >='0' and a<='9':
                    continue
                else :
                    var=a
    var=symbols(var)
    return expr,var    

def solveEqn(s):
    #expr=parse_latex(r"{}".format(s))
    e,p=eqnPreProcess(s)
    d={"solution":str(solveset(e,p))}
    return d