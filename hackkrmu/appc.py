from flask import Flask, render_template, request
import pandas as pd

app = Flask(__name__)

# Load free courses data
courses_df = pd.read_excel("expanded_career_options_free_courses.xlsx")

# Expanded Career Mapping (Based on Score Ranges)
career_mapping = {
    range(0, 15): "Graphic Designer",
    range(15, 30): "Psychologist",
    range(30, 45): "Travel Blogger",
    range(45, 60): "Journalist",
    range(60, 75): "Teacher",
    range(75, 90): "Legal Advisor",
    range(90, 105): "Chartered Accountant",
    range(105, 120): "Investment Banker",
    range(120, 135): "Entrepreneur",
    range(135, 150): "Digital Marketer",
    range(150, 165): "Stockbroker",
    range(165, 180): "Business Consultant",
    range(180, 195): "Software Developer",
    range(195, 210): "Ethical Hacker",
    range(210, 225): "AI Engineer",
    range(225, 240): "Data Scientist",
    range(240, 255): "Blockchain Developer",
    range(255, 270): "Cloud Architect",
    range(270, 285): "Hospital Manager",
    range(285, 300): "Genetic Scientist",
    range(300, 315): "Pharmacist",
    range(315, 330): "Healthcare Administrator",
    range(330, 360): "Civil Services"
}
career_courses = {
    "Graphic Designer": "https://www.coursera.org/graphic-design",
    "Psychologist": "https://www.edx.org/psychology",
    "Travel Blogger": "https://www.udemy.com/travel-blogging",
    "Journalist": "https://www.coursera.org/journalism",
    "Teacher": "https://www.edx.org/teaching-courses",
    "Legal Advisor": "https://www.udemy.com/law-basics",
    "Chartered Accountant": "https://www.coursera.org/accounting",
    "Investment Banker": "https://www.edx.org/finance-banking",
    "Entrepreneur": "https://www.udemy.com/entrepreneurship",
    "Digital Marketer": "https://www.coursera.org/digital-marketing",
    "Stockbroker": "https://www.edx.org/trading",
    "Business Consultant": "https://www.udemy.com/business-strategy",
    "Software Developer": "https://www.coursera.org/programming",
    "Ethical Hacker": "https://www.udemy.com/ethical-hacking",
    "AI Engineer": "https://www.coursera.org/ai",
    "Data Scientist": "https://www.edx.org/data-science",
    "Blockchain Developer": "https://www.udemy.com/blockchain",
    "Cloud Architect": "https://www.coursera.org/cloud-computing",
    "Hospital Manager": "https://www.edx.org/healthcare-management",
    "Genetic Scientist": "https://www.udemy.com/genetics",
    "Pharmacist": "https://www.coursera.org/pharmacy",
    "Healthcare Administrator": "https://www.edx.org/healthcare-administration",
    "Civil Services": "https://www.upscprep.com"
}
questions=[
    {"question": "What is 25% of 240?", "options": ["50", "60", "70", "80"], "answer": "60"},
    {"question": "A shop sells a ₹500 product at a 15% discount. What is the final price?", "options": ["400", "425", "450", "475"], "answer": "425"},
    {"question": "If 3x + 5 = 20, find x.", "options": ["3", "5", "7", "10"], "answer": "5"},
    {"question": "A train traveling at 60 km/h takes 1.5 hours to reach its destination. How far is it?", "options": ["60 km", "75 km", "90 km", "120 km"], "answer": "90 km"},
    {"question": "A number is doubled and increased by 10 to become 40. What is the original number?", "options": ["10", "12", "15", "20"], "answer": "15"},
    {"question": "A square has a side length of 8 cm. Find its area.", "options": ["32 cm²", "48 cm²", "64 cm²", "80 cm²"], "answer": "64 cm²"},
    {"question": "Solve: (16 ÷ 4) + (6 × 3) - 2", "options": ["14", "16", "18", "20"], "answer": "16"},
    {"question": "If x + y = 10 and y = 4, find x.", "options": ["4", "5", "6", "7"], "answer": "6"},
    {"question": "A factory produces 500 items per day. How many will it produce in 3 weeks?", "options": ["10,000", "10,500", "11,000", "11,500"], "answer": "10,500"},
    {"question": "A box has red, blue, and green balls in the ratio 3:4:5. If there are 120 balls, how many are blue?", "options": ["30", "40", "45", "50"], "answer": "40"}
    {"question": "What comes next in the series: 2, 6, 12, 20, ?", "options": ["28", "30", "32", "34"], "answer": "30"},
    {"question": "If A = 1, B = 2, C = 3, what is Z + Y + X?", "options": ["72", "73", "74", "75"], "answer": "72"},
    {"question": "A clock shows 4:15 PM. If the minute hand moves by 150°, what time will it show?", "options": ["4:30 PM", "4:40 PM", "5:00 PM", "5:15 PM"], "answer": "4:40 PM"},
    {"question": "Find the odd one out: Triangle, Square, Cube, Circle", "options": ["Triangle", "Square", "Cube", "Circle"], "answer": "Cube"},
    {"question": "John is older than Sam. Sam is younger than Mark. Mark is older than John. Who is the oldest?", "options": ["John", "Sam", "Mark", "Cannot be determined"], "answer": "Mark"},
    {"question": "A man walks 5 km North, then 3 km East, then 5 km South. How far is he from his starting point?", "options": ["2 km", "3 km", "4 km", "5 km"], "answer": "3 km"},
    {"question": "Which word does not belong? Lion, Tiger, Elephant, Crocodile", "options": ["Lion", "Tiger", "Elephant", "Crocodile"], "answer": "Crocodile"},
    {"question": "If 5 apples cost ₹20, how much do 8 apples cost?", "options": ["₹30", "₹32", "₹34", "₹36"], "answer": "₹32"},
    {"question": "Solve: 8 + (4 × 3) - (10 ÷ 2)", "options": ["12", "14", "16", "18"], "answer": "16"},
    {"question": "A password is made of two letters followed by three numbers. How many unique passwords can be created?", "options": ["676,000", "520,000", "702,000", "600,000"], "answer": "676,000"}
    {"question": "If a cube is painted on all sides and then cut into 64 smaller cubes, how many have only 1 face painted?", "options": ["8", "12", "24", "32"], "answer": "24"},
    {"question": "A folded paper is punched and then unfolded. What pattern appears?", "options": ["Symmetrical", "Random", "Asymmetrical", "Diagonal"], "answer": "Symmetrical"},
    {"question": "What shape do you get when you fold a rectangle diagonally?", "options": ["Triangle", "Trapezium", "Rhombus", "Pentagon"], "answer": "Triangle"},
    {"question": "A 3D object has 6 faces, 12 edges, and 8 vertices. What is it?", "options": ["Cube", "Pyramid", "Cylinder", "Prism"], "answer": "Cube"},
    {"question": "If a clock is rotated 90° clockwise, where will the 3-hour mark be?", "options": ["12", "3", "6", "9"], "answer": "6"},
    {"question": "Which object has only 1 surface: Sphere, Cube, Cylinder, Möbius Strip?", "options": ["Sphere", "Cube", "Cylinder", "Möbius Strip"], "answer": "Möbius Strip"},
    {"question": "A cube is sliced diagonally. What shape is the cross-section?", "options": ["Triangle", "Hexagon", "Trapezium", "Pentagon"], "answer": "Hexagon"},
    {"question": "You see an object’s front view as a square, side view as a rectangle, and top view as a circle. What is it?", "options": ["Cylinder", "Cube", "Cone", "Sphere"], "answer": "Cylinder"},
    {"question": "How many different triangles can be made with sides 3 cm, 4 cm, and 5 cm?", "options": ["1", "2", "3", "4"], "answer": "1"},
    {"question": "If an object casts a triangular shadow, what 3D shape could it be?", "options": ["Cube", "Cylinder", "Cone", "Sphere"], "answer": "Cone"}
    {"question": "If you could invent anything, what would it be?", "options": ["A device to pause time", "A machine that reads minds", "A robot that does chores", "A teleportation device"], "answer": "A teleportation device"},
    {"question": "You have ₹50,000 to start a business. What do you invest in?", "options": ["Tech startup", "Clothing brand", "Food business", "Stock market"], "answer": "Tech startup"},
    {"question": "An artist wants to use AI in painting. How can they do it?", "options": ["AI-generated art styles", "Neural networks for inspiration", "Automated color selection", "All of the above"], "answer": "All of the above"},
    {"question": "A marketing campaign needs a new slogan. What’s your process?", "options": ["Analyze competitors", "Identify target audience", "Brainstorm catchy phrases", "All of the above"], "answer": "All of the above"},
    {"question": "How do you come up with new ideas when stuck?", "options": ["Take a break", "Look for inspiration", "Discuss with others", "All of the above"], "answer": "All of the above"},
    {"question": "A company wants to make education more engaging. Suggest a method.", "options": ["Gamification", "Interactive videos", "Personalized learning", "All of the above"], "answer": "All of the above"},
    {"question": "What makes a logo memorable?", "options": ["Simplicity", "Unique design", "Meaningful symbolism", "All of the above"], "answer": "All of the above"},
    {"question": "How would you redesign a boring website?", "options": ["Improve UI/UX", "Use better visuals", "Make navigation simpler", "All of the above"], "answer": "All of the above"},
    {"question": "If you could create a new app, what would it do?", "options": ["AI-powered study planner", "Social network for travelers", "Fitness tracker with rewards", "All of the above"], "answer": "All of the above"},
    {"question": "How can businesses use gamification to increase sales?", "options": ["Loyalty points", "Leaderboard competitions", "Challenges and rewards", "All of the above"], "answer": "All of the above"}
    {"question": "A project deadline is in 2 days, but the team isn’t ready. What’s your first action?", "options": ["Work overtime", "Reprioritize tasks", "Request an extension", "Blame the team"], "answer": "Reprioritize tasks"},
    {"question": "You’re given a new software tool at work. How do you learn it?", "options": ["Read the manual", "Take an online course", "Experiment with it", "Ask a colleague"], "answer": "Experiment with it"},
    {"question": "A customer is unhappy with a service. What’s your approach?", "options": ["Apologize and listen", "Ignore them", "Offer a refund immediately", "Blame external factors"], "answer": "Apologize and listen"},
    {"question": "How do you prioritize tasks when you have multiple deadlines?", "options": ["Follow urgency and importance", "Start with the easiest", "Do them randomly", "Delay the hardest one"], "answer": "Follow urgency and importance"},
    {"question": "A machine is malfunctioning. What do you check first?", "options": ["Power supply", "Software settings", "Internal components", "Call a technician"], "answer": "Power supply"},
    {"question": "If a project isn’t making progress, what should the team do?", "options": ["Analyze blockers", "Blame the manager", "Work without a plan", "Change the project"], "answer": "Analyze blockers"},
    {"question": "A new AI tool replaces jobs in your industry. What’s your response?", "options": ["Learn AI skills", "Ignore it", "Protest against AI", "Quit the job"], "answer": "Learn AI skills"},
    {"question": "You have three job offers: one pays well, one is interesting, and one is at a top company. Which do you choose?", "options": ["Highest-paying job", "Most interesting job", "Top company", "Wait for another offer"], "answer": "Most interesting job"},
    {"question": "A startup is failing financially. What’s the best way to save it?", "options": ["Cut unnecessary costs", "Take a big loan", "Blame investors", "Shut it down"], "answer": "Cut unnecessary costs"},
    {"question": "Your friend gets a job before you despite having the same skills. How do you react?", "options": ["Congratulate them and improve yourself", "Feel jealous", "Blame bad luck", "Quit job hunting"], "answer": "Congratulate them and improve yourself"}
    {"question": "If you could invent anything, what would it be?", "options": ["A device to pause time", "A machine that reads minds", "A robot that does chores", "A teleportation device"], "answer": "A teleportation device"},
    {"question": "You have ₹50,000 to start a business. What do you invest in?", "options": ["Tech startup", "Clothing brand", "Food business", "Stock market"], "answer": "Tech startup"},
    {"question": "An artist wants to use AI in painting. How can they do it?", "options": ["AI-generated art styles", "Neural networks for inspiration", "Automated color selection", "All of the above"], "answer": "All of the above"},
    {"question": "A marketing campaign needs a new slogan. What’s your process?", "options": ["Analyze competitors", "Identify target audience", "Brainstorm catchy phrases", "All of the above"], "answer": "All of the above"},
    {"question": "How do you come up with new ideas when stuck?", "options": ["Take a break", "Look for inspiration", "Discuss with others", "All of the above"], "answer": "All of the above"},
    {"question": "A company wants to make education more engaging. Suggest a method.", "options": ["Gamification", "Interactive videos", "Personalized learning", "All of the above"], "answer": "All of the above"},
    {"question": "What makes a logo memorable?", "options": ["Simplicity", "Unique design", "Meaningful symbolism", "All of the above"], "answer": "All of the above"},
    {"question": "How would you redesign a boring website?", "options": ["Improve UI/UX", "Use better visuals", "Make navigation simpler", "All of the above"], "answer": "All of the above"},
    {"question": "If you could create a new app, what would it do?", "options": ["AI-powered study planner", "Social network for travelers", "Fitness tracker with rewards", "All of the above"], "answer": "All of the above"},
    {"question": "How can businesses use gamification to increase sales?", "options": ["Loyalty points", "Leaderboard competitions", "Challenges and rewards", "All of the above"], "answer": "All of the above"}
    {"question": "How do you handle disagreements in a team?", "options": ["Listen to all sides", "Find a compromise", "Escalate to a manager", "Ignore the issue"], "answer": "Find a compromise"},
    {"question": "A colleague takes credit for your idea. What do you do?", "options": ["Confront them directly", "Talk to the manager", "Let it go", "Politely clarify your contribution"], "answer": "Politely clarify your contribution"},
    {"question": "How do you give constructive criticism?", "options": ["Be direct and blunt", "Use positive language", "Focus on the problem, not the person", "All of the above"], "answer": "All of the above"},
    {"question": "What makes a great leader?", "options": ["Strong communication", "Empathy", "Decisiveness", "All of the above"], "answer": "All of the above"},
    {"question": "How do you build trust in a team?", "options": ["Be transparent", "Encourage open communication", "Support team members", "All of the above"], "answer": "All of the above"},
    {"question": "You’re asked to speak in public but feel nervous. What’s your strategy?", "options": ["Practice beforehand", "Take deep breaths", "Focus on the message", "All of the above"], "answer": "All of the above"},
    {"question": "Your boss assigns a task outside your expertise. How do you respond?", "options": ["Refuse the task", "Ask for guidance", "Give it your best effort", "Panic"], "answer": "Ask for guidance"},
    {"question": "How do you handle difficult customers?", "options": ["Stay calm and listen", "Ignore them", "Get defensive", "End the conversation quickly"], "answer": "Stay calm and listen"},
    {"question": "A new team member is struggling. How do you support them?", "options": ["Offer guidance", "Ignore them", "Tell them to figure it out", "Report them to the manager"], "answer": "Offer guidance"},
    {"question": "How do you stay calm under pressure?", "options": ["Take deep breaths", "Prioritize tasks", "Stay positive", "All of the above"], "answer": "All of the above"}
]

@app.route("/", methods=["GET", "POST"])
def quiz():
    if request.method == "POST":
        # Collect user responses and calculate total score
        total_score = sum(int(request.form.get(f"q{i}", 0)) for i in range(1, 61))  # 60 questions

        # Determine the career based on the score
        user_career = "Career Not Found"
        for score_range, career in career_mapping.items():
            if total_score in score_range:
                user_career = career
                break

        # Find the relevant course
        course_link = career_courses.get(user_career, "#")

        return render_template("result.html", career=user_career, course_link=course_link)

    return render_template("index.html")

@app.route("/result")
def result():
    return render_template("result.html")

if __name__ == "__main__":
    app.run(debug=True)