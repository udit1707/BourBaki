#!/usr/bin/env python
from argparse import ArgumentParser, FileType
from sys import exit, stdout
from problem import Problem

def argparser():
	desc = "Solves word problems."
	parser = ArgumentParser(description=desc)
	parser.add_argument("--input", type=FileType("r"), default="-",
						help="The question to solve")
	parser.add_argument("--output", default=stdout, type=FileType("w"),
						help="The output file. Defaults to stdout")
	parser.add_argument("--debug", action="store_true", default=False,
						help="Display debugging information")
	return parser
def preprocessString(strng):
    k=strng
    k=k.replace('\begin{array}',"")
    k=k.replace("\end{array}",'')
    k=k.replace('\text','')
    k=k.replace('{',' ')
    k=k.replace("}",' ')
    k=k.replace('\a','')
    k=k.replace('\b','')
    k=k.replace('\f','')
    k=k.replace('\n','')
    k=k.replace('\r','')
    k=k.replace('\t','')
    k=k.replace('\v','')
    k=k.replace('\left','')
    k=k.replace('\\right','')
    k=k.replace('\\',' ')
    return k

def postprocessString(s):
    s=s.replace("  ",' ')
    return s

def getSolution(s):
    #s=preprocessString(s)
    s=postprocessString(s)
    #nltk.download()
    #brain_path=r"E://Reddit Data//Zoidberg-master//Zoidberg-master//.zoidberg.brain.json"
    p=Problem(s)
    solution=p.solve()
    print(solution)
    s=str(solution)
    x=s.find("I think a = ")
    solution=s[x+len("I think a = "):x+len("I think a = ")+2]
    d={"solution":str(solution)}
    return d
'''
def main():
	args = argparser().parse_args()
	p = Problem(args.input.read(), debug=args.debug)
	p.solve()
	args.output.write(str(p))

if __name__ == "__main__":
	main()

'''