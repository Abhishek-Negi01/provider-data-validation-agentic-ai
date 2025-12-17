"""
Healthcare Provider Validation API
FastAPI backend orchestrating AI agents for provider data validation

Agent Flow:
1. Data Extraction Agent → Parse uploaded file
2. Validation Agent → Check against rules/registries
3. Confidence Scoring Agent → Generate confidence scores
"""
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import uuid

from agents.data_extraction_agent import extract_provider_data
from agents.validation_agent import validate_provider
from agents.confidence_agent import calculate_confidence

app = FastAPI(title="Healthcare Provider Validation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage (replace with PostgreSQL/DynamoDB in production)
validation_runs = []

@app.post("/api/validate")
async def validate_providers(file: UploadFile = File(...)):
    """
    Main validation endpoint - orchestrates all AI agents.
    
    Flow: Upload → Extract → Validate → Score → Return Results
    """
    content = await file.read()
    file_content = content.decode('utf-8')
    
    # AGENT 1: Extract provider data from uploaded file
    providers = extract_provider_data(file_content)
    
    # Process each provider through AGENT 2 & 3
    results = []
    for provider in providers:
        # AGENT 2: Validate provider against rules/registries
        validation_result = validate_provider(provider)
        
        # AGENT 3: Calculate confidence score
        confidence_score = calculate_confidence(provider, validation_result)
        
        results.append({
            "provider_id": provider.get('provider_id', 'N/A'),
            "name": provider['name'],
            "specialty": provider['specialty'],
            "address": provider['address'],
            "phone": provider.get('phone', 'N/A'),
            "email": provider.get('email', 'N/A'),
            "license_number": provider.get('license_number', 'N/A'),
            "last_updated": provider.get('last_updated', 'N/A'),
            "status": 'Valid' if validation_result['is_valid'] else 'Flagged',
            "confidence_score": confidence_score,
            "issues": validation_result['issues'],
            "suggested_values": validation_result['suggested_values']
        })
    
    # Create validation run record
    run = {
        "run_id": str(uuid.uuid4())[:8],
        "timestamp": datetime.now().isoformat(),
        "total_providers": len(results),
        "validated": sum(1 for r in results if r['status'] == 'Valid'),
        "flagged": sum(1 for r in results if r['status'] == 'Flagged'),
        "results": results
    }
    
    validation_runs.append(run)
    return run

@app.get("/api/runs")
async def get_validation_runs():
    """Get all validation runs"""
    return validation_runs

@app.post("/api/review/{run_id}/{provider_id}")
async def review_provider(run_id: str, provider_id: str, action: str):
    """
    Manual review action (approve/reject).
    
    Approve: Mark as validated, set confidence to 100
    Reject: Keep flagged status
    """
    for run in validation_runs:
        if run['run_id'] == run_id:
            for result in run['results']:
                if result['provider_id'] == provider_id:
                    if action == 'approve':
                        result['status'] = 'Valid'
                        result['confidence_score'] = 100
                        result['issues'] = []
                        
                        # Update run metrics
                        run['validated'] = sum(1 for r in run['results'] if r['status'] == 'Valid')
                        run['flagged'] = sum(1 for r in run['results'] if r['status'] == 'Flagged')
                    
                    return {"status": "success", "action": action}
    
    return {"status": "error", "message": "Provider not found"}

@app.get("/")
async def root():
    return {
        "message": "Healthcare Provider Validation API",
        "version": "1.0.0",
        "agents": ["Data Extraction", "Validation & Matching", "Confidence Scoring"]
    }
