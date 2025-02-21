from database.elasticsearching import Elastic
from dotenv import load_dotenv
import os

load_dotenv()

elastic_password = os.getenv("ELASTIC_PASSWORD")
print(elastic_password)

elastic = Elastic("https://85.202.160.193:9200/", "elastic", elastic_password)
