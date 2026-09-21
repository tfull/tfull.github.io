// 日本語 / English の切り替え。html[lang] を書き換えるだけで、CSS 側が片方を隠す。
// 優先順位: ?lang= クエリ > localStorage に保存した選択 > ブラウザの言語。
// クエリで指定された言語も保存し、以降のページ遷移に引き継ぐ。
(function () {
  var KEY = 'tfull-lang';
  var root = document.documentElement;

  function pick() {
    var q = (location.search.match(/[?&]lang=(ja|en)\b/) || [])[1];
    if (q) {
      try { localStorage.setItem(KEY, q); } catch (e) {}
      return q;
    }
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
