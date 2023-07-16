const fibonacci = (n) => {
  if (n <= 0) {
    return [];
  } else if (n === 1) {
    return [0];
  } else if (n === 2) {
    return [0, 1];
  }

  return Array.from(Array(n)).reduce((acc, _, i) => {
    if (i < 2) {
      acc.push(i);
    } else {
      const sum = acc[i - 1] + acc[i - 2];
      acc.push(sum);
    }
    return acc;
  }, []);
};

// Example usage
const n = 10;
const series = fibonacci(n);
console.log(series);
