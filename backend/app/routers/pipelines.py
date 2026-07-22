from fastapi import APIRouter
from app.models.pipeline import Pipeline
from app.services.graph import analyze_pipeline

router = APIRouter(prefix="/pipelines", tags=["pipelines"])

@router.post('/parse')
def parse_pipeline(pipeline: Pipeline):
    result = analyze_pipeline(pipeline.nodes, pipeline.edges)
    return result
