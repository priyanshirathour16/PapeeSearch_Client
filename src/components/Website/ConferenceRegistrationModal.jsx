import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Radio, Checkbox, Button, Row, Col, Divider, message } from 'antd';
import { UserOutlined, MailOutlined, MobileOutlined, BankOutlined, SafetyCertificateOutlined, ReloadOutlined } from '@ant-design/icons';
import CodeEntryInput from '../CodeEntryInput';

const { Option } = Select;
const { TextArea } = Input;

const ConferenceRegistrationModal = ({ open, onCancel, conferenceId, conferenceName }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [captchaCode, setCaptchaCode] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');

    // Generate captcha on mount and when modal opens
    useEffect(() => {
        if (open) {
            generateCaptcha();
            setCaptchaInput('');
        }
    }, [open]);

    const generateCaptcha = () => {
        setCaptchaCode(Math.floor(1000 + Math.random() * 9000).toString());
    };

    const onFinish = async (values) => {
        // Validate captcha
        if (captchaInput !== captchaCode) {
            message.error('Incorrect captcha code. Please try again.');
            generateCaptcha();
            setCaptchaInput('');
            return;
        }

        setLoading(true);

        try {
            // Prepare submission data
            const submissionData = {
                ...values,
                conferenceId
            };

            console.log('Registration Data:', submissionData);

            // TODO: Replace with actual API call
            // Example:
            // const response = await axios.post('/api/conference/register', submissionData);

            // Simulate API call for now
            setTimeout(() => {
                setLoading(false);
                message.success('Registration submitted successfully!');
                form.resetFields();
                setCaptchaInput('');
                generateCaptcha();
                onCancel();
            }, 1500);

        } catch (error) {
            console.error('Registration Error:', error);
            message.error('Registration failed. Please try again.');
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        form.resetFields();
        setCaptchaInput('');
        onCancel();
    };

    return (
        <Modal
            title={
                <div className="flex items-center gap-3 border-b border-gray-100 pb-3 mb-0">
                    <div className="bg-[#0b1c2e] p-2 rounded-lg">
                        <UserOutlined className="text-white text-lg" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[#0b1c2e] m-0">Conference Registration</h3>
                        <p className="text-gray-500 text-xs m-0 font-normal">{conferenceName}</p>
                    </div>
                </div>
            }
            open={open}
            onCancel={handleModalClose}
            footer={null}
            width={800}
            centered
            className="conference-registration-modal"
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark="optional"
                className="mt-4"
            >
                {/* Personal Information */}
                <h4 className="text-[#204066] font-bold text-sm uppercase tracking-wider mb-4 border-l-4 border-[#204066] pl-2">Personal Information</h4>
                <Row gutter={16}>
                    <Col xs={24} sm={4}>
                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: 'Select title' }]}
                        >
                            <Select placeholder="Title">
                                <Option value="Mr">Mr.</Option>
                                <Option value="Ms">Ms.</Option>
                                <Option value="Mrs">Mrs.</Option>
                                <Option value="Dr">Dr.</Option>
                                <Option value="Prof">Prof.</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={10}>
                        <Form.Item
                            name="firstName"
                            label="First Name"
                            rules={[{ required: true, message: 'Enter first name' }]}
                        >
                            <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="First Name" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={10}>
                        <Form.Item
                            name="lastName"
                            label="Last Name"
                            rules={[{ required: true, message: 'Enter last name' }]}
                        >
                            <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Last Name" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="email"
                            label="Email ID"
                            rules={[
                                { required: true, message: 'Enter email' },
                                { type: 'email', message: 'Invalid email' }
                            ]}
                        >
                            <Input prefix={<MailOutlined className="text-gray-400" />} placeholder="Email Address" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="confirmEmail"
                            label="Confirm Email ID"
                            dependencies={['email']}
                            rules={[
                                { required: true, message: 'Confirm your email' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('email') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Emails do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input prefix={<MailOutlined className="text-gray-400" />} placeholder="Confirm Email" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="mobile"
                            label="Mobile No."
                            rules={[
                                { required: true, message: 'Enter mobile number' },
                                { pattern: /^[0-9]{10}$/, message: 'Invalid mobile number' }
                            ]}
                        >
                            <Input prefix={<MobileOutlined className="text-gray-400" />} placeholder="10-digit Mobile Number" maxLength={10} />
                        </Form.Item>
                    </Col>
                </Row>

                <Divider className="my-6" />

                {/* Professional Information */}
                <h4 className="text-[#204066] font-bold text-sm uppercase tracking-wider mb-4 border-l-4 border-[#204066] pl-2">Professional Details</h4>
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="designation"
                            label="Designation"
                            rules={[{ required: true, message: 'Enter designation' }]}
                        >
                            <Input prefix={<SafetyCertificateOutlined className="text-gray-400" />} placeholder="e.g. Assistant Professor" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="department"
                            label="Department"
                            rules={[{ required: true, message: 'Enter department' }]}
                        >
                            <Input prefix={<BankOutlined className="text-gray-400" />} placeholder="e.g. Computer Science" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24}>
                        <Form.Item
                            name="institution"
                            label="Institution/Organization Name"
                            rules={[{ required: true, message: 'Enter institution name' }]}
                        >
                            <Input prefix={<BankOutlined className="text-gray-400" />} placeholder="Full Name of Institution" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24}>
                        <Form.Item
                            name="institutionAddress"
                            label="Institution Address"
                            rules={[{ required: true, message: 'Enter address' }]}
                        >
                            <TextArea rows={2} placeholder="Complete Address" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} sm={8}>
                        <Form.Item
                            name="state"
                            label="State"
                            rules={[{ required: true, message: 'Enter state' }]}
                        >
                            <Input placeholder="State" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item
                            name="city"
                            label="City"
                            rules={[{ required: true, message: 'Enter city' }]}
                        >
                            <Input placeholder="City" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item
                            name="pincode"
                            label="Pincode"
                            rules={[{ required: true, message: 'Enter pincode' }]}
                        >
                            <Input placeholder="Pincode" maxLength={6} />
                        </Form.Item>
                    </Col>
                </Row>

                <Divider className="my-6" />

                {/* Participation Details */}
                <h4 className="text-[#204066] font-bold text-sm uppercase tracking-wider mb-4 border-l-4 border-[#204066] pl-2">Participation Details</h4>

                <Form.Item
                    name="presentingPaper"
                    label="Presenting Paper?"
                    rules={[{ required: true, message: 'Please select an option' }]}
                >
                    <Radio.Group>
                        <Radio value="Online">Online</Radio>
                        <Radio value="Offline">Offline</Radio>
                        <Radio value="Not Applicable">Not Applicable</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="residentialDelegate"
                    label="Residential Delegate?"
                    rules={[{ required: true, message: 'Please select an option' }]}
                >
                    <Radio.Group>
                        <Radio value="Yes">Yes</Radio>
                        <Radio value="No">No</Radio>
                        <Radio value="Not Applicable">Not Applicable</Radio>
                    </Radio.Group>
                </Form.Item>

                <Divider className="my-6" />

                <Form.Item
                    name="terms"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept terms and conditions')),
                        },
                    ]}
                >
                    <Checkbox>
                        I agree to the <a href="#" className="text-[#204066] font-semibold hover:underline">Terms and Conditions</a> and Privacy Policy.
                    </Checkbox>
                </Form.Item>

                {/* Number Captcha Section */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Enter the code shown below</label>
                    <div className="flex flex-wrap items-center gap-4">
                        <CodeEntryInput
                            key={captchaCode}
                            length={4}
                            onChange={(code) => setCaptchaInput(code)}
                        />
                        <div className="bg-gradient-to-br from-[#204066] to-[#0b1c2e] text-white h-12 flex items-center px-6 text-xl font-bold tracking-widest min-w-[100px] justify-center shadow-lg rounded-lg select-none">
                            {captchaCode}
                        </div>
                        <Button
                            type="text"
                            icon={<ReloadOutlined />}
                            onClick={generateCaptcha}
                            className="text-[#204066] hover:text-[#0b1c2e]"
                        >
                            Refresh
                        </Button>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <Button onClick={handleModalClose} className="h-10 px-6 rounded-md">Cancel</Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="bg-[#204066] hover:bg-[#0b1c2e] h-10 px-8 rounded-md font-semibold"
                    >
                        Submit Registration
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default ConferenceRegistrationModal;
