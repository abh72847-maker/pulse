import urllib.request
import json

url = "http://127.0.0.1:8000/calculate-workload"
payload = {"estimated_work": 8.7, "capacity": 4.5}
headers = {"Content-Type": "application/json"}

req = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"), headers=headers)
try:
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        print("RESULT:", json.dumps(res, indent=2))
except Exception as e:
    print("ERROR:", e)
