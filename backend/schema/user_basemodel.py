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
