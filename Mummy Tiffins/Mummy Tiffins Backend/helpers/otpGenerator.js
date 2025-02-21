export const generateOTP = async (length)  => {
    let otp = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      otp += characters.charAt(randomIndex);
    }
  
    return otp;
  }