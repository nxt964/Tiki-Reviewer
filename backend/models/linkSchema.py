from bson import ObjectId

class LinkSchema:
    def __init__(self, db=None):
        self.collection = db['links'] if db else None
        if not self.collection:
            raise ValueError("Database collection could not be initialized.")

    def create_link(self, user_id, product_name, product_url, price, sold, imgs_url, rating):
        if self.collection is None:
            raise ValueError("Database collection not initialized.")

        # Validate user_id
        if not ObjectId.is_valid(user_id):
            raise ValueError("Invalid user ID format.")

        # Default values for optional fields
        price = price if price else 0
        product_url = product_url if product_url else ""
        product_name = product_name if product_name else ""
        sold = sold if sold else 0
        imgs_url = imgs_url if imgs_url else [""]
        rating = rating if rating else 0

        # Create link document
        link = {
            "user_id": ObjectId(user_id),
            "product_name": product_name,
            "product_url": product_url,
            "price": price,
            "sold": sold,
            "imgs_url": imgs_url,
            "rating": rating,
        }
        
        linkFind = self.collection.find_one({"user_id": link["user_id"], "product_url": link["product_url"]})
        
        if not linkFind:
            inserted = self.collection.insert_one(link)
            link["_id"] = inserted.inserted_id
        else:
            link["_id"] = linkFind["_id"]
        
        return link

    def find_links_by_user_id(self, user_id):
        if self.collection is None:
            raise ValueError("Database collection not initialized.")
        if not ObjectId.is_valid(user_id):
            raise ValueError("Invalid user ID format.")
        
        return list(self.collection.find({"user_id": ObjectId(user_id)}))
