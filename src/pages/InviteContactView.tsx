import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import InputMask from "react-input-mask";
import { useTickets } from "../context/TicketsContext";

const InviteContactView: React.FC = () => {
  const navigate = useNavigate();
  const { addBuddy } = useTickets();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setIsValid(value.replace(/[^0-9]/g, "").length === 10);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      console.log("Sending invitation to:", phoneNumber);

      addBuddy({
        phone: phoneNumber,
        isActive: false,
      });

      navigate("/contacts");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate("/contacts")}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft size={20} className="mr-1" />
          Back
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Send Invite</h2>
        <p className="text-gray-600">Invite a friend to share tickets with</p>
      </div>

      <div className="max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <InputMask
              mask="(999) 999-9999"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-800 focus:border-primary outline-none"
              placeholder="(555) 555-5555"
            />
            <p className="mt-2 text-sm text-gray-500">
              We'll send an invitation to this number
            </p>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full flex items-center justify-center px-4 py-2 rounded-md font-medium ${
              isValid
                ? "bg-primary text-white hover:bg-primary"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            } transition-colors`}
          >
            <Send size={18} className="mr-2" />
            Send Invite
          </button>
        </form>
      </div>
    </div>
  );
};

export default InviteContactView;
