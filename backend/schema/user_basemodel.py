from pydantic import BaseModel
from typing import Optional


class UserBaseModel(BaseModel):
    id: Optional[int] = None
    username: str
    email: str
    full_name: Optional[str] = None
    disabled: Optional[bool] = None
    hashed_password: str | None = None

    def __str__(self) -> str:
        return self.username
    
    def __repr__(self) -> str:
        return self.username
    
    def __eq__(self, value) -> bool:
        return self.username == value.username
    
    def to_dict(self) -> dict[str, str | int | bool]:
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "full_name": self.full_name,
            "disabled": self.disabled,
            "hashed_password": self.hashed_password
        }
