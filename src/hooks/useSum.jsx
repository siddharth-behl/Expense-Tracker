export default function useSum(arr) {
  let amount = arr.reduce((accumulator, current) => {
    return accumulator + parseFloat(current.Amount);
  }, 0);

  return amount;
}
