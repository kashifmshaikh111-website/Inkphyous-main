import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const ContactUs = () => {
  const [file, setFile] = useState(null);
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");

  const subjects = [
    "General Inquiry",
    "Order Status",
    "Return & Exchange",
    "Damages",
    "My Account",
    "Cancellation Request",
    "Others"
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-8 sm:py-12 md:py-0 md:px-0">
      {/* GRID SECTION */}
      <div className="w-full  grid grid-cols-1 md:grid-cols-2 md:pr-6">

        {/* LEFT SIDE */}
        <div className="flex flex-col text-center justify-center px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-black title">
            Contact
          </h1>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
            If you have any questions about your order or need further assistance, you can always contact us at
          </p>

          <p className="text-base sm:text-lg text-red-600 font-semibold mb-4 sm:mb-6">
            info@inkphyous.com
          </p>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Alternatively, please complete the form by selecting a subject and entering your question or comment.
            Our Customer Service team will review your message and respond as soon as possible.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-12 border-t md:border-t-0 md:border-l border-red-500 flex flex-col justify-center">
          <div className="flex flex-col text-right space-y-3 sm:space-y-4">

            {/* NAME */}
            <input
              type="text"
              placeholder="Name"
              className="border text-right border-gray-400 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-gray-700 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />

            {/* SUBJECT DROPDOWN */}
            <div className="relative">
              <div
                className="border border-gray-400 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-right text-gray-700 placeholder-gray-600 cursor-pointer flex items-center justify-end gap-2 hover:border-gray-600 transition-colors"
                onClick={() => setIsSubjectOpen(!isSubjectOpen)}
              >
                <span className="text-right flex-1">{selectedSubject || "Subject"}</span>
                <ChevronDown
                  className={`transition-transform flex-shrink-0 ${isSubjectOpen ? "rotate-180" : ""}`}
                  size={18}
                />
              </div>

              {isSubjectOpen && (
                <div className="absolute z-20 w-full bg-white border border-gray-300 shadow-lg mt-1 text-right max-h-60 overflow-y-auto">
                  {subjects.map((sub, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedSubject(sub);
                        setIsSubjectOpen(false);
                      }}
                      className="px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email"
              className="border text-right border-gray-400 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-gray-700 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />

            {/* DESCRIPTION */}
            <textarea
              rows="5"
              placeholder="Description"
              className="border text-right border-gray-400 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-gray-700 placeholder-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            ></textarea>

            {/* FILE INPUT */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 text-xs sm:text-sm text-gray-600">
              <span className="truncate max-w-full sm:max-w-[60%] order-2 sm:order-1">
                {file ? file.name : "No File Selected"}
              </span>

              <label className="border border-gray-400 px-3 py-1.5 sm:py-1 cursor-pointer hover:bg-red-500 transition-all hover:text-white hover:border-red-500 text-gray-700 text-sm whitespace-nowrap order-1 sm:order-2 self-end sm:self-auto">
                Attach File
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="mt-6 sm:mt-8 flex justify-center w-full px-4">
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto sm:min-w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1000px] text-center border border-gray-400 py-2.5 sm:py-3 px-8 sm:px-12 text-base sm:text-lg text-gray-800 bg-transparent hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 rounded font-medium"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ContactUs;