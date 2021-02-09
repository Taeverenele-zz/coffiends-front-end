const validatePhone = (phone) => {
  const phoneType = Number(phone);

  if (isNaN(phoneType)) {
    return false;
  } else {
    return true;
  };
};

export default validatePhone;
