export function parsePhone(fullPhone: string) {
  if (!fullPhone) return { prefix: undefined, phone: '', extension: undefined };

  const [numberPart, extensionPart] = fullPhone.split('x');
  
  const digitsOnly = numberPart.replace(/\D/g, '');

  let prefix = '';
  let phone = '';

 
  if (digitsOnly.length > 11) {
    prefix = digitsOnly.slice(0, digitsOnly.length - 9); 
    phone = digitsOnly.slice(-9); 
  }
  
  else if (digitsOnly.length === 11) {
    prefix = digitsOnly.slice(0, 2); 
    phone = digitsOnly.slice(2); 
  }
 
  else if (digitsOnly.length === 10) {
    phone = digitsOnly;
  } else {
    console.error('Invalid phone length', digitsOnly);
  }
  
  if (phone.startsWith('0')) {
    phone = phone.slice(1);
  }

  return {
    prefix,
    phone,
    extension: extensionPart ? extensionPart.trim() : undefined,
  };
}
