import pandas as pd
import serial
import time
import tkinter as tk
from tkinter import messagebox, simpledialog

# Load the Excel file
df = pd.read_excel('students.xlsx')

# Open serial connection to Arduino
try:
    ser = serial.Serial('COM7', 115200)  # Replace 'COM7' with your Arduino's COM port
    time.sleep(2)  # Wait for the serial connection to initialize
except serial.SerialException as e:
    print(f"Error opening serial port: {e}")
    exit()

def find_account_by_unique_id(unique_id):
    # Search for the unique ID in the DataFrame
    row = df[df['unique_id'] == unique_id]
    if not row.empty:
        return row.iloc[0]
    return None

def update_account_balance(unique_id, new_balance):
    df.loc[df['unique_id'] == unique_id, 'account_balance'] = new_balance
    df.to_excel('students.xlsx', index=False)

def display_menu(account):
    items_purchased = []

    def buy_item(item, cost):
        items_purchased.append((item, cost))
        bill_text.insert(tk.END, f"Added {item} for ₹{cost:.2f}\n")

    def finalize_purchase():
        total_cost = sum(cost for item, cost in items_purchased)
        if account['account_balance'] >= total_cost:
            account['account_balance'] -= total_cost
            update_account_balance(account['unique_id'], account['account_balance'])
            bill_text.insert(tk.END, f"\nTotal cost: ₹{total_cost:.2f}\nNew Balance: ₹{account['account_balance']:.2f}\n")
            balance_label.config(text=f"Account Balance: ₹{account['account_balance']:.2f}")
            items_purchased.clear()
        else:
            bill_text.insert(tk.END, "Insufficient balance to complete the purchase.\n")

    def recharge_account():
        amount = simpledialog.askfloat("Recharge", "Enter amount to recharge:", minvalue=0)
        if amount is not None:
            account['account_balance'] += amount
            update_account_balance(account['unique_id'], account['account_balance'])
            balance_label.config(text=f"Account Balance: ₹{account['account_balance']:.2f}")
            messagebox.showinfo("Recharge Successful", f"Recharged ₹{amount:.2f}. New Balance: ₹{account['account_balance']:.2f}")

    name_label.config(text=f"Name: {account['name']}")
    balance_label.config(text=f"Account Balance: ₹{account['account_balance']:.2f}")

    buy_item_a_button.config(command=lambda: buy_item("Notebook", 50.00))
    buy_item_b_button.config(command=lambda: buy_item("Pen", 10.00))
    buy_item_c_button.config(command=lambda: buy_item("Pencil", 5.00))
    buy_item_d_button.config(command=lambda: buy_item("Eraser", 5.00))
    buy_item_e_button.config(command=lambda: buy_item("Sandwich", 30.00))
    buy_item_f_button.config(command=lambda: buy_item("Juice", 20.00))
    buy_item_g_button.config(command=lambda: buy_item("Chips", 15.00))
    buy_item_h_button.config(command=lambda: buy_item("Chocolate", 25.00))
    done_button.config(command=finalize_purchase)
    recharge_button.config(command=recharge_account)

def check_card():
    if ser.in_waiting > 0:
        unique_id = ser.readline().decode('utf-8').strip()
        if unique_id.isdigit():
            unique_id = int(unique_id)
            account = find_account_by_unique_id(unique_id)
            if account is not None:
                display_menu(account)
            else:
                messagebox.showwarning("Account Not Found", "No account found for the scanned card.")
    root.after(1000, check_card)

# Create the main window
root = tk.Tk()
root.title("NFC Payment System")
root.geometry("600x600")

# Create frames for different sections
info_frame = tk.Frame(root)
info_frame.pack(pady=10)

menu_frame = tk.Frame(root)
menu_frame.pack(pady=10)

bill_frame = tk.Frame(root)
bill_frame.pack(pady=10)

# Info frame widgets
name_label = tk.Label(info_frame, text="Name: ", font=("Helvetica", 14))
name_label.pack()

balance_label = tk.Label(info_frame, text="Account Balance: ", font=("Helvetica", 14))
balance_label.pack()

# Menu frame widgets
tk.Label(menu_frame, text="Stationary Items", font=("Helvetica", 16, "bold")).pack()
buy_item_a_button = tk.Button(menu_frame, text="Notebook (₹50.00)", font=("Helvetica", 12))
buy_item_a_button.pack()

buy_item_b_button = tk.Button(menu_frame, text="Pen (₹10.00)", font=("Helvetica", 12))
buy_item_b_button.pack()

buy_item_c_button = tk.Button(menu_frame, text="Pencil (₹5.00)", font=("Helvetica", 12))
buy_item_c_button.pack()

buy_item_d_button = tk.Button(menu_frame, text="Eraser (₹5.00)", font=("Helvetica", 12))
buy_item_d_button.pack()

tk.Label(menu_frame, text="Canteen Items", font=("Helvetica", 16, "bold")).pack()
buy_item_e_button = tk.Button(menu_frame, text="Sandwich (₹30.00)", font=("Helvetica", 12))
buy_item_e_button.pack()

buy_item_f_button = tk.Button(menu_frame, text="Juice (₹20.00)", font=("Helvetica", 12))
buy_item_f_button.pack()

buy_item_g_button = tk.Button(menu_frame, text="Chips (₹15.00)", font=("Helvetica", 12))
buy_item_g_button.pack()

buy_item_h_button = tk.Button(menu_frame, text="Chocolate (₹25.00)", font=("Helvetica", 12))
buy_item_h_button.pack()

done_button = tk.Button(menu_frame, text="Done", font=("Helvetica", 12))
done_button.pack()

# Bill frame widgets
bill_label = tk.Label(bill_frame, text="Bill:", font=("Helvetica", 14))
bill_label.pack()

bill_text = tk.Text(bill_frame, height=10, width=50, font=("Helvetica", 12))
bill_text.pack()

# Recharge button
recharge_button = tk.Button(root, text="Recharge", font=("Helvetica", 12))
recharge_button.place(relx=1.0, rely=0.0, anchor='ne')

# Start checking for NFC card scans
root.after(1000, check_card)

# Run the GUI event loop
root.mainloop()