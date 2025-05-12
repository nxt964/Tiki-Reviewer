
# Tiki-Reviewer
**Tiki-Reviewer** is an intelligent tool that analyzes product quality on Tiki by evaluating real customer reviews. It classifies feedback into positive, negative, or neutral sentiments and uses AI to generate an overall product assessment. Users can sign up or log in to save their search history for future reference.


## Set up for project development

Open terminal in the whole project:  
`cd <directory>\ResentimentAI`  
*Note: replace `<directory>` by the parent folder of project* 

1. Install backend's packages
- Navigate to backend folder    
`cd backend`   
- Create virtual environment:  
`py -m venv .venv`  
- Activate virtual environment:  
`.\.venv\Scripts\activate`  
- Install all backend's packages in requirements.txt to virtual environment:  
`pip install -r requirements.txt`  
- When you want to install a new package to virtual environment, please include it to requirements.txt:  
`pip install [package_name]`  
`pip freeze > requirements.txt` 
2. Install all frontend's packages: (open new terminal)     
`cd frontend`   
`npm install`

## Run application  
- Back-end: `py server.py`
- Front-end: `npm start`
- Open `localhost:3000` on browser to use application


