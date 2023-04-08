from ImageExtractor import ImageRecord

imgpath = 'Screenshot 2023-04-03 204908.png'
imgRecord = ImageRecord(imgpath)
df = imgRecord.process()
print(df)
