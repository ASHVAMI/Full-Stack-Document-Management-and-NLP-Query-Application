from unstructured.partition.auto import partition
from langchain_openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores.redis import Redis
from app.core.config import settings

class DocumentProcessor:
    def __init__(self):
        self.embeddings = OpenAIEmbeddings(openai_api_key=settings.OPENAI_API_KEY)
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
        )
        self.redis_url = f"redis://{settings.REDIS_HOST}:{settings.REDIS_PORT}"

    async def process_document(self, file_path: str, content_type: str) -> str:
        # Extract text using unstructured
        elements = partition(file_path)
        text = "\n\n".join([str(el) for el in elements])
        
        # Split text into chunks
        chunks = self.text_splitter.split_text(text)
        
        # Create vector store
        Redis.from_texts(
            texts=chunks,
            embedding=self.embeddings,
            redis_url=self.redis_url,
            index_name=f"doc_{hash(file_path)}"
        )
        
        return text