const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Generic API fetch helper with automatic presentation fallback.
 */
async function apiFetch(endpoint, options = {}, fallbackData = null) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      console.warn(`[PULSE API] ${endpoint} returned HTTP ${response.status}. Using fallback presentation data.`);
      return { data: fallbackData, isFallback: true };
    }

    const data = await response.json();
    return { data, isFallback: false };
  } catch (error) {
    console.warn(`[PULSE API] Network connection failed for ${endpoint}. Using fallback presentation data.`, error);
    return { data: fallbackData, isFallback: true };
  }
}

/**
 * 1. PULSE AI Task Understanding
 */
export async function extractTask(taskPayload = {}) {
  const fallback = {
    task: "DSA Assignment",
    deadline: "Thursday",
    effort_hours: 3.0,
    priority: "High",
    fixed: false,
    source: "demo_fallback"
  };

  return apiFetch('/extract-task', {
    method: 'POST',
    body: JSON.stringify(taskPayload)
  }, fallback);
}

/**
 * 2. Workload Engine Calculation Formula
 * Workload Ratio = (Estimated Workload / Realistic Capacity) * 100
 */
export async function calculateWorkload(estimated_work = 8.7, capacity = 4.5) {
  const pct = Math.round((estimated_work / capacity) * 100);
  let risk = "SAFE";
  if (pct >= 85 && pct <= 100) risk = "WARNING";
  if (pct > 100) risk = "OVERLOAD";

  const fallback = {
    workload_percentage: pct,
    capacity,
    estimated_work,
    risk_level: risk,
    explanation: `${estimated_work.toFixed(1)}h estimated work ÷ ${capacity.toFixed(1)}h realistic capacity × 100 = ${pct}% load ratio (${risk}).`
  };

  return apiFetch('/calculate-workload', {
    method: 'POST',
    body: JSON.stringify({ estimated_work, capacity })
  }, fallback);
}

/**
 * Fetch 7-Day Forecast Data
 */
export async function fetchForecast() {
  const fallback = {
    today_capacity_percent: 78,
    today_used_hours: 3.2,
    today_max_hours: 4.1,
    peak_risk_day: "Thursday",
    peak_risk_percent: 127,
    forecast: {
      Monday: 72,
      Tuesday: 84,
      Wednesday: 62,
      Thursday: 127,
      Friday: 105,
      Saturday: 76,
      Sunday: 38
    },
    hours_forecast: {
      Monday: 4.5,
      Tuesday: 6.5,
      Wednesday: 4.9,
      Thursday: 11.5,
      Friday: 9.5,
      Saturday: 3.0,
      Sunday: 1.5
    },
    workload_formula_demo: {
      workload_percentage: 127,
      capacity: 4.5,
      estimated_work: 5.7,
      risk_level: "OVERLOAD",
      explanation: "5.7 hours estimated work ÷ 4.5 hours realistic capacity × 100 = 127% load ratio (OVERLOAD)."
    }
  };

  return apiFetch('/forecast', {}, fallback);
}

/**
 * What-If Postponement Simulation
 */
export async function simulatePostponement(taskPayload = {}) {
  const fallback = {
    day: "Thursday",
    before_workload: 127,
    after_workload: 146,
    risk_level: "OVERLOAD",
    message: "Postponing this task pushes work into an already overloaded period.",
    before_metrics: {
      workload_percentage: 127,
      capacity: 4.5,
      estimated_work: 5.7,
      risk_level: "OVERLOAD",
      explanation: "5.7h estimated ÷ 4.5h capacity × 100 = 127% (OVERLOAD)."
    },
    after_metrics: {
      workload_percentage: 146,
      capacity: 4.5,
      estimated_work: 6.6,
      risk_level: "OVERLOAD",
      explanation: "6.6h estimated ÷ 4.5h capacity × 100 = 146% (OVERLOAD)."
    }
  };

  return apiFetch('/simulate', {
    method: 'POST',
    body: JSON.stringify(taskPayload)
  }, fallback);
}

/**
 * 3. PULSE AI Schedule Repair Optimization
 */
export async function optimizeSchedule(strategyPayload = { strategy: "balanced" }) {
  const fallback = {
    moved_tasks: [
      {
        task: "DSA Assignment",
        from_day: "Thursday",
        to_day: "Wednesday",
        effort_hours: 3.0,
        fixed: false
      }
    ],
    before_workload: {
      Monday: 72,
      Tuesday: 84,
      Wednesday: 62,
      Thursday: 127,
      Friday: 105,
      Saturday: 76,
      Sunday: 38
    },
    after_workload: {
      Monday: 72,
      Tuesday: 84,
      Wednesday: 81,
      Thursday: 84,
      Friday: 88,
      Saturday: 76,
      Sunday: 38
    },
    reason: "Identified flexible candidate 'DSA Assignment' (3.0h, fixed=False) on overloaded Thursday (127%). Shifted task to Wednesday (62% -> 81%), protecting the Thursday deadline while bringing Thursday workload down from 127% to a manageable 84%."
  };

  return apiFetch('/optimize', {
    method: 'POST',
    body: JSON.stringify(strategyPayload)
  }, fallback);
}
