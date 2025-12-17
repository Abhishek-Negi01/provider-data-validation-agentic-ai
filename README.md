# Agentic AI–Driven Healthcare Provider Data Validation System

**Team BsinEZ | EY Techathon 2024**

## Project Overview

Healthcare provider directories are plagued with inaccuracies—outdated addresses, incorrect phone numbers, missing credentials, and mismatched specialties. These errors create significant operational challenges for healthcare payers, leading to claim processing delays, compliance violations, and frustrated patients who cannot reach their providers.

Manual validation of provider data is time-intensive, error-prone, and doesn't scale with the volume of provider information that needs continuous verification. Healthcare organizations need an intelligent, automated solution that can continuously verify and update provider directory data while maintaining human oversight for compliance.

This prototype demonstrates an **Agentic AI-driven validation system** that automates the detection of data inconsistencies, validates provider information against multiple sources, and provides confidence-scored recommendations for human reviewers. The system reduces operational effort while improving data accuracy and patient access to care.

## Solution Summary

Our solution employs an **Agentic AI architecture** where specialized AI agents work collaboratively to validate healthcare provider data:

1. **Data Extraction Agent** - Intelligently parses provider information from various document formats
2. **Validation & Matching Agent** - Cross-references provider data against public registries and databases
3. **Confidence Scoring Agent** - Assigns trust scores to validation results based on multiple data signals

Provider data flows through this AI pipeline automatically, with flagged records routed to human reviewers for final approval. This **human-in-the-loop** approach ensures compliance requirements are met while dramatically reducing manual workload.

The system processes uploaded provider files, identifies inconsistencies, suggests corrections, and presents findings through an intuitive admin dashboard designed for healthcare payer operations teams.

## System Architecture

### Frontend Layer
- **Admin Dashboard**: React 18 with Tailwind CSS providing a professional interface for healthcare administrators
- **Responsive Design**: Desktop-optimized for operational workflows
- **Real-time Updates**: Dynamic metrics and validation status tracking

### Backend API Layer  
- **FastAPI Framework**: High-performance Python backend with REST endpoints
- **Agent Orchestration**: Coordinates the flow of data through AI validation agents
- **Result Management**: Handles validation runs, manual reviews, and audit trails

### Agentic AI Layer
- **Modular Agent Design**: Each AI agent operates independently and can be upgraded separately
- **Scalable Processing**: Handles individual records or batch uploads
- **Confidence Scoring**: Multi-signal approach to validation reliability

### Data Layer
- **Flexible Input**: Supports CSV, JSON, and extensible to PDFs and images
- **Structured Output**: Standardized provider records with validation metadata
- **Audit Trail**: Complete history of validation decisions and manual reviews

## Agentic AI Design (Current Implementation)

### Data Extraction Agent
**Current Implementation**: Rule-based CSV parsing that extracts structured provider information including ID, name, specialty, address, phone, email, license number, and last updated date.

**Future AI Integration**: 
- AWS Textract for PDF document parsing
- OpenAI GPT-4 Vision for handwritten forms and complex documents
- Custom NLP models for unstructured provider data extraction

### Validation & Matching Agent  
**Current Implementation**: Rule-based validation checking for missing emails, invalid phone formats, outdated records, and required field completeness.

**Future AI Integration**:
- Real-time NPI Registry API integration for provider verification
- AWS Bedrock Claude for intelligent fuzzy matching of provider names and addresses
- NPPES database cross-referencing for credential validation
- State licensing board API integration for license verification

### Confidence Scoring Agent
**Current Implementation**: Algorithmic scoring based on validation results (90-100% for clean records, 50-70% for flagged records with issue-based score reduction).

**Future AI Integration**:
- Machine learning model trained on historical validation outcomes
- AWS SageMaker deployment for real-time confidence prediction
- Multi-signal scoring incorporating data freshness, source reliability, and historical accuracy
- Feedback loop integration from manual review decisions

## Application Screens & User Flow

### Admin Dashboard
The main interface displays key metrics (Total Providers, Validated, Flagged) with visual indicators and success rates. Healthcare administrators can upload provider data files and monitor validation runs in real-time. The dashboard provides immediate visibility into data quality trends and processing status.

### Validation Results Screen
Presents a comprehensive table of all processed providers with validation status, confidence scores, and detailed provider information. Color-coded status indicators (green for validated, red for flagged) enable quick assessment. Confidence scores are displayed as visual progress bars for immediate comprehension.

### Manual Review Screen
For flagged providers, displays AI-detected issues alongside current and suggested values in a side-by-side comparison format. Human reviewers can approve AI recommendations or reject them, maintaining compliance control while benefiting from AI efficiency. All review decisions are logged for audit purposes.

## Dummy Data & Validation Logic

### Provider Dataset Structure
The prototype includes 22 realistic provider records with complete information across 8 fields: Provider ID, Name, Specialty, Address, Phone, Email, License Number, and Last Updated Date.

### Intentional Data Issues
To demonstrate validation capabilities, the dataset includes realistic problems:
- **Missing Email Addresses**: 4 providers (P004, P011, P017, P022)
- **Invalid Phone Formats**: 2 providers with incorrect digit counts (P008, P015)  
- **Outdated Records**: 6 providers with 2023 last-updated dates
- **Multiple Issues**: Some providers have combinations of problems

### Validation Logic Simulation
The system applies healthcare-specific validation rules:
- Email presence and format validation
- Phone number standardization (10-digit requirement)
- Record freshness checks (flags pre-2024 updates)
- Required field completeness verification
- Confidence scoring based on issue severity and count

## Technology Stack

**Frontend Technologies**
- React 18 with functional components and hooks
- Tailwind CSS v3 for responsive, professional styling
- Modern JavaScript (ES6+) with fetch API for backend communication

**Backend Technologies**  
- Python 3.10+ with FastAPI framework
- CORS-enabled REST API architecture
- Pydantic for data validation and serialization
- Uvicorn ASGI server for high-performance deployment

**AI Architecture**
- Modular agent design pattern for independent AI component upgrades
- Rule-based validation logic as placeholder for ML models
- Extensible confidence scoring framework

**Data Management**
- In-memory storage for demonstration purposes
- CSV file processing with extensibility to multiple formats
- Structured JSON responses for frontend consumption

## Running the Prototype

### Prerequisites
- Python 3.10 or higher
- Node.js 16+ with npm
- Modern web browser

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend Setup  
```bash
cd frontend
npm install
npm start
```

### Testing the System
1. Navigate to `http://localhost:3000`
2. Upload the sample CSV file from `backend/data/sample_providers.csv`
3. Review validation results and confidence scores
4. Test manual review workflow on flagged providers
5. Observe real-time dashboard metric updates

## Future Enhancements

### AI Model Integration
- Replace dummy agents with production AI models (AWS Bedrock, OpenAI GPT-4)
- Implement computer vision for document processing
- Deploy machine learning models for advanced pattern recognition

### External Data Sources
- NPI Registry API integration for real-time provider verification
- Google Maps API for address standardization and validation
- State licensing board connections for credential verification
- Insurance network directory cross-referencing

### Enterprise Features
- PostgreSQL or DynamoDB for persistent data storage
- Role-based access control and user authentication
- Comprehensive audit logging for compliance requirements
- Batch processing capabilities for large provider datasets
- Real-time notifications and alerting systems

### Scalability & Performance
- Microservices architecture for independent component scaling
- Message queue integration for asynchronous processing
- Caching layers for improved response times
- Load balancing for high-availability deployments

## Hackathon Prototype Disclaimer

This submission represents a foundational prototype developed for EY Techathon 2024. The current implementation uses simulated AI agents and dummy data to demonstrate system architecture, user experience, and technical feasibility.

**Key Prototype Characteristics:**
- Dummy AI agents simulate real-world AI model behavior
- Sample dataset includes realistic provider information with intentional data quality issues
- Rule-based validation logic serves as placeholder for machine learning models
- In-memory data storage simplifies demonstration without external dependencies

**Production Readiness:**
The modular architecture is specifically designed for seamless transition to production-grade AI models and external data sources. Each component can be independently upgraded without affecting the overall system, ensuring a clear path from prototype to enterprise deployment.

This prototype successfully demonstrates the technical feasibility, user experience design, and business value proposition of an AI-driven healthcare provider data validation system.

---

**Team BsinEZ** | Solving healthcare data challenges through intelligent automation