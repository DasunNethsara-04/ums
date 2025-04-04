from pydantic import BaseModel


class RoleBaseModel(BaseModel):
    id: int
    role: str

    def __str__(self) -> str:
        return self.role
    
    def __repr__(self) -> str:
        return self.role
    
    def __eq__(self, value) -> bool:
        return self.role == value.role
