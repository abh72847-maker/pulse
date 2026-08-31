import urllib.request
import json

base_url = "http://127.0.0.1:8000"

def test_endpoint(name, path, method="GET", payload=None):
    url = f"{base_url}{path}"
    headers = {"Content-Type": "application/json"}
    data = json.dumps(payload).encode("utf-8") if payload else None
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            print(f"[PASS] {name} ({method} {path}) -> {resp.status} OK")
            return data
    except Exception as e:
        print(f"[FAIL] {name} ({method} {path}) -> {e}")
        return None

print("=== PULSE HACKATHON QA ENGINE TEST SUITE ===")
test_endpoint("Root Health", "/")
test_endpoint("API Health", "/api/health")
test_endpoint("Extract Task", "/extract-task", "POST", {"title": "DSA Assignment due Thursday, 3h"})
test_endpoint("Calculate Workload", "/calculate-workload", "POST", {"estimated_work": 8.7, "capacity": 4.5})
test_endpoint("7-Day Forecast", "/forecast", "GET")
test_endpoint("Simulate Postponement", "/simulate", "POST", {"task_name": "DSA Assignment", "postpone_days": 1})
test_endpoint("Schedule Repair", "/optimize", "POST", {"strategy": "balanced"})
print("===========================================")
