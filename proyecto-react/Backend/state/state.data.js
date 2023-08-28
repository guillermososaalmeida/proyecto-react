let testEmailSend = false;

const setTestEmailSend = (data) => {
  console.log("data", data);
  testEmailSend = data;
};

const getTestEmailSend = () => {
  return testEmailSend;
};

module.exports = { setTestEmailSend, getTestEmailSend };
