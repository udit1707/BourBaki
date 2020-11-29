# -*- coding: utf-8 -*-
"""
Created on Sat Nov 21 19:35:21 2020

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
    k=k.replace('\star ','*')
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

def getTree(s):
    s=conv(s)
    s=parse_latex(s)
    e=Eq(s,0)
    t=make_tree(str(e)[2:])
    return t

def getVar(t):
    var=""
    isThereList=False
    count=0
    for i in t:
        if type(i)==list:
            isThereList=True
            break
        count=count+1
    if isThereList==True:
        for i in t[count]:
            var=getVar(t[count])
            print(var)
    else:
        for i in t:
            if i.isalpha()==True:
                print('isaplha')
                var=i
                break
    return var
def fseriesExpansion(s):
    s1=conv(s)
    expr=parse_latex(s1)
    var=getVar(getTree(s))
    fs=fourier_series(expr,(symbols(var),-pi,pi))
    F=""
    for i in range(0,3):
        if i <2:
            F=F+str(fs[i])+" + "
        else:
            F=F+str(fs[i])
    return F,var    

def getfSeries(s):
    fs,var=fseriesExpansion((s))
    x=symbols('x')
    fs=fs.replace(var,'x')
    l=latex(eval(fs),symbol_names={'x':x})
    d={"Series":fs.replace('x',var)+" + ....","latex":l.replace('x',var)+" + ...."}
    return d
    