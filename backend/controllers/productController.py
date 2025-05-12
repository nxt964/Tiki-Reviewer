from flask import jsonify
import torch
import time
from transformers import AutoModelForSequenceClassification, AutoTokenizer
from utils.appError import AppError
from utils.tikiAPIs import TikiAPIs
import json
import requests
import markdown

class ProductController: 
    # Class attributes for model and tokenizer
    model = None
    tokenizer = None

    @staticmethod
    def initialize():
        print("Initializing model and tokenizer...")
        ProductController.tokenizer = AutoTokenizer.from_pretrained("lamsytan/sentiment-analysis-product-comment")
        ProductController.model = AutoModelForSequenceClassification.from_pretrained("lamsytan/sentiment-analysis-product-comment")
        print("Model and tokenizer initialized.")

    @staticmethod
    async def getCommentsOfProducts(product_id, spid, seller_id):
        print("Fetching comments...")
        try:
            # Estimate time to fetch comments
            start = time.time()
            comments = await TikiAPIs.fetchComments(product_id, spid, seller_id)
            end = time.time()

            print(f"Time to fetch comments: {end - start} seconds")
           
            # save(comments)
            return comments
        except AppError as e:
            return jsonify(e.to_dict())  
        
    @staticmethod
    def getInformation(product_id, spid, seller_id):
        print("Fetching information...")
        try:
            start = time.time()
            information = TikiAPIs.getInformation(product_id, spid, seller_id)
            end = time.time()

            print(f"Time to fetch information: {end - start} seconds")
            return information
        except AppError as e:
            return jsonify(e.to_dict())

    @staticmethod
    def analyzeComments(comments):
        if ProductController.tokenizer is None or ProductController.model is None:
            raise AppError("Model and tokenizer are not initialized", 500)
     
        print("Analyzing comments...")
        try:
            start = time.time()

            NEGs, POSs, NEUs = [], [], []
            
            with torch.no_grad():
                for comment in comments:
                    inputs = ProductController.tokenizer(comment, return_tensors="pt", padding=True, truncation=True)
                    outputs = ProductController.model(**inputs)
                    sentiment = torch.softmax(outputs.logits, dim=1).argmax().item()

                    if sentiment == 0:
                        NEGs.append(comment)
                    elif sentiment == 1:
                        POSs.append(comment)
                    else:
                        NEUs.append(comment)

            print(f"Time to analyze comments: {time.time() - start:.2f} seconds")
            return NEGs, POSs, NEUs

        except Exception as e:
            raise AppError(f"Error analyzing comments: {str(e)}", 500)

    @staticmethod
    def summarize(NEGs, POSs, NEUs):
        print("Summarizing...")
        API_KEY = "AIzaSyB7RxQ_bxmnBc7T27ar2BmofJYVD1HZHWI"
        URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={API_KEY}"
        prompt_text = (
            "Hãy tóm tắt các ý chính về sản phẩm dựa trên các bình luận sau đây, dài khoảng 100 từ.\n\n"
            "Bình luận tiêu cực:\n" + "\n".join(NEGs) + "\n\n"
            "Bình luận tích cực:\n" + "\n".join(POSs) + "\n\n"
            "Bình luận trung lập:\n" + "\n".join(NEUs)
        )
        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": prompt_text}
                    ]
                }
            ]
        }
        headers = {
            "Content-Type": "application/json"
        }
        try:
            response = requests.post(URL, headers=headers, data=json.dumps(payload))
            data = response.json()
            markdown_text = data['candidates'][0]['content']['parts'][0]['text']
            html_output = markdown.markdown(markdown_text)
            return html_output
        except Exception as e:
            raise AppError(f"Error summarizing comments: {str(e)}", 500)
        