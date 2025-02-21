

import sqlite3
import openai
import speech_recognition as sr
import pyttsx3
import pyperclip
import threading
import tkinter as tk
from tkinter import messagebox, filedialog
import pandas as pd

openai.api_key = "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"

conn = sqlite3.connect("inventory.db")
cursor = conn.cursor()
cursor.execute("""
CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit TEXT NOT NULL
)
""")
conn.commit()

class InventoryVoiceAssistant:
    def __init__(self, root):
        self.root = root
        self.root.title("Inventory Assistant")
        self.root.geometry("400x600")
        self.root.configure(bg="#111")
        self.listening = False
        self.recognizer = sr.Recognizer()
        self.tts_engine = pyttsx3.init()

        # ui Components
        self.status_label = tk.Label(root, text="Press 'Start Listening'", font=("Arial", 14, "bold"), fg="white", bg="#111")
        self.status_label.pack(pady=10)

        self.text_display = tk.Text(root, font=("Arial", 12), wrap="word", height=8, bg="#222", fg="white")
        self.text_display.pack(padx=20, pady=10, fill="both", expand=True)

        self.listen_button = tk.Button(root, text="🎙 Start Listening", font=("Arial", 12, "bold"), bg="#0080ff", fg="white", command=self.toggle_listening)
        self.listen_button.pack(pady=5, fill="x")

        self.ai_button = tk.Button(root, text="🤖 Process Command", font=("Arial", 12, "bold"), bg="#00cc66", fg="white", command=self.process_command)
        self.ai_button.pack(pady=5, fill="x")

        self.read_button = tk.Button(root, text="🔊 Read Aloud", font=("Arial", 12), bg="#33cc33", fg="white", command=self.read_aloud)
        self.read_button.pack(pady=5, fill="x")

        self.copy_button = tk.Button(root, text="📋 Copy", font=("Arial", 12), bg="#ff9933", fg="white", command=self.copy_text)
        self.copy_button.pack(pady=5, fill="x")

        self.clear_button = tk.Button(root, text="🗑 Clear", font=("Arial", 12), bg="#ff3333", fg="white", command=self.clear_text)
        self.clear_button.pack(pady=5, fill="x")

        self.save_button = tk.Button(root, text="💾 Save", font=("Arial", 12), bg="#6666ff", fg="white", command=self.save_text)
        self.save_button.pack(pady=5, fill="x")

    def toggle_listening(self):
        if not self.listening:
            self.listening = True
            self.listen_button.config(text="🛑 Stop Listening", bg="#cc0000")
            threading.Thread(target=self.listen_and_recognize, daemon=True).start()
        else:
            self.listening = False
            self.listen_button.config(text="🎙 Start Listening", bg="#0080ff")

    def listen_and_recognize(self):
        with sr.Microphone() as source:
            self.recognizer.adjust_for_ambient_noise(source, duration=1)
            self.status_label.config(text="Listening... Speak now.")
            try:
                audio = self.recognizer.listen(source, timeout=5, phrase_time_limit=5)
                text = self.recognizer.recognize_google(audio)
                self.update_text(text)
            except sr.UnknownValueError:
                self.update_text("Could not understand audio")
            except sr.RequestError:
                self.update_text("No Internet Connection")
            except Exception as e:
                self.update_text(f"Error: {str(e)}")

        self.listening = False
        self.listen_button.config(text="🎙 Start Listening", bg="#0080ff")

    def update_text(self, text):
        self.text_display.delete("1.0", tk.END)
        self.text_display.insert(tk.END, text)
        self.status_label.config(text="Recognized: " + text)

    def process_command(self):
        command = self.text_display.get("1.0", tk.END).strip()
        if not command:
            messagebox.showwarning("Warning", "No text to process!")
            return
        sql_query = self.generate_sql_query(command)
        if sql_query:
            self.execute_sql(sql_query)

    def generate_sql_query(self, command):
        prompt = f"""
        Convert this instruction into a valid SQLite query:
        - Instruction: '{command}'
        - The database table 'inventory' has these columns: id (INTEGER), name (TEXT), quantity (INTEGER), unit (TEXT)
        - Ensure only the quantity is updated based on the instruction.
        - Only return the SQL statement **without explanations or markdown formatting**.
        """
        try:
            response = openai.ChatCompletion.create(model="gpt-4o-mini", messages=[{"role": "user", "content": prompt}])
            sql_query = response["choices"][0]["message"]["content"].strip()
            
            sql_query = sql_query.replace("```sql", "").replace("```", "").strip()
            
            return sql_query
        except Exception as e:
            self.update_text(f"AI Error: {str(e)}")
            return None

    def execute_sql(self, sql_query):
        try:
            cursor.execute(sql_query)
            conn.commit()
            self.update_text("✅ Inventory updated successfully!")
            self.save_inventory_to_csv()
        except sqlite3.Error as e:
            self.update_text(f"❌ SQLite Error: {e}")

    def save_inventory_to_csv(self):
        df = pd.read_sql_query("SELECT * FROM inventory", conn)
        df.to_csv("my_data.csv", index=False)
        print("Updated inventory saved to CSV!")

    def read_aloud(self):
        text = self.text_display.get("1.0", tk.END).strip()
        if text:
            self.tts_engine.say(text)
            self.tts_engine.runAndWait()

    def copy_text(self):
        text = self.text_display.get("1.0", tk.END).strip()
        if text:
            pyperclip.copy(text)
            messagebox.showinfo("Success", "Text copied to clipboard!")

    def clear_text(self):
        self.text_display.delete("1.0", tk.END)
        self.status_label.config(text="Text cleared!")

    def save_text(self):
        text = self.text_display.get("1.0", tk.END).strip()
        if text:
            file_path = filedialog.asksaveasfilename(defaultextension=".txt", filetypes=[("Text files", "*.txt")])
            if file_path:
                with open(file_path, "w", encoding="utf-8") as file:
                    file.write(text)
                messagebox.showinfo("Success", "Text saved!")

if __name__ == "__main__":
    root = tk.Tk()
    app = InventoryVoiceAssistant(root)
    root.mainloop()
    conn.close()
