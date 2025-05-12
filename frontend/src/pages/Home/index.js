import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import styles from "./Home.module.css";
import useFetch from "../../hooks/useFetch";
import AnalyzeModal from "../../components/AnalyzeModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshakeAngle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { getCurrentUser } from "../../utils/userStorage";

const REACT_APP_BASEURL = "http://localhost:3001";
const reqAPI = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: null,
};

export default function Home() {
    const [link, setLink] = useState("");
    const navigate = useNavigate();
    const [fetchRequest, setFetchRequest] = useState(reqAPI);

    const handleClick = (e) => {
        // const currentUser = getCurrentUser();
        // if (!currentUser) {
        //     toast.error("Vui lòng đăng nhập để sử dụng chức năng này");
        //     return;
        // }

        const data = {
            product_url: link,
        };
        setFetchRequest({ ...fetchRequest, body: JSON.stringify(data) });
    };

    const addLink = async (fetchReq) => {
        try {
            const response = await fetch(`${REACT_APP_BASEURL}/api/v1/link/add`, fetchReq);
            const data = await response.json();
            if (data.status === "success") {
                toast.success("Phân tích thành công");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Lỗi kết nối đến server");
        }
    };

    // Call API
    const { payload, status, isLoading } = useFetch(`${REACT_APP_BASEURL}/api/v1/product`, fetchRequest);
    useEffect(() => {
        if (status === "success") {
            const information = payload.information;

            const bodyFetch = {
                // user_id: getCurrentUser().id,
                product_name: information.name,
                product_url: link,
                price: information.price,
                sold: information.sold,
                imgs_url: information.images,
                rating: information.rating,
            };

            if (getCurrentUser() !== null) {
                const fetchReq = {
                    ...reqAPI,
                    body: JSON.stringify({
                        ...bodyFetch,
                        user_id: getCurrentUser().id,
                    }),
                };

                addLink(fetchReq);
            }
            

            navigate("/analyze", {
                state: {
                    ...bodyFetch,
                    description: information.description,
                    positive_comments: payload.positive_comments,
                    negative_comments: payload.negative_comments,
                    neutral_comments: payload.neutral_comments,
                    summary: payload.summary,
                },
            });
        } else if (status !== "success" && status !== "fail") {
            toast.error(status);
            setLink("");
        }
        setFetchRequest({ ...fetchRequest, body: null });
    }, [payload, status]);

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.heading}>BẠN VẪN CÒN PHÂN VÂN VỀ LỰA CHỌN CỦA MÌNH?</h1>
                    <h1 className={styles.heading}>
                        ĐỪNG LO, CHÚNG TÔI LUÔN SẴN SÀNG HỖ TRỢ BẠN!
                        <FontAwesomeIcon icon={faHandshakeAngle} className={styles.icon} />
                    </h1>
                </div>
                <form
                    className={styles.content}
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleClick();
                    }}
                >
                    <label htmlFor="input-link">
                        Nhập đường liên kết sản phẩm từ
                        <a href="https://tiki.vn" target="_blank" rel="noopener noreferrer" style={{"marginLeft" : 5}}>Tiki</a>
                        :
                    </label>
                    <div className={styles["input-container"]}>
                        <input
                            type="text"
                            id="input-link"
                            placeholder={`Link...`}
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                        <button type="submit" disabled={link === ""}>
                            Phân tích
                        </button>
                    </div>
                </form>
            </div>
            <Banner />
            <AnalyzeModal show={isLoading} />
        </>
    );
}
