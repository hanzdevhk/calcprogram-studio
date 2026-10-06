(() => {
  const cfg = window.SITE_CONFIG || {};
  document.querySelectorAll('[data-brand]').forEach(el => el.textContent = cfg.brandName || 'CalcProgram Studio');
  document.querySelectorAll('[data-email]').forEach(el => {
    const email = cfg.contactEmail || 'YOUR_EMAIL@example.com';
    el.textContent = email;
    if (el.tagName === 'A') el.href = `mailto:${email}`;
  });
  document.querySelectorAll('[data-price]').forEach(el => {
    const key = el.getAttribute('data-price');
    if (cfg.pricing && cfg.pricing[key]) el.textContent = `${cfg.currency || 'HK$'} ${cfg.pricing[key]}`;
  });
  const year = document.querySelector('[data-year]'); if (year) year.textContent = new Date().getFullYear();
  const wa = document.querySelector('[data-whatsapp]');
  if (wa) {
    if (cfg.whatsappUrl) { wa.href = cfg.whatsappUrl; wa.hidden = false; } else { wa.hidden = true; }
  }

  const form = document.querySelector('#inquiryForm');
  if (!form) return;
  const status = document.querySelector('#formStatus');
  const submitBtn = form.querySelector('button[type="submit"]');

  const summaryFrom = data => {
    const lines = [
      `【${cfg.brandName || 'CalcProgram Studio'} 新需求】`,
      `姓名：${data.get('name') || '-'}`,
      `聯絡方式：${data.get('contact') || '-'}`,
      `考試／課程：${data.get('exam') || '-'}`,
      `計算機型號：${data.get('calculator') || '-'}`,
      `Deadline：${data.get('deadline') || '-'}`,
      `Past Paper 數量：${data.get('paperCount') || '-'}`,
      `預算：${data.get('budget') || '-'}`,
      `題目／檔案連結：${data.get('links') || '-'}`,
      '',
      '需求說明：',
      data.get('details') || '-'
    ];
    return lines.join('\n');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const summary = summaryFrom(data);
    submitBtn.disabled = true;
    status.textContent = '正在準備你的需求…';

    try {
      if (cfg.formEndpoint) {
        const payload = Object.fromEntries(data.entries());
        const r = await fetch(cfg.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!r.ok) throw new Error('Form endpoint rejected request');
        form.reset();
        status.textContent = '已成功送出。你可以保留此頁作記錄。';
        return;
      }

      try { await navigator.clipboard.writeText(summary); } catch (_) {}
      const email = cfg.contactEmail || 'YOUR_EMAIL@example.com';
      const subject = encodeURIComponent(`Calculator Program Inquiry - ${data.get('exam') || 'New Request'}`);
      const body = encodeURIComponent(summary);
      status.textContent = '未設定表單後端：已整理需求並嘗試複製，現在會開啟你的 Email App。';
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    } catch (err) {
      console.error(err);
      try { await navigator.clipboard.writeText(summary); } catch (_) {}
      status.textContent = '送出失敗，但需求摘要已準備好。請複製後直接 Email 給我們。';
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
