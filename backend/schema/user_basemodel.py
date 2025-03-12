from pydantic import BaseModel


class UserBaseModel(BaseModel):
    username: str
    role: str
    email: str
    name: str
    password: str | None = None
    disabled: bool = False

    def __str__(self) -> str:
        return self.username
    
    def __repr__(self) -> str:
        return self.username
    
    def __eq__(self, value) -> bool:
        return self.username == value.username
