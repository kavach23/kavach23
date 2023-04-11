class Transaction:
    counter = 1
    transactions = []
    
    def __init__(self, fromid, toid, transtype, value, remarks, filename):
        self.id = Transaction.counter
        Transaction.counter += 1
        self.fromid = fromid
        self.toid = toid
        self.transtype = transtype
        self.value = value
        self.remarks = remarks
        self.filename = filename
        
        Transaction.transactions.append(self)
        