export default async function fetchData() {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all')
  const data = await response.json()
  return data;

}