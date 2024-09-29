import React, { useState } from "react";
import BannerPng from "../../assets/banner.png";
import { motion } from "framer-motion";
import Qrious from "qrious"; // For QR code generation

const Banner2 = () => {
  const [showModal, setShowModal] = useState(false); // To handle modal visibility
  const [amount, setAmount] = useState(''); // To capture the donation amount
  const [qrCode, setQrCode] = useState(''); // To store the generated QR code

  // Function to generate QR code dynamically based on amount
  const generateQrCode = () => {
    if (amount) {
      const qr = new Qrious({
        value: `upi://pay?pa=YOUR_UPI_ID&pn=YOUR_NAME&am=${amount}&cu=INR`, // UPI QR format
        size: 250, // Size of the QR code
      });
      setQrCode(qr.toDataURL());
    }
  };

  const handleDonateClick = () => {
    setShowModal(true); // Show modal when 'Donate Now' is clicked
  };

  const handlePayment = () => {
    generateQrCode(); // Generate the QR code after entering the amount
  };

  return (
    <section>
      <div className="container py-0 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 space-y-6 md:space-y-0">
        {/* Banner Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <div className="text-center md:text-left space-y-4 lg:max-w-[450px]">
            <h1 className="text-5xl font-bold !leading-snug">
              Join Our Community to Make a Difference
            </h1>
            <p className="text-xl text-dark2">
              Help us support disaster-affected communities by contributing to our crowdfunding initiatives. Your generosity can provide essential resources, training, and recovery assistance to those in need.
            </p>
            <button onClick={handleDonateClick} className="primary-btn !mt-8">
              Donate Now
            </button>
          </div>
        </motion.div>

        {/* Banner Image */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            src={BannerPng}
            alt=""
            className="w-[350px] md:max-w-[450px] object-cover drop-shadow"
          />
        </div>
      </div>

      {/* Donation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px]">
            <h2 className="text-2xl font-bold mb-4">Donate Now</h2>

            {/* Donation Amount Input */}
            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border rounded mb-4"
            />

            {/* Generate QR Code Button */}
            <button
              onClick={handlePayment}
              className="primary-btn w-full mb-4"
            >
              Generate Payment QR Code
            </button>

            {/* QR Code Display */}
            {qrCode && (
              <div className="text-center">
                <p className="text-lg mb-4">Scan to Donate</p>
                <img src={qrCode} alt="QR Code" className="mx-auto" />
              </div>
            )}

            {/* Close Modal Button */}
            <button
              onClick={() => setShowModal(false)}
              className="secondary-btn w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Banner2;

