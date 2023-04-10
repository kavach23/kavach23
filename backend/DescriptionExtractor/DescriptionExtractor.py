import sys, argparse, csv


def extract_info_sbi(s):
    s1 = []
    flag = 0
    split_val = "/"
    if (s.find("*") != -1):
        split_val = "*"
    s1 = s.split(split_val)
    print("Method : ", s1[0])

    cred_or_debit = "Credit"
    if (s1[1] == "DR"):
        cred_or_debit = "Debit"
    # print(s1)
    try:
        print("Credit/Debit", cred_or_debit)
    except:
        #do nothing
        print("---------------------------------------------------------------------------------")
        return 0

    try:
        print(("Ref No."), s1[2])
    except:
        print("---------------------------------------------------------------------------------")
        return 0

    try:
        print("To/From : ", s1[3])
    except:
        print("---------------------------------------------------------------------------------")
        return 0

    try:
        print("Id/UPI Id : ", s1[5])
    except:
        print("---------------------------------------------------------------------------------")
        return 0


def extract_info_icici(s):
    s1 = []
    flag = 0
    split_val = "/"
    s1 = s.split("/")

    if s1[0] == "UPI":
        try:
            print("Mode : ", s1[0])
        except:
            print("------------------------------------------------------------------------------------")
            return 0
        try:
            print("Trans id : ", s1[1])
        except:
            print("------------------------------------------------------------------------------------")
            return 0
        try:
            print("Remarks : ", s1[2])
        except:
            print("------------------------------------------------------------------------------------")
            return 0
        try:
            print("UPI Id : ", s1[3])
        except:
            print("------------------------------------------------------------------------------------")
            return 0
        try:
            print("Bank Name : ", s1[4])
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

#extract_info_sbi("BY TRANSFERNEFT*PUNB0123820*PUNBH23076622379*IIITBANGALORE*-", "file.xls")