from ImageExtractor.ImageExtractor import ImageRecord
from PdfExtractor.PdfExtractor import PdfRecord

from flask import Flask, request
from flask_restful import Api, Resource, reqparse, abort
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

pdf_put_args = reqparse.RequestParser()
pdf_put_args.add_argument("path", type=str, help = "Please provide a path")

img_put_args = reqparse.RequestParser()
img_put_args.add_argument("path", type=str, help = "Please provide a path")

class Pdf(Resource):
    def post(self):
        args = pdf_put_args.parse_args()
        pdfpath = args["path"]
        pdfRecord = PdfRecord(pdfpath)
        df = pdfRecord.process()
        print(df)
        return "Table extracted successfully", 200
    
class Image(Resource):
    def post(self):
        args = img_put_args.parse_args()
        imgpath = 'sbi1.jpg'
        imgRecord = ImageRecord(imgpath)
        df = imgRecord.process()
        print(df)
        return "Table extracted successfully", 200
    
api.add_resource(Pdf, '/pdf')
api.add_resource(Image, '/img')

if __name__ == '__main__':
    app.run(debug = True)