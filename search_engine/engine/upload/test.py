import csv

f = open("te.csv", "rb")
fs = open("test.txt", "w")
reader = csv.reader(f)

fs.write("<?xml version=1.0 encoding=UTF-8?>"+"\n")
fs.write("<OperaMatchRequest>"+ "\n")
fs.write("<JobSeqId>129185</JobSeqId>"+ "\n")
fs.write("<MatchRequestDate>2017-12-04T09:13:11</MatchRequestDate>"+"\n")
fs.write("<MatchProfile>D4</MatchProfile>"+"\n")
fs.write("<MerchantList>"+"\n")
i = 1
for row in reader:
    print row
    if i==1:
        i = i+1
        continue
    else:
        fs.write("<Merchant>"+"\n")
        fs.write("<JobMerchSeqId>"+str(i)+"</JobMerchSeqId>"+"\n")
        fs.write("<Name>"+row[0]+"</Name>"+"\n")
        fs.write("<Street>"+row[5]+"</Street>"+"\n")
        fs.write("<City>"+row[2]+"</City>"+"\n")
        fs.write("<StateProv>"+row[1]+"</StateProv>"+"\n")
        fs.write("<PostalCode>"+row[3]+"</PostalCode>"+"\n")
        fs.write("<Country>"+row[4]+"</Country>"+"\n")
        fs.write("<Phone/>"+"\n")
        fs.write("<TaxId/>"+"\n")
        fs.write("</Merchant>"+"\n")
    i = i+1