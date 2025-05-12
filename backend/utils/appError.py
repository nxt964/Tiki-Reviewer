class AppError(Exception):
    def __init__(self, message, status_code):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)

    def to_dict(self):
        return {
            'status': 'fail',
            'status_code': self.status_code,
            'message': self.message
        }