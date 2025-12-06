import { useState } from "react";
import api from "../../api/api";
import "./EnquiryForm.css";


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


function EnquiryForm({ productId, onClose }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!emailRegex.test(formData.email)) {
            alert("Please enter a valid email address.");
            setLoading(false);
            return;
        }

        try {
            await api.post("/enquiries", {
                product_id: productId,
                ...formData,
            });

            setSuccess("Enquiry submitted successfully!");
            setFormData({ name: "", email: "", phone: "", message: "" });

            setTimeout(() => {
                onClose();
            }, 1000);

        } catch (err) {
            alert("Error submitting enquiry. Please try again.");
            console.error(err);
        }

        setLoading(false);
    };


    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Enquire about this product</h2>

                {success && <p className="success">{success}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number (optional)"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <textarea
                        name="message"
                        placeholder="Your message..."
                        required
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>

                    <button type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Submit Enquiry"}
                    </button>

                    <button type="button" className="close-btn" onClick={onClose}>
                        Close
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EnquiryForm;
