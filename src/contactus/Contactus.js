import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Input, message } from "antd";
import "./contactus.css";
import validator from "validator";
import FormItem from "antd/es/form/FormItem";
import Footer from "../footer/Footer";
const Contactus = () => {
  const [emailError, setEmailError] = useState("");
  const [Email, setEmail] = useState("");
  const [Name, SetName] = useState("");
  const [Number, SetNumber] = useState("");
  const [Description, SetDescription] = useState("");
  const [value, setValue] = useState("");
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const onValidateEmail = (e) => {
    setEmail(e.target.value);

    if (validator.isEmail(Email)) {
      setEmailError();
    } else {
      setEmailError("Enter valid Email!");
    }
  };

  const handleSubmit = () => {
    const userData = {
      name: Name,
      Email: Email,
      phoneNumber: Number,
      Description: Description,
    };

    const existingDataString = localStorage.getItem("contacts");
    const existingData = existingDataString
      ? JSON.parse(existingDataString)
      : [];

    const updatedData = [...existingData, userData];

    localStorage.setItem("contacts", JSON.stringify(updatedData));

    message.success("Successfully Submitted");
    form.resetFields();
    SetName("");
    setEmail("");
    SetNumber("");
    SetDescription("");
  };

  return (
    <>
      <Navbar />
      <div>
        <p className="contact-heading">ContactUs</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58748.93901133523!2d72.39777294863282!3d23.030795600000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b7570ed637d%3A0xfe4fc9de9d6ad96c!2sVanza%20Hospital!5e0!3m2!1sen!2sin!4v1696928658997!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="contact-form">
        <Form
          form={form}
          labelCol={{ span: 5 }}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please Enter Your Name",
                validator: (rule, value) => {
                  if (!value.trim()) {
                    return Promise.reject("Name  field cannot be empty");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <div>
              <label htmlFor="name" className="ant-form-item-required">
                Your Name
              </label>
              <Input
                id="name"
                size="large"
                className="input"
                onChange={(e) => SetName(e.target.value)}
                prefix={<UserOutlined className="user-icon1" />}
              />
            </div>
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please Enter Valid Email!",
              },
            ]}
          >
            <div>
              <label htmlFor="email" className="ant-form-item-required">
                Your Email
              </label>
              <Input
                size="large"
                id="mail"
                onChange={(e) => onValidateEmail(e)}
                className="input"
                prefix={<MailOutlined className="mail-icon1" />}
              />
            </div>
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Please Enter Phone Number " },
              {
                message: "Please Enter 10 digit Numbers",
                min: 10,
              },
            ]}
          >
            <div>
              <label htmlFor="phone" className="ant-form-item-required">
                Phone Number
              </label>
              <Input
                type="tel"
                value={Number}
                className="input"
                size="large"
                onKeyDown={(e) => {
                  if (!/\d/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                maxLength={10}
                id="phone"
                onChange={(e) => {
                  SetNumber(e.target.value.replace(/\D/g, ""));
                }}
                prefix={<PhoneOutlined className="phone-icon" />}
              />
            </div>
          </Form.Item>
          <Form.Item label="Description " name="message">
            <TextArea
              rows={4}
              maxLength={1000}
              className="input"
              onChange={(e) => SetDescription(e.target.value)}
            />
          </Form.Item>
        </Form>
        <div className="send" onClick={form.submit}>
          SEND
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Contactus;
