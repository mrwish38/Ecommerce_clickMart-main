import React from "react";
import { Typography, Stepper, StepLabel,Step,StepIcon } from "@mui/material"
import "./checkout.css";


const CheckOutSteps = ({activeStep}) => {

    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon:  <i className="fa-solid fa-truck-fast"></i>
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <i class="fa-solid fa-check-to-slot"></i>
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <i className="fas fa-credit-card"></i>
        },
    ];

    const stepStyles = {
        boxSizing: "border-box",
    };

    return (
        <>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step key={index} 
            active={activeStep === index ? true : false} 
            completed={activeStep >= index ? true : false}>
            <StepLabel
            style={{color: activeStep >= index ? "#FF3F6C" : "rgba(0,0,0,0.664"}} StepIconComponent={() => <div className="step-icon">{item.icon}</div>}>
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
        </>
    )
}

export default CheckOutSteps;