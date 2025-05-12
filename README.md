
# ReviewSentimentAI


## Set up for project development

Open terminal in the whole project:  
`cd <directory>\ResentimentAI`  
*Note: replace `<directory>` by the parent folder of project* 

Create virtual environment:  
`py -m venv .venv`

Activate virtual environment:  
`.\backend\.venv\Scripts\activate`  

Install all backend's packages in requirements.txt to virtual environment:  
`pip install -r requirements.txt`  

When you want to install a new package to virtual environment, please include it to requirements.txt:  
`pip install [package_name]`  
`pip freeze > requirements.txt`  

Install all frontend's packages: (open new terminal)     
`cd frontend`   
`npm install`

## Run application  
- Back-end: `py server.py`
- Front-end: `npm start`
- Open `localhost:3000` on browser to use application


