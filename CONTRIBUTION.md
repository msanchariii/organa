
<h2 id="contributing">👥 Contributing</h2>
<p>Contributions are welcome! Follow these steps:</p>
<ol>
    <li>Fork the repository.</li>
    <li>Create a feature branch (<code>git checkout -b feature/AmazingFeature</code>).</li>
    <li>Commit changes (<code>git commit -m 'Add AmazingFeature'</code>).</li>
    <li>Push to the branch (<code>git push origin feature/AmazingFeature</code>).</li>
    <li>Open a Pull Request.</li>
</ol>


<h2 id="installation">⚙ Installation</h2>

```
# Clone the repository
git clone https://github.com/Subhradeep1708/Karmatek-2025-Organa
```

### Backend (Python + Fast API)

```
cd backend

# Create A Virtual Environment
python -m venv venv

# Activate The Virtual Env
./venv/Scripts/activate

# Install All the dependencies
pip install -r requirements.txt

# Run the developmen server
uvicorn app.main:app --reload
```

### Frontend (Next.js)

```
cd frontend

# Install Dependencies
bun install

# Configure .env

# Run the development Server
bun run dev
```

### Notification Service

```
cd ws

# Install Dependencies
bun install

# Configure .env

# Run the development Server
bun run dev