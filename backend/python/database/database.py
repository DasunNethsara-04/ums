from typing import Any, Generator
from sqlalchemy import Engine, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.orm.session import Session
from sqlalchemy_utils import database_exists, create_database

engine: Engine = create_engine("mysql+pymysql://root@localhost:3306/ums")
if not database_exists(engine.url):
    create_database(engine.url)

session = sessionmaker(bind=engine)

Base = declarative_base()

def get_db() -> Generator[sessionmaker, Any, None]:
    db: Session = session()
    try:
        yield db
    finally:
        db.close()
