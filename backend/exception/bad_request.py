from fastapi import HTTPException


class HttpBadRequest(HTTPException):

    def __init__(self, detail: str='Bad Request') -> None:
        super().__init__(status_code=400, detail=detail)

    def __str__(self) -> str:
        return self.detail
    
    def __repr__(self) -> str:
        return f"{self.__class__.__name__}({self.detail})"
