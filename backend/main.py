import itertools
import random
import uuid
from typing import List, Optional

from fastapi import FastAPI
from fastapi_pagination import Page, add_pagination, paginate
from pydantic import UUID4, BaseModel

app = FastAPI()


class Label(BaseModel):
    id: UUID4
    name: str


class LabelPut(BaseModel):
    id: UUID4


class Transaction(BaseModel):
    id: UUID4
    text: str
    source: str
    target: str
    labels: List[Label]
    amount: float


LABELS = [
    Label(id=uuid.uuid4(), name="Business"),
    Label(id=uuid.uuid4(), name="Expensable"),
    Label(id=uuid.uuid4(), name="Suspicious Transaction"),
]

TRANSACTIONS = {
    identifier: Transaction(
        id=identifier,
        text="Description " + str(i),
        source="Account A",
        target="Account " + random.choice(["B", "C", "D", "E", "F", "G"]),
        labels=random.choice(
            list(itertools.permutations(LABELS, random.randint(0, 2)))
        ),
        amount=round(random.uniform(0, 20000), 2),
    )
    for (i, identifier) in [(i, uuid.uuid4()) for i in range(180)]
}


@app.get("/labels", response_model=List[Label])
def get_labels():
    return LABELS


@app.get("/transactions", response_model=Page[Transaction])
def get_transactions():
    return paginate(list(TRANSACTIONS.values()))


@app.get("/transactions/{id}", response_model=Transaction)
def get_transaction(id: UUID4):
    return TRANSACTIONS[id]


@app.get("/transactions/{id}/labels", response_model=List[Label])
def get_transaction_labels(id: UUID4):
    return TRANSACTIONS[id].labels


@app.put("/transactions/{id}/labels", response_model=List[Label])
def add_transaction_label(id: UUID4, label: LabelPut):
    TRANSACTIONS[id].labels += [x for x in LABELS if x.id == label.id]
    return TRANSACTIONS[id].labels


@app.delete("/transactions/{id}/labels/{label_id}", response_model=List[Label])
def remove_transaction_label(id: UUID4, label_id: UUID4):
    TRANSACTIONS[id].labels = [x for x in TRANSACTIONS[id].labels if x.id != label_id]
    return TRANSACTIONS[id].labels


add_pagination(app)
