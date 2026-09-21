// 日本語 / English の切り替え。html[lang] を書き換えるだけで、CSS 側が片方を隠す。
// 初回はブラウザの言語に合わせ、選んだ言語は localStorage に覚える。
(function () {
  var KEY = 'latticetd-lang';
  var root = document.documentElement;

  function pick() {
    try {
      var saved = localStorage.getItem(KEY);
      if (saved === 'ja' || saved === 'en') return saved;
    } catch (e) {}
    return (navigator.language || '').toLowerCase().indexOf('ja') === 0 ? 'ja' : 'en';
  }

  function apply(lang) {
    root.setAttribute('lang', lang);
    var buttons = document.querySelectorAll('.lang button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', buttons[i].getAttribute('data-lang') === lang ? 'true' : 'false');
    }
    var t = document.querySelector('title');
    if (t && t.getAttribute('data-' + lang)) document.title = t.getAttribute('data-' + lang);
  }

  apply(pick());

  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('.lang button') : null;
    if (!b) return;
    var lang = b.getAttribute('data-lang');
    try { localStorage.setItem(KEY, lang); } catch (err) {}
    apply(lang);
  });
})();
