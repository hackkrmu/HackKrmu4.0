from fastapi import APIRouter, HTTPException
from schema import tasks, user
import pandas as pd
import xgboost as xgb
import joblib, os
import config, itertools



elastic = config.elastic
model_path = os.path.join(os.getcwd(), "comp_model.pkl")
scaler = os.path.join(os.getcwd(), "scaler.pkl")
model = joblib.load(model_path)
scaler = joblib.load(scaler)

router = APIRouter()

@router.post("/task_submit")
async def predict(Task: tasks.Task):
    elastic.add("tasks", Task.dict())
    skills = Task.skills
    index_name = "users"
    field_name = "skills.keyword"  
    compatible_users = {}
    query_body = {
        "query": {
            "terms": {
                field_name: list(skills)
            }
        }
    }
    response = elastic.search(index=index_name, body=query_body)
    for hit in response["hits"]["hits"]:
        matchingUser  = elastic.find(index_name, hit["_id"])
        free_time = 0
        for key, value in matchingUser["scheduel"].items():
            for key, value in value.items():
                if value == "free":
                    free_time += 1


        input_features = {"avg_expertise": int(matchingUser["expertise"][0]), 
        "max_expertise": int(matchingUser["expertise"][0]),
        "Experience": int(matchingUser["expeirence"]),
        "Free_Time": int(free_time),
        "Feedback": float(matchingUser["feedback"])}
        
        input_df = pd.DataFrame([input_features])
        print(input_df.dtypes)
        input_scaled = scaler.transform(input_df)
        dinput = xgb.DMatrix(input_scaled)
    
        score = model.predict(dinput)[0]
        compatible_users[hit["_id"]] = float(score)
    time_left = int(Task.time)
    compatible_users = dict(sorted(compatible_users.items(), key=lambda x: x[1], reverse=True))
    schedule = {}
    for key, value in compatible_users.items():
        user = elastic.find("users", key)
        schedule[user["id"]] = user["scheduel"]
    new_schduel = equal_distribution_schedule(schedule, time_left)
    for key, value in new_schduel.items():
        elastic.update(index = "users", id =  key,body = {"doc":  {"scheduel": value}})
    return {"compatible_users": compatible_users}



@router.post("/create_user")
async def create_user(User: user.CreateUser):
    User = User.dict()
    User["scheduel"] = {}
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    for day in days:
        User["scheduel"][day] = {}
        for i in range(9, 18):
            User["scheduel"][day][str(i)] = "free"
    elastic.add("users", User, User["id"])
    return  "User created successfully"


@router.delete("/delete_user")
async def delete_user(id: str):
    elastic.delete(index = "users", id =str(id))
    return {"message": "User deleted successfully"}

@router.get("/get_user")
async def get_user(id: str):
    user = elastic.find("users", id)
    return user


@router.get("/get_all_users")
async def get_all_users():
    users = elastic.get_all_document_ids("users")
    return users

@router.get("/get_all_tasks")
async def get_all_tasks():
    tasks = elastic.get_all_document_ids("tasks")
    return tasks

@router.get("/get_task")
async def get_task(id: str):
    task = elastic.find("tasks", id)
    return task


def equal_distribution_schedule(employees, work_units, quantum=1):
    # Extract all available slots per employee
    available_slots = {emp: [] for emp in employees}
    for emp, schedule in employees.items():
        for day, hours in schedule.items():
            for hour, status in hours.items():
                if status == "free":
                    available_slots[emp].append((day, hour))
    
    # Distribute work equally among employees
    work_assigned = {emp: 0 for emp in employees}
    total_employees = len(employees)
    assigned_units = 0
    while assigned_units < work_units:
        for emp in employees:
            if available_slots[emp] and assigned_units < work_units:
                day, hour = available_slots[emp].pop(0)
                employees[emp][day][hour] = "taken"
                work_assigned[emp] += quantum
                assigned_units += quantum
    
    return employees


        


