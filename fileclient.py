import tkinter as tk
from tkinter import filedialog, messagebox, ttk
import threading
import queue
import os
import secrets
from cryptography.hazmat.primitives.kdf.scrypt import Scrypt
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import hashlib
import socket
import base64
import struct

class ModernStyledApp:
    def __init__(self, root):
        self.root = root
        self._setup_root()
        self.password_queue = queue.Queue()
        self.client_socket = None
        self.server_running = False
        self._create_widgets()

    def _setup_root(self):
        """Configure root window with modern styling."""
        self.root.title("Zephyrn Securities - Client")
        self.root.geometry("1000x800")
        self.root.configure(bg='#2c3e50')
        self.root.option_add("*Font", "Segoe 10")
        self.style = ttk.Style()
        self.style.theme_use('clam')
        self._configure_styles()

    def _configure_styles(self):
        """Create custom styles for modern look."""
        self.style.configure('TButton',
                             background='#11111b',
                             foreground='white',
                             font=('Segoe UI', 12, 'bold'),
                             borderwidth=0,
                             relief='flat')
        self.style.map('TButton',
                       background=[('active', '#313244'), ('pressed', '#45475a')])

        self.style.configure('Custom.Horizontal.TProgressbar',
                             background='white',
                             troughcolor='black')

    def _create_widgets(self):
        """Create modern, sleek UI components."""
        main_container = ttk.Frame(self.root, padding="20 20 20 20", style='TFrame')
        main_container.pack(fill=tk.BOTH, expand=True)
        connection_frame = ttk.LabelFrame(main_container, text="Server Connection", style='TLabelframe')
        connection_frame.pack(fill="x", pady=(0, 10))
        ttk.Label(connection_frame, text="Server IP:", style='TLabel').pack(side="left", padx=5)
        self.server_ip_entry = ttk.Entry(connection_frame, width=15)
        self.server_ip_entry.pack(side="left", padx=5)
        self.server_ip_entry.insert(0, "127.0.0.1")
        ttk.Label(connection_frame, text="Port:", style='TLabel').pack(side="left", padx=5)
        self.port_entry = ttk.Entry(connection_frame, width=10)
        self.port_entry.pack(side="left", padx=5)
        self.port_entry.insert(0, "12345")
        self.connect_button = ttk.Button(connection_frame, text="Connect", command=self.connect_to_server)
        self.connect_button.pack(side="left", padx=5)
        self.disconnect_button = ttk.Button(connection_frame, text="Disconnect", command=self.disconnect_from_server, state="disabled")
        self.disconnect_button.pack(side="left", padx=5)
        key_frame = ttk.LabelFrame(main_container, text="Encryption Key", style='TLabelframe')
        key_frame.pack(fill="x", pady=(0, 10))
        ttk.Label(key_frame, text="Key:", style='TLabel').pack(side="left", padx=5)
        self.key_entry = ttk.Entry(key_frame, width=50, show="")
        self.key_entry.pack(side="left", padx=5, expand=True, fill="x")
        self.generate_key_button = ttk.Button(key_frame, text="Generate Key", command=self.generate_secure_key)
        self.generate_key_button.pack(side="right", padx=5)
        log_label = ttk.Label(main_container, text="Chat Log:", style='TLabel')
        log_label.pack()

        log_frame = ttk.Frame(main_container)
        log_frame.pack(padx=10, pady=5, expand=True, fill="both")

        self.log_box = tk.Text(log_frame, width=80, height=20, 
                                bg='#34495e', fg='white', 
                                insertbackground='white',
                                font=('Consolas', 10))
        self.log_box.pack(side="left", expand=True, fill="both")
        log_scrollbar = ttk.Scrollbar(log_frame, orient="vertical", command=self.log_box.yview)
        log_scrollbar.pack(side="right", fill="y")
        self.log_box.configure(yscrollcommand=log_scrollbar.set)
        self.log_box.config(state="disabled")
        message_frame = ttk.Frame(main_container)
        message_frame.pack(fill="x", padx=10, pady=(10,0))
        ttk.Label(message_frame, text="Message:", style='TLabel').pack(side="left")
        self.message_entry = ttk.Entry(message_frame, width=50)
        self.message_entry.pack(side="left", expand=True, fill="x", padx=5)

        send_button = ttk.Button(message_frame, text="Send", command=self.send_message, 
                                 style='Accent.TButton')
        send_button.pack(side="right", padx=5)
        file_frame = ttk.LabelFrame(main_container, text="File Encryption/Decryption", style='TLabelframe')
        file_frame.pack(fill="x", padx=10, pady=(10,0))

        ttk.Label(file_frame, text="File:", style='TLabel').pack(side="left")
        self.file_entry = ttk.Entry(file_frame, width=40)
        self.file_entry.pack(side="left", padx=5, expand=True, fill="x")
        browse_button = ttk.Button(file_frame, text="Browse", command=self.browse_file)
        browse_button.pack(side="left", padx=5)
        encrypt_button = ttk.Button(file_frame, text="Encrypt & Send", command=self.encrypt_and_send_file)
        encrypt_button.pack(side="right", padx=5)
        decrypt_file_button = ttk.Button(file_frame, text="Decrypt File", command=self.decrypt_file)
        decrypt_file_button.pack(side="right", padx=5)
        progress_frame = ttk.Frame(main_container)
        progress_frame.pack(fill="x", padx=10, pady=(10,0))
        self.progress_var = tk.DoubleVar()
        self.progress_bar = ttk.Progressbar(progress_frame,
                                            variable=self.progress_var,
                                            style='Custom.Horizontal.TProgressbar',
                                            length=760,
                                            mode='determinate')
        self.progress_bar.pack(fill="x")
        self.percentage_label = tk.Label(progress_frame,
                                         text="0%",
                                         bg='#2c3e50',
                                         fg='white',
                                         font=('Segoe UI', 10))
        self.percentage_label.pack(pady=(10, 0))
        self.status_label = tk.Label(main_container,
                                     text="Ready to Connect",
                                     bg='#2c3e50',
                                     fg='#cdd6f4',
                                     font=('Segoe UI', 10))
        self.status_label.pack(pady=10)

    def lock_key_input(self):
        """Lock the key input field and disable the generate key button."""
        self.key_entry.config(state="disabled")
        self.generate_key_button.config(state="disabled")

    def unlock_key_input(self):
        """Unlock the key input field and enable the generate key button."""
        self.key_entry.config(state="normal")
        self.generate_key_button.config(state="normal")

    def generate_secure_key(self):
        """Generate a cryptographically secure random key."""
        raw_key = secrets.token_bytes(32)
        base64_key = base64.b64encode(raw_key).decode('utf-8')
        self.key_entry.delete(0, tk.END)
        self.key_entry.insert(0, base64_key)

    def connect_to_server(self):
        """Connect to the server."""
        server_ip = self.server_ip_entry.get().strip()
        port = self.port_entry.get().strip()

        if not server_ip or not port:
            messagebox.showwarning("Warning", "Please provide server IP and port")
            return

        try:
            port = int(port)
        except ValueError:
            messagebox.showerror("Error", "Invalid port number")
            return

        try:
            self.client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            self.client_socket.connect((server_ip, port))
            self.server_running = True
            self.connect_button.config(state="disabled")
            self.disconnect_button.config(state="normal")
            self.status_label.config(text="Connected to server")

            # This locks the key input, which is dont after the client starts so no mishappening happens to the key while staying connected to the server.
            self.lock_key_input()
            threading.Thread(target=self.receive_messages, daemon=True).start()
        except Exception as e:
            messagebox.showerror("Connection Error", str(e))

    def disconnect_from_server(self):
        """Disconnect from the server."""
        if self.client_socket:
            self.client_socket.close()
            self.server_running = False
            self.connect_button.config(state="normal")
            self.disconnect_button.config(state="disabled")
            self.status_label.config(text="Disconnected from server")

            # This unlocks key input field in both server and client when the serevr stops for the creating a new session.
            self.unlock_key_input()

    def receive_messages(self):
        """Receive messages from the server and automatically decrypt them."""
        while self.server_running:
            try:
                message_type = self.client_socket.recv(4).decode('utf-8').strip()
                if not message_type:
                    break
                if message_type == "TEXT":
                    data = self.client_socket.recv(1024).decode('utf-8')
                    if not data:
                        break
                    key = self.key_entry.get().strip()

                    if key:
                        try:
                            decrypted_msg = self.decrypt_message(data, key)
                            self.update_log(f"Server: {decrypted_msg}")
                        except Exception as e:
                            self.update_log(f"Decryption error: {e}")
                            self.update_log(f"Server (Encrypted): {data}")
                    else:
                        self.update_log(f"Server (Encrypted): {data} (No key provided)")

                elif message_type == "FILE":
                    file_size = int(self.client_socket.recv(1024).decode('utf-8'))
                    self.client_socket.send(b'ACK') 
                    received_data = b''
                    while len(received_data) < file_size:
                        chunk = self.client_socket.recv(1024)
                        if not chunk:
                            break
                        received_data += chunk
                    encrypted_file_path = f"received_file.enc"
                    with open(encrypted_file_path, 'wb') as f:
                        f.write(received_data)

                    self.update_log(f"Received encrypted file: {encrypted_file_path}")
            except Exception as e:
                self.update_log(f"Connection error: {e}")
                break
    def send_message(self):
        """Send an encrypted message to the server."""
        if not self.client_socket:
            messagebox.showwarning("Warning", "Not connected to server")
            return

        message = self.message_entry.get().strip()
        if not message:
            messagebox.showwarning("Warning", "Message is empty")
            return

        key = self.key_entry.get().strip()
        if not key:
            messagebox.showwarning("Warning", "Please provide an encryption key")
            return

        try:
            # This encrypts the text before the user sends it.
            encrypted_message = self.encrypt_message(message, key)
            self.client_socket.send("TEXT".encode('utf-8'))
            self.client_socket.send(encrypted_message.encode('utf-8'))
            self.update_log(f"You (Encrypted): {encrypted_message}")
            self.update_log(f"You (Plaintext): {message}") 
            self.message_entry.delete(0, tk.END)
        except Exception as e:
            messagebox.showerror("Error", str(e))
    def encrypt_message(self, message, key):
        """Encrypt a message using XOR encryption."""
        key_hash = hashlib.sha256(key.encode()).digest()
        encrypted = bytearray()
        for i, char in enumerate(message.encode()):
            encrypted.append(char ^ key_hash[i % len(key_hash)])
        return base64.b64encode(encrypted).decode('utf-8')

    def decrypt_message(self, encrypted_message, key):
        """Decrypt a message using XOR decryption."""
        try:
            key_hash = hashlib.sha256(key.encode()).digest()
            decoded = base64.b64decode(encrypted_message)
            decrypted = bytearray()
            for i, char in enumerate(decoded):
                decrypted.append(char ^ key_hash[i % len(key_hash)])
            return decrypted.decode('utf-8')
        except Exception as e:
            raise Exception(f"Decryption failed: {e}")

    def browse_file(self):
        """Open a file dialog to select a file."""
        file_path = filedialog.askopenfilename()
        if file_path:
            self.file_entry.delete(0, tk.END)
            self.file_entry.insert(0, file_path)

    def encrypt_and_send_file(self):
        """Encrypt the selected file and send it to the server."""
        if not self.client_socket:
            messagebox.showwarning("Warning", "Not connected to server")
            return

        file_path = self.file_entry.get().strip()
        if not file_path:
            messagebox.showwarning("Warning", "Please select a file to encrypt and send")
            return

        key = self.key_entry.get().strip()
        if not key:
            messagebox.showwarning("Warning", "Please provide an encryption key")
            return

        try:
            encrypted_file_path = self._encrypt_file(file_path, key)
            if not encrypted_file_path:
                return
            file_size = os.path.getsize(encrypted_file_path)

            # This sends the file size and data to the server.
            with open(encrypted_file_path, 'rb') as f:
                file_data = f.read()
            self.client_socket.send("FILE".encode('utf-8'))
            self.client_socket.send(str(file_size).encode('utf-8'))
            self.client_socket.recv(1024) 
            self.client_socket.sendall(file_data)
            self.update_log(f"Sent encrypted file: {os.path.basename(encrypted_file_path)}")
        except Exception as e:
            messagebox.showerror("Error", str(e))

    def _encrypt_file(self, input_path, password):
        """Encrypt a file using AES encryption."""
        try:
            # After receiving the encrypted file from the server this will decrypts the file after selecting the encrypted file.
            original_extension = os.path.splitext(input_path)[1]

            # This will remove the original extension of the file after encryption andwill replace it wiht the .enc extension.
            base_name = os.path.splitext(input_path)[0]
            output_path = base_name + '.enc'
            salt = secrets.token_bytes(16)
            iv = secrets.token_bytes(16)
            key = self._derive_key(password, salt)
            cipher = Cipher(algorithms.AES(key), modes.CFB(iv), backend=default_backend())
            encryptor = cipher.encryptor()
            with open(input_path, 'rb') as infile, open(output_path, 'wb') as outfile:
                outfile.write(salt)
                outfile.write(iv)
                outfile.write(struct.pack('>I', len(original_extension)))
                outfile.write(original_extension.encode())
                while chunk := infile.read(1024 * 1024):
                    encrypted_chunk = encryptor.update(chunk)
                    outfile.write(encrypted_chunk)
                final_chunk = encryptor.finalize()
                outfile.write(final_chunk)
            return output_path
        except Exception as e:
            messagebox.showerror("Encryption Error", str(e))
            return None

    def decrypt_file(self):
        """Decrypt a file using the provided key."""
        file_path = filedialog.askopenfilename(title="Select File to Decrypt")
        if not file_path:
            return

        key = self.key_entry.get().strip()
        if not key:
            messagebox.showwarning("Warning", "Please provide an encryption key")
            return

        try:
            with open(file_path, 'rb') as infile:
                salt = infile.read(16)
                iv = infile.read(16)
                extension_length = struct.unpack('>I', infile.read(4))[0]
                original_extension = infile.read(extension_length).decode()
                key = self._derive_key(key, salt)
                cipher = Cipher(algorithms.AES(key), modes.CFB(iv), backend=default_backend())
                decryptor = cipher.decryptor()

                # This will remove the .enc extension and will restore the file to its original format.
                base_name = os.path.splitext(file_path)[0]
                output_path = base_name + original_extension
                with open(output_path, 'wb') as outfile:
                    while chunk := infile.read(1024 * 1024):
                        decrypted_chunk = decryptor.update(chunk)
                        outfile.write(decrypted_chunk)

                    final_chunk = decryptor.finalize()
                    outfile.write(final_chunk)

            self.update_log(f"Decrypted file saved as: {output_path}")
        except Exception as e:
            messagebox.showerror("Decryption Error", str(e))

    def _derive_key(self, password, salt):
        """Derive a secure key using Scrypt KDF."""
        kdf = Scrypt(salt=salt, length=32, n=2**14, r=8, p=1, backend=default_backend())
        key = kdf.derive(password.encode())
        return key

    def update_log(self, message):
        """Update chat log."""
        self.log_box.config(state="normal")
        self.log_box.insert(tk.END, message + "\n")
        self.log_box.see(tk.END)
        self.log_box.config(state="disabled")

if __name__ == "__main__":
    root = tk.Tk()
    app = ModernStyledApp(root)
    root.mainloop()