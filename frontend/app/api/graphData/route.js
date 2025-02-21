import {
  Chart as ChartJS,
  RadialLinearScale,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend
);

// app/api/graphData/route.js
export async function GET(request) {
  const graphData = {
    graph1: {
      waterIntake: 5,
      dietBalance: 5,
      exerciseRoutine: 5,
      sleepQuality: 5,
      stressLevels: 5,
      skinHydration: 5,
      sunExposure: 5,
      skinCareRoutine: 5,
      skinSensitivity: 5,
      inflammation: 5,
    },
    graph2: {
      waterIntake: 3,
      dietBalance: 4,
      exerciseRoutine: 2,
      sleepQuality: 4,
      stressLevels: 3,
      skinHydration: 5,
      sunExposure: 2,
      skinCareRoutine: 4,
      skinSensitivity: 4,
      inflammation: 3,
    },
    graph3: {
      waterIntake: 3,
      dietBalance: 3,
      exerciseRoutine: 3,
      sleepQuality: 3,
      stressLevels: 3,
      skinHydration: 3,
      sunExposure: 3,
      skinCareRoutine: 3,
      skinSensitivity: 3,
      inflammation: 3,
    },
  };

  return new Response(JSON.stringify(graphData), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
