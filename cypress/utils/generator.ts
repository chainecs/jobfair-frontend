export function getRandomEmail() {
  const randomString = Math.random().toString(36).substring(2, 10); // สร้าง string แบบสุ่ม
  return `test_${randomString}@example.com`;
}

export function getRandomName() {
  const length = 10;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let name = "";
  for (let i = 0; i < length; i++) {
    name += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return name;
}

export function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max);
}
