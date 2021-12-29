import { useState, useEffect } from "react";
import styled from "styled-components";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import axios from "axios";
import logo from "../assets/logo.png";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const SummaryButton = styled.button`
cursor: pointer;
border: none;
width: 102px;
height: 30px;
background: #854bff;
border-radius: 2px;
font-family: Lato;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 14px;
color: #ffffff;
`;

const FlutterWave = ({ user, token }) => {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    if (responseData) {
      const storeResponse = async () => {
        const response = await axios.post("/api/payment", responseData, {
          headers: {
            Authorization: token,
          },
        });
        toast(response.data, { type: "success" });
      };
      storeResponse();
    }
  }, [responseData]);

  const config = {
    public_key: "FLWPUBK_TEST-0a92eb635b3b091c613536a568f89672-X",
    tx_ref: uuidv4(),
    amount: 5000,
    currency: "NGN",
    payment_options: "card",
    customer: {
      email: user?.email,
      phonenumber: user?.phone,
      name: `${user?.firstName} ${user?.lastName}`,
    },
    customizations: {
      title: "Hostel Initiative",
      description:
        "Hostel Initiative is a platform that connects hostel seekers with hostel agents.",
      logo: logo,
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <>
      <SummaryButton
        onClick={() => {
          return handleFlutterPayment({
            callback: (response) => {
              setResponseData(response);
              closePaymentModal();
            },
            onClose: () => {
              alert("Are you sure you want to close this?");
            },
          });
        }}
      >
        Verify Account
      </SummaryButton>
    </>
  );
};

export default FlutterWave;
