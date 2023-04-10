class Transaction:
    counter = 1
    transactions = []
    
    def __init__(self, fromid, toid, transtype, value, remarks):
        self.id = counter
        counter += 1
        self.fromid = fromid
        self.toid = toid
        self.transtype = transtype
        self.value = value
        self.remarks = remarks
        
        Transaction.transactions.append(self)
        