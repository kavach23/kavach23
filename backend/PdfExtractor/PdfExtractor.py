import pandas as pd
import csv

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