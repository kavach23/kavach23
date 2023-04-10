import models.Transaction

class Entity:
    counter = 1
    def __init__(self, name = None, acnum = None, phnum = None, upiid = None, ifsc = None, bank = None, upiVendor = None):
        self.id = Entity.counter
        Entity.counter += 1
        self.name = name
        self.acnum = acnum
        self.phnum = phnum
        self.upiid = upiid
        self.ifsc = ifsc
        self.bank = bank
        self.upiVendor = upiVendor
        self.transactions = []
        self.moneyin = 0
        self.moneyout = 0
        
    def addTransaction(self, transactions):
        for transaction in transactions:
            self.transactions.append(transaction)
            if transaction["from "] == self.id:
                self.moneyout += transaction.value
            else:
                self.moneyin += transaction.value
        
    