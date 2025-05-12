import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import styles from "./Analyzation.module.css";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import ImageCarousel from "../../components/ImageCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faStar } from "@fortawesome/free-solid-svg-icons";

export default function Analyzation() {
    const xData = ["Tích cực", "Tiêu cực", "Trung lập"];

    const location = useLocation();
    const { state } = location;

    const comments = [state.positive_comments, state.negative_comments, state.neutral_comments];

    const yData = comments.map((arr) => arr.length);
    const total = yData.reduce((acc, val) => acc + val, 0);

    const formattedData = yData.map((value, index) => ({
        id: index,
        value,
        label: `${xData[index]} (${((value / total) * 100).toFixed(1)}%)`,
        color: index === 0 ? "green" : index === 1 ? "red" : "blue",
    }));

    const rating = state.rating.toFixed(1);
    const ratingPercent = (state.rating / 5).toFixed(2);
    const [type, setType] = useState(0);

    useEffect(() => {
        document.getElementById("description").innerHTML = state.description;
    });

    const handleClick = (event, item) => {
        setType(item.dataIndex);
    };

    return (
        <div className="container mt-4">
            <div className={styles["product-information"]}>
                <p className={styles.title}>Sản phẩm</p>
                <div className={styles.information + " row g-4"}>
                    <div className={" col-12 col-md-6"}>
                        <ImageCarousel images={state["imgs_url"]} className={styles.images} />
                    </div>
                    <div className={"col-12 col-md-6"}>
                        <div className={styles["information-detail"] + " " + styles["information-container"]}>
                            <div className={styles.header}>
                                <div className={styles.name}>{state["product_name"]}</div>
                                <div className={styles.detail}>
                                    <div className={styles.rating}>
                                        {rating}
                                        <div className={styles["stars-outer"]}>
                                            {[...Array(5)].map((_, index) => {
                                                return <FontAwesomeIcon key={index} icon={faStar} />;
                                            })}
                                            <div
                                                className={styles["stars-inner"]}
                                                style={{
                                                    width: `${Math.round(ratingPercent * 100)}%`,
                                                }}
                                            >
                                                {[...Array(5)].map((_, index) => {
                                                    return <FontAwesomeIcon key={index} icon={faStar} />;
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.sold}>
                                        <div className={styles.line}></div>
                                        {`Đã bán ${state.sold}`}
                                    </div>
                                </div>
                                <div className={styles.price}>
                                    {new Intl.NumberFormat("de-DE").format(state.price)}
                                    <span>₫</span>
                                </div>
                                <p>Mô tả sản phẩm:</p>
                            </div>
                            <div className={styles.description}>
                                <div id="description"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles["charts-container"] + " mt-4"}>
                <p className={styles.title}>
                    Biểu đồ phân tích phản hồi từ khách hàng: <span>{total} lượt đánh giá</span>
                </p>
                <div className="row">
                    <BarChart
                        title="Phân tích"
                        xAxis={[
                            {
                                label: "Trạng thái",
                                scaleType: "band",
                                data: xData,
                            },
                        ]}
                        yAxis={[
                            {
                                label: "Số lượng đánh giá", // Y-axis label
                                tickSpacing: 1, // Spacing between ticks
                                max: Math.max.apply(null, yData) + 10, // Maximum value of the Y-axis
                                min: 0, // Minimum value of the Y-axis
                                showGrid: true, // Show gridlines
                            },
                        ]}
                        series={[{ data: yData }]}
                        width={window.innerWidth * 0.5}
                        height={window.innerHeight * 0.6}
                        colors={["#1a4a81"]}
                        onAxisClick={handleClick} // Attach the click handler
                        margin={{
                            bottom: 100,
                            top: 100,
                            right: 100,
                            left: 100,
                        }}
                    />
                    <PieChart
                        series={[
                            {
                                data: formattedData,
                                highlightScope: { fade: "global", highlight: "item" },
                                faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
                            },
                        ]}
                        width={window.innerWidth*0.5}
                        height={window.innerWidth*0.2}
                    />
                </div>
            </div>
            <div className={styles.summary + " mt-3"}>
                <p className={styles.title}>
                    {/* <FontAwesomeIcon icon={faRobot} className='me-2'/> */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="currentColor"
                        class="bi bi-robot me-2"
                        viewBox="0 0 16 16"
                    >
                        <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135" />
                        <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5" />
                    </svg>
                    Đánh giá tổng quan:
                </p>
                <div className={styles["summarize-comment"]} dangerouslySetInnerHTML={{ __html: state.summary }}></div>
            </div>
            <div className={styles.comments + " mt-3 mb-5"}>
                <div className="d-flex align-items-center">
                    <p className={styles.title}>
                        Bình luận chi tiết:
                    </p>
                    <select
                        className={styles.dropdown}
                        value={type}
                        onChange={(e) => setType(Number(e.target.value))}
                    >
                        {xData.map((label, idx) => (
                            <option key={idx} value={idx}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className={styles["comment-list"]}>
                    <ul>
                        {comments[type].map((comment, index) => {
                            return <li key={index}>{comment}</li>;
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}
