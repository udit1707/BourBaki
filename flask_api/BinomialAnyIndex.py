# -*- coding: utf-8 -*-
"""
Created on Thu Nov 19 19:17:10 2020

@author: Arsh
"""

from sympy.parsing.sympy_parser import parse_expr
from sympy.parsing.latex import parse_latex
from sympy import *
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
            var=getVar(i)
            print(var)
    else:
        for i in t:
            if i.isalpha()==True:
                print('isaplha')
                var=i
                break
    return var
def preProceessBinomisl(s):
    temp=s.split("^")
    power=float(parse_latex(conv(temp[1])))
    var=getVar(getTree(temp[0]))
    temp[0]=str(parse_latex(conv(temp[0][2:-1])))
    print(temp[0])
    if temp[0].find("*")==-1:
        print(s)
        temp[0]=temp[0].replace(var,"1 "+var)
        print(temp[0])
    if int(power)==power:
        expr="("+temp[0]+")^{"+str(int(power))+"}"
    else:
        expr="("+temp[0]+")^{"+str(power)+"}"
    print(expr)
    return expr,power,var

    
def bionomialSolver(s):
    s,power,var=preProceessBinomisl(s)
    expr=parse_latex(conv(s))
    print(str(expr))
    i=int(power)
    bs=[]
    if power>=0:
        if power-i==0:
            bs=expr.series(symbols(var),0,i+1)
        else:
            bs=expr.series(symbols(var),0,6)
    else:
        bs=expr.series(symbols(var),0,6)
        
    return bs,var
def getBinomialEquation(s):
    S,var=bionomialSolver(s)
    a=symbols(var)
    x=symbols('x')
    S=str(S).replace(var,'x')
    l=latex(eval(S),symbol_names={"x":x})
    bS={"Series":S.replace('x',var),"latex":l.replace('x', var)}
    return bS
    