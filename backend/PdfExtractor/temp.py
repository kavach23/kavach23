from PdfExtractor import PdfRecord

p = PdfRecord(
    "C:/Users/Sai Madhavan G/OneDrive - iiit-b/college/kavach/OpTransactionHistory28-03-2023.pdf")
x = p.process()

print(x)
