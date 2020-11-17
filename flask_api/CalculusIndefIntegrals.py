# -*- coding: utf-8 -*-
"""
Created on Wed Nov 18 01:10:27 2020

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

def preProcess(s):
    s=conv(s)
    e=str(parse_latex(r"{}".format(s))).split("Integral")[1][1:-1]
    l=[]
    l.append(e[0:-3])
    l.append(e[-1:])
    return l
def indefIntegrals(s):
    l=preProcess(s)
    return integrate(sympify(l[0],evaluate=False),symbols(l[1]))

def getIndefIntegrals(s):
    I=indefIntegrals(s)
    d={"Integrals":str(I)}
    return d