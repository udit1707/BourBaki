# -*- coding: utf-8 -*-
"""
Created on Sat Nov 21 21:04:57 2020

@author: Arsh
"""

from argparse import ArgumentParser, FileType
from problem import Problem
from sys import exit, stdout
from sympy.parsing.latex import parse_latex
import nltk

def preProcess(s):
    k=s
    k=k.replace('\a','')
    k=k.replace('\b','')
    k=k.replace('\f','')
    k=k.replace('\n','')
    k=k.replace('\r','')
    k=k.replace('\t','\\t')
    k=k.replace('\v','')
    k=k.replace('\left','')
    k=k.replace('\\right','')
    k=k.replace('\\text','')
    k=k.replace('{','')
    k=k.replace('}','')
    return k
    
def postProcess(s):
    s=s.strip()
    s=s.replace("  "," ")
    return s
    
def getWords(s):
    s=preProcess(s)
    #s=parse_latex(s)
    s=postProcess(s)
    return s

def getSolution(s):
    #s=getWords(s)
    brain_path=r"E://Reddit Data//Zoidberg-master//Zoidberg-master//.zoidberg.brain.json"
    #nltk.download()
    p=Problem(s,brain_path)
    solution=p.solve()
    d={"solution":solution}
    return d
