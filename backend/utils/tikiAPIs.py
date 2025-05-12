import requests
import random
import aiohttp
import asyncio
from urllib.parse import urlparse, parse_qs
from utils.commentParser import commentParser

class TikiAPIs:
    @staticmethod
    def getIDs(product_url):
        parsed_url = urlparse(product_url)
        product_id = parsed_url.path.split('-')[-1].split('.')[0]
        product_id = product_id[1:]

        query_params = parse_qs(parsed_url.query)
        spid = query_params.get('spid', [None])[0]
        
        if spid is None or product_id is None:
            raise Exception('Invalid product URL, please provide a valid product URL from tiki.vn')
       
        headers = {
            "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        }

        params = {
            "platform": "web",
            "spid": spid,
            "version": 3
        }   

        response = requests.get(f"https://tiki.vn/api/v2/products/{product_id}", headers=headers, params=params).json()
        current_seller = response.get('current_seller')
        seller_id = current_seller.get('id')
        return product_id, spid, seller_id

    @staticmethod
    async def fetchAcomments(session, url, headers, params):
        async with session.get(url, headers=headers, params=params) as response:
            return await response.json()

    @staticmethod
    async def fetchComments(product_id, spid, seller_id):
        api_url = f"https://tiki.vn/api/v2/reviews"

        params = {
            "limit": 5,
            "include": "comments,contribute_info,attribute_vote_summary",
            "sort": "score|desc,id|desc,stars|all",
            "spid": spid,
            "product_id": product_id,
            "seller_id": seller_id
        }

        headers = {
            "sec-ch-ua": '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        }   

        async with aiohttp.ClientSession() as session:
            # Get the total pages
            response = await TikiAPIs.fetchAcomments(session, api_url, headers, params)
            total_pages = response.get('paging').get('last_page')

            comments = []
            random_pages = random.sample(range(1, total_pages + 1), min(100, total_pages))

            tasks = []
            for page in random_pages:
                page_params = params.copy()
                page_params['page'] = page
                tasks.append(TikiAPIs.fetchAcomments(session, api_url, headers, page_params))

            responses = await asyncio.gather(*tasks)

            for response in responses:
                for comment in response.get('data'):
                    if len(comment.get('content')) > 10:
                        comments.append(commentParser(comment))

            return comments
    
    @staticmethod
    def getInformation(product_id, spid, seller_id):
        api_url = f"https://tiki.vn/api/v2/products/{product_id}"
        
        headers = {
            "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        }

        params = {
            "platform": "web",
            "spid": spid,
            "version": 3
        }

        response = requests.get(api_url, headers=headers, params=params).json()

        information = {}
        information['name'] = response.get('name')
        information['price'] = response.get('price')
        information['sold'] = response.get('all_time_quantity_sold')
        information['categories'] = response.get('categories').get('name')
        information['description'] = response.get('description')
        information['images'] = [image.get('base_url') for image in response.get('images')]
        information['rating'] = response.get('rating_average')

        return information