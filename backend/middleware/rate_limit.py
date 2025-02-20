from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request, Response
from collections import defaultdict
from typing import Dict
import time


class RateLimitMiddleware(BaseHTTPMiddleware):

    def __init__(self, app) -> None:
        super().__init__(app)
        self.rate_limit_records: Dict[str, float] = defaultdict(float)
    
    async def log_message(self, message: str) -> None:
        print(message)

    async def dispatch(self, request: Request, call_next) -> Response | None:
        client_ip: str = request.client.host
        current_time: float = time.time()
        if current_time - self.rate_limit_records[client_ip] < 1:
            return Response(content="Rate limit exceeded", status_code=429)

        self.rate_limit_records[client_ip] = current_time
        path = request.url.path
        await self.log_message(f"Request to: {path} from {client_ip}")

        start_time: float = time.time()
        response: Response = await call_next(request)
        process_time: float = time.time() - start_time

        custom_header = {"X-Process-Time": str(process_time)}
        for header, value in custom_header.items():
            response.headers.append(header, value)
