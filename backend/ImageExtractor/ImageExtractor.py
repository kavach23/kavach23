import cv2
import numpy as np
import pandas as pd
import pytesseract
import csv
import matplotlib.pyplot as plt
import re

def sort_contours(cnts, method="left-to-right"):    
    reverse = False
    i = 0
    if method == "right-to-left" or method == "bottom-to-top":
        reverse = True
    if method == "top-to-bottom" or method == "bottom-to-top":
        i = 1
    boundingBoxes = [cv2.boundingRect(c) for c in cnts]
    (cnts, boundingBoxes) = zip(*sorted(zip(cnts, boundingBoxes),
    key=lambda b:b[1][i], reverse=reverse))
    return (cnts, boundingBoxes)

class ImageRecord:
    def __init__(self, imagepath, bank):
        self.imagepath = imagepath
        self.image = cv2.imread(imagepath, 0)
        self.bank = bank
        
    def process(self):
        pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'
        img = self.image
        thresh,img_bin = cv2.threshold(img,128,255,cv2.THRESH_BINARY |cv2.THRESH_OTSU)
        img_bin = 255-img_bin
        img = img_bin
        kernel_len = np.array(img).shape[1]//100
        ver_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, kernel_len))
        hor_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (kernel_len, 1))
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2))
        image_1 = cv2.erode(img_bin, ver_kernel, iterations=3)
        
        vertical_lines = cv2.dilate(image_1, ver_kernel, iterations=3)
        image_2 = cv2.erode(img_bin, hor_kernel, iterations=3)
        horizontal_lines = cv2.dilate(image_2, hor_kernel, iterations=3)
        img_vh = cv2.addWeighted(vertical_lines, 0.5, horizontal_lines, 0.5, 0.0)
        img_vh = cv2.erode(~img_vh, kernel, iterations=2)
        thresh, img_vh = cv2.threshold(img_vh,128,255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
        bitxor = cv2.bitwise_xor(img,img_vh)
        bitnot = cv2.bitwise_not(bitxor)
        contours, hierarchy = cv2.findContours(img_vh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        contours, boundingBoxes = sort_contours(contours, method="top-to-bottom")
        heights = [boundingBoxes[i][3] for i in range(len(boundingBoxes))]
        mean = np.mean(heights)
        box = []
        for c in contours:
            x, y, w, h = cv2.boundingRect(c)    
            if (w<1000 and h<500):
                image = cv2.rectangle(img,(x,y),(x+w,y+h),(0,255,0),2)
                box.append([x,y,w,h])
                
        row=[]
        column=[]
        j=0
        for i in range(len(box)):    
            if(i==0):
                column.append(box[i])
                previous=box[i]    
            else:
                if(box[i][1]<=previous[1]+mean/2):
                    column.append(box[i])
                    previous=box[i]            
                    if(i==len(box)-1):
                        row.append(column)        
                else:
                    row.append(column)
                    column=[]
                    previous = box[i]
                    column.append(box[i])
                    
        countcol = 0
        for i in range(len(row)):
            ctcol = len(row[i])
            if ctcol > countcol:
                countcol = ctcol
                
        center = [int(row[i][j][0]+row[i][j][2]/2) for j in range(len(row[i])) if row[0]]
        center=np.array(center)
        center.sort()
        
        finalboxes = []
        for i in range(len(row)):
            lis=[]
            for k in range(countcol):
                lis.append([])
            for j in range(len(row[i])):
                diff = abs(center-(row[i][j][0]+row[i][j][2]/4))
                minimum = min(diff)
                indexing = list(diff).index(minimum)
                lis[indexing].append(row[i][j])
            finalboxes.append(lis)
            
        outer=[]
        for i in range(len(finalboxes)):
            for j in range(len(finalboxes[i])):
                inner=''
                if(len(finalboxes[i][j])==0):
                    outer.append(' ')        
                else:
                    for k in range(len(finalboxes[i][j])):
                        y,x,w,h = finalboxes[i][j][k][0],finalboxes[i][j][k][1], finalboxes[i][j][k][2],finalboxes[i][j][k][3]
                        finalimg = bitnot[x:x+h, y:y+w]
                        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 1))
                        border = cv2.copyMakeBorder(finalimg,2,2,2,2,cv2.BORDER_CONSTANT,value=[255,255])
                        resizing = cv2.resize(border, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
                        dilation = cv2.dilate(resizing, kernel,iterations=1)
                        erosion = cv2.erode(dilation, kernel,iterations=1)
                        out = pytesseract.image_to_string(erosion)
                        if(len(out)==0):
                            out = pytesseract.image_to_string(erosion, config='--psm 3')
                        inner = inner +" "+ out            
                    outer.append(inner)
        arr = np.array(outer)
        dataframe = pd.DataFrame(arr.reshape(len(row),countcol))
        return dataframe
    
    def extractMetadata(self):
        pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'
        img = self.image
        thresh,img_bin = cv2.threshold(img,128,255,cv2.THRESH_BINARY |cv2.THRESH_OTSU)
        
        out = pytesseract.image_to_string(img_bin)
        print(out)
        if self.bank == "SBI":
            matches = []
            keys = [
                "Account[. \n]*Name[. \n]*:",
                "Address[. \n]*:",
                "Date[. \n]*:",
                "Account[. \n]*Number[. \n]*:",
                "Account[. \n]*Description[. \n]*:",
                "Branch[. \n]*:",
                "Drawing[. \n]*Power[. :\n]*",
                "Interest[. \n]*Rate[. :\n]*",
                "MOD[. \n]*Balance[. :\n]*",
                "CIF[. \n]*No.[. :\n]*",
                "IFS[. \n]*Code[. :\n]*",
                "MICR[. \n]*Code[. :\n]*",
            ]
            
            humanKeys = [
                "Account Name", "Address", "Date", "Account Number", "Account Description", "Branch", "Drawing Power", "Interest Rate", "MOD Balance", "CIF Number", "IFS Code", "MICR Code"
            ]
            for key in keys:
                matches.append(re.search(key, out))
                
            data = {}
            for i in range(len(matches) - 1):
                if matches[i] is None or matches[i + 1] is None:
                    continue
                curr = matches[i].span()
                nxt = matches[i+1].span()
                value = out[curr[1] : nxt[0]]
                value = re.sub("\n", "", value)
                data[humanKeys[i]] = value
            print(data)
            return data
        
        elif self.bank == "ICICI":
            matches = []
            keys = [
                "Account[. \n]*Number[. \n]*",
                "Transaction[. \n]*Date[. \n]*",
            ]
            for key in keys:
                matches.append(re.search(key, out))
            details = ""
            for i in range(len(matches) - 1):
                if matches[i] is None or matches[i + 1] is None:
                    continue
                curr = matches[i].span()
                nxt = matches[i+1].span()
                value = out[curr[1] : nxt[0]]
                details = value
            details = list(details.split('-'));
            for i in range(len(details)):
                details[i] = details[i].strip("\n")
                details[i] = details[i].strip(" ")
            data = {}
            try:
                data["Account Number"] = details[0]
                print(data["Account Number"])
                data["Account Number"] = re.sub(r'[A-Z()]','',data["Account Number"])
            except:
                data["Account Number"] = None
            try:
                data["Account Name"] = details[1]
            except:
                data["Account Name"] = None
            return data
                
    def show(self):
        plot = plt.imshow(self.image)
        plt.show()
        
    def showModified(self):
        plot = plt.imshow(self.mod)
        plt.show()
        
    
        