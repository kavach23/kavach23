import pandas as pd
import csv
from DescriptionExtractor.DescriptionExtractor import *

from pdf2image import convert_from_path
from ImageExtractor.ImageExtractor import ImageRecord


class PdfRecord:
    def __init__(self, pdfpath):
        self.pdfpath = pdfpath
        self.pageimages = []
        self.convert()
        
    def convert(self):
        pages = convert_from_path(self.pdfpath)
        i = 1
        for page in pages:
            imgpath = 'images/img' + str(i)+'.png'
            page.save(imgpath, 'PNG')
            i += 1
    
        for j in range(1, i):
            imgRecord = ImageRecord('images/img' + str(j)+'.png')
            df = imgRecord.process()
            # imgRecord.extractMetadata()
            str1 = df[2].to_string()
            extract_info_sbi(df.iat[3,2])
            self.pageimages.append(imgRecord)
            
    def processTransactions(self):
        # initialize some df here, in each iteration, add extracted rows to this df
        for page in self.pageimages:
            page.process()
        #finally return this df
            
    def extractMetadata(self):
        if len(pages):
            page = self.pageimages[0]
            return page.extractMetadata()
