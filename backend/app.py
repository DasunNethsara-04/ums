from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from database.database import Base, get_db, engine
from models import User
from routes import auth, user, admin

# initialize the main FastAPI application
app = FastAPI()

# include routes
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(admin.router)

# middlewares
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# app.add_middleware(RateLimitMiddleware)


@app.on_event("startup")
async def on_startup() -> None:
    Base.metadata.create_all(bind=engine)
    # db = next(get_db())
    # DBSeeder(db).seed(RoleFactory().create())


@app.get("/")
async def index() -> dict[str, str]:
    return {"message": "Hello, World!"}
