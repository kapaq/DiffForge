document.getElementById('compareForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const code1 = document.getElementById('code1').value;
  const code2 = document.getElementById('code2').value;

  const response = await fetch('/compare', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code1, code2 }),
  });

  const data = await response.json();
  document.getElementById('result').innerHTML = data.highlightedCode;
});
