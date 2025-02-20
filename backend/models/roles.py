from enum import Enum as PyEnum
from sqlalchemy import Column, Integer, Sequence, Enum
from database import Base


class RoleEnum(PyEnum):
    ADMIN = "admin"
    MAINTAINER = "maintainer"
    MODERATOR = "moderator"
    USER = "user"


class Role(Base):
    __tablename__ = "roles"

    id = Column(Integer, Sequence("role_id_seq"), primary_key=True, index=True)
    role = Column(Enum(RoleEnum))

    def to_dict(self) -> dict[str, str]:
        return {
            "id": self.id,
            "name": self.role
        }
    
    # feed automatically some data when the table was created
