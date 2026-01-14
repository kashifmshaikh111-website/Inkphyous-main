import { motion } from "framer-motion";
import BrandText from "./BrandText";

export default function MainContent() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#fff",
                color: "#000",
            }}
        >
            {/* Brand name */}
            <BrandText />

            {/* Optional subtitle */}
            <p style={{ marginTop: "20px", fontSize: "1rem", letterSpacing: "2px" }}>
                PREMIUM CLOTHING BRAND
            </p>
        </motion.div>
    );
}
