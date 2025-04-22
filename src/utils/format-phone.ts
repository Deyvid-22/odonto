export function formatPhone(value: string) {
  const cleanedValue = value.replace(/\D/g, ""); // Remove tudo que não for número

  if (cleanedValue.length !== 11) {
    return value; // Retorna como está se não tiver 11 dígitos
  }

  const ddd = cleanedValue.slice(0, 2);
  const prefix = cleanedValue.slice(2, 7);
  const suffix = cleanedValue.slice(7);

  return `(${ddd}) ${prefix}-${suffix}`;
}

export function extractPhoneNumber(value: string) {
  const phoneValue = value.replace(/[\(\)\s-]/g, "");

  return phoneValue;
}
