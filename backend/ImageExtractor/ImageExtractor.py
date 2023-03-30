import cv2
import numpy as np
import pandas as pd
import pytesseract
import csv
import matplotlib.pyplot as plt

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
    def __init__(self, imagepath):
        self.imagepath = imagepath
        self.image = cv2.imread(imagepath, 0)
        
    def process(self):
        pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'
        img = self.image
        thresh,img_bin = cv2.threshold(img,128,255,cv2.THRESH_BINARY |cv2.THRESH_OTSU)
        img_bin = 255-img_bin
        
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
        dataframe.to_csv("output.csv")
        return dataframe
        
    def process2(self):
        img = self.image
        cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        thresh,img_bin = cv2.threshold(img,128,255,cv2.THRESH_BINARY)
        img_bin = 255-img_bin
        img_bin1 = 255-img
        thresh1,img_bin1_otsu = cv2.threshold(img_bin1,128,255,cv2.THRESH_OTSU)
        img_bin2 = 255-img
        thresh1,img_bin_otsu = cv2.threshold(img_bin2,128,255,cv2.THRESH_BINARY | cv2.THRESH_OTSU)
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2))
        vertical_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, np.array(img).shape[1]//100))
        eroded_image = cv2.erode(img_bin_otsu, vertical_kernel, iterations=3)

        vertical_lines = cv2.dilate(eroded_image, vertical_kernel, iterations=3)
        
        hor_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (np.array(img).shape[1]//100, 1))
        horizontal_lines = cv2.erode(img_bin, hor_kernel, iterations=5)
        
        horizontal_lines = cv2.dilate(horizontal_lines, hor_kernel, iterations=5)

        vertical_horizontal_lines = cv2.addWeighted(vertical_lines, 0.5, horizontal_lines, 0.5, 0.0)
        vertical_horizontal_lines = cv2.erode(~vertical_horizontal_lines, kernel, iterations=3)

        thresh, vertical_horizontal_lines = cv2.threshold(vertical_horizontal_lines,128,255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)

        bitxor = cv2.bitwise_xor(img,vertical_horizontal_lines)
        bitnot = cv2.bitwise_not(bitxor)
        
        contours, hierarchy = cv2.findContours(vertical_horizontal_lines, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        boundingBoxes = [cv2.boundingRect(contour) for contour in contours]
        (contours, boundingBoxes) = zip(*sorted(zip(contours, boundingBoxes),key=lambda x:x[1][1]))
        
        boxes = []
        for contour in contours:
            x, y, w, h = cv2.boundingRect(contour)
            if (w<1000 and h<500):
                image = cv2.rectangle(img,(x,y),(x+w,y+h),(0,255,0),2)
                boxes.append([x,y,w,h])
        rows=[]
        columns=[]
        heights = [boundingBoxes[i][3] for i in range(len(boundingBoxes))]
        mean = np.mean(heights)
        columns.append(boxes[0])
        previous=boxes[0]
        for i in range(1,len(boxes)):
            if(boxes[i][1]<=previous[1]+mean/2):
                columns.append(boxes[i])
                previous=boxes[i]
                if(i==len(boxes)-1):
                    rows.append(columns)
            else:
                rows.append(columns)
                columns=[]
                previous = boxes[i]
                columns.append(boxes[i])
        row = rows[-1]
        total_cells=0
        for i in range(len(row)):
            if len(row[i]) > total_cells:
                total_cells = len(row[i])
        print(total_cells)
        center = [int(rows[i][j][0]+rows[i][j][2]/2) for j in range(len(rows[i])) if rows[0]]
        center=np.array(center)
        center.sort()
        
        boxes_list = []
        for i in range(len(rows)):
            l=[]
            for k in range(total_cells):
                l.append([])
            for j in range(len(rows[i])):
                diff = abs(center-(rows[i][j][0]+rows[i][j][2]/4))
                minimum = min(diff)
                indexing = list(diff).index(minimum)
                if indexing < len(l):
                    l[indexing].append(rows[i][j])
                else:
                    l[len(l) - 1].append(rows[i][j])
            boxes_list.append(l)
            
        pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'
        dataframe_final=[]
        for i in range(len(boxes_list)):
            for j in range(len(boxes_list[i])):
                s=''
                if(len(boxes_list[i][j])==0):
                    dataframe_final.append(' ')
                else:
                    for k in range(len(boxes_list[i][j])):
                        y,x,w,h = boxes_list[i][j][k][0],boxes_list[i][j][k][1], boxes_list[i][j][k][2],boxes_list[i][j][k][3]
                        roi = bitnot[x:x+h, y:y+w]
                        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 1))
                        border = cv2.copyMakeBorder(roi,2,2,2,2, cv2.BORDER_CONSTANT,value=[255,255])
                        resizing = cv2.resize(border, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
                        dilation = cv2.dilate(resizing, kernel,iterations=1)
                        erosion = cv2.erode(dilation, kernel,iterations=2)                
                        out = pytesseract.image_to_string(erosion)
                        if(len(out)==0):
                            out = pytesseract.image_to_string(erosion)
                        s = s +" "+ out
                    dataframe_final.append(s)

        arr = np.array(dataframe_final)
        dataframe = pd.DataFrame(arr.reshape(len(rows), total_cells))
        dataframe.to_csv("output.csv")
        return dataframe
        
    def show(self):
        plot = plt.imshow(self.image)
        plt.show()
        
    def showModified(self):
        plot = plt.imshow(self.mod)
        plt.show()
        
    
        