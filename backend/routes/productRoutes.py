from controllers.productController import ProductController
from flask import Blueprint, request, jsonify

from utils.appError import AppError

from utils.tikiAPIs import TikiAPIs

productRoutes = Blueprint('productRoutes', __name__)

@productRoutes.route('/', methods=['POST'])
async def getResults():
    try:
        product_url = request.json.get('product_url')

        if product_url is None:
            raise AppError('Please provide a product URL from tiki.vn', 400)
        
        # check if the product_url is a valid URL
        if not product_url.startswith('https://tiki.vn/'):
            raise AppError('Đường liên kết không hợp lệ từ tiki.vn', 400)

        product_id, spid, seller_id = TikiAPIs.getIDs(product_url)
        print(product_url)
        print(product_id, spid, seller_id)       
       
        comments = await ProductController.getCommentsOfProducts(product_id, spid, seller_id)       
        NEGs, POSs, NEUs =  ProductController.analyzeComments(comments)

        information =  ProductController.getInformation(product_id, spid, seller_id)
        summary = ProductController.summarize(NEGs, POSs, NEUs)

        return jsonify({
            "status": "success",
            "status_code": 200,
            "data": {
                "negative_comments": NEGs,
                "positive_comments": POSs,
                "neutral_comments": NEUs, 
                "information": information,
                "summary": summary
            }
        }), 200
    except AppError as e:
        return jsonify(e.to_dict()), e.status_code 
    except Exception as e:
        return jsonify({
            "status": "fail",
            "status_code": 500,
            "message": str(e)
        }), 500