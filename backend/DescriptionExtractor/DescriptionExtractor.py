import sys, argparse, csv


def extract_info_sbi(s):
    s1 = []
    flag = 0
    split_val = "/"
    # print("Data " , s)
    if (s.find("*") != -1):
        split_val = "*"
    s1 = s.split(split_val)
    

    cred_or_debit = None

    result = {}

    result["Method"] = s1[0]

    if (len(s1) > 2 and s1[1] == "DR"):
       cred_or_debit = "Debit"
    elif (len(s1) > 2):
        cred_or_debit = "Credit"
    # print(s1)
    try:
        result["Credit/Debit"]  = cred_or_debit
        # result.append(s)
    except:
        #do nothing
        result["Credit/Debit"]  = None

    try:
        result["Ref No."] =  s1[2]
        # result.append(s)
    except:
        result["Ref No."] =  None

    try:
        result["To/From"] = s1[3]
        # result.append(s)
    except:
        result["To/From"] = None

    try:
        result["Id/UPI Id"] = s1[5]
    except:
        result["Id/UPI Id"] = None
    
    try:
        result["Other Bank"] = s1[4]
    except:
        result["Other Bank"] = None

    if (result["Method"].find("UPI") != -1):
        result["Mobile"] =  s1[5]
    return result


def extract_info_icici(s):
    s1 = []
    flag = 0
    split_val = "/"
    s1 = s.split("/")

    result = {}

    if s1[0] == "UPI":
        try:
            result["Mode"] =  s1[0]
            result.append(s)
        except:
            print("------------------------------------------------------------------------------------")
            return 0
        try:
            result["Trans id"] =  s1[1]
            result.append(s)
        except:
            print("------------------------------------------------------------------------------------")
            return 0
        try:
            result["Remarks"] =  s1[2]
            result.append(s)
        except:
            print("------------------------------------------------------------------------------------")
            return 0
        try:
            result["UPI Id"]=   s1[3]
            result.append(s)
        except:
            print("------------------------------------------------------------------------------------")
            return 0
        try:
            result["Bank Name"] =  s1[4]
            result.append(s)
        except:
            print("------------------------------------------------------------------------------------")
            return 0

    if s1[0] == "BIL":
        if (s1[1] == "NEFT"):
            try:
                print("Mode : ", s1[1])
            except:
                print("------------------------------------------------------------------------------------")
                return 0

            try:
                print("Trans id : ", s1[2])
            except:
                print("------------------------------------------------------------------------------------")
                return 0
            try:
                print("Account Holder : ", s1[4])
            except:
                print("------------------------------------------------------------------------------------")
                return 0
            try:
                print("IFSC : ", s1[5])
            except:
                print("------------------------------------------------------------------------------------")
                return 0
        else:
            try:
                print("Refund Reference : ", s1[1])
            except:
                print("------------------------------------------------------------------------------------")
                return 0

    if s1[0] == "MMT":
        if (s1[1] == "IMPS"):
            try:
                print("Mode : ", s1[1])
            except:
                print("--------------------------------------------------------------------------------------")
                return 0
            try:
                print("Trans id : ", s1[2])
            except:
                print("--------------------------------------------------------------------------------------")
                return 0
            try:
                print("Remarks : ", s1[3])
            except:
                print("--------------------------------------------------------------------------------------")
                return 0
            try:
                print("Account Holder : ", s1[4])
            except:
                print("--------------------------------------------------------------------------------------")
                return 0

# print(extract_info_sbi("Y TRANSFER-NEFT*PUNB0123820*PUNBH23076622379*IIITBANGALORE*-"))
#extract_info_sbi("BY TRANSFERNEFT*PUNB0123820*PUNBH23076622379*IIITBANGALORE*-", "file.xls")