# PULSE: Predictive User Load & Schedule Engine 🚀

> **Tagline:** *"Don't manage your overload. Prevent it."*  
> **hackathon Prototype:** Built for the **iQOO Hackathon**.

PULSE is a predictive AI workload management system designed to detect future burnout spikes, simulate postponement risks, and perform intelligent schedule repair before overload happens.

---

## 🏛️ Architecture & Core Engine Breakdown

PULSE clearly separates its functionality into 3 distinct modular engines:

1. **🧠 PULSE AI Task Understanding (`POST /extract-task`)**  
   Extracts task title, deadline, effort hours, and priority using Google Gemini API (`gemini-2.5-flash`) or deterministic presentation fallback logic.
   
2. **📊 Workload & Risk Engine (`POST /calculate-workload`)**  
   Evaluates explainable workload metrics:
   $$\text{Workload Ratio (\%)} = \frac{\text{Estimated Workload (Hours)}}{\text{Realistic Capacity (Hours)}} \times 100$$
   - `< 85%`: `SAFE`
   - `85% - 100%`: `WARNING`
   - `> 100%`: `OVERLOAD`

3. **⚡ PULSE AI Schedule Repair (`POST /optimize`)**  
   Performs rule-based constraint optimization to shift flexible tasks into available capacity windows before deadlines.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, Lucide React Icons
- **Backend:** Python 3.14, FastAPI, Uvicorn, HTTPX
- **AI Integration:** Google Gemini API (`gemini-2.5-flash`) with automatic offline fallback guarantee

---

## 💻 Local Setup Instructions

### 1. Clone & Set Up Backend

```bash
cd pulse/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# (Optional) Set Gemini API Key
export GEMINI_API_KEY="your_api_key_here"  # On Windows PowerShell: $env:GEMINI_API_KEY="your_api_key_here"

# Start FastAPI server
python main.py
# Or: uvicorn main:app --host 127.0.0.1 --port 8000
```
Backend will be online at: `http://127.0.0.1:8000`  
Interactive Swagger Docs: `http://127.0.0.1:8000/docs`

### 2. Set Up & Start Frontend

```bash
cd pulse/frontend

# Install dependencies
npm install

# Create environment file (.env)
echo "VITE_API_URL=http://localhost:8000" > .env

# Run development server
npm run dev
```
Frontend will be online at: `http://localhost:5173`

---

## 🚀 Production Deployment Guide

### Frontend Deployment (Vercel)

1. Push the `pulse` repository to GitHub.
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository and set the Root Directory to `frontend`.
4. Configure Build Settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend-app.onrender.com` (Your deployed Render backend URL)
6. Click **Deploy**.

---

### Backend Deployment (Render)

1. Log in to [Render](https://render.com) and click **"New Web Service"**.
2. Connect your GitHub repository and set Root Directory to `backend`.
3. Configure Environment Settings:
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python main.py`
4. Add Environment Variables:
   - `PORT` = `8000` (or leave default assigned by Render)
   - `GEMINI_API_KEY` = `your_google_gemini_api_key` (Never commit this to git!)
5. Click **Create Web Service**.

---

## 🔑 Environment Variables Reference

| Variable Name | Required | Scope | Description |
| :--- | :--- | :--- | :--- |
| `VITE_API_URL` | Yes (Production) | Frontend | Base URL of the deployed FastAPI backend. |
| `PORT` | Optional | Backend | Server port (assigned automatically by Render). |
| `GEMINI_API_KEY` | Optional | Backend | Google Gemini API key for structured task NLP. |

---

## 🟢 Verification

Run production build check:
```bash
cd pulse/frontend
npm run build
```
Verify output is compiled cleanly in `dist/`.
