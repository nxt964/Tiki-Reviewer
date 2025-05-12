import Carousel from "react-bootstrap/Carousel";
import { memo } from "react";
import styles from "./Banner.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";

const Banner = () => {
    return (
        <Carousel controls={false} indicators={false}>
            <Carousel.Item interval={3000} className={styles["carousel-item"]}>
                <div className={styles["text-container"]}>
                    <h1 className={styles.heading}>
                        PHÂN TÍCH THỊ HIẾU SẢN PHẨM CHỈ TRONG VÀI GIÂY
                        <FontAwesomeIcon icon={faHourglassHalf} className={styles.icon} />
                    </h1>
                    <p className={styles.subtitle}>
                        Gửi cho chúng tôi thông tin chi tiết về sản phẩm của bạn, AI sẽ phân loại phản hồi của các khách
                        hàng thành tích cực, tiêu cực hoặc trung lập dựa trên các bình luận thực tế.
                    </p>
                </div>
            </Carousel.Item>
            <Carousel.Item interval={3000} className={styles["carousel-item"]}>
                <div className={styles["text-container"]}>
                    <h1 className={styles.heading}>
                        PHẢN HỒI KẾT QUẢ ĐƯỢC HỖ TRỢ BỞI AI
                        <FontAwesomeIcon icon={faLightbulb} className={styles.icon} />
                    </h1>
                    <p className={styles.subtitle}>
                        Tận dụng mô hình AI đã được huấn luyện của chúng tôi để thu thập những hiểu biết chính xác từ
                        đánh giá sản phẩm và đưa ra quyết định một cách dễ dàng và sáng suốt.
                    </p>
                </div>
            </Carousel.Item>
        </Carousel>
    );
};

export default memo(Banner);
