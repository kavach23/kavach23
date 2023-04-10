from ImageExtractor.ImageExtractor import ImageRecord
from PdfExtractor.PdfExtractor import PdfRecord

from flask import Flask, request
from flask_restful import Api, Resource, reqparse, abort
from flask_cors import CORS

import json

from models.Entity import Entity
from models.Transaction import Transaction

app = Flask(__name__)
CORS(app)
api = Api(app)

pdf_put_args = reqparse.RequestParser()
pdf_put_args.add_argument("path", type=str, help = "Please provide a path")

img_put_args = reqparse.RequestParser()
img_put_args.add_argument("path", type=str, help = "Please provide a path")

alltransactions = []

class Pdf(Resource):
    def post(self):
        args = pdf_put_args.parse_args()
        pdfpath = args["path"]
        print("Called")
        pdfRecord = PdfRecord(pdfpath)
        # print("PDFRECORD : ", pdfRecord)
        print("RESULTS : ", pdfRecord.result)

        entity_list = []

        metadata = pdfRecord.extractMetadata()
        print("METADATA : ", metadata)
        acc = ""
        accnum = ""
        ifs = ""

        try:
            acc = metadata["Account Name"]
        except:
            acc = None

        try:
            accnum =  metadata["Account Number"]
        except:
            accnum = None

        try:
            ifs = metadata["IFS Code"]
        except:
            ifs = None

        bank = ""
        try:
            bank = ifs[:4]
        except:
            bank = None

        self1 = Entity(acc,accnum,None,None, ifs, bank)

        entities = [self1]
        
        transactions = []

        transactions = pdfRecord.processTransactions()

        for el in transactions:
            for entity in entities:
                if (el[])

        for i in range(len(transactions)):
            el = transactions[i]
            transactions[i] = json.dumps(el)

        print("TRANSACTION : ", transactions)
        self1.addTransaction(transactions)

        # for el in pdfRecord.result:
        #     self1 = Entity(None, None, None, el["Id/UPI Id"],None,None,el['To/From'])
        #     other = Entity(el['To/From'], None, None, el["Id/UPI Id"], None, el["Other Bank"], el['To/From'])
        #     entity_list.append([json.dumps(self1.__dict__),json.dumps(other.__dict__)])
    

        # print(entity_list)

        # metadata = pdfRecord.extractMetadata()
        return "Table extracted successfully", 200
    
class Image(Resource):
    def post(self):
        args = img_put_args.parse_args()
        imgpath = args["path"]
        imgRecord = ImageRecord(imgpath)
        df = imgRecord.process()
        print(df)
        return "Table extracted successfully", 200
    
api.add_resource(Pdf, '/pdf')
api.add_resource(Image, '/img')

if __name__ == '__main__':
    app.run(debug = True)