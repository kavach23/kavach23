# import tabula as tb
import pandas as pd
import csv

# import camelot
from pdf2image import convert_from_path
from ImageExtractor.ImageExtractor import ImageRecord


class PdfRecord:
    def __init__(self, pdfpath):
        self.pdfpath = pdfpath

    def process(self):
        pages = convert_from_path(self.pdfpath)
        i = 1
        for page in pages:
            page.save('images/img' + str(i)+'.png', 'PNG')
            i += 1

        for j in range(1, i):
            imgRecord = ImageRecord('images/img' + str(j)+'.png')
            # df = imgRecord.process()
            imgRecord.extractMetadata()
            # print(df)
