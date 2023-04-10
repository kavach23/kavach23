import pandas as pd
import csv
from DescriptionExtractor.DescriptionExtractor import *

from pdf2image import convert_from_path
from ImageExtractor.ImageExtractor import ImageRecord


class PdfRecord:
    result = []
    pages = []
    def __init__(self, pdfpath):
        self.pdfpath = pdfpath
        self.pageimages = []
        self.convert()
        self.pages = []
        
        
    def convert(self):
        pages = convert_from_path(self.pdfpath)
        i = 1
        result = []
        for page in pages:
            imgpath = 'images/img' + str(i)+'.png'
            page.save(imgpath, 'PNG')
            i += 1
    
        for j in range(1, i):
            imgRecord = ImageRecord('images/img' + str(j)+'.png')
            df = imgRecord.process()
            # imgRecord.extractMetadata()
            
            str1 = df[2].to_string()
            for lll in range(2,len(df.index)):
                result.append(extract_info_sbi(df.iat[lll,2]))
            self.pageimages.append(imgRecord)
        self.result = result
        # print(self.result)
            
    def processTransactions(self):
        # initialize some df here, in each iteration, add extracted rows to this df
         pages = convert_from_path(self.pdfpath)
         i = 1
         transactions = []
         for page in pages:
            imgpath = 'images/img' + str(i)+'.png'
            page.save(imgpath, 'PNG')
            i += 1
    
         for j in range(1, i):
            imgRecord = ImageRecord('images/img' + str(j)+'.png')
            df = imgRecord.process()
            
            for lll in range(2,len(df.index)):
                currtransactions = {}
                print(lll)
                currtransactions["Txn Date"] = df.iat[lll,0]
                currtransactions["Value Date"] = df.iat[lll,1]
                currtransactions["Description"] = df.iat[lll,2]
                currtransactions["Ref No./Cheque No."] = df.iat[lll,3]
                currtransactions["Debit"] = df.iat[lll,4]
                currtransactions["Credit"] = df.iat[lll,5]
                currtransactions["Balance"] = df.iat[lll,6]
                transactions.append(currtransactions)

         return transactions

        #finally return this df
            
    def extractMetadata(self):
        print(self.pages, PdfRecord.pages)
        if len(self.pageimages):
            page = self.pageimages[0]
            return page.extractMetadata()
