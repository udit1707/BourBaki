# -*- coding: utf-8 -*-
"""
Created on Wed Nov 18 00:57:47 2020

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

def calDerivative(s):
    s=conv(s)
    expr=parse_latex(s)
    s=str(expr)
    e=Eq(expr,0)
    s1=str(e)[2:]
    s1=make_tree(s1)
    l=[]
    for i in s1:
        if type(i)==list:
            l.append(str(i))
    var=l[0].split(", ")[-1].split("'")[1]
    return diff(expr,symbols(var))

def getDerivative(s):
    dv=calDerivative(s)
    d={"derivative":str(dv)}
    return d