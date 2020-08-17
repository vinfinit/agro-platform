export const numericMask = (handler) => 
  (e) => {
    const re = /^[0-9.]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      handler(e.target.value)
    }
  };
  