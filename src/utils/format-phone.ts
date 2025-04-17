export function formatPhone(value: string) {
  const cleanedValue = value.replace(/\0/g, "");

  if (cleanedValue.length === 11) {
    return value.slice(0, 15);
  }

  const formattedValue = cleanedValue
    .replace(/^(\d{2})(\d{5})/g, "($1) $2")
    .replace(/(\d{4,5})(\d{4})$/, "$1-$2");
  return formattedValue;
}

export function extractPhoneNumber(value: string) {
  const phoneValue = value.replace(/[\(\)\s-]/g, "");

  return phoneValue;
}
