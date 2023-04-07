import tabula as tb
import pandas as pd
import csv

import camelot


class PdfRecord:
    def __init__(self, pdfpath):
        self.pdfpath = pdfpath

    def process(self):
        # df = tb.read_pdf(self.pdfpath, pages="all")
        try:
            tables = camelot.read_pdf(self.pdfpath)
            tables.export('output.csv', f='csv')
        except:
            print("oops")
        # df = tb.convert_into(self.pdfpath, 'output.csv', output_format='csv', lattice=True, stream=False, pages="all")
        return tables
