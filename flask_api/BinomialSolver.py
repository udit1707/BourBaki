# -*- coding: utf-8 -*-
"""
Created on Sun Nov  8 15:05:48 2020

@author: Arsh
"""
import math

def RepresentInt(x):
    try:
        int(x)
        return True
    except ValueError:
        return False

def stringPreprocess(s):
    l=s.strip()
    t=[1]
    isNegative=False
    for a in l:
        if  a=='(' or a==')' or a=='^' or a=='+':
            continue
        elif a=='-':
            isNegative=True
            continue
        elif RepresentInt(a)==True:
            x=int(a)
            if isNegative==True:
                x=-x
                isNegative=False
            if len(t)==1 or len(t)==0:
                t[0]=x
            else:
                t.append(x)
        else:
            t.append(a)
    return(t)
def combination(n,r):
    N=math.factorial(abs(n))
    R=math.factorial(abs(r))
    R2=math.factorial(abs(n)-abs(r))
    return(N/(R*R2))
def rationalCombination(n,r):
    R=math.factorial(r)
    N=1
    for i in range(0,r):
       N=N*(n-i)
    return N/R
def positiveBinomial(d):
    bs={'coefficients':'','series':''}
    l=[]
    s=''
    for i in range(0,d['exponent']+1):
        print(i)
        print(d['exponent'])
        print('----')
        r=combination(d['exponent'],i)
        print(r)
        r=r*int(math.pow(d['coeff of variable'],i))*int(math.pow(d['constant'],d['exponent']-i))
        print(r)
        print('----')
        l.append(r)
        s=s+str(r)+d['variable']+'^'+str(i)+' + '
    bs['coefficients']=l
    bs['series']=s[:-3]
    return bs
def preCondition(d):
    b={"variable":"","constant":0,'coeff of variable':0,"exponent":0}
    b['variable']=d['variable']
    b['constant']=d['constant']/d['constant']
    b['coeff of variable']=d['coeff of variable']/d['constant']
    b['exponent']=d['exponent']
    return b
def nonPositiveBionomal(d,numOfTerms=10):
    b=preCondition(d)
    bs={'coefficients':'','series':''}
    l=[]
    s=''
    for i in range(0,numOfTerms):
        r=rationalCombination(b['exponent'],i
                             )
        r=r*math.pow(b['coeff of variable'],i)
        l.append(r)
        s=s+str(r)+d['variable']+'^'+str(i)+' + '
    bs['coefficients']=l
    bs['series']=s[:-3]
    return bs

def list2dict(t):
    d={"coeff of variable":t[0],"variable":t[1],"constant":t[2],"exponent":t[3]}
    return(d)

def binomialCalculate(s):
    t=stringPreprocess(s)
    d=list2dict(t)
    bs=[]
    if(d['exponent']>=0):
        bs=positiveBinomial(d)
    else:
        bs=nonPositiveBionomal(d)
    return bs
    