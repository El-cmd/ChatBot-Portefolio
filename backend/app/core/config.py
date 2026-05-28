from __future__ import annotations

from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    groq_api_key: str | None = Field(default=None, alias="GROQ_API_KEY")
    groq_model: str = Field(default="llama-3.1-8b-instant", alias="GROQ_MODEL")
    groq_temperature: float = Field(default=0.2, alias="GROQ_TEMPERATURE")
    kb_dir: str | None = Field(default=None, alias="KB_DIR")
    kb_index_path: str | None = Field(default=None, alias="KB_INDEX_PATH")
    kb_meta_path: str | None = Field(default=None, alias="KB_META_PATH")
    kb_top_k: int = Field(default=4, alias="KB_TOP_K")
    kb_min_score: float = Field(default=0.0, alias="KB_MIN_SCORE")

    model_config = SettingsConfigDict(case_sensitive=False)


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
