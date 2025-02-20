from typing import Literal, Set
from pip._vendor.typing_extensions import List


class DBSeeder:

    def __init__(self, db):
        self.db = db

    def seed(self, data: List|Set) -> Literal[True]:
        for item in data:
            self.db.add(item)
        self.db.commit()
        self.db.close()
        return True
