// Call API Gateway to get the visitor count from Lambda/DynamoDB
fetch('https://snb6qlrtf0.execute-api.us-east-1.amazonaws.com/visitor')  // ← غير الرابط لرابطك الفعلي
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    document.getElementById('visitor-count').innerText = data.count;
  })
  .catch(err => {
    document.getElementById('visitor-count').innerText = 'Error';
    console.error('Failed to fetch visitor count:', err);
  });


/*
// VISITOR COUNTER
const counterElement = document.getElementById('counter');
let visits = localStorage.getItem('visitCount');
visits = visits ? parseInt(visits) + 1 : 1;
localStorage.setItem('visitCount', visits);
counterElement.textContent = visits;

// LANGUAGE SWITCH
function switchLang(lang) {
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
  });

  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.getElementById('subTitle').textContent =
    lang === 'ar' ? 'علي وزير | مهندس DevOps و SRE' : 'Ali Wazeer | DevOps & SRE Engineer';
}

// DARK MODE TOGGLE
document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
*/