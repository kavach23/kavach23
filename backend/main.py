from ImageExtractor.ImageExtractor import ImageRecord
from PdfExtractor.PdfExtractor import PdfRecord

from flask import Flask, request
from flask_restful import Api, Resource, reqparse, abort
from flask_cors import CORS

import json

from models.Entity import Entity
from models.Transaction import Transaction
from DescriptionExtractor.DescriptionExtractor import *

app = Flask(__name__)
CORS(app)
api = Api(app)

pdf_put_args = reqparse.RequestParser()
pdf_put_args.add_argument("path", type=str, help = "Please provide a path")

img_put_args = reqparse.RequestParser()
img_put_args.add_argument("path", type=str, help = "Please provide a path")

alltransactions = []

def extract_info(metadata):
    acc = ""
    accnum = ""
    ifs = ""
    bank = ""

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

    return [acc,accnum,ifs,bank]

class Pdf(Resource):
    def post(self):
        args = pdf_put_args.parse_args()
        pdfpath = args["path"]
        print("Called")
        pdfRecord = PdfRecord(pdfpath)
        transactions = pdfRecord.processTransactions()
        
        # print("PDFRECORD : ", pdfRecord)
        # print("RESULTS : ", pdfRecord.result)
        print("TRANSACTIONS : ", transactions)
        entity_list = []

        metadata = pdfRecord.extractMetadata()
        # print("METADATA : ", metadata)

        list1 = extract_info(metadata)

        acc = list1[0]
        accnum = list1[1]
        ifs = list1[2]
        bank = list1[3]

        self1 = Entity(acc,accnum,None,None, ifs, bank)

        entities = [self1]

        for el in transactions:
            flag = False
            for entity in entities:
                name = extract_info_sbi(el["Description"])["To/From"]
                # print(extract_info_sbi(el["Description"]))
                upi = extract_info_sbi(el["Description"])["Id/UPI Id"]
                # print(name, entity.name)
                if (name == entity.name and upi == entity.upiid):
                    flag = True
                
            if flag is False:
                name = extract_info_sbi(el["Description"])["To/From"]
                upi = extract_info_sbi(el["Description"])["Id/UPI Id"]

                other = Entity(name,None,None,upi)
                entities.append(other)

        for i in range(len(transactions)):
            el = transactions[i]
            transactions[i] = json.dumps(el)
        for el in entities:
            print(json.dumps(el.__dict__))

        

        
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